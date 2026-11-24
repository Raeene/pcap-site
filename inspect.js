'use strict';
// =====================================================================
// PacketStory inspector: click a packet to see its layers and raw bytes,
// or follow the whole conversation it belongs to.
// Uses two globals from app.js: A (the analysis) and RAW (the file bytes).
// =====================================================================
const Inspect = (() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hex = (n, w = 2) => n.toString(16).padStart(w, '0');
  const mac = (b, o) => Array.from(b.subarray(o, o + 6), x => hex(x)).join(':');
  const ip4 = (b, o) => b[o] + '.' + b[o + 1] + '.' + b[o + 2] + '.' + b[o + 3];
  function ip6(v, o) {
    const w = Array.from({ length: 8 }, (_, i) => v.getUint16(o + i * 2).toString(16));
    let best = [-1, 0];
    for (let i = 0; i < 8;) { if (w[i] !== '0') { i++; continue; } let j = i; while (j < 8 && w[j] === '0') j++; if (j - i > best[1] && j - i > 1) best = [i, j - i]; i = j; }
    if (best[0] < 0) return w.join(':');
    return w.slice(0, best[0]).join(':') + '::' + w.slice(best[0] + best[1]).join(':');
  }
  const ETH = { 0x0800: 'IPv4', 0x86dd: 'IPv6', 0x0806: 'ARP', 0x8100: 'VLAN' };
  const IPP = { 1: 'ICMP', 2: 'IGMP', 6: 'TCP', 17: 'UDP', 58: 'ICMPv6' };
  const TCPF = ['FIN', 'SYN', 'RST', 'PSH', 'ACK', 'URG', 'ECE', 'CWR'];
  function csum(b, s, e, init = 0) { let x = init; for (let i = s; i < e; i += 2) x += (b[i] << 8) | (i + 1 < e ? b[i + 1] : 0); while (x >> 16) x = (x & 0xffff) + (x >> 16); return ~x & 0xffff; }

  // ---- decode one packet into layers: [{ name, sum, fields: [[label, value, start, end, note]] }] ----
  function layers(b, link) {
    const v = new DataView(b.buffer, b.byteOffset, b.byteLength), L = [];
    let o = 0, et = null, payload = null;
    const F = (label, value, s, e, note) => [label, value, s, e, note];
    if (link === 1 && b.length >= 14) {
      et = v.getUint16(12);
      L.push({ name: 'Ethernet II', sum: mac(b, 6) + ' → ' + mac(b, 0), fields: [F('Destination MAC', mac(b, 0), 0, 6), F('Source MAC', mac(b, 6), 6, 12), F('EtherType', '0x' + hex(et, 4) + ' (' + (ETH[et] || '?') + ')', 12, 14)] });
      o = 14;
      while ((et === 0x8100 || et === 0x88a8) && b.length >= o + 4) {
        L.push({ name: '802.1Q VLAN', sum: 'VLAN ' + (v.getUint16(o) & 0xfff), fields: [F('VLAN ID', v.getUint16(o) & 0xfff, o, o + 2), F('EtherType', '0x' + hex(v.getUint16(o + 2), 4), o + 2, o + 4)] });
        et = v.getUint16(o + 2); o += 4;
      }
    } else if (link === 113 && b.length >= 16) { et = v.getUint16(14); L.push({ name: 'Linux cooked capture', sum: 'SLL', fields: [F('Protocol', '0x' + hex(et, 4), 14, 16)] }); o = 16; }
    else if (link === 276 && b.length >= 20) { et = v.getUint16(0); L.push({ name: 'Linux cooked capture v2', sum: 'SLL2', fields: [F('Protocol', '0x' + hex(et, 4), 0, 2)] }); o = 20; }
    else if ((link === 0 || link === 108) && b.length >= 4) { const f = b[0] || b[3]; et = f === 2 ? 0x0800 : 0x86dd; L.push({ name: 'Loopback', sum: 'family ' + f, fields: [F('Family', f, 0, 4)] }); o = 4; }
    else if ([12, 14, 101, 228, 229].includes(link) && b.length) et = (b[0] >> 4) === 6 ? 0x86dd : 0x0800;

    if (et === 0x0806 && b.length >= o + 28) {
      const op = v.getUint16(o + 6);
      L.push({ name: 'ARP', sum: op === 1 ? 'request' : op === 2 ? 'reply' : 'op ' + op, fields: [
        F('Operation', op + (op === 1 ? ' (request)' : op === 2 ? ' (reply)' : ''), o + 6, o + 8),
        F('Sender MAC', mac(b, o + 8), o + 8, o + 14), F('Sender IP', ip4(b, o + 14), o + 14, o + 18),
        F('Target MAC', mac(b, o + 18), o + 18, o + 24), F('Target IP', ip4(b, o + 24), o + 24, o + 28)] });
      return { L, payload };
    }
    let pr = null, end = b.length, src, dst, pseudo = 0, cut = false;
    if (et === 0x0800 && b.length >= o + 20) {
      const ihl = (b[o] & 15) * 4, tot = v.getUint16(o + 2), fl = v.getUint16(o + 6), ck = v.getUint16(o + 10);
      const ok = csum(b, o, o + ihl) === 0;
      pr = b[o + 9]; cut = tot > 0 && o + tot > b.length; end = Math.min(b.length, tot ? o + tot : b.length); src = ip4(b, o + 12); dst = ip4(b, o + 16);
      L.push({ name: 'IPv4', sum: src + ' → ' + dst, fields: [
        F('Version / header length', '4 / ' + ihl + ' bytes', o, o + 1), F('Total length', tot, o + 2, o + 4), F('Identification', '0x' + hex(v.getUint16(o + 4), 4), o + 4, o + 6),
        F('Flags', (fl & 0x4000 ? 'DF ' : '') + (fl & 0x2000 ? 'MF' : '') || 'none', o + 6, o + 7, 'DF = don\'t fragment, MF = more fragments'),
        F('Fragment offset', (fl & 0x1fff) * 8, o + 6, o + 8), F('TTL', b[o + 8], o + 8, o + 9, 'hops left before the packet is dropped'),
        F('Protocol', pr + ' (' + (IPP[pr] || '?') + ')', o + 9, o + 10), F('Header checksum', '0x' + hex(ck, 4) + (ck === 0 ? '  (not set)' : ok ? '  ✓ valid' : '  ✗ wrong'), o + 10, o + 12, ck === 0 ? 'zero usually means the network card fills it in later (checksum offloading)' : 'sum of the header words; the receiver drops the packet if it does not match'),
        F('Source', src, o + 12, o + 16), F('Destination', dst, o + 16, o + 20)] });
      pseudo = (b[o + 12] << 8 | b[o + 13]) + (b[o + 14] << 8 | b[o + 15]) + (b[o + 16] << 8 | b[o + 17]) + (b[o + 18] << 8 | b[o + 19]) + pr;
      if (fl & 0x1fff) return { L, payload };
      o += ihl;
    } else if (et === 0x86dd && b.length >= o + 40) {
      pr = b[o + 6]; end = Math.min(b.length, o + 40 + v.getUint16(o + 4)); src = ip6(v, o + 8); dst = ip6(v, o + 24);
      L.push({ name: 'IPv6', sum: src + ' → ' + dst, fields: [
        F('Payload length', v.getUint16(o + 4), o + 4, o + 6), F('Next header', pr + ' (' + (IPP[pr] || '?') + ')', o + 6, o + 7), F('Hop limit', b[o + 7], o + 7, o + 8),
        F('Source', src, o + 8, o + 24), F('Destination', dst, o + 24, o + 40)] });
      o += 40;
      let guard = 0;
      while ([0, 43, 44, 60].includes(pr) && o + 8 <= end && guard++ < 8) { const n = b[o]; o += pr === 44 ? 8 : (b[o + 1] + 1) * 8; pr = n; }
    } else return { L, payload };

    if (pr === 6 && end >= o + 20) {
      const hl = (b[o + 12] >> 4) * 4, fl = b[o + 13], flags = TCPF.filter((_, i) => fl & (1 << i)).join(' ') || 'none';
      const ck = v.getUint16(o + 16), ok = et === 0x0800 && !cut ? csum(b, o, end, pseudo + (end - o)) === 0 : null;
      L.push({ name: 'TCP', sum: v.getUint16(o) + ' → ' + v.getUint16(o + 2) + ' [' + flags + ']', fields: [
        F('Source port', v.getUint16(o), o, o + 2), F('Destination port', v.getUint16(o + 2), o + 2, o + 4),
        F('Sequence number', v.getUint32(o + 4), o + 4, o + 8, 'position of this data in the byte stream'), F('Acknowledgment', v.getUint32(o + 8), o + 8, o + 12, 'next byte expected from the other side'),
        F('Header length', hl + ' bytes', o + 12, o + 13), F('Flags', flags, o + 13, o + 14, 'SYN opens, ACK confirms, PSH pushes data, FIN closes, RST aborts'),
        F('Window', v.getUint16(o + 14), o + 14, o + 16, 'how much data the sender can receive'), F('Checksum', '0x' + hex(ck, 4) + (ok === null ? '' : ck === 0 ? '  (not set)' : ok ? '  ✓ valid' : '  ✗ wrong'), o + 16, o + 18, ck === 0 ? 'zero usually means checksum offloading: the network card computes it' : 'covers the TCP header, the data and the IP addresses')] });
      if (end > o + hl) payload = [o + hl, end];
    } else if (pr === 17 && end >= o + 8) {
      L.push({ name: 'UDP', sum: v.getUint16(o) + ' → ' + v.getUint16(o + 2), fields: [
        F('Source port', v.getUint16(o), o, o + 2), F('Destination port', v.getUint16(o + 2), o + 2, o + 4), F('Length', v.getUint16(o + 4), o + 4, o + 6), F('Checksum', '0x' + hex(v.getUint16(o + 6), 4), o + 6, o + 8)] });
      if (end > o + 8) payload = [o + 8, end];
    } else if ((pr === 1 || pr === 58) && end >= o + 4) {
      L.push({ name: pr === 1 ? 'ICMP' : 'ICMPv6', sum: 'type ' + b[o] + ', code ' + b[o + 1], fields: [F('Type', b[o], o, o + 1), F('Code', b[o + 1], o + 1, o + 2), F('Checksum', '0x' + hex(v.getUint16(o + 2), 4), o + 2, o + 4)] });
    }
    if (payload) {
      const [s, e] = payload, txt = latin1(b.subarray(s, Math.min(e, s + 64)));
      L.push({ name: 'Payload', sum: (e - s) + ' bytes', fields: [F('Data', printable(txt) + (e - s > 64 ? ' …' : ''), s, e)] });
    }
    return { L, payload };
  }
  const latin1 = a => { let s = ''; for (const x of a) s += String.fromCharCode(x); return s; };
  const printable = s => s.replace(/\r\n/g, '\n').replace(/[^\x20-\x7e\n\t]/g, '·');

  function bytesOf(i) { const r = A.rows[i]; return r && r.off !== undefined && RAW ? RAW.subarray(r.off, r.off + r.cl) : null; }

  // ---- drawer ----
  let el, cur = -1;
  function drawer() {
    if (el) return el;
    el = document.createElement('aside');
    el.className = 'insp'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Packet inspector');
    el.innerHTML = '<div class="insp-h"><b id="insp-t"></b><div class="insp-nav"><button type="button" data-nav="-1" title="Previous packet (k)">&uarr;</button><button type="button" data-nav="1" title="Next packet (j)">&darr;</button><button type="button" data-close title="Close (Esc)">&times;</button></div></div>' +
      '<div class="insp-tabs" role="tablist"><button type="button" data-tab="layers" class="on">Layers</button><button type="button" data-tab="hex">Bytes</button><button type="button" data-tab="follow">Follow conversation</button></div><div class="insp-b" id="insp-b"></div>';
    document.body.appendChild(el);
    el.addEventListener('click', e => {
      const t = e.target.closest('[data-tab]'), n = e.target.closest('[data-nav]');
      if (e.target.closest('[data-close]')) close();
      else if (t) { el.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('on', x === t)); show(cur, t.dataset.tab); }
      else if (n) step(+n.dataset.nav);
      else if (e.target.closest('.fl[data-pk]')) { el.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('on', x.dataset.tab === 'layers')); show(+e.target.closest('.fl').dataset.pk, 'layers'); }
    });
    el.addEventListener('mouseover', e => { const f = e.target.closest('[data-s]'); mark(f ? +f.dataset.s : -1, f ? +f.dataset.e : -1); });
    return el;
  }
  const tab = () => (el.querySelector('[data-tab].on') || {}).dataset.tab || 'layers';
  function open(i) { drawer(); requestAnimationFrame(() => el.classList.add('open')); document.body.classList.add('insp-open'); show(i, tab()); }
  function close() { if (!el) return; el.classList.remove('open'); document.body.classList.remove('insp-open'); document.querySelectorAll('#rows tr.sel').forEach(r => r.classList.remove('sel')); cur = -1; }
  function step(d) {
    const vis = [...document.querySelectorAll('#rows tr[data-pk]')].map(r => +r.dataset.pk), k = vis.indexOf(cur);
    if (k >= 0 && vis[k + d] !== undefined) show(vis[k + d], tab());
  }

  function show(i, which) {
    cur = i;
    document.querySelectorAll('#rows tr.sel').forEach(r => r.classList.remove('sel'));
    const tr = document.querySelector(`#rows tr[data-pk="${i}"]`); if (tr) { tr.classList.add('sel'); tr.scrollIntoView({ block: 'nearest' }); }
    const r = A.rows[i], b = bytesOf(i), body = $('#insp-b');
    $('#insp-t').textContent = 'Packet #' + (i + 1) + ' · ' + r.proto + ' · ' + r.len + ' bytes';
    el.querySelector('[data-tab="follow"]').disabled = !(r.sp !== undefined);
    if (!b) { body.innerHTML = '<p class="dim">Raw bytes are not available for this packet.</p>'; return; }
    if (which === 'follow' && r.sp !== undefined) { body.innerHTML = follow(i); return; }
    const { L } = layers(b, r.lk);
    if (which === 'hex') { body.innerHTML = layerList(L, true) + hexdump(b); return; }
    body.innerHTML = layerList(L, false) + '<p class="insp-note">Hover a field to highlight its bytes in the <b>Bytes</b> tab, or open it to see the raw hex.</p>';
  }

  function layerList(L, compact) {
    return '<div class="lyr">' + L.map((l, k) => `<details${compact ? '' : ' open'}><summary><b>${esc(l.name)}</b><span>${esc(l.sum)}</span></summary><dl>` +
      l.fields.map(([lab, val, s, e, note]) => `<div data-s="${s}" data-e="${e}"${note ? ` title="${esc(note)}"` : ''}><dt>${esc(lab)}</dt><dd class="${/✗/.test(val) ? 'bad' : /✓/.test(val) ? 'good' : ''}">${esc(val)}</dd></div>`).join('') + '</dl></details>').join('') + '</div>';
  }

  function hexdump(b) {
    const n = Math.min(b.length, 4096); let h = '<div class="hex" id="hex">';
    for (let o = 0; o < n; o += 16) {
      let hx = '', as = '';
      for (let k = o; k < o + 16; k++) {
        if (k < n) { hx += `<i data-b="${k}">${hex(b[k])}</i>`; const c = b[k]; as += `<i data-b="${k}">${c >= 32 && c < 127 ? esc(String.fromCharCode(c)) : '·'}</i>`; }
        else hx += '<i class="pad">  </i>';
        if (k === o + 7) hx += ' ';
      }
      h += `<div><span class="off">${hex(o, 4)}</span><span class="hx">${hx}</span><span class="as">${as}</span></div>`;
    }
    return h + (b.length > n ? '<div class="dim">… ' + (b.length - n) + ' more bytes</div>' : '') + '</div>';
  }
  function mark(s, e) {
    document.querySelectorAll('#hex i.hl').forEach(x => x.classList.remove('hl'));
    if (s < 0) return;
    document.querySelectorAll('#hex i[data-b]').forEach(x => { const k = +x.dataset.b; if (k >= s && k < e) x.classList.add('hl'); });
  }

  // ---- follow conversation: every payload between the same two endpoints, in order ----
  function follow(i) {
    const r = A.rows[i], key = x => [x.src + ':' + x.sp, x.dst + ':' + x.dp].sort().join('|'), k = key(r);
    const client = A.rows.find(x => x.sp !== undefined && key(x) === k);
    const cli = client.src + ':' + client.sp;
    let out = '', total = 0, msgs = 0, bytesC = 0, bytesS = 0;
    for (let j = 0; j < A.rows.length && total < 200000; j++) {
      const x = A.rows[j]; if (x.sp === undefined || key(x) !== k) continue;
      const b = bytesOf(j); if (!b) continue;
      const { payload } = layers(b, x.lk); if (!payload) continue;
      const data = b.subarray(payload[0], payload[1]); if (!data.length) continue;
      const fromCli = x.src + ':' + x.sp === cli; total += data.length; msgs++;
      fromCli ? bytesC += data.length : bytesS += data.length;
      out += `<div class="fl ${fromCli ? 'c' : 's'}" data-pk="${j}"><span class="fl-m">#${j + 1} ${fromCli ? '→' : '←'}</span><pre>${esc(printable(latin1(data)))}</pre></div>`;
    }
    const head = `<div class="fl-h"><span class="c">${esc(cli)}</span><span class="dim">⇄</span><span class="s">${esc(k.split('|').find(e => e !== cli) || '')}</span></div><p class="insp-note">${msgs} messages · client sent ${bytesC} bytes, server sent ${bytesS} bytes. <b class="c">Client</b> is whoever spoke first.</p>`;
    return head + (out || '<p class="dim">No payload in this conversation (only handshakes and acknowledgments).</p>');
  }

  addEventListener('keydown', e => {
    if (!el || !el.classList.contains('open') || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'j' || e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    else if (e.key === 'k' || e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
  });
  return { open, close, layers };
})();
