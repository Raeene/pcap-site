'use strict';
// =====================================================================
// "Solve the case": investigation questions for the demo capture.
// Answers are checked as you type; progress is kept in localStorage.
// =====================================================================
const Case = (() => {
  const Q = [
    { q: 'Which host is the attacker?', a: ['10.0.0.5'], hint: 'Almost every finding in the story starts with the same IP.', where: 's-story' },
    { q: 'Which service did the attacker try to brute-force?', a: ['ftp'], hint: 'Look for the T1110 "Brute Force" event.', where: 's-story' },
    { q: 'Which username was targeted by the brute force?', a: ['admin'], hint: 'The "Credentials seen" table lists every username sent in cleartext.', where: 's-artifacts' },
    { q: 'Which file did the attacker steal?', a: ['secrets.txt'], hint: 'Check "Files transferred", or filter the packets for RETR.', where: 's-artifacts' },
    { q: 'Which domain was used to tunnel data out over DNS?', a: ['evil.com'], hint: 'Look at the DNS names table: the long random-looking labels all end the same way.', where: 's-artifacts' },
    { q: 'On which port does the suspected malware beacon home?', a: ['4444'], hint: 'Beaconing = regular connections at a fixed interval. The story says where to.', where: 's-story' },
    { q: 'Which IP address was being impersonated with ARP spoofing?', a: ['10.0.0.1'], hint: 'ARP spoofing means one IP claimed by two different MAC addresses.', where: 's-story' }
  ];
  const KEY = 'ps-case';
  const norm = s => s.trim().toLowerCase().replace(/^["']|["']$/g, '').replace(/\.$/, '');
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } };
  const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } };

  function html() {
    const st = load(), solved = Q.filter((_, i) => st[i]).length;
    return '<section class="dsec" id="s-case"><div class="sec-h"><h2>Solve the case</h2><span class="cnt" id="case-n">' + solved + ' / ' + Q.length + '</span></div>' +
      '<p class="hint">You are the analyst. Use the story, artifacts, map and packet filter to answer. Answers are checked as you type.</p><ol class="case">' +
      Q.map((x, i) => `<li class="${st[i] ? 'ok' : ''}" data-i="${i}"><label for="case-${i}">${x.q}</label><div class="case-row"><input id="case-${i}" autocomplete="off" spellcheck="false" placeholder="your answer" value="${st[i] ? x.a[0] : ''}"${st[i] ? ' readonly' : ''}><span class="case-ok" aria-hidden="true">✓</span><button type="button" class="case-hint">hint</button></div><p class="case-h" hidden>${x.hint} <a href="#${x.where}">Go there →</a></p></li>`).join('') +
      '</ol><div class="case-done"' + (solved === Q.length ? '' : ' hidden') + '><b>Case closed.</b> You reconstructed the whole attack from packets alone: recon, brute force, theft, exfiltration and command-and-control. Now try it on <a href="https://range.0vuln.com/">your own attack in the Range</a>.</div></section>';
  }

  function wire(root) {
    const sec = root.querySelector('#s-case'); if (!sec) return;
    sec.addEventListener('input', e => {
      const li = e.target.closest('li[data-i]'); if (!li || e.target.readOnly) return;
      const i = +li.dataset.i;
      if (Q[i].a.includes(norm(e.target.value))) {
        const st = load(); st[i] = 1; save(st);
        li.classList.add('ok'); e.target.readOnly = true;
        const n = Q.filter((_, k) => st[k]).length;
        sec.querySelector('#case-n').textContent = n + ' / ' + Q.length;
        if (n === Q.length) { sec.querySelector('.case-done').hidden = false; window.OV && OV.toast('Case closed. Nice work, analyst.'); }
        else window.OV && OV.toast('Correct! ' + n + ' / ' + Q.length);
      }
    });
    sec.addEventListener('click', e => { const b = e.target.closest('.case-hint'); if (b) b.closest('li').querySelector('.case-h').hidden = false; });
  }
  return { html, wire };
})();
