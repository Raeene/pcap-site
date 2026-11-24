/* =====================================================================
   0vuln shared runtime (identical on every *.0vuln.com site)
   - cross-site command palette (Ctrl/Cmd+K)
   - scroll reveals, card spotlight, sticky nav, count-ups, toasts
   No inline scripts or styles: everything goes through the DOM/CSSOM so
   each site can keep script-src 'self' and style-src 'self'.
   ===================================================================== */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.remove('no-js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- sites (localhost ports used for local preview) ----
  var SITES = {
    hub: { host: '0vuln.com', port: 8000, name: '0vuln', c: '#ffffff' },
    raeene: { host: 'raeene.0vuln.com', port: 8001, name: 'Raeene', c: '#34d399' },
    pcap: { host: 'pcap.0vuln.com', port: 8002, name: 'PacketStory', c: '#22d3ee' },
    range: { host: 'range.0vuln.com', port: 8003, name: 'Range', c: '#ff4d6d' }
  };
  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  function url(site, path) {
    var s = SITES[site]; path = path || '/';
    return LOCAL ? 'http://' + location.hostname + ':' + s.port + path : 'https://' + s.host + path;
  }
  // rewrite cross-site links for local preview
  if (LOCAL) doc.querySelectorAll('a[href^="https://"]').forEach(function (a) {
    for (var k in SITES) {
      var pre = 'https://' + SITES[k].host + '/';
      if (a.href.indexOf(pre) === 0) { a.href = url(k, '/' + a.href.slice(pre.length)); break; }
    }
  });

  // ---- icons ----
  var I = {
    hub: '<path d="M12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    range: '<path d="m4 17 6-6-6-6M12 19h8"/>',
    pcap: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    gh: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    in: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
    play: '<path d="M7 5v14l11-7z"/>',
    bolt: '<path d="M13 3 4 14h7l-1 7 9-11h-7z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/>'
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[name] || I.file) + '</svg>'; }

  // ---- toast ----
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = doc.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); doc.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  function copy(text, msg) {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { toast(msg || 'Copied'); }, function () { toast(text); });
    else toast(text);
  }

  // ---- command registry ----
  var EMAIL = 'raaene@protonmail.com';
  var CMDS = [
    { g: 'Sites', t: '0vuln', s: 'The hub: tools, the attack/defend loop, a shell', i: 'hub', c: '#fff', go: url('hub', '/'), k: 'home hub' },
    { g: 'Sites', t: 'Range', s: 'Hack a simulated server in your browser', i: 'range', c: '#ff4d6d', go: url('range', '/'), k: 'lab ctf hack attack terminal' },
    { g: 'Sites', t: 'PacketStory', s: 'Drop a .pcap, get the story', i: 'pcap', c: '#22d3ee', go: url('pcap', '/'), k: 'pcap wireshark analyze defend forensics' },
    { g: 'Sites', t: 'Raeene', s: 'The person behind 0vuln', i: 'user', c: '#34d399', go: url('raeene', '/'), k: 'about me portfolio' },
    { g: 'Raeene', t: 'About', i: 'user', c: '#34d399', go: url('raeene', '/about/') },
    { g: 'Raeene', t: 'Projects', i: 'grid', c: '#34d399', go: url('raeene', '/projects/') },
    { g: 'Raeene', t: 'Resume', i: 'file', c: '#34d399', go: url('raeene', '/resume/'), k: 'cv' },
    { g: 'Raeene', t: 'Download resume (PDF)', i: 'file', c: '#34d399', go: url('raeene', '/resume.pdf'), k: 'cv pdf download' },
    { g: 'Raeene', t: 'Now', s: 'What I am learning right now', i: 'clock', c: '#34d399', go: url('raeene', '/now/') },
    { g: 'Try', t: "What's new", s: 'Latest features on 0vuln', i: 'bolt', c: '#9b87ff', go: url('hub', '/changelog/'), k: 'changelog news updates' },
    { g: 'Try', t: 'Load the PacketStory demo', s: 'A capture with a scan, brute force and DNS tunneling', i: 'play', c: '#22d3ee', go: url('pcap', '/#demo') },
    { g: 'Try', t: 'Start hacking in the Range', s: 'nmap 10.0.0.9 and go', i: 'bolt', c: '#ff4d6d', go: url('range', '/') },
    { g: 'Elsewhere', t: 'GitHub', s: 'github.com/Raeene', i: 'gh', go: 'https://github.com/Raeene' },
    { g: 'Elsewhere', t: 'LinkedIn', i: 'in', go: 'https://www.linkedin.com/in/ray-safi-938491195/' },
    { g: 'Elsewhere', t: 'Copy email address', s: EMAIL, i: 'mail', run: function () { copy(EMAIL, 'Email copied'); } },
    { g: 'Elsewhere', t: 'security.txt', s: 'Report a vulnerability', i: 'shield', go: url('hub', '/.well-known/security.txt') }
  ];
  var CUR = doc.body.dataset.site;
  if (CUR) CMDS.forEach(function (c) { if (c.go && c.go.replace(/\/$/, '') === url(CUR, '/').replace(/\/$/, '')) c.here = true; });

  // ---- palette ----
  var back, input, list, items = [], sel = 0, lastFocus;
  function build() {
    back = doc.createElement('div'); back.className = 'cmdk-back'; back.hidden = true;
    back.innerHTML = '<div class="cmdk" role="dialog" aria-modal="true" aria-label="Command menu"><div class="cmdk-in">' + svg('search') +
      '<input type="text" placeholder="Jump anywhere on 0vuln..." aria-label="Search commands" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="cmdk-list"><span class="kbd">esc</span></div>' +
      '<div class="cmdk-list" id="cmdk-list" role="listbox"></div><div class="cmdk-foot"><span><span class="kbd">&uarr;</span><span class="kbd">&darr;</span> move</span><span><span class="kbd">&crarr;</span> open</span><span><span class="kbd">ctrl</span><span class="kbd">K</span> toggle</span></div></div>';
    doc.body.appendChild(back);
    input = back.querySelector('input'); list = back.querySelector('.cmdk-list');
    back.addEventListener('mousedown', function (e) { if (e.target === back) close(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (items[sel]) exec(items[sel]); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') { e.preventDefault(); move(e.shiftKey ? -1 : 1); }
    });
    list.addEventListener('click', function (e) { var b = e.target.closest('.cmdk-item'); if (b) exec(items[+b.dataset.i]); });
    list.addEventListener('mousemove', function (e) { var b = e.target.closest('.cmdk-item'); if (b && +b.dataset.i !== sel) { sel = +b.dataset.i; mark(); } });
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function score(c, q) {
    if (!q) return 1;
    var hay = (c.t + ' ' + (c.s || '') + ' ' + (c.k || '') + ' ' + c.g).toLowerCase(), t = c.t.toLowerCase();
    if (t.indexOf(q) === 0) return 3;
    if (t.indexOf(q) >= 0) return 2;
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; }) ? 1 : 0;
  }
  function render() {
    var q = input.value.trim().toLowerCase();
    var pool = CMDS.map(function (c, i) { return { c: c, s: score(c, q), i: i }; }).filter(function (x) { return x.s > 0; });
    if (q) pool.sort(function (a, b) { return b.s - a.s || a.i - b.i; });
    items = pool.map(function (x) { return x.c; });
    var h = '', g = null;
    items.forEach(function (c, i) {
      if (!q && c.g !== g) { g = c.g; h += '<div class="cmdk-group">' + esc(g) + '</div>'; }
      h += '<button type="button" class="cmdk-item" role="option" data-i="' + i + '" id="cmdk-' + i + '"><span class="ci" data-c="' + esc(c.c || '') + '">' + svg(c.i) + '</span><span class="ct">' + esc(c.t) + (c.s ? '<small>' + esc(c.s) + '</small>' : '') + '</span>' + (c.here ? '<span class="cx">you are here</span>' : c.go && c.go.indexOf(location.origin) !== 0 ? '<span class="cx">&nearr;</span>' : '') + '</button>';
    });
    list.innerHTML = h || '<div class="cmdk-empty">No results for "' + esc(input.value) + '"</div>';
    list.querySelectorAll('.ci[data-c]').forEach(function (e) { if (e.dataset.c) e.style.setProperty('--c', e.dataset.c); });
    sel = 0; mark();
  }
  function mark() {
    list.querySelectorAll('.cmdk-item').forEach(function (b) { b.setAttribute('aria-selected', +b.dataset.i === sel ? 'true' : 'false'); });
    var cur = list.querySelector('[aria-selected="true"]');
    if (cur) { cur.scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', cur.id); }
  }
  function move(d) { if (!items.length) return; sel = (sel + d + items.length) % items.length; mark(); }
  function exec(c) {
    close();
    if (c.run) c.run();
    else if (c.go) { if (c.go.indexOf('https://') === 0 && c.go.indexOf(location.origin) !== 0 && !/0vuln\.com/.test(c.go)) window.open(c.go, '_blank', 'noopener'); else location.assign(c.go); }
  }
  function open() {
    if (!back) build();
    lastFocus = doc.activeElement;
    back.hidden = false; input.value = ''; render();
    requestAnimationFrame(function () { back.classList.add('open'); input.focus(); });
  }
  function close() {
    if (!back || back.hidden) return;
    back.classList.remove('open');
    setTimeout(function () { back.hidden = true; }, 180);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); back && !back.hidden ? close() : open(); }
  });
  doc.querySelectorAll('[data-cmdk]').forEach(function (b) { b.addEventListener('click', open); });
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  doc.querySelectorAll('.k-mod').forEach(function (e) { e.textContent = isMac ? '⌘' : 'Ctrl'; });

  // ---- keep the current site pill visible on narrow screens ----
  var pills = doc.querySelector('.sites'), curPill = pills && pills.querySelector('[aria-current]');
  if (curPill && pills.scrollWidth > pills.clientWidth) pills.scrollLeft += curPill.getBoundingClientRect().left - pills.getBoundingClientRect().left - 4;

  // ---- nav state ----
  var nav = doc.querySelector('.nav');
  if (nav) { var onS = function () { nav.classList.toggle('scrolled', scrollY > 8); }; onS(); addEventListener('scroll', onS, { passive: true }); }

  // ---- reveal on scroll ----
  var rev = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    rev.forEach(function (e) { io.observe(e); });
  } else rev.forEach(function (e) { e.classList.add('in'); });

  // ---- card spotlight (CSS variables through CSSOM) ----
  doc.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.card, .spot');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  // ---- count up ----
  var nums = doc.querySelectorAll('[data-count]');
  function countUp(el) {
    var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1400;
    if (reduce) { el.textContent = end + suf; return; }
    (function f(t) { var p = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - p, 4)); el.textContent = Math.round(v) + suf; if (p < 1) requestAnimationFrame(f); })(t0);
  }
  if (nums.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); io2.unobserve(e.target); } }); }, { threshold: .5 });
    nums.forEach(function (n) { io2.observe(n); });
  }

  // ---- copy buttons ----
  doc.querySelectorAll('[data-copy]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); copy(b.dataset.copy, b.dataset.copyMsg || 'Copied'); }); });

  // ---- footer year ----
  doc.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  // ---- offline support (tools only: body has data-offline) ----
  if ('serviceWorker' in navigator && doc.body.hasAttribute('data-offline') && (location.protocol === 'https:' || LOCAL)) {
    var first = !navigator.serviceWorker.controller;
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var w = reg.installing;
        w && w.addEventListener('statechange', function () { if (w.state === 'activated' && first) toast('Saved for offline use. This tool now works without internet.'); });
      });
    }).catch(function () { /* offline mode is a bonus, never an error */ });
  }

  // ---- public API for site scripts ----
  window.OV = {
    url: url, toast: toast, copy: copy, svg: svg, reduce: reduce, local: LOCAL, open: open,
    register: function (group, cmds) { cmds.slice().reverse().forEach(function (c) { c.g = group; CMDS.unshift(c); }); }
  };
})();
