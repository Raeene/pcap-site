const DEMO = '1MOyoQIABAAAAAAAAAAAAP//AAABAAAAAPFTZQAAAAAqAAAAKgAAAP///////6q7zN3uAQgGAAEIAAYEAAKqu8zd7gEKAAABAAAAAAAACgAABQDxU2UgoQcAKgAAACoAAAD///////+qu8zd7gIIBgABCAAGBAACqrvM3e4CCgAAAQAAAAAAAAoAAAUA8VNlb2QIADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxBAAEAAAABAAAAAVACIAAAAAAAAPFTZb8nCQA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcQgACAAAAAQAAAAFQAiAAAAAAAADxU2UP6wkANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEMAAwAAAAEAAAABUAIgAAAAAAAA8VNlX64KADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxEAAQAAAABAAAAAVACIAAAAAAAAPFTZa9xCwA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcRQAFAAAAAQAAAAFQAiAAAAAAAADxU2X/NAwANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEYABgAAAAEAAAABUAIgAAAAAAAA8VNlT/gMADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxHAAcAAAABAAAAAVACIAAAAAAAAPFTZZ+7DQA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcSAAIAAAAAQAAAAFQAiAAAAAAAADxU2Xvfg4ANgAAADYAAAACAgICAgIEBAQEBAQIAEUAACgAAQAAQAYAAAoAAAUKAAAJnEkACQAAAAEAAAABUAIgAAAAAAAA8VNlP0IPADYAAAA2AAAAAgICAgICBAQEBAQECABFAAAoAAEAAEAGAAAKAAAFCgAACZxKAAoAAAABAAAAAVACIAAAAAAAAfFTZU/DAAA2AAAANgAAAAICAgICAgQEBAQEBAgARQAAKAABAABABgAACgAABQoAAAmcSwALAAAAAQAA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';
'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hb = n => n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : n < 1073741824 ? (n / 1048576).toFixed(1) + ' MB' : (n / 1073741824).toFixed(2) + ' GB';
const fm = t => { const m = Math.floor(t / 60); return (m >= 60 ? Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + (t % 60).toFixed(3).padStart(6, '0'); };
const dur = s => s < 1 ? (s * 1000).toFixed(0) + ' ms' : s < 120 ? s.toFixed(1) + ' s' : s < 7200 ? (s / 60).toFixed(1) + ' min' : (s / 3600).toFixed(1) + ' h';
const SVC = { 20: 'FTP-data', 21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS', 67: 'DHCP', 80: 'HTTP', 110: 'POP3', 111: 'RPC', 123: 'NTP', 137: 'NetBIOS', 139: 'SMB', 143: 'IMAP', 161: 'SNMP', 389: 'LDAP', 443: 'HTTPS', 445: 'SMB', 993: 'IMAPS', 995: 'POP3S', 1433: 'MSSQL', 2049: 'NFS', 3306: 'MySQL', 3389: 'RDP', 4444: 'metasploit?', 5353: 'mDNS', 5432: 'Postgres', 5900: 'VNC', 6379: 'Redis', 8080: 'HTTP-alt', 8443: 'HTTPS-alt' };
const MAX = 200 * 1048576, ROWS = 1000;
const LINK = { 0: 'loopback', 1: 'Ethernet', 12: 'raw IP', 101: 'raw IP', 108: 'loopback', 113: 'Linux cooked', 228: 'raw IPv4', 229: 'raw IPv6', 276: 'Linux cooked v2' };

const status = (msg, err) => { const s = $('#status'); s.className = err ? 'err' : ''; s.innerHTML = msg; };
let A = null, FILE = '', worker = null;

function analyze(name, buf) {
  if (worker) worker.terminate();
  status('<span>reading ' + esc(name) + ' (' + hb(buf.byteLength) + ') ...</span><div class="prog"><i id="pg"></i></div>');
  $('#out').innerHTML = '';
  const t0 = performance.now();
  worker = new Worker('/core.js');
  worker.onmessage = e => {
    if (e.data.progress !== undefined) { const p = $('#pg'); if (p) p.style.width = (e.data.progress * 100).toFixed(0) + '%'; return; }
    worker.terminate(); worker = null;
    if (e.data.err) { status('Could not read this file: ' + esc(e.data.err), true); return; }
    A = e.data.ok; FILE = name;
    status('analyzed ' + A.n.toLocaleString() + ' packets in ' + ((performance.now() - t0) / 1000).toFixed(2) + ' s, entirely in your browser.');
    render();
    $('#how').hidden = true;
    $('#out').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  worker.onerror = () => { worker.terminate(); worker = null; status('Analysis failed (the file may be corrupt or too large for this device).', true); };
  worker.postMessage(buf, [buf]);
}

function openFile(f) {
  if (!f) return;
  if (f.size > MAX) { status('That file is ' + hb(f.size) + '. The limit is ' + hb(MAX) + '. Tip: cut it down with <code>editcap -r in.pcapng out.pcapng 1-200000</code>', true); return; }
  f.arrayBuffer().then(b => analyze(f.name, b), () => status('Could not read that file.', true));
}

function barList(entries, max, label, cls) {
  return '<div class="hb">' + entries.map(([k, v, filt]) =>
    `<button type="button" data-f="${esc(filt)}" title="filter packets: ${esc(filt)}">${esc(label(k))}</button><span class="track"><i data-w="${Math.max(2, v / max * 100).toFixed(1)}"></i></span><span class="n">${v.toLocaleString()}</span>`).join('') + '</div>';
}

function timeline() {
  const W = 1200, H = 110, b = A.buckets, mx = Math.max(...b, 1), bw = W / b.length;
  let s = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Packets over time, with findings marked">`;
  s += '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4df3ff"/><stop offset="1" stop-color="#4df3ff" stop-opacity=".15"/></linearGradient></defs>';
  b.forEach((v, i) => { if (v) { const h = Math.max(2, v / mx * (H - 16)); s += `<rect x="${(i * bw + .5).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${(bw - 1).toFixed(1)}" height="${h.toFixed(1)}" fill="url(#g)"/>`; } });
  for (const e of A.ev) if (e.sev !== 'info') { const x = A.dur ? e.t / A.dur * W : 2; s += `<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="0" y2="${H}" stroke="${e.sev === 'alert' ? '#ff5470' : '#ffb938'}" stroke-width="2" stroke-dasharray="4 3"><title>${esc(fm(e.t) + ' ' + e.txt)}</title></line>`; }
  return s + '</svg><div class="tl-axis"><span>+00:00</span><span>' + esc(new Date(A.start * 1000).toISOString().replace('T', ' ').slice(0, 19)) + ' UTC start</span><span>+' + fm(A.dur) + '</span></div>';
}

function ipsIn(txt) { return [...new Set(txt.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [])].slice(0, 2); }

function storyHtml(withLinks) {
  if (!A.ev.length) return '<p class="clean">[ok] Nothing suspicious found. That does not prove the traffic is clean: these are heuristics, and encrypted traffic is opaque to them.</p>';
  return '<ol class="story">' + A.ev.map(e => {
    const ips = ipsIn(e.txt), f = ips.map(i => 'ip:' + i).join(' ');
    return `<li class="${e.sev}"><span class="t">+${fm(e.t)}</span><span class="x"><span class="sev">${e.sev}</span>${esc(e.txt)}</span>` +
      (e.id || (withLinks && f) ? `<span class="m">${e.id ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.id)} ${esc(e.name)}</a>` : ''}${withLinks && f ? `<button type="button" data-f="${esc(f)}">show packets</button>` : ''}</span>` : '') + '</li>';
  }).join('') + '</ol>';
}

function artifacts() {
  let h = '';
  if (A.creds.length) h += '<h2>credentials seen <small>secrets are never shown, only their length</small></h2><div class="scroll"><table class="tbl"><thead><tr><th>time</th><th>protocol</th><th>user</th><th>secret</th><th>from</th><th>to</th></tr></thead><tbody>' +
    A.creds.map(c => `<tr><td class="muted">+${fm(c.t)}</td><td>${esc(c.proto)}</td><td class="masked">${esc(c.user)}</td><td class="muted">${c.len !== undefined ? '&bull;'.repeat(Math.min(c.len, 16)) + ' (' + c.len + ')' : 'n/a'}</td><td>${esc(c.src)}</td><td>${esc(c.dst)}</td></tr>`).join('') + '</tbody></table></div>';
  if (A.files.length) h += '<h2>files transferred</h2><div class="scroll"><table class="tbl"><thead><tr><th>time</th><th>protocol</th><th>direction</th><th>file</th><th>client</th><th>server</th></tr></thead><tbody>' +
    A.files.map(f => `<tr><td class="muted">+${fm(f.t)}</td><td>${esc(f.proto)}</td><td>${f.dir}</td><td class="masked">${esc(f.name)}</td><td>${esc(f.src)}</td><td>${esc(f.dst)}</td></tr>`).join('') + '</tbody></table></div>';
  const cols = [];
  if (A.http.length) cols.push('<div><h2>http requests <small>' + A.http.length + '</small></h2><div class="scroll"><table class="tbl"><thead><tr><th>client</th><th>request</th><th>user-agent</th></tr></thead><tbody>' +
    A.http.slice(0, 50).map(r => `<tr><td class="muted">${esc(r.src)}</td><td>${esc(r.method + ' ' + r.host + r.path)}</td><td class="muted">${esc(r.ua.slice(0, 40))}</td></tr>`).join('') + '</tbody></table></div></div>');
  if (A.dns.length) cols.push('<div><h2>dns names <small>' + A.dns.length + (A.dns.length === 60 ? '+' : '') + '</small></h2><div class="scroll"><table class="tbl"><thead><tr><th>name</th><th>types</th><th class="num">queries</th></tr></thead><tbody>' +
    A.dns.slice(0, 30).map(d => `<tr><td>${esc(d.name)}</td><td class="muted">${esc(d.types.join(' '))}</td><td class="num">${d.n}</td></tr>`).join('') + '</tbody></table></div></div>');
  if (cols.length) h += '<div class="cols">' + cols.join('') + '</div>';
  return h;
}

function render() {
  const sum = (o) => Object.entries(o).sort((x, y) => y[1] - x[1]);
  const pr = sum(A.proto).slice(0, 10), tk = Object.entries(A.talk).sort((x, y) => y[1].b - x[1].b).slice(0, 8), pt = sum(A.ports).slice(0, 10);
  const links = A.links.map(l => LINK[l] || 'link ' + l).join(', ');
  let h = `<div class="bar-top"><span class="file">${esc(FILE)}<small>${esc(A.format)} &middot; ${esc(links)}</small></span><span class="sp"></span><button class="btn" type="button" id="save">save report</button><button class="btn ghost" type="button" id="again">analyze another file</button></div>`;
  h += `<div class="tiles"><div class="tile"><b>${A.n.toLocaleString()}</b><span>packets</span></div><div class="tile"><b>${dur(A.dur)}</b><span>duration</span></div><div class="tile"><b>${hb(A.bytes)}</b><span>traffic</span></div><div class="tile"><b>${A.hosts}</b><span>hosts</span></div><div class="tile ${A.sev.alert ? 'alert' : 'ok'}"><b>${A.sev.alert}</b><span>alerts</span></div><div class="tile ${A.sev.warn ? 'warn' : 'ok'}"><b>${A.sev.warn}</b><span>warnings</span></div></div>`;
  h += '<h2>timeline</h2>' + timeline();
  h += '<h2>the story <small>' + A.ev.length + ' events</small></h2>' + storyHtml(true);
  h += artifacts();
  h += '<div class="cols">';
  h += '<div><h2>protocols</h2>' + barList(pr.map(([k, v]) => [k, v, k.toLowerCase()]), pr[0][1], k => k) + '</div>';
  h += '<div><h2>top talkers <small>by bytes sent</small></h2>' + barList(tk.map(([k, v]) => [k, v.b, 'ip:' + k]), tk[0] ? tk[0][1].b : 1, k => k).replace(/<span class="n">([\d,]+)<\/span>/g, (_, n) => '<span class="n">' + hb(+n.replace(/,/g, '')) + '</span>') + '</div>';
  if (pt.length) h += '<div><h2>top destination ports <small>new connections / UDP</small></h2>' + barList(pt.map(([k, v]) => [k, v, 'port:' + k]), pt[0][1], k => k + (SVC[k] ? '  ' + SVC[k] : '')) + '</div>';
  h += '<div><h2>conversations</h2><div class="scroll"><table class="tbl"><thead><tr><th>between</th><th>protocols</th><th class="num">packets</th><th class="num">bytes</th></tr></thead><tbody>' +
    A.conv.map(c => `<tr><td><button class="lnk" type="button" data-f="ip:${esc(c.a)} ip:${esc(c.b)}">${esc(c.a)} &harr; ${esc(c.b)}</button></td><td class="muted">${esc(Object.keys(c.apps).slice(0, 4).join(' '))}</td><td class="num">${c.p.toLocaleString()}</td><td class="num">${hb(c.b2)}</td></tr>`).join('') + '</tbody></table></div></div>';
  h += '</div>';
  h += '<section class="pkts-wrap" id="packets"><h2>packets</h2><div class="filter"><input id="q" type="search" placeholder="filter: ftp   ip:10.0.0.5   port:21   !arp   login" aria-label="Filter packets" autocomplete="off" spellcheck="false"><span class="cnt" id="cnt"></span></div>' +
    '<p class="hint">Terms are combined with AND. Use <code>ip:</code>, <code>port:</code>, a protocol name, <code>!</code> to exclude, or any text from the info column. Press <code>/</code> to jump here.</p>' +
    '<div class="scroll pkts"><table class="tbl"><thead><tr><th class="num">#</th><th>time</th><th>source</th><th>destination</th><th>proto</th><th class="num">len</th><th>info</th></tr></thead><tbody id="rows"></tbody></table></div></section>';
  $('#out').innerHTML = h;
  // the CSP blocks style attributes, so bar widths are applied through CSSOM
  $('#out').querySelectorAll('.track i[data-w]').forEach(i => { i.style.width = i.dataset.w + '%'; });
  $('#save').onclick = saveReport;
  $('#again').onclick = () => { $('#file').value = ''; $('#file').click(); };
  $('#q').addEventListener('input', () => filterRows($('#q').value));
  filterRows('');
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
    if (out.length < ROWS) out.push(`<tr class="pk-${esc(r.proto)}"><td class="num">${i + 1}</td><td class="muted">${fm(r.t)}</td><td>${esc(r.src)}</td><td>${esc(r.dst)}</td><td class="p">${esc(r.proto)}</td><td class="num">${r.len}</td><td class="info" title="${esc(r.info)}">${esc(r.info)}</td></tr>`);
  }
  $('#rows').innerHTML = out.join('') || '<tr><td colspan="7" class="muted">no packets match</td></tr>';
  $('#cnt').textContent = total === A.rows.length ? total.toLocaleString() + ' packets' : total.toLocaleString() + ' of ' + A.rows.length.toLocaleString() + (total > ROWS ? ' (showing first ' + ROWS + ')' : '');
}

function applyFilter(f) {
  const q = $('#q'); if (!q) return;
  q.value = f; filterRows(f);
  $('#packets').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const REPORT_CSS = 'body{background:#031018;color:#d6f3ff;font:14px/1.55 ui-monospace,Menlo,Consolas,monospace;padding:28px;max-width:1000px;margin:auto}h1{color:#fff;letter-spacing:2px}h2{color:#4df3ff;margin-top:32px}h2 small{color:#5a7f99;font-size:12px;margin-left:8px}a{color:#4df3ff}.tiles{display:flex;flex-wrap:wrap;gap:10px}.tile{border:1px solid #12425a;padding:10px 14px}.tile b{display:block;font-size:22px}.tile span{color:#6fa6c0;font-size:12px}.story{list-style:none;padding:0;border-left:2px solid #12425a}.story li{padding:8px 0 8px 16px}.story .t{color:#6fa6c0;margin-right:12px}.story .m{display:block;font-size:12px;margin-left:110px}.sev{border:1px solid currentColor;font-size:11px;padding:0 5px;margin-right:6px}.alert .sev,.alert .x{color:#ff7a90}.warn .sev{color:#ffb938}.info .x{color:#6fa6c0}table{border-collapse:collapse;width:100%;font-size:13px}th,td{text-align:left;padding:5px 8px;border-bottom:1px solid #12425a}.muted{color:#6fa6c0}.masked{color:#ffb938}.clean{color:#6bff95}.scroll{overflow-x:auto}.cols{display:block}footer{margin-top:40px;color:#5a7f99;font-size:12px}';

function saveReport() {
  const meta = `<p class="muted">file: ${esc(FILE)} &middot; ${esc(A.format)} &middot; ${A.n.toLocaleString()} packets &middot; ${dur(A.dur)} &middot; ${hb(A.bytes)} &middot; start ${esc(new Date(A.start * 1000).toISOString())}</p>`;
  const tiles = `<div class="tiles"><div class="tile"><b>${A.sev.alert}</b><span>alerts</span></div><div class="tile"><b>${A.sev.warn}</b><span>warnings</span></div><div class="tile"><b>${A.hosts}</b><span>hosts</span></div></div>`;
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PacketStory report: ${esc(FILE)}</title><style>${REPORT_CSS}</style><h1>PACKETSTORY report</h1>${meta}${tiles}<h2>the story</h2>${storyHtml(false)}${artifacts()}<footer>Generated ${esc(new Date().toISOString())} by PacketStory (https://pcap.0vuln.com). Findings are heuristics and say "suspected" for a reason.</footer></html>`;
  const u = URL.createObjectURL(new Blob([html], { type: 'text/html' })), a = document.createElement('a');
  a.href = u; a.download = FILE.replace(/\.[^.]+$/, '') + '-packetstory.html'; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 2000);
}

// ---- wiring ----
const drop = $('#drop'), file = $('#file');
drop.addEventListener('click', () => file.click());
drop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } });
file.addEventListener('change', () => openFile(file.files[0]));
let dragDepth = 0;
addEventListener('dragenter', e => { if ([...e.dataTransfer.types].includes('Files')) { dragDepth++; document.body.classList.add('dragging'); } });
addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; document.body.classList.remove('dragging'); } });
addEventListener('dragover', e => e.preventDefault());
addEventListener('drop', e => { e.preventDefault(); dragDepth = 0; document.body.classList.remove('dragging'); openFile(e.dataTransfer.files[0]); });
$('#demo').addEventListener('click', () => analyze('demo.pcap', Uint8Array.from(atob(DEMO), c => c.charCodeAt(0)).buffer));
$('#out').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) applyFilter(b.dataset.f); });
addEventListener('keydown', e => { if (e.key === '/' && $('#q') && document.activeElement !== $('#q') && !e.ctrlKey && !e.metaKey) { e.preventDefault(); $('#q').focus(); $('#packets').scrollIntoView({ block: 'start' }); } });

// ---- hand-off from 0vuln Range: range opens pcap.0vuln.com/#from-range and posts the capture ----
(function () {
  if (location.hash !== '#from-range' || !window.opener) return;
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const allowed = local ? ['http://localhost:8003', 'http://127.0.0.1:8003'] : ['https://range.0vuln.com'];
  status('waiting for your session from the Range ...');
  addEventListener('message', e => {
    if (!allowed.includes(e.origin) || !e.data || e.data.type !== 'pcap' || !(e.data.buf instanceof ArrayBuffer)) return;
    history.replaceState(null, '', location.pathname);
    analyze(String(e.data.name || 'range-session.pcap').slice(0, 80), e.data.buf);
  });
  for (const o of allowed) { try { window.opener.postMessage({ type: 'packetstory-ready' }, o); } catch (x) { /* opener gone */ } }
})();

if (location.hash === '#demo') $('#demo').click();
