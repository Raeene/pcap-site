'use strict';
// PacketStory analysis core. Runs inside a Web Worker (see app.js); also loadable in Node for tests.

const SVC = {20:'FTP-data',21:'FTP',22:'SSH',23:'Telnet',25:'SMTP',53:'DNS',67:'DHCP',68:'DHCP',69:'TFTP',80:'HTTP',88:'Kerberos',110:'POP3',111:'RPC',123:'NTP',135:'MSRPC',137:'NetBIOS',138:'NetBIOS',139:'SMB',143:'IMAP',161:'SNMP',162:'SNMP',389:'LDAP',443:'HTTPS',445:'SMB',465:'SMTPS',514:'Syslog',587:'SMTP',636:'LDAPS',993:'IMAPS',995:'POP3S',1433:'MSSQL',1900:'SSDP',2049:'NFS',3306:'MySQL',3389:'RDP',5353:'mDNS',5432:'Postgres',5900:'VNC',6379:'Redis',8080:'HTTP',8443:'HTTPS'};
const PL = new Set([21, 23, 25, 53, 80, 110, 143, 161, 5353, 8080]);
const QT = {1:'A',2:'NS',5:'CNAME',6:'SOA',12:'PTR',15:'MX',16:'TXT',28:'AAAA',33:'SRV',65:'HTTPS',252:'AXFR',255:'ANY'};
const AUTH = {21:'FTP',22:'SSH',23:'Telnet',445:'SMB',3306:'MySQL',3389:'RDP',5900:'VNC',1433:'MSSQL',5432:'Postgres'};
const SCANNER_UA = /(sqlmap|nikto|nmap|masscan|gobuster|dirbuster|dirb|wfuzz|ffuf|hydra|zgrab|nuclei|acunetix|wpscan)/i;

const ip4 = (b, o) => b[o] + '.' + b[o + 1] + '.' + b[o + 2] + '.' + b[o + 3];
function ip6(v, o) {
  const w = Array.from({ length: 8 }, (_, i) => v.getUint16(o + i * 2));
  let bs = -1, bl = 0;
  for (let i = 0; i < 8;) { if (w[i]) { i++; continue; } let j = i; while (j < 8 && !w[j]) j++; if (j - i > bl && j - i > 1) { bs = i; bl = j - i; } i = j; }
  const h = w.map(x => x.toString(16));
  return bs < 0 ? h.join(':') : h.slice(0, bs).join(':') + '::' + h.slice(bs + bl).join(':');
}
const latin1 = (b, s, e) => { let r = ''; for (let i = s; i < e; i += 8192) r += String.fromCharCode.apply(null, b.subarray(i, Math.min(e, i + 8192))); return r; };
const flagStr = f => ['FIN', 'SYN', 'RST', 'PSH', 'ACK', 'URG'].filter((_, i) => f & (1 << i)).join(', ');
const printable = s => s.replace(/[^\x20-\x7e]/g, '.');

// DNS message parser on a latin1 string; o = offset of DNS header
function dnsName(s, o) {
  const parts = []; let jumps = 0, end = -1;
  while (o < s.length) {
    const l = s.charCodeAt(o);
    if (l === 0) { o++; break; }
    if ((l & 0xc0) === 0xc0) { if (end < 0) end = o + 2; if (++jumps > 10 || o + 1 >= s.length) break; o = ((l & 0x3f) << 8) | s.charCodeAt(o + 1); continue; }
    parts.push(s.substr(o + 1, l)); o += l + 1;
  }
  return { name: parts.join('.'), next: end >= 0 ? end : o };
}
function dns(s, o) {
  if (s.length < o + 17) return null;
  const fl = s.charCodeAt(o + 2), qd = (s.charCodeAt(o + 4) << 8) | s.charCodeAt(o + 5);
  if (!qd) return null;
  const q = dnsName(s, o + 12);
  if (q.next + 4 > s.length) return null;
  const qt = (s.charCodeAt(q.next) << 8) | s.charCodeAt(q.next + 1);
  return { qr: fl >> 7, name: q.name, qtype: QT[qt] || 'TYPE' + qt, an: (s.charCodeAt(o + 6) << 8) | s.charCodeAt(o + 7) };
}
// SNMP v1/v2c: SEQUENCE { INTEGER version, OCTET STRING community, PDU }
function snmp(s) {
  let o = 0;
  const len = () => { let l = s.charCodeAt(o++); if (l & 0x80) { const n = l & 0x7f; l = 0; for (let i = 0; i < n; i++) l = (l << 8) | s.charCodeAt(o++); } return l; };
  if (s.charCodeAt(o++) !== 0x30) return null; len();
  if (s.charCodeAt(o++) !== 0x02) return null; const vl = len(); const ver = s.charCodeAt(o + vl - 1); o += vl;
  if (s.charCodeAt(o++) !== 0x04) return null; const cl = len(); const community = s.substr(o, cl); o += cl;
  const pdu = s.charCodeAt(o);
  const names = { 0xa0: 'get-request', 0xa1: 'get-next-request', 0xa2: 'response', 0xa3: 'set-request', 0xa5: 'get-bulk-request' };
  return { ver: ver === 0 ? 'v1' : ver === 1 ? 'v2c' : '?', community, pdu: names[pdu] || 'pdu' };
}

