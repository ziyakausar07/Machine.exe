/* Sound Studio: assign your own MP3 / MP4 / MPEG / M4A / WAV / OGG to any key. Files stay on this device. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const KM = window.MemeKeyMap || {};
  const kb = $('virtual-keyboard');
  const sounds = new Map(), playing = new Map();
  let db = null, assignMode = false, clipMs = +localStorage.getItem('meme_clip_ms') || 4000;
  if (localStorage.getItem('meme_clip_ms') === '0') clipMs = 0;

  const disp = (k) => ({ ' ': 'SPACE', ARROWLEFT: '←', ARROWUP: '↑', ARROWDOWN: '↓', ARROWRIGHT: '→' }[k] || k);
  const rawKey = (e) => (e.key === ' ' ? ' ' : e.key.toUpperCase());
  const keyOf = (meta) => Object.keys(KM).find((k) => KM[k] === meta);
  const toast = (title, msg) => {
    const t = document.createElement('div'); t.className = 'toast';
    const a = document.createElement('div'); a.className = 'toast-title'; a.textContent = title;
    const b = document.createElement('div'); b.textContent = msg;
    t.append(a, b); $('toast-container').appendChild(t); setTimeout(() => t.remove(), 3900);
  };

  // ---- storage (IndexedDB, so sounds survive a reload) ----
  const openDb = () => new Promise((res, rej) => {
    const r = indexedDB.open('meme_machine_custom_audio', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('sounds', { keyPath: 'key' });
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  const dbDo = (mode, fn) => new Promise((res, rej) => {
    if (!db) return rej(new Error('no db'));
    const t = db.transaction('sounds', mode), r = fn(t.objectStore('sounds'));
    t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error);
  });

  // ---- playback ----
  const start = (key, rate = 1) => {
    const s = sounds.get(key); if (!s) return;
    const prev = playing.get(key); if (prev) { prev.pause(); clearTimeout(prev._t); }
    const a = s.audio.cloneNode();
    a.volume = Math.min(1, (+$('volume-slider').value || 80) / 100);
    a.playbackRate = rate; a.currentTime = 0; a.play().catch(() => {});
    if (clipMs) a._t = setTimeout(() => a.pause(), clipMs);
    playing.set(key, a);
  };
  window.MemeCustom = { play(meta, rate) { const k = keyOf(meta); if (!k || !sounds.has(k)) return false; start(k, rate); return true; } };

  // ---- UI ----
  const mark = () => kb.querySelectorAll('.k-btn').forEach((b) => b.classList.toggle('has-custom', sounds.has(b.dataset.key)));
  const render = () => {
    const list = $('studio-list'); list.textContent = '';
    if (!sounds.size) { const p = document.createElement('p'); p.className = 'studio-empty'; p.textContent = 'No custom sounds yet. Pick a key, add a file, mash it!'; list.appendChild(p); }
    sounds.forEach((s, key) => {
      const row = document.createElement('div'); row.className = 'studio-item';
      const chip = document.createElement('span'); chip.className = 'studio-chip'; chip.textContent = disp(key);
      const nm = document.createElement('span'); nm.className = 'studio-name'; nm.textContent = s.name; nm.title = s.name;
      const sz = document.createElement('span'); sz.className = 'studio-size'; sz.textContent = (s.size / 1048576).toFixed(1) + ' MB';
      const pl = document.createElement('button'); pl.type = 'button'; pl.className = 'btn-ctrl'; pl.textContent = '▶'; pl.setAttribute('aria-label', 'Preview ' + s.name); pl.onclick = () => start(key);
      const rm = document.createElement('button'); rm.type = 'button'; rm.className = 'btn-ctrl btn-warn'; rm.textContent = '✕'; rm.setAttribute('aria-label', 'Remove ' + s.name); rm.onclick = () => remove(key);
      row.append(chip, nm, sz, pl, rm); list.appendChild(row);
    });
    $('studio-clear').classList.toggle('hidden', !sounds.size);
    mark();
  };
  const remove = (key) => {
    const s = sounds.get(key); if (!s) return;
    URL.revokeObjectURL(s.url); sounds.delete(key); dbDo('readwrite', (st) => st.delete(key)).catch(() => {}); render();
  };
  const probe = (url) => new Promise((res, rej) => {
    const a = new Audio(), t = setTimeout(() => rej(new Error('timeout')), 6000);
    a.preload = 'auto'; a.onloadedmetadata = () => { clearTimeout(t); res(a); };
    a.onerror = () => { clearTimeout(t); rej(new Error('unsupported')); }; a.src = url;
  });
  const keep = (key, name, blob, url, audio) => {
    const old = sounds.get(key); if (old) URL.revokeObjectURL(old.url);
    sounds.set(key, { name, size: blob.size, url, audio });
  };
  async function assign(file) {
    if (!file) return;
    const key = $('studio-key').value;
    if (file.size > 30 * 1048576) return toast('⚠ FILE TOO BIG', 'Please use a file under 30 MB (trim the clip first).');
    const url = URL.createObjectURL(file);
    try {
      const audio = await probe(url);
      keep(key, file.name, file, url, audio);
      dbDo('readwrite', (st) => st.put({ key, name: file.name, blob: file })).catch(() => { $('studio-status').textContent = 'Session only (browser blocked saving)'; });
      render(); start(key);
      toast('🎵 SOUND ADDED', `${file.name} → ${disp(key)} key. Turn SOUND: ON and press it!`);
    } catch {
      URL.revokeObjectURL(url);
      toast('⚠ CAN\'T PLAY THIS FILE', 'Your browser could not decode it. Convert to MP3, M4A or WAV and try again.');
    }
  }

  // key selector + "press a key" picking mode
  [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 'SHIFT', ' ', 'ENTER', 'ARROWLEFT', 'ARROWUP', 'ARROWDOWN', 'ARROWRIGHT'].forEach((k) => {
    if (!KM[k]) return; const o = document.createElement('option'); o.value = k; o.textContent = `${disp(k)} — ${KM[k].label}`; $('studio-key').appendChild(o);
  });
  $('studio-key').value = 'F';
  const setPick = (on) => { assignMode = on; $('studio-pick-btn').textContent = on ? '👆 PRESS A KEY NOW…' : '🎯 PRESS A KEY'; $('studio-pick-btn').classList.toggle('on', on); };
  $('studio-pick-btn').onclick = () => setPick(!assignMode);
  addEventListener('keydown', (e) => {
    if (!assignMode) return; const k = rawKey(e);
    if (e.key === 'Escape') { setPick(false); return; }
    if (!KM[k]) return; e.preventDefault(); e.stopPropagation(); $('studio-key').value = k; setPick(false);
  }, true);
  kb.addEventListener('click', (e) => {
    const b = e.target.closest('.k-btn'); if (!assignMode || !b) return;
    e.stopPropagation(); $('studio-key').value = b.dataset.key; setPick(false);
  }, true);

  // file input, drag & drop, clip length
  $('studio-file').addEventListener('change', (e) => { assign(e.target.files[0]); e.target.value = ''; });
  const drop = $('studio-drop');
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => assign(e.dataTransfer.files[0]));
  $('studio-clip').value = String(clipMs);
  $('studio-clip').addEventListener('change', (e) => { clipMs = +e.target.value; localStorage.setItem('meme_clip_ms', String(clipMs)); });
  $('studio-clear').onclick = () => { [...sounds.keys()].forEach(remove); };

  // restore saved sounds
  openDb().then((d) => { db = d; $('studio-status').textContent = 'Saved on this device — never uploaded'; return dbDo('readonly', (st) => st.getAll()); })
    .then((rows) => (rows || []).forEach((r) => { const url = URL.createObjectURL(r.blob); const a = new Audio(url); a.preload = 'auto'; keep(r.key, r.name, r.blob, url, a); }))
    .catch(() => { $('studio-status').textContent = 'Session only (saving unavailable)'; })
    .finally(render);
})();
