/* Intro video splash: plays assets/video/intro.mp4 (or .webm), then reveals the website. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const scr = $('video-screen'), v = $('intro-video'), startBtn = $('video-start'), bar = $('video-progress');
  let done = false;

  function finish() {
    if (done) return; done = true;
    try { v.pause(); } catch { /* ignore */ }
    $('intro-screen').classList.add('active');           // website appears underneath…
    scr.style.transition = 'opacity .6s ease'; scr.style.opacity = '0'; // …while the video fades out
    setTimeout(() => { scr.classList.remove('active'); scr.style.opacity = ''; }, 650);
  }

  const tryPlay = () => v.play().then(() => startBtn.classList.add('hidden')).catch((err) => {
    if (err && err.name === 'NotAllowedError') startBtn.classList.remove('hidden'); // browser wants a click first
    else finish();                                                                   // no video file / unsupported → go straight to site
  });

  v.addEventListener('ended', finish);
  v.addEventListener('error', finish);
  v.querySelectorAll('source').forEach((s, i, all) => s.addEventListener('error', () => { if (i === all.length - 1) finish(); }));
  v.addEventListener('timeupdate', () => { if (v.duration) bar.style.width = (v.currentTime / v.duration * 100) + '%'; });
  startBtn.addEventListener('click', tryPlay);
  $('video-skip').addEventListener('click', finish);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && scr.classList.contains('active')) finish(); });
  setTimeout(() => { if (!done && v.readyState === 0 && startBtn.classList.contains('hidden')) finish(); }, 8000); // watchdog

  tryPlay();
})();