// TLS ClientHello -> server name (SNI). The hostname is sent in cleartext even though the rest is encrypted.
function sni(b, o, end) {
  if (end - o < 48 || b[o] !== 0x16 || b[o + 1] !== 3 || b[o + 5] !== 1) return null;
  const u16 = i => (b[i] << 8) | b[i + 1];
  let p = o + 5 + 4 + 2 + 32;                     // record hdr, handshake hdr, version, random
  if (p >= end) return null; p += 1 + b[p];        // session id
  if (p + 2 > end) return null; p += 2 + u16(p);   // cipher suites
  if (p >= end) return null; p += 1 + b[p];        // compression methods
  if (p + 2 > end) return null;
  const extEnd = Math.min(end, p + 2 + u16(p)); p += 2;
  while (p + 4 <= extEnd) {
    const type = u16(p), len = u16(p + 2); p += 4;
    if (type === 0 && p + 5 <= extEnd && b[p + 2] === 0) {
      const n = u16(p + 3); if (p + 5 + n > extEnd || n > 253) return null;
      let h = ''; for (let i = p + 5; i < p + 5 + n; i++) h += String.fromCharCode(b[i]);
      return /^[a-z0-9.-]+$/i.test(h) ? h.toLowerCase() : null;
    }
    p += len;
  }
  return null;
}

function l4(r, b, v, o, end, pr) {
  let po = 0;
  if (pr === 6 && end >= o + 20) { r.proto = 'TCP'; r.sp = v.getUint16(o); r.dp = v.getUint16(o + 2); r.fl = b[o + 13]; po = o + (b[o + 12] >> 4) * 4; }
  else if (pr === 17 && end >= o + 8) { r.proto = 'UDP'; r.sp = v.getUint16(o); r.dp = v.getUint16(o + 2); po = o + 8; }
  else if ((pr === 1 || pr === 58) && end > o) { r.proto = 'ICMP'; r.icmp = b[o]; r.v6 = pr === 58; }
  else if (pr === 2) r.proto = 'IGMP';
  if (r.sp !== undefined) {
    r.app = (r.sp < r.dp ? (SVC[r.sp] || SVC[r.dp]) : (SVC[r.dp] || SVC[r.sp])) || r.proto;
    r.plen = Math.max(0, end - po);
    if (po && po < end && (PL.has(r.sp) || PL.has(r.dp))) r.pl = latin1(b, po, Math.min(end, po + 512));
    if (pr === 6 && po && end - po > 47 && b[po] === 0x16) { const h = sni(b, po, end); if (h) r.sni = h; }
  }
  return r;
}

