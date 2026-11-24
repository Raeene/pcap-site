'use strict';
const DEMO = '1MOyoQIABAAAAAAAAAAAAP//AAABAAAAAPFTZQAAAAAqAAAAKgAAAP///////6q7zN3uAQgGAAEIAAYEAAKqu8zd7gEKAAABAAAAAAAACgAABQDxU2UgoQcAKgAAACoAAAD///////+qu8zd7gIIBgABCAAGBAACqrvM3e4CCgAAAQAAAAAAAAoAAAUA8VNlb2QIADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxBAAEAAAABAAAAAVACIAAAAAAAAPFTZb8nCQA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcQgACAAAAAQAAAAFQAiAAAAAAAADxU2UP6wkANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEMAAwAAAAEAAAABUAIgAAAAAAAA8VNlX64KADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxEAAQAAAABAAAAAVACIAAAAAAAAPFTZa9xCwA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcRQAFAAAAAQAAAAFQAiAAAAAAAADxU2X/NAwANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEYABgAAAAEAAAABUAIgAAAAAAAA8VNlT/gMADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxHAAcAAAABAAAAAVACIAAAAAAAAPFTZZ+7DQA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcSAAIAAAAAQAAAAFQAiAAAAAAAADxU2Xvfg4ANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEkACQAAAAEAAAABUAIgAAAAAAAA8VNlP0IPADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxKAAoAAAABAAAAAVACIAAAAAAAAfFTZU/DAAA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcSwALAAAAAQAAAAFQAiAAAAAAAAHxU2WfhgEANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEwADAAAAAEAAAABUAIgAAAAAAAB8VNl70kCADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxNAA0AAAABAAAAAVACIAAAAAAAAfFTZT8NAwA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcTgAOAAAAAQAAAAFQAiAAAAAAAAHxU2WP0AMANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnE8ADwAAAAEAAAABUAIgAAAAAAAB8VNl35MEADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxQABAAAAABAAAAAVACIAAAAAAAAfFTZS9XBQA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcUQARAAAAAQAAAAFQAiAAAAAAAAHxU2V/GgYANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnFIAEgAAAAEAAAABUAIgAAAAAAAB8VNlz90GADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxTABMAAAABAAAAAVACIAAAAAAAAfFTZR+hBwA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcVAAUAAAAAQAAAAFQAiAAAAAAAAHxU2VuZAgANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnFUAFQAAAAEAAAABUAIgAAAAAAAB8VNlVmgIADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAJCgAABQAVnFUAAAABAAAAAVASIAAAAAAAAfFTZaYrCQA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcVgAWAAAAAQAAAAFQAiAAAAAAAAHxU2X27gkANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnFcAFwAAAAEAAAABUAIgAAAAAAAB8VNlRrIKADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxYABgAAAABAAAAAVACIAAAAAAAAfFTZZZ1CwA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcWQAZAAAAAQAAAAFQAiAAAAAAAALxU2XWTQIAQgAAAEIAAAACAgICAgIEBAQEBAQIAEUAADQAAQAAQAYAAAoAAAUKAAAJoCgAFQAAAAEAAAABUBggAAAAAABVU0VSIGFkbWluDQoC8VNldtQDAEwAAABMAAAAAgICAgICBAQEBAQECABFAAA+AAEAAEAGAAAKAAAJCgAABQAVoCgAAAABAAAAAVAYIAAAAAAANTMwIExvZ2luIGluY29ycmVjdC4NCgLxU2X27gkAQgAAAEIAAAACAgICAgIEBAQEBAQIAEUAADQAAQAAQAYAAAoAAAUKAAAJoCgAFQAAAAEAAAABUBggAAAAAABVU0VSIGFkbWluDQoC8VNllnULAEwAAABMAAAAAgICAgICBAQEBAQECABFAAA+AAEAAEAGAAAKAAAJCgAABQAVoCgAAAABAAAAAVAYIAAAAAAANTMwIExvZ2luIGluY29ycmVjdC4NCgPxU2XWTQIAQgAAAEIAAAACAgICAgIEBAQEBAQIAEUAADQAAQAAQAYAAAoAAAUKAAAJoCgAFQAAAAEAAAABUBggAAAAAABVU0VSIGFkbWluDQoD8VNldtQDAEwAAABMAAAAAgICAgICBAQEBAQECABFAAA+AAEAAEAGAAAKAAAJCgAABQAVoCgAAAABAAAAAVAYIAAAAAAANTMwIExvZ2luIGluY29ycmVjdC4NCgPxU2X27gkAQgAAAEIAAAACAgICAgIEBAQEBAQIAEUAADQAAQAAQAYAAAoAAAUKAAAJoCgAFQAAAAEAAAABUBggAAAAAABVU0VSIGFkbWluDQoD8VNllnULAEwAAABMAAAAAgICAgICBAQEBAQECABFAAA+AAEAAEAGAAAKAAAJCgAABQAVoCgAAAABAAAAAVAYIAAAAAAANTMwIExvZ2luIGluY29ycmVjdC4NCgTxU2XWTQIAQgAAAEIAAAACAgICAgIEBAQEBAQIAEUAADQAAQAAQAYAAAoAAAUKAAAJoCgAFQAAAAEAAAABUBggAAAAAABVU0VSIGFkbWluDQoE8VNldtQDAEwAAABMAAAAAgICAgICBAQEBAQECABFAAA+AAEAAEAGAAAKAAAJCgAABQAVoCgAAAABAAAAAVAYIAAAAAAANTMwIExvZ2luIGluY29ycmVjdC4NCgTxU2X27gkAQgAAAEIAAAACAgICAgIEBAQEBAQIAEUAADQAAQAAQAYAAAoAAAUKAAAJoCgAFQAAAAEAAAABUBggAAAAAABVU0VSIGFkbWluDQoE8VNllnULAEwAAABMAAAAAgICAgICBAQEBAQECABFAAA+AAEAAEAGAAAKAAAJCgAABQAVoCgAAAABAAAAAVAYIAAAAAAANTMwIExvZ2luIGluY29ycmVjdC4NCgXxU2V21AMARgAAAEYAAAACAgICAgIEBAQEBAQIAEUAADgAAQAAQAYAAAoAAAUKAAAJoCkAFQAAAAEAAAABUBggAAAAAABVU0VSIGFub255bW91cw0KBfFTZZZ1CwBDAAAAQwAAAAICAgICAgQEBAQEBAgARQAANQABAABABgAACgAABQoAAAmgKQAVAAAAAQAAAAFQGCAAAAAAAFBBU1MgZ3Vlc3RADQoG8VNldtQDAEgAAABIAAAAAgICAgICBAQEBAQECABFAAA6AAEAAEAGAAAKAAAFCgAACaApABUAAAABAAAAAVAYIAAAAAAAUkVUUiBzZWNyZXRzLnR4dA0KB/FTZXbUAwB4AAAAeAAAAAICAgICAgQEBAQEBAgARQAAagABAABABgAACgAABQoAAAmkEABQAAAAAQAAAAFQGCAAAAAAAEdFVCAvYWRtaW4gSFRUUC8xLjENCkF1dGhvcml6YXRpb246IEJhc2ljIFlXUnRhVzQ2YUhWdWRHVnlNZz09DQoNCgfxU2X27gkAbQAAAG0AAAACAgICAgIEBAQEBAQIAEUAAF8AAQAAQBEAAAoAAAUKAAABzwgANQBLAAASNAEAAAEAAAAAAAAoYTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNQRldmlsA2NvbQAAAQABCPFTZTbHAABtAAAAbQAAAAICAgICAgQEBAQEBAgARQAAXwABAABAEQAACgAABQoAAAHPCQA1AEsAABI0AQAAAQAAAAAAAChhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1BGV2aWwDY29tAAABAAEI8VNlt+EGAG0AAABtAAAAAgICAgICBAQEBAQECABFAABfAAEAAEARAAAKAAAFCgAAAc8KADUASwAAEjQBAAABAAAAAAAAKGExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTUEZXZpbANjb20AAAEAAQjxU2U3/AwAbQAAAG0AAAACAgICAgIEBAQEBAQIAEUAAF8AAQAAQBEAAAoAAAUKAAABzwsANQBLAAASNAEAAAEAAAAAAAAoYTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNQRldmlsA2NvbQAAAQABCfFTZXfUAwBtAAAAbQAAAAICAgICAgQEBAQEBAgARQAAXwABAABAEQAACgAABQoAAAHPDAA1AEsAABI0AQAAAQAAAAAAAChhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1BGV2aWwDY29tAAABAAEJ8VNl9+4JAG0AAABtAAAAAgICAgICBAQEBAQECABFAABfAAEAAEARAAAKAAAFCgAAAc8NADUASwAAEjQBAAABAAAAAAAAKGExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTUEZXZpbANjb20AAAEAAQrxU2U3xwAAbQAAAG0AAAACAgICAgIEBAQEBAQIAEUAAF8AAQAAQBEAAAoAAAUKAAABzw4ANQBLAAASNAEAAAEAAAAAAAAoYTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNQRldmlsA2NvbQAAAQABCvFTZbfhBgBtAAAAbQAAAAICAgICAgQEBAQEBAgARQAAXwABAABAEQAACgAABQoAAAHPDwA1AEsAABI0AQAAAQAAAAAAAChhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1BGV2aWwDY29tAAABAAEK8VNlN/wMAG0AAABtAAAAAgICAgICBAQEBAQECABFAABfAAEAAEARAAAKAAAFCgAAAc8QADUASwAAEjQBAAABAAAAAAAAKGExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTUEZXZpbANjb20AAAEAAQvxU2V31AMAbQAAAG0AAAACAgICAgIEBAQEBAQIAEUAAF8AAQAAQBEAAAoAAAUKAAABzxEANQBLAAASNAEAAAEAAAAAAAAoYTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNQRldmlsA2NvbQAAAQABC/FTZffuCQBtAAAAbQAAAAICAgICAgQEBAQEBAgARQAAXwABAABAEQAACgAABQoAAAHPEgA1AEsAABI0AQAAAQAAAAAAAChhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTVhMWIyYzNkNGU1BGV2aWwDY29tAAABAAEM8VNlN8cAAG0AAABtAAAAAgICAgICBAQEBAQECABFAABfAAEAAEARAAAKAAAFCgAAAc8TADUASwAAEjQBAAABAAAAAAAAKGExYjJjM2Q0ZTVhMWIyYzNkNGU1YTFiMmMzZDRlNWExYjJjM2Q0ZTUEZXZpbANjb20AAAEAAQ7xU2U3xwAANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAABjp/gRXAAAAAEAAAABUAIgAAAAAAAQ8VNlN8cAADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAAY6f5EVwAAAABAAAAAVACIAAAAAAAEvFTZTfHAAA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAGOn+hFcAAAAAQAAAAFQAiAAAAAAABTxU2U3xwAANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAABjp/sRXAAAAAEAAAABUAIgAAAAAAAW8VNlN8cAADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAAY6f8EVwAAAABAAAAAVACIAAAAAAAGPFTZTfHAAA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAGOn/RFcAAAAAQAAAAFQAiAAAAAAABrxU2U3xwAANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAABjp/4RXAAAAAEAAAABUAIgAAAAAAAc8VNlN8cAADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAAY6f/EVwAAAABAAAAAVACIAAAAAAAHvFTZTfHAAA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAGOoABFcAAAAAQAAAAFQAiAAAAAAAA==';
// PacketStory UI. The parser and detectors live in core.js (a Web Worker).
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hb = n => n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : n < 1073741824 ? (n / 1048576).toFixed(1) + ' MB' : (n / 1073741824).toFixed(2) + ' GB';
const fm = t => { const m = Math.floor(t / 60); return (m >= 60 ? Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + (t % 60).toFixed(3).padStart(6, '0'); };
const dur = s => s < 1 ? (s * 1000).toFixed(0) + ' ms' : s < 120 ? s.toFixed(1) + ' s' : s < 7200 ? (s / 60).toFixed(1) + ' min' : (s / 3600).toFixed(1) + ' h';
const SVC = { 20: 'FTP-data', 21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS', 67: 'DHCP', 80: 'HTTP', 110: 'POP3', 111: 'RPC', 123: 'NTP', 137: 'NetBIOS', 139: 'SMB', 143: 'IMAP', 161: 'SNMP', 389: 'LDAP', 443: 'HTTPS', 445: 'SMB', 993: 'IMAPS', 995: 'POP3S', 1433: 'MSSQL', 2049: 'NFS', 3306: 'MySQL', 3389: 'RDP', 4444: 'metasploit?', 5353: 'mDNS', 5432: 'Postgres', 5900: 'VNC', 6379: 'Redis', 8080: 'HTTP-alt', 8443: 'HTTPS-alt' };
const MAX = 200 * 1048576, ROWS = 1000;
const LINK = { 0: 'loopback', 1: 'Ethernet', 12: 'raw IP', 101: 'raw IP', 108: 'loopback', 113: 'Linux cooked', 228: 'raw IPv4', 229: 'raw IPv6', 276: 'Linux cooked v2' };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ico = n => window.OV ? OV.svg(n) : '';

const status = (msg, err) => { const s = $('#status'); s.className = err ? 'err' : 'busy'; s.innerHTML = msg; };
let A = null, FILE = '', worker = null;

function analyze(name, buf) {
  if (worker) worker.terminate();
  showLanding();
  status('<div class="st-row"><span class="spin"></span><span>Reading <b>' + esc(name) + '</b> (' + hb(buf.byteLength) + ')</span><span class="pc" id="pc">0%</span></div><div class="prog"><i id="pg"></i></div>');
  const t0 = performance.now();
  worker = new Worker('/core.js');
  worker.onmessage = e => {
    if (e.data.progress !== undefined) { const p = $('#pg'), c = $('#pc'), v = (e.data.progress * 100).toFixed(0) + '%'; if (p) p.style.width = v; if (c) c.textContent = v; return; }
    worker.terminate(); worker = null;
    if (e.data.err) { status('Could not read this file: ' + esc(e.data.err), true); return; }
    A = e.data.ok; FILE = name; A.took = (performance.now() - t0) / 1000;
    $('#status').textContent = ''; $('#status').className = '';
    render();
  };
  worker.onerror = () => { worker.terminate(); worker = null; status('Analysis failed. The file may be corrupt, or too large for this device.', true); };
  worker.postMessage(buf, [buf]);
}

function openFile(f) {
  if (!f) return;
  if (f.size > MAX) { status('That file is ' + hb(f.size) + '. The limit is ' + hb(MAX) + '. Tip: trim it with <code>editcap -r in.pcapng out.pcapng 1-200000</code>', true); return; }
  f.arrayBuffer().then(b => analyze(f.name, b), () => status('Could not read that file.', true));
}

function showLanding() { $('#landing').hidden = false; $('#dash').hidden = true; document.body.classList.remove('has-dash'); }

// ---------------------------------------------------------------------
// building blocks
// ---------------------------------------------------------------------
function barList(entries, max, label, fmt = v => v.toLocaleString()) {
  return '<div class="hb">' + entries.map(([k, v, filt]) =>
    `<button type="button" class="hb-row" data-f="${esc(filt)}" title="Filter packets: ${esc(filt)}"><span class="hb-k">${esc(label(k))}</span><span class="hb-n">${fmt(v)}</span><span class="track"><i data-w="${Math.max(1.5, v / max * 100).toFixed(1)}"></i></span></button>`).join('') + '</div>';
}

function timeline() {
  const W = 1200, H = 150, b = A.buckets, mx = Math.max(...b, 1), n = b.length, step = W / Math.max(1, n - 1);
  const pts = b.map((v, i) => [i * step, H - 8 - (v / mx) * (H - 28)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  let s = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Packets over time, with findings marked">`;
  s += '<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".45"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></linearGradient></defs>';
  for (let i = 1; i < 4; i++) s += `<line x1="0" x2="${W}" y1="${(H / 4 * i).toFixed(0)}" y2="${(H / 4 * i).toFixed(0)}" stroke="rgba(255,255,255,.06)"/>`;
  s += `<path d="${line} L${W} ${H} L0 ${H} Z" fill="url(#tg)"/><path class="tl-line" d="${line}" fill="none" stroke="#22d3ee" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
  for (const e of A.ev) if (e.sev !== 'info') {
    const x = A.dur ? e.t / A.dur * W : 2, c = e.sev === 'alert' ? '#ff4d6d' : '#fbbf24';
    s += `<g class="tl-mark"><line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="0" y2="${H}" stroke="${c}" stroke-width="1.5" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/><title>${esc('+' + fm(e.t) + '  ' + e.txt)}</title></g>`;
  }
  return s + '</svg><div class="tl-axis"><span>+00:00</span><span>' + esc(new Date(A.start * 1000).toISOString().replace('T', ' ').slice(0, 19)) + ' UTC</span><span>+' + fm(A.dur) + '</span></div>';
}

const ipsIn = txt => [...new Set(txt.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [])].slice(0, 2);

function storyHtml(withLinks) {
  if (!A.ev.length) return '<div class="clean">' + ico('shield') + '<div><b>Nothing suspicious found.</b><p>That doesn\'t prove the traffic is clean: these are heuristics, and encrypted traffic is opaque to them.</p></div></div>';
  return '<ol class="story">' + A.ev.map(e => {
    const ips = ipsIn(e.txt), f = ips.map(i => 'ip:' + i).join(' ');
    return `<li class="${e.sev}"><span class="st-dot"></span><div class="st-card"><div class="st-top"><span class="sev s-${e.sev}">${e.sev}</span><span class="st-t">+${fm(e.t)}</span>${e.id ? `<a class="tid" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.id)} &middot; ${esc(e.name)}</a>` : ''}</div><p>${esc(e.txt)}</p>${withLinks && f ? `<button type="button" class="st-btn" data-f="${esc(f)}">Show packets &rarr;</button>` : ''}</div></li>`;
  }).join('') + '</ol>';
}

function artifacts() {
  let h = '';
  if (A.creds.length) h += '<div class="panel"><div class="p-h"><h3>Credentials seen</h3><span class="dim">secrets are never shown, only their length</span></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Time</th><th>Protocol</th><th>User</th><th>Secret</th><th>From</th><th>To</th></tr></thead><tbody>' +
    A.creds.map(c => `<tr><td class="m dim">+${fm(c.t)}</td><td><span class="proto">${esc(c.proto)}</span></td><td class="m warnc">${esc(c.user)}</td><td class="m dim">${c.len !== undefined ? '&bull;'.repeat(Math.min(c.len, 16)) + ' (' + c.len + ')' : 'n/a'}</td><td class="m">${esc(c.src)}</td><td class="m">${esc(c.dst)}</td></tr>`).join('') + '</tbody></table></div></div>';
  if (A.files.length) h += '<div class="panel"><div class="p-h"><h3>Files transferred</h3></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Time</th><th>Protocol</th><th>Direction</th><th>File</th><th>Client</th><th>Server</th></tr></thead><tbody>' +
    A.files.map(f => `<tr><td class="m dim">+${fm(f.t)}</td><td><span class="proto">${esc(f.proto)}</span></td><td>${esc(f.dir)}</td><td class="m warnc">${esc(f.name)}</td><td class="m">${esc(f.src)}</td><td class="m">${esc(f.dst)}</td></tr>`).join('') + '</tbody></table></div></div>';
  const cols = [];
  if (A.http.length) cols.push('<div class="panel"><div class="p-h"><h3>HTTP requests</h3><span class="cnt">' + A.http.length + '</span></div><div class="tbl-wrap sh"><table class="tbl"><thead><tr><th>Client</th><th>Request</th><th>User-Agent</th></tr></thead><tbody>' +
    A.http.slice(0, 50).map(r => `<tr><td class="m dim">${esc(r.src)}</td><td class="m">${esc(r.method + ' ' + r.host + r.path)}</td><td class="dim">${esc(r.ua.slice(0, 40))}</td></tr>`).join('') + '</tbody></table></div></div>');
  if (A.dns.length) cols.push('<div class="panel"><div class="p-h"><h3>DNS names</h3><span class="cnt">' + A.dns.length + (A.dns.length === 60 ? '+' : '') + '</span></div><div class="tbl-wrap sh"><table class="tbl"><thead><tr><th>Name</th><th>Types</th><th class="num">Queries</th></tr></thead><tbody>' +
    A.dns.slice(0, 30).map(d => `<tr><td class="m">${esc(d.name)}</td><td class="dim">${esc(d.types.join(' '))}</td><td class="num">${d.n}</td></tr>`).join('') + '</tbody></table></div></div>');
  if (cols.length) h += '<div class="two">' + cols.join('') + '</div>';
  return h;
}

// network map: hosts on a ring, edges weighted by bytes, alerting hosts in red
function netmap() {
  const deg = {}, bad = new Set(), warn = new Set();
  for (const c of A.conv) { deg[c.a] = (deg[c.a] || 0) + c.b2; deg[c.b] = (deg[c.b] || 0) + c.b2; }
  for (const e of A.ev) for (const ip of ipsIn(e.txt)) (e.sev === 'alert' ? bad : e.sev === 'warn' ? warn : new Set()).add(ip);
  const hosts = Object.keys(deg).sort((x, y) => deg[y] - deg[x]).slice(0, 16);
  if (hosts.length < 2) return '<p class="dim">Not enough IP conversations to draw a map.</p>';
  const W = 760, H = 460, cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 70, pos = {};
  hosts.forEach((h, i) => { const a = -Math.PI / 2 + i / hosts.length * Math.PI * 2; pos[h] = [cx + Math.cos(a) * R * (hosts.length > 2 ? 1 : .6), cy + Math.sin(a) * R * .82]; });
  const maxB = Math.max(...A.conv.map(c => c.b2), 1);
  let s = `<svg class="nm" viewBox="0 0 ${W} ${H}" role="img" aria-label="Network map of the busiest hosts">`;
  s += '<defs><radialGradient id="ng"><stop offset="0" stop-color="#22d3ee" stop-opacity=".35"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient><radialGradient id="nr"><stop offset="0" stop-color="#ff4d6d" stop-opacity=".45"/><stop offset="1" stop-color="#ff4d6d" stop-opacity="0"/></radialGradient></defs>';
  for (const c of A.conv) {
    if (!pos[c.a] || !pos[c.b]) continue;
    const [x1, y1] = pos[c.a], [x2, y2] = pos[c.b], w = 1 + Math.sqrt(c.b2 / maxB) * 5, hot = bad.has(c.a) && bad.has(c.b);
    const mx = (x1 + x2) / 2 + (cy - (y1 + y2) / 2) * .18, my = (y1 + y2) / 2 + ((x1 + x2) / 2 - cx) * .18 * -1;
    s += `<path class="nm-e${hot ? ' hot' : ''}" d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="${w.toFixed(1)}" data-f="ip:${esc(c.a)} ip:${esc(c.b)}"><title>${esc(c.a + ' ↔ ' + c.b + '  ' + hb(c.b2) + ', ' + c.p + ' packets')}</title></path>`;
  }
  for (const h of hosts) {
    const [x, y] = pos[h], r = 7 + Math.sqrt(deg[h] / deg[hosts[0]]) * 11, cls = bad.has(h) ? 'bad' : warn.has(h) ? 'warn' : '';
    const lx = x + (x < cx - 5 ? -1 : x > cx + 5 ? 1 : 0) * (r + 10), anchor = x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle', ly = y + (Math.abs(x - cx) <= 5 ? (y < cy ? -r - 10 : r + 18) : 4);
    s += `<g class="nm-n ${cls}" data-f="ip:${esc(h)}" tabindex="0" role="button" aria-label="Filter packets for ${esc(h)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 2.4).toFixed(1)}" fill="url(#${cls === 'bad' ? 'nr' : 'ng'})"/><circle class="core" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/><text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}">${esc(h)}</text><title>${esc(h + ': ' + hb(deg[h]))}</title></g>`;
  }
  return s + '</svg><div class="nm-legend"><span><i class="lg-n"></i>host</span><span><i class="lg-b"></i>involved in an alert</span><span><i class="lg-w"></i>involved in a warning</span><span class="dim">Line width = bytes. Click a host or link to filter packets.</span></div>';
}

// ---------------------------------------------------------------------
// render the dashboard
// ---------------------------------------------------------------------
function render() {
  const sum = o => Object.entries(o).sort((x, y) => y[1] - x[1]);
  const pr = sum(A.proto).slice(0, 10), tk = Object.entries(A.talk).sort((x, y) => y[1].b - x[1].b).slice(0, 8), pt = sum(A.ports).slice(0, 10);
  const links = A.links.map(l => LINK[l] || 'link ' + l).join(', ');
  $('#db-name').textContent = FILE;
  $('#db-meta').textContent = A.format + ' · ' + links + ' · analyzed in ' + A.took.toFixed(2) + ' s, locally';
  const verdict = A.sev.alert ? ['bad', 'Suspicious activity found', A.sev.alert + ' alert' + (A.sev.alert > 1 ? 's' : '') + ' and ' + A.sev.warn + ' warning' + (A.sev.warn !== 1 ? 's' : '') + ' across ' + A.hosts + ' hosts.'] : A.sev.warn ? ['warn', 'Some things worth a look', A.sev.warn + ' warning' + (A.sev.warn > 1 ? 's' : '') + ', no alerts.'] : ['ok', 'Nothing suspicious found', 'No detector fired. Heuristics can miss things, especially in encrypted traffic.'];
  const art = artifacts();
  let h = '';
  h += `<section class="dsec" id="s-overview"><div class="verdict v-${verdict[0]} reveal-now"><span class="v-ic">${ico(verdict[0] === 'ok' ? 'shield' : 'bolt')}</span><div><b>${verdict[1]}</b><p>${esc(verdict[2])}</p></div></div>`;
  h += `<div class="tiles"><div class="tile"><span>Packets</span><b>${A.n.toLocaleString()}</b></div><div class="tile"><span>Duration</span><b>${dur(A.dur)}</b></div><div class="tile"><span>Traffic</span><b>${hb(A.bytes)}</b></div><div class="tile"><span>Hosts</span><b>${A.hosts}</b></div><div class="tile t-alert${A.sev.alert ? ' on' : ''}"><span>Alerts</span><b>${A.sev.alert}</b></div><div class="tile t-warn${A.sev.warn ? ' on' : ''}"><span>Warnings</span><b>${A.sev.warn}</b></div></div>`;
  h += '<div class="panel"><div class="p-h"><h3>Timeline</h3><span class="dim">packets over time &middot; dashed lines are findings</span></div>' + timeline() + '</div></section>';
  h += '<section class="dsec" id="s-story"><div class="sec-h"><h2>The story</h2><span class="cnt">' + A.ev.length + ' events</span></div>' + storyHtml(true) + '</section>';
  if (art) h += '<section class="dsec" id="s-artifacts"><div class="sec-h"><h2>Artifacts</h2></div>' + art + '</section>';
  h += '<section class="dsec" id="s-network"><div class="sec-h"><h2>Network</h2></div><div class="panel nm-wrap">' + netmap() + '</div><div class="three">';
  h += '<div class="panel"><div class="p-h"><h3>Protocols</h3></div>' + barList(pr.map(([k, v]) => [k, v, k.toLowerCase()]), pr[0][1], k => k) + '</div>';
  h += '<div class="panel"><div class="p-h"><h3>Top talkers</h3><span class="dim">bytes sent</span></div>' + barList(tk.map(([k, v]) => [k, v.b, 'ip:' + k]), tk[0] ? tk[0][1].b : 1, k => k, hb) + '</div>';
  if (pt.length) h += '<div class="panel"><div class="p-h"><h3>Destination ports</h3></div>' + barList(pt.map(([k, v]) => [k, v, 'port:' + k]), pt[0][1], k => k + (SVC[k] ? ' · ' + SVC[k] : '')) + '</div>';
  h += '</div><div class="panel"><div class="p-h"><h3>Conversations</h3></div><div class="tbl-wrap sh"><table class="tbl"><thead><tr><th>Between</th><th>Protocols</th><th class="num">Packets</th><th class="num">Bytes</th></tr></thead><tbody>' +
    A.conv.map(c => `<tr><td><button class="lnk m" type="button" data-f="ip:${esc(c.a)} ip:${esc(c.b)}">${esc(c.a)} &harr; ${esc(c.b)}</button></td><td class="dim">${esc(Object.keys(c.apps).slice(0, 4).join(' '))}</td><td class="num">${c.p.toLocaleString()}</td><td class="num">${hb(c.b2)}</td></tr>`).join('') + '</tbody></table></div></div></section>';
  h += '<section class="dsec" id="s-packets"><div class="sec-h"><h2>Packets</h2><span class="cnt" id="cnt"></span></div><div class="filter">' + ico('search') + '<input id="q" type="search" placeholder="ftp   ip:10.0.0.5   port:21   !arp   login" aria-label="Filter packets" autocomplete="off" spellcheck="false"><span class="kbd">/</span></div>' +
    '<p class="hint">Terms are combined with AND. Use <code>ip:</code>, <code>port:</code>, a protocol name, <code>!</code> to exclude, or any text from the info column.</p>' +
    '<div class="tbl-wrap pkts"><table class="tbl"><thead><tr><th class="num">#</th><th>Time</th><th>Source</th><th>Destination</th><th>Proto</th><th class="num">Len</th><th>Info</th></tr></thead><tbody id="rows"></tbody></table></div></section>';
  $('#out').innerHTML = h;
  $('#tab-art').hidden = !art;
  // the CSP blocks style attributes, so widths go through the CSSOM
  $('#out').querySelectorAll('.track i[data-w]').forEach((i, k) => { i.style.width = reduce ? i.dataset.w + '%' : '0'; if (!reduce) setTimeout(() => { i.style.width = i.dataset.w + '%'; }, 80 + k * 18); });
  $('#q').addEventListener('input', () => filterRows($('#q').value));
  filterRows('');
  $('#landing').hidden = true; $('#dash').hidden = false; document.body.classList.add('has-dash');
  scrollTo({ top: 0 });
  spy();
}

function matcher(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean).map(t => {
    const neg = t.startsWith('!'); if (neg) t = t.slice(1);
    let fn;
    if (t.startsWith('ip:')) { const v = t.slice(3); fn = r => r.src === v || r.dst === v; }
    else if (t.startsWith('port:')) { const v = +t.slice(5); fn = r => r.sp === v || r.dp === v; }
    else if (t.startsWith('proto:')) { const v = t.slice(6); fn = r => r.proto.toLowerCase() === v || r.l4.toLowerCase() === v; }
    else fn = r => r.proto.toLowerCase() === t || r.l4.toLowerCase() === t || r.info.toLowerCase().includes(t) || r.src.includes(t) || r.dst.includes(t);
    return neg ? r => !fn(r) : fn;
  });
  return r => terms.every(f => f(r));
}

function filterRows(q) {
  const m = matcher(q), out = []; let total = 0;
  for (let i = 0; i < A.rows.length; i++) {
    const r = A.rows[i]; if (!m(r)) continue; total++;
    if (out.length < ROWS) out.push(`<tr class="pk-${esc(r.proto)}"><td class="num dim">${i + 1}</td><td class="m dim">${fm(r.t)}</td><td class="m">${esc(r.src)}</td><td class="m">${esc(r.dst)}</td><td><span class="proto">${esc(r.proto)}</span></td><td class="num">${r.len}</td><td class="info" title="${esc(r.info)}">${esc(r.info)}</td></tr>`);
  }
  $('#rows').innerHTML = out.join('') || '<tr><td colspan="7" class="dim">No packets match.</td></tr>';
  $('#cnt').textContent = total === A.rows.length ? total.toLocaleString() + ' packets' : total.toLocaleString() + ' of ' + A.rows.length.toLocaleString() + (total > ROWS ? ' (first ' + ROWS + ' shown)' : '');
}

function applyFilter(f) {
  const q = $('#q'); if (!q) return;
  q.value = f; filterRows(f);
  $('#s-packets').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

// highlight the current section in the tab bar
let spyIO;
function spy() {
  if (spyIO) spyIO.disconnect();
  const tabs = [...document.querySelectorAll('.db-tabs a')];
  spyIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) tabs.forEach(t => t.classList.toggle('on', t.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('.dsec').forEach(s => spyIO.observe(s));
}

// ---------------------------------------------------------------------
// standalone report (inline styles are fine here: it's a downloaded file)
// ---------------------------------------------------------------------
const REPORT_CSS = 'body{background:#06070b;color:#e6e9f0;font:15px/1.6 Inter,system-ui,sans-serif;padding:40px 24px;max-width:960px;margin:auto}h1{font-size:30px;margin:0 0 6px;letter-spacing:-.02em}h2{font-size:20px;margin:40px 0 16px}h3{font-size:16px;margin:0}a{color:#22d3ee}.muted,.dim{color:#8a91a3}.tiles{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}.tile{border:1px solid #23262f;border-radius:12px;padding:12px 16px;min-width:110px}.tile b{display:block;font-size:24px}.tile span{color:#8a91a3;font-size:12px}.story{list-style:none;padding:0;margin:0;border-left:2px solid #23262f}.story li{padding:0 0 16px 20px;position:relative}.st-top{display:flex;gap:10px;align-items:center;font-size:12px;flex-wrap:wrap}.st-card p{margin:6px 0 0}.sev{font:600 10px/1 monospace;text-transform:uppercase;padding:4px 7px;border-radius:5px}.s-alert{color:#ff4d6d;background:#ff4d6d22}.s-warn{color:#fbbf24;background:#fbbf2422}.s-info{color:#8a91a3;background:#ffffff11}.st-t{color:#8a91a3;font-family:monospace}.tid{font-family:monospace;font-size:12px}.st-dot,.st-btn,.v-ic,svg{display:none}table{border-collapse:collapse;width:100%;font-size:13px}th,td{text-align:left;padding:7px 10px;border-bottom:1px solid #23262f}th{color:#8a91a3;font-weight:500}.m{font-family:monospace}.warnc{color:#fbbf24}.panel{margin-top:20px}.p-h{display:flex;gap:12px;align-items:baseline;margin-bottom:10px}.cnt{color:#8a91a3}.clean b{color:#34d399}footer{margin-top:48px;color:#8a91a3;font-size:12px}';
function saveReport() {
  const meta = `<p class="muted">${esc(FILE)} &middot; ${esc(A.format)} &middot; ${A.n.toLocaleString()} packets &middot; ${dur(A.dur)} &middot; ${hb(A.bytes)} &middot; start ${esc(new Date(A.start * 1000).toISOString())}</p>`;
  const tiles = `<div class="tiles"><div class="tile"><b>${A.sev.alert}</b><span>alerts</span></div><div class="tile"><b>${A.sev.warn}</b><span>warnings</span></div><div class="tile"><b>${A.hosts}</b><span>hosts</span></div><div class="tile"><b>${A.n.toLocaleString()}</b><span>packets</span></div></div>`;
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PacketStory report: ${esc(FILE)}</title><style>${REPORT_CSS}</style><h1>PacketStory report</h1>${meta}${tiles}<h2>The story</h2>${storyHtml(false)}${artifacts()}<footer>Generated ${esc(new Date().toISOString())} by PacketStory (https://pcap.0vuln.com). Findings are heuristics and say "suspected" for a reason.</footer></html>`;
  const u = URL.createObjectURL(new Blob([html], { type: 'text/html' })), a = document.createElement('a');
  a.href = u; a.download = FILE.replace(/\.[^.]+$/, '') + '-packetstory.html'; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 2000);
  window.OV && OV.toast('Report saved');
}

// ---------------------------------------------------------------------
// wiring
// ---------------------------------------------------------------------
const drop = $('#drop'), file = $('#file');
const loadDemo = () => analyze('demo.pcap', Uint8Array.from(atob(DEMO), c => c.charCodeAt(0)).buffer);
drop.addEventListener('click', () => file.click());
drop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } });
file.addEventListener('change', () => openFile(file.files[0]));
let dragDepth = 0;
addEventListener('dragenter', e => { if ([...e.dataTransfer.types].includes('Files')) { dragDepth++; document.body.classList.add('dragging'); } });
addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; document.body.classList.remove('dragging'); } });
addEventListener('dragover', e => e.preventDefault());
addEventListener('drop', e => { e.preventDefault(); dragDepth = 0; document.body.classList.remove('dragging'); openFile(e.dataTransfer.files[0]); });
$('#demo').addEventListener('click', loadDemo);
$('#save').addEventListener('click', saveReport);
$('#again').addEventListener('click', () => { file.value = ''; file.click(); });
$('#out').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) applyFilter(b.dataset.f); });
$('#out').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('g[data-f]')) { e.preventDefault(); applyFilter(e.target.dataset.f); } });
addEventListener('keydown', e => { if (e.key === '/' && $('#q') && !$('#dash').hidden && document.activeElement !== $('#q') && !e.ctrlKey && !e.metaKey) { e.preventDefault(); $('#q').focus(); $('#s-packets').scrollIntoView({ block: 'start' }); } });
addEventListener('hashchange', () => { if (location.hash === '#demo') loadDemo(); });

