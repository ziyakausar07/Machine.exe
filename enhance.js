/* UI/UX enhancer: adds polish without touching the audio/key engine in script.js */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const intro = $('intro-screen'), final = $('final-screen'), kb = $('virtual-keyboard');

  // Cursor glow (mouse devices only)
  if (matchMedia('(pointer:fine)').matches) {
    const g = document.createElement('div'); g.className = 'cursor-glow'; document.body.appendChild(g);
    addEventListener('pointermove', (e) => { g.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });
  }

  // "Press any key" on the intro really works now
  addEventListener('keydown', (e) => {
    if (!intro.classList.contains('active') || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key.length > 1 && !['Enter', ' '].includes(e.key)) return;
    if (document.activeElement?.tagName === 'BUTTON') return;
    e.preventDefault();
    $('enter-universe-btn').click();
  });

  // Accessible names / tooltips + ripple on every key hit (mouse or keyboard)
  const nameKeys = () => kb.querySelectorAll('.k-btn').forEach((b) => {
    b.setAttribute('aria-label', `${b.querySelector('.k-char').textContent} key: ${b.querySelector('.k-label').textContent}`);
    b.title = b.querySelector('.k-label').textContent;
  });
  nameKeys();
  new MutationObserver((list) => list.forEach((m) => {
    const b = m.target;
    if (b.classList?.contains('k-btn') && b.classList.contains('active') && !(m.oldValue || '').includes('active')) {
      const r = document.createElement('span'); r.className = 'k-ripple'; b.appendChild(r); setTimeout(() => r.remove(), 650);
    }
  })).observe(kb, { subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });

  // Stat counters "bump" whenever they change
  ['stat-combo', 'stat-streak', 'stat-best', 'stat-keys'].forEach((id) => {
    const n = $(id);
    new MutationObserver(() => { n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); })
      .observe(n, { childList: true, characterData: true, subtree: true });
  });

  // Final screen: count-up, rank, confetti, share
  const confetti = () => {
    const cols = ['#00f5d4', '#ff2a85', '#fee440', '#9d4edd', '#39ff14'];
    for (let i = 0; i < 70; i++) {
      const c = document.createElement('i'); c.className = 'confetti';
      c.style.cssText = `left:${Math.random() * 100}%;background:${cols[i % 5]};--x:${(Math.random() - .5) * 200}px;--d:${2.2 + Math.random() * 2}s`;
      $('fx-overlay').appendChild(c); setTimeout(() => c.remove(), 4500);
    }
  };
  const countUp = (node) => {
    const m = node.textContent.match(/^(\D*)(\d+)(\D*)$/); if (!m) return;
    const end = +m[2], t0 = performance.now();
    (function tick(t) {
      const p = Math.min(1, (t - t0) / 900);
      node.textContent = m[1] + Math.round(end * (1 - Math.pow(1 - p, 3))) + m[3];
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  };
  const rank = (k) => k < 20 ? '🥔 MEME INTERN' : k < 60 ? '🎧 MEME DJ' : k < 150 ? '🔥 MEME LEGEND' : '💀 KEYBOARD DESTROYER';
  new MutationObserver(() => {
    if (!final.classList.contains('active')) return;
    $('final-rank').textContent = 'RANK: ' + rank(+$('final-keys').textContent || 0);
    ['final-keys', 'final-memes', 'final-combo', 'final-chaos'].forEach((id) => countUp($(id)));
    confetti();
  }).observe(final, { attributes: true, attributeFilter: ['class'] });

  $('share-btn').addEventListener('click', async (e) => {
    const t = `I scored ${$('final-keys').textContent} keys, combo ${$('final-combo').textContent} and ${$('final-chaos').textContent} chaos on THE MEME MACHINE.EXE 🎧🔥`;
    try { await navigator.clipboard.writeText(t); e.target.textContent = '[ COPIED! ✓ ]'; }
    catch { e.target.textContent = '[ COPY FAILED ]'; }
    setTimeout(() => { e.target.textContent = '[ COPY MY SCORE ]'; }, 1800);
  });
})();