function decode(b, link, len) {
  const r = { len, proto: 'Other' }; let o = 0, et;
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (link === 1) { if (b.length < 14) return r; et = v.getUint16(12); o = 14; while ((et === 0x8100 || et === 0x88a8) && b.length >= o + 4) { et = v.getUint16(o + 2); o += 4; } }
  else if (link === 113) { if (b.length < 16) return r; et = v.getUint16(14); o = 16; }
  else if (link === 276) { if (b.length < 20) return r; et = v.getUint16(0); o = 20; }
  else if (link === 0 || link === 108) { if (b.length < 4) return r; const f = b[0] || b[3]; et = f === 2 ? 0x0800 : 0x86dd; o = 4; }
  else if (link === 101 || link === 12 || link === 14 || link === 228 || link === 229) { if (!b.length) return r; et = (b[0] >> 4) === 6 ? 0x86dd : 0x0800; }
  else return r;
  if (et === 0x0806) {
    r.proto = r.app = 'ARP';
    if (b.length >= o + 28) {
      r.op = v.getUint16(o + 6);
      r.mac = Array.from(b.subarray(o + 8, o + 14), x => x.toString(16).padStart(2, '0')).join(':');
      r.src = ip4(b, o + 14); r.dst = ip4(b, o + 24);
    }
    return r;
  }
  if (et === 0x0800) {
    if (b.length < o + 20) return r;
    const ihl = (b[o] & 15) * 4, tot = v.getUint16(o + 2), end = Math.min(b.length, tot ? o + tot : b.length);
    r.src = ip4(b, o + 12); r.dst = ip4(b, o + 16);
    if (v.getUint16(o + 6) & 0x1fff) { r.proto = 'IPv4-frag'; return r; }
    return l4(r, b, v, o + ihl, end, b[o + 9]);
  }
  if (et === 0x86dd) {
    if (b.length < o + 40) return r;
    r.src = ip6(v, o + 8); r.dst = ip6(v, o + 24);
    const end = Math.min(b.length, o + 40 + v.getUint16(o + 4));
    let nh = b[o + 6], p = o + 40, guard = 0;
    while ([0, 43, 44, 60].includes(nh) && p + 8 <= end && guard++ < 8) { const n = b[p]; p += nh === 44 ? 8 : (b[p + 1] + 1) * 8; nh = n; }
    return l4(r, b, v, p, end, nh);
  }
  return r;
}

function info(r) {
  if (r.proto === 'ARP') return r.op === 1 ? `who has ${r.dst}? tell ${r.src}` : r.op === 2 ? `${r.src} is at ${r.mac}` : 'ARP';
  if (r.proto === 'ICMP') {
    const t = r.icmp, m = r.v6 ? { 128: 'echo request', 129: 'echo reply', 1: 'destination unreachable', 135: 'neighbor solicitation', 136: 'neighbor advertisement' } : { 8: 'echo request', 0: 'echo reply', 3: 'destination unreachable', 11: 'time exceeded' };
    return m[t] || 'type ' + t;
  }
  if (r.dns) return (r.dns.qr ? 'response ' : 'query ') + r.dns.qtype + ' ' + r.dns.name + (r.dns.qr ? ' (' + r.dns.an + ' answers)' : '');
  if (r.sni) return r.sp + ' → ' + r.dp + '  TLS ClientHello  SNI=' + r.sni;
  if (r.snmp) return 'SNMP' + r.snmp.ver + ' ' + r.snmp.pdu + ' community="' + r.snmp.community + '"';
  let s = r.sp + ' → ' + r.dp;
  if (r.proto === 'TCP') s += ' [' + flagStr(r.fl) + ']';
  if (r.pl && r.plen) { const line = printable(r.pl.split(/\r?\n/)[0]).slice(0, 80); if (line.trim()) s += '  ' + line; }
  else if (r.plen) s += ' len=' + r.plen;
  return s;
}

function readPcap(buf, dv, le, nano, pk, progress) {
  const link = dv.getUint32(20, le) & 0x0fffffff; let o = 24;
  const links = new Set([link]);
  while (o + 16 <= buf.byteLength) {
    const s = dv.getUint32(o, le), u = dv.getUint32(o + 4, le), cl = dv.getUint32(o + 8, le), ol = dv.getUint32(o + 12, le);
    o += 16; if (o + cl > buf.byteLength) break;
    const p = decode(new Uint8Array(buf, o, cl), link, ol); p.t = s + u / (nano ? 1e9 : 1e6); p.off = o; p.cl = cl; p.lk = link; pk.push(p); o += cl;
    if (progress && !(pk.length % 50000)) progress(o / buf.byteLength);
  }
  return { format: nano ? 'pcap (ns)' : 'pcap', links };
}