if (window.OV) OV.register('PacketStory', [
  { t: 'Open a capture file', s: '.pcap or .pcapng, parsed locally', i: 'file', c: '#22d3ee', run: () => file.click() },
  { t: 'Load the demo capture', i: 'play', c: '#22d3ee', run: loadDemo },
  { t: 'Save report', s: 'Download a standalone HTML report', i: 'file', c: '#22d3ee', run: () => A ? saveReport() : OV.toast('Analyze a capture first') },
]);

// ---- hand-off from 0vuln Range: range opens pcap.0vuln.com/#from-range and posts the capture ----
(function () {
  if (location.hash !== '#from-range' || !window.opener) return;
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const allowed = local ? ['http://localhost:8003', 'http://127.0.0.1:8003'] : ['https://range.0vuln.com'];
  status('<div class="st-row"><span class="spin"></span><span>Waiting for your session from the Range ...</span></div>');
  addEventListener('message', e => {
    if (!allowed.includes(e.origin) || !e.data || e.data.type !== 'pcap' || !(e.data.buf instanceof ArrayBuffer)) return;
    history.replaceState(null, '', location.pathname);
    analyze(String(e.data.name || 'range-session.pcap').slice(0, 80), e.data.buf);
  });
  for (const o of allowed) { try { window.opener.postMessage({ type: 'packetstory-ready' }, o); } catch (x) { /* opener gone */ } }
})();

if (location.hash === '#demo') loadDemo();