function readPcapng(buf, dv, pk, progress) {
  let o = 0, le = true, ifs = [];
  const links = new Set();
  while (o + 12 <= buf.byteLength) {
    let type = dv.getUint32(o, le);
    if (type === 0x0a0d0d0a) {
      const bom = dv.getUint32(o + 8, true);
      if (bom === 0x1a2b3c4d) le = true; else if (bom === 0x4d3c2b1a) le = false; else throw Error('bad pcapng byte-order magic');
      ifs = [];
    }
    const bl = dv.getUint32(o + 4, le);
    if (bl < 12 || o + bl > buf.byteLength) break;
    if (type === 1) { // Interface Description Block
      const link = dv.getUint16(o + 8, le); let res = 1e-6, p = o + 16;
      while (p + 4 <= o + bl - 4) {
        const code = dv.getUint16(p, le), ol = dv.getUint16(p + 2, le);
        if (code === 0) break;
        if (code === 9 && ol >= 1) { const v = dv.getUint8(p + 4); res = v & 0x80 ? Math.pow(2, -(v & 0x7f)) : Math.pow(10, -v); }
        p += 4 + ((ol + 3) & ~3);
      }
      ifs.push({ link, res }); links.add(link);
    } else if (type === 6 || type === 2) { // Enhanced / obsolete Packet Block
      const id = type === 6 ? dv.getUint32(o + 8, le) : dv.getUint16(o + 8, le);
      const hi = dv.getUint32(o + 12, le), lo = dv.getUint32(o + 16, le), cl = dv.getUint32(o + 20, le), ol = dv.getUint32(o + 24, le);
      const it = ifs[id] || { link: 1, res: 1e-6 };
      if (o + 28 + cl <= o + bl) {
        const p = decode(new Uint8Array(buf, o + 28, cl), it.link, ol);
        p.t = hi * 4294967296 * it.res + lo * it.res; p.off = o + 28; p.cl = cl; p.lk = it.link; pk.push(p);
      }
    } else if (type === 3) { // Simple Packet Block
      const it = ifs[0] || { link: 1, res: 1e-6 }, ol = dv.getUint32(o + 8, le), cl = Math.min(ol, bl - 16);
      const p = decode(new Uint8Array(buf, o + 12, cl), it.link, ol); p.t = pk.length ? pk[pk.length - 1].t : 0; p.off = o + 12; p.cl = cl; p.lk = it.link; pk.push(p);
    }
    o += bl;
    if (progress && !(pk.length % 50000) && pk.length) progress(o / buf.byteLength);
  }
  return { format: 'pcapng', links };
}

function parse(buf, progress) {
  if (buf.byteLength < 24) throw Error('file too short to be a capture');
  const dv = new DataView(buf), m = dv.getUint32(0, false), pk = [];
  let meta;
  if (m === 0xa1b2c3d4) meta = readPcap(buf, dv, false, false, pk, progress);
  else if (m === 0xd4c3b2a1) meta = readPcap(buf, dv, true, false, pk, progress);
  else if (m === 0xa1b23c4d) meta = readPcap(buf, dv, false, true, pk, progress);
  else if (m === 0x4d3cb2a1) meta = readPcap(buf, dv, true, true, pk, progress);
  else if (m === 0x0a0d0d0a) meta = readPcapng(buf, dv, pk, progress);
  else throw Error('not a .pcap or .pcapng file');
  for (const p of pk) {
    if (p.pl) {
      if (p.sp === 53 || p.dp === 53 || p.sp === 5353 || p.dp === 5353) p.dns = dns(p.pl, p.proto === 'TCP' ? 2 : 0);
      else if (p.proto === 'UDP' && (p.dp === 161 || p.sp === 161)) p.snmp = snmp(p.pl);
    }
    p.info = info(p);
  }
  return { pk, ...meta };
}

const MITRE = id => 'https://attack.mitre.org/techniques/' + id.replace('.', '/') + '/';

function analyze({ pk, format, links }) {
  const n = pk.length; if (!n) throw Error('no packets found');
  let t0 = Infinity, t1 = -Infinity, bytes = 0;
  for (const p of pk) { if (p.t < t0) t0 = p.t; if (p.t > t1) t1 = p.t; }
  const proto = {}, talk = {}, ports = {}, conv = {}, syn = {}, sweep = {}, icmp = {}, arp = {}, tunnel = {}, fail = {}, conn = {}, authc = {}, http404 = {};
  const ev = [], creds = [], files = [], dnsN = {}, http = [], tls = {};
  const add = (t, sev, id, name, txt) => ev.push({ t, sev, id, name, txt });
  const once = new Set(), first = (k) => once.has(k) ? false : (once.add(k), true);

  for (const p of pk) {
    bytes += p.len;
    const app = p.app || p.proto; proto[app] = (proto[app] || 0) + 1;
    if (p.src) {
      const k = talk[p.src] || (talk[p.src] = { p: 0, b: 0 }); k.p++; k.b += p.len;
      const [a, b] = p.src < p.dst ? [p.src, p.dst] : [p.dst, p.src], ck = a + '|' + b;
      const c = conv[ck] || (conv[ck] = { a, b, p: 0, b2: 0, apps: {} }); c.p++; c.b2 += p.len; c.apps[app] = 1;
    }
    if (p.dp !== undefined && (p.proto === 'UDP' || (p.fl & 0x12) === 0x02)) ports[p.dp] = (ports[p.dp] || 0) + 1;
    const pair = p.src + '>' + p.dst, pl = p.pl;
    if (p.sni) { const k = tls[p.sni] || (tls[p.sni] = { n: 0, c: new Set(), port: p.dp }); k.n++; k.c.add(p.src); }

    if (p.proto === 'TCP' && (p.fl & 0x12) === 0x02) {
      (syn[pair] || (syn[pair] = { s: new Set(), t: p.t })).s.add(p.dp);
      const sk = p.src + '>' + p.dp; (sweep[sk] || (sweep[sk] = { h: new Set(), t: p.t })).h.add(p.dst);
      (conn[pair + ':' + p.dp] || (conn[pair + ':' + p.dp] = [])).push(p.t);
      if (AUTH[p.dp]) { const ak = pair + ':' + p.dp; (authc[ak] || (authc[ak] = { n: 0, t: p.t })).n++; }
    }
    if (p.proto === 'ICMP' && (p.icmp === 8 || (p.v6 && p.icmp === 128))) (icmp[p.src] || (icmp[p.src] = { h: new Set(), t: p.t })).h.add(p.dst);
    if (p.proto === 'ARP' && p.op === 2) (arp[p.src] || (arp[p.src] = { m: new Set(), t: p.t })).m.add(p.mac);

    if (pl && p.dp === 21) {
      let m = /^USER (.+?)\r?\n/.exec(pl); if (m) { creds.push({ t: p.t, proto: 'FTP', user: m[1], src: p.src, dst: p.dst }); add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `${p.src} sent FTP username "${m[1]}" to ${p.dst} in cleartext`); }
      m = /^PASS (.*?)\r?\n/.exec(pl); if (m) { const c = creds.findLast?.(c => c.proto === 'FTP' && c.src === p.src && c.len === undefined); if (c) c.len = m[1].length; add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `${p.src} sent an FTP password (${m[1].length} characters) to ${p.dst} in cleartext`); }
      m = /^(RETR|STOR) (.+?)\r?\n/.exec(pl); if (m) { files.push({ t: p.t, proto: 'FTP', dir: m[1] === 'RETR' ? 'download' : 'upload', name: m[2], src: p.src, dst: p.dst }); add(p.t, 'info', '', '', `${p.src} ${m[1] === 'RETR' ? 'downloaded' : 'uploaded'} "${m[2]}" ${m[1] === 'RETR' ? 'from' : 'to'} ${p.dst} over FTP`); }
    }
    if (pl && p.sp === 21 && pl.startsWith('530')) { const k = fail[p.dst + '>' + p.src] || (fail[p.dst + '>' + p.src] = { n: 0, t: p.t, svc: 'FTP' }); k.n++; }
    if (pl && p.dp === 110) {
      let m = /^USER (.+?)\r?\n/.exec(pl); if (m) { creds.push({ t: p.t, proto: 'POP3', user: m[1], src: p.src, dst: p.dst }); add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `${p.src} sent POP3 username "${m[1]}" to ${p.dst} in cleartext`); }
      m = /^PASS (.*?)\r?\n/.exec(pl); if (m) add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `${p.src} sent a POP3 password (${m[1].length} characters) to ${p.dst} in cleartext`);
    }
    if (pl && p.dp === 143) {
      const m = /^\S+ LOGIN "?([^\s"]+)"? "?([^\r\n"]*)"?/i.exec(pl);
      if (m) { creds.push({ t: p.t, proto: 'IMAP', user: m[1], len: m[2].length, src: p.src, dst: p.dst }); add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `${p.src} logged in to IMAP on ${p.dst} as "${m[1]}" with a cleartext password (${m[2].length} characters)`); }
    }
    if (pl && p.sp === 143 && /^\S+ NO /.test(pl)) { const k = fail[p.dst + '>' + p.src + ':imap'] || (fail[p.dst + '>' + p.src + ':imap'] = { n: 0, t: p.t, svc: 'IMAP' }); k.n++; }
    if (p.proto === 'TCP' && (p.dp === 23 || p.sp === 23) && p.plen && first('telnet' + [p.src, p.dst].sort())) {
      const [c, s] = p.dp === 23 ? [p.src, p.dst] : [p.dst, p.src];
      add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `Telnet session between ${c} and ${s}: everything typed, passwords included, crosses the network in cleartext`);
    }
    if (pl && (p.dp === 80 || p.dp === 8080)) {
      const rq = /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH) (\S+) HTTP\/[\d.]+/.exec(pl);
      if (rq) {
        const host = (/\r\nHost: *([^\r\n]+)/i.exec(pl) || [])[1] || p.dst, ua = (/\r\nUser-Agent: *([^\r\n]+)/i.exec(pl) || [])[1] || '';
        http.push({ t: p.t, src: p.src, method: rq[1], host, path: rq[2], ua });
        if (SCANNER_UA.test(ua) && first('ua' + p.src + ua)) add(p.t, 'alert', 'T1595.002', 'Vulnerability Scanning', `${p.src} is running a scanner against ${host} (User-Agent "${ua.slice(0, 60)}")`);
      }
      const m = /Authorization: Basic (\S+)/i.exec(pl);
      if (m) { let u = '?', l = 0; try { const d = atob(m[1]); u = d.split(':')[0]; l = d.length - u.length - 1; } catch (e) { /* bad base64 */ } creds.push({ t: p.t, proto: 'HTTP Basic', user: u, len: l, src: p.src, dst: p.dst }); add(p.t, 'warn', 'T1552', 'Unsecured Credentials', `${p.src} sent HTTP Basic credentials (user "${u}") to ${p.dst} unencrypted`); }
    }
    if (pl && (p.sp === 80 || p.sp === 8080) && /^HTTP\/[\d.]+ 404/.test(pl)) { const k = http404[p.dst + '>' + p.src] || (http404[p.dst + '>' + p.src] = { n: 0, t: p.t }); k.n++; }
    if (p.dns && !p.dns.qr) {
      const d = p.dns, k = dnsN[d.name] || (dnsN[d.name] = { n: 0, types: {} }); k.n++; k.types[d.qtype] = 1;
      if (d.qtype === 'AXFR' && first('axfr' + p.src + d.name)) add(p.t, 'alert', 'T1590.002', 'Gather Victim Network Information: DNS', `${p.src} requested a full zone transfer (AXFR) of "${d.name}" from ${p.dst}, which can leak the internal network map`);
      if (d.name.length >= 50 || d.name.split('.').some(l => l.length >= 30)) { const t = tunnel[p.src] || (tunnel[p.src] = { n: 0, t: p.t, ex: d.name }); t.n++; }
    }
    if (p.snmp && /request/.test(p.snmp.pdu) && ['public', 'private'].includes(p.snmp.community) && first('snmp' + p.src + p.dst))
      add(p.t, 'warn', 'T1602.001', 'SNMP (MIB Dump)', `${p.src} queried SNMP on ${p.dst} with the default community string "${p.snmp.community}", which works like a cleartext password`);
  }

  for (const [k, v] of Object.entries(syn)) if (v.s.size >= 20) { const [a, b] = k.split('>'); add(v.t, 'warn', 'T1046', 'Network Service Discovery', `${a} sent SYN packets to ${v.s.size} different ports on ${b} (suspected port scan)`); }
  for (const [k, v] of Object.entries(sweep)) if (v.h.size >= 10) { const [a, port] = k.split('>'); add(v.t, 'warn', 'T1046', 'Network Service Discovery', `${a} probed port ${port}${SVC[port] ? ' (' + SVC[port] + ')' : ''} on ${v.h.size} different hosts (suspected host sweep)`); }
  for (const [k, v] of Object.entries(icmp)) if (v.h.size >= 10) add(v.t, 'warn', 'T1018', 'Remote System Discovery', `${k} pinged ${v.h.size} different hosts (suspected ping sweep)`);
  for (const [k, v] of Object.entries(fail)) if (v.n >= 5) { const [a, b] = k.split(':')[0].split('>'); add(v.t, 'alert', 'T1110', 'Brute Force', `${a} failed to log in to ${b} over ${v.svc} ${v.n} times (suspected brute force)`); }
  for (const [k, v] of Object.entries(authc)) if (v.n >= 10) { const [pair, port] = k.split(':'), [a, b] = pair.split('>'); if (!fail[a + '>' + b]) add(v.t, 'alert', 'T1110', 'Brute Force', `${a} opened ${v.n} ${AUTH[port]} connections to ${b} (possible password guessing)`); }
  for (const [k, v] of Object.entries(http404)) if (v.n >= 20) { const [a, b] = k.split('>'); add(v.t, 'warn', 'T1595.003', 'Wordlist Scanning', `${a} got ${v.n} "404 Not Found" answers from ${b} (suspected directory brute force)`); }
  for (const [k, v] of Object.entries(tunnel)) if (v.n >= 10) add(v.t, 'alert', 'T1071.004', 'Application Layer Protocol: DNS', `${k} sent ${v.n} unusually long DNS queries, for example "${v.ex.slice(0, 60)}" (suspected DNS tunneling)`);
  for (const [k, v] of Object.entries(arp)) if (v.m.size >= 2) add(v.t, 'alert', 'T1557.002', 'ARP Cache Poisoning', `${k} was claimed by ${v.m.size} different MAC addresses: ${[...v.m].join(', ')} (suspected ARP spoofing)`);
  for (const [k, ts] of Object.entries(conn)) {
    if (ts.length < 8) continue; ts.sort((a, b) => a - b);
    const d = ts.slice(1).map((x, i) => x - ts[i]), m = d.reduce((a, b) => a + b) / d.length, sd = Math.sqrt(d.reduce((a, b) => a + (b - m) ** 2, 0) / d.length);
    if (m > 0.5 && sd / m < 0.1) add(ts[0], 'warn', 'T1071', 'Application Layer Protocol', `${k.replace('>', ' to ').replace(/:(\d+)$/, ' port $1')} connected ${ts.length} times, about every ${m.toFixed(1)} s (suspected beaconing)`);
  }

  const dur = t1 - t0, B = 120, buckets = new Array(B).fill(0);
  for (const p of pk) buckets[Math.min(B - 1, dur ? Math.floor((p.t - t0) / dur * B) : 0)]++;
  ev.sort((a, b) => a.t - b.t);
  const mm = new Map();
  for (const e of ev) { e.t -= t0; if (e.id) e.url = MITRE(e.id); const x = mm.get(e.txt); if (x) x.c++; else { e.c = 1; mm.set(e.txt, e); } }
  const evs = [...mm.values()]; for (const e of evs) if (e.c > 1) e.txt += ' (x' + e.c + ')';
  const sev = { alert: 0, warn: 0, info: 0 }; for (const e of evs) sev[e.sev]++;
  const rel = a => a.map(x => ({ ...x, t: x.t - t0 }));
  const rows = pk.map(p => ({ t: p.t - t0, src: p.src || '', dst: p.dst || '', proto: p.app || p.proto, l4: p.proto, len: p.len, info: p.info, sp: p.sp, dp: p.dp, off: p.off, cl: p.cl, lk: p.lk }));
  return {
    n, bytes, dur, start: t0, format, links: [...links], proto, talk, ports, buckets, ev: evs, sev,
    hosts: Object.keys(talk).length,
    conv: Object.values(conv).sort((x, y) => y.b2 - x.b2).slice(0, 12),
    creds: rel(creds), files: rel(files), http: rel(http).slice(0, 200),
    tls: Object.entries(tls).sort((a, b) => b[1].n - a[1].n).slice(0, 100).map(([name, v]) => ({ name, n: v.n, clients: [...v.c].slice(0, 4), port: v.port })),
    dns: Object.entries(dnsN).sort((a, b) => b[1].n - a[1].n).slice(0, 60).map(([name, v]) => ({ name, n: v.n, types: Object.keys(v.types) })),
    rows
  };
}

if (typeof module !== 'undefined') module.exports = { parse, analyze, decode, dns, snmp, SVC };
else onmessage = e => {
  try { const r = analyze(parse(e.data, f => postMessage({ progress: f }))); postMessage({ ok: r }); }
  catch (x) { postMessage({ err: x.message }); }
};
