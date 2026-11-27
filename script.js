(() => {
  'use strict';

  /* ==================== 1. MEME KEYBOARD CONFIGURATION ==================== */
  const NEON = {
    cyan: '#00f5d4',
    pink: '#ff2a85',
    yellow: '#fee440',
    purple: '#9d4edd',
    green: '#39ff14',
    blue: '#00bbf9',
    orange: '#ff9f1c'
  };

  const SOUND_ASSET_FILES = {
    bass_drop: 'assets/sounds/bass_drop.wav',
    explosion: 'assets/sounds/explosion.wav',
    boing: 'assets/sounds/boing.wav',
    scratch: 'assets/sounds/scratch.wav',
    victory: 'assets/sounds/victory.wav',
    glitch: 'assets/sounds/glitch.wav',
    suspense: 'assets/sounds/suspense.wav',
    laugh_track: 'assets/sounds/laugh_track.wav'
  };

  // Complete A-Z, 0-9, and Special Keys mapping
  const KEY_MAP = {
    // --- Iconic Hindi & Kannada Memes ---
    F: { label: 'FAHHHH!', caption: 'FAHHHH!', speak: 'Faaaahhh!', speakHi: 'फाऽऽऽह!', emoji: '😱🔥', color: NEON.pink, fx: 'fahhhh', synth: 'horn', pitch: 1.1 },
    B: { label: 'BHAI MAARO', caption: 'Bhai, maaro mujhe maaro!', speak: 'Bhaaee, maaro mujhay maaro!', speakHi: 'भाई, मारो मुझे मारो!', emoji: '🤕💥', color: NEON.yellow, fx: 'comicShake', synth: 'slap', pitch: 0.95 },
    A: { label: 'AAYEIN?', caption: 'AAYEIN? Baigan?!', speak: 'Aaa-yein? Baigan?', speakHi: 'आएँ? बैंगन?', emoji: '🤨🍆', color: NEON.cyan, fx: 'aayein', synth: 'riser', pitch: 1.2 },
    S: { label: 'SADHU LAUGH', caption: 'Sadhu Kokila Laugh: HAHAHA!', speak: 'Ha ha ha ha ha! Yen comedy!', speakKn: 'ಹ ಹ ಹ ಹ! ಏನ್ ಕಾಮಿಡಿ!', emoji: '😂🤣', color: NEON.green, fx: 'laughCircles', synth: 'laugh', asset: 'laugh_track', pitch: 1.2 },
    M: { label: 'MAZA AAYA?', caption: 'MAZA AAYA?', speak: 'Mazaa aayaa?', speakHi: 'मज़ा आया?', emoji: '🥳🎉', color: NEON.purple, fx: 'party', synth: 'chord', pitch: 1.1 },
    K: { label: 'EN GURU IDU?', caption: 'ಏನ್ ಗುರು ಇದು?! (En guru idu?!) — Kannada Mode!', speak: 'Yen gooroo idoo? Ayyo paapaa!', speakKn: 'ಏನ್ ಗುರು ಇದು? ಅಯ್ಯೋ ಪಾಪ!', emoji: '😎💛❤️', color: NEON.yellow, fx: 'kannada', synth: 'dhol', pitch: 1.0 },
    H: { label: 'HAAN BHAI', caption: 'HAAN BHAI HAAN!', speak: 'Haan, bhaaee, haan!', speakHi: 'हाँ भाई हाँ!', emoji: '🙌🔥', color: NEON.cyan, fx: 'burst', synth: 'stab', pitch: 1.05 },
    O: { label: 'OH BHAI!', caption: 'OH BHAI! Maaro mujhe!', speak: 'Oh bhaaee! Maaro mujhay!', speakHi: 'ओ भाई! मारो मुझे!', emoji: '🤯⚡', color: NEON.pink, fx: 'shockwave', synth: 'brass', pitch: 0.95 },
    ' ': { label: 'BASS DROP', caption: 'FULL SCREEN BASS DROP!', speak: 'Bass drop!', emoji: '🔊💣', color: NEON.cyan, fx: 'bassDrop', synth: 'bassDrop', asset: 'bass_drop', pitch: 0.75 },

    // --- Remaining Alphabet Keys (Original Comedy & Reactions) ---
    Q: { label: 'KYA RE?', caption: 'Kya re setting-aa?', speak: 'Kyaa ray setting aa?', speakHi: 'क्या रे सेटिंग आ?', emoji: '🧐✨', color: NEON.cyan, fx: 'rings', synth: 'zap' },
    W: { label: 'WAH MODI', caption: 'WAH! Kya scene hai!', speak: 'Waah! Kyaa scene hai!', speakHi: 'वाह! क्या सीन है!', emoji: '🤩🌟', color: NEON.pink, fx: 'party', synth: 'chime' },
    E: { label: 'EMOTIONAL', caption: 'EMOTIONAL DAMAGE!', speak: 'Emotional damage!', emoji: '💔😭', color: NEON.yellow, fx: 'comicShake', synth: 'slap' },
    R: { label: 'ROKDO!', caption: 'Ruko zara, sabar karo!', speak: 'Rooko zaraa, sabar karo!', speakHi: 'रुको ज़रा, सबर करो!', emoji: '✋🛑', color: NEON.purple, fx: 'glitch', synth: 'scratch', asset: 'scratch' },
    T: { label: 'THUG LIFE', caption: 'SWAG LEVEL 9999!', speak: 'Swag level max!', emoji: '🕶️🔥', color: NEON.green, fx: 'burst', synth: 'bass' },
    Y: { label: 'YE KYA HAI', caption: 'Bhai, ye kya ho gaya?!', speak: 'Bhaaee, yay kyaa ho gayaa?', speakHi: 'भाई, ये क्या हो गया?', emoji: '😵‍💫❓', color: NEON.blue, fx: 'aayein', synth: 'boing', asset: 'boing' },
    U: { label: 'ULLU BANAYA', caption: 'Ullu banaya bada maza aaya!', speak: 'Oolloo banaayaa badaa mazaa aayaa!', speakHi: 'उल्लू बनाया बड़ा मज़ा आया!', emoji: '🦉😜', color: NEON.pink, fx: 'emojis', synth: 'chirp' },
    I: { label: 'IDLI SAMBAR', caption: 'Bisi Bisi Idli + Chaos!', speak: 'Bisi bisi idli!', speakKn: 'ಬಿಸಿ ಬಿಸಿ ಇಡ್ಲಿ!', emoji: '🍛😋', color: NEON.cyan, fx: 'rings', synth: 'bell' },
    P: { label: 'PAISA BARBAD', caption: 'Paisa barbaad benstocks!', speak: 'Paisaa barbaad!', speakHi: 'पैसा बर्बाद!', emoji: '💸📉', color: NEON.green, fx: 'emojis', synth: 'wah' },
    D: { label: 'DHOKA!', caption: 'Dhoka ho gaya guru!', speak: 'Dhokaa ho gayaa gooroo!', speakHi: 'धोखा हो गया गुरु!', emoji: '🎭⚡', color: NEON.blue, fx: 'shockwave', synth: 'suspense', asset: 'suspense' },
    G: { label: 'GURUJI!', caption: 'Guruji ka pyaar barsega!', speak: 'Gooroojee kaa pyaar!', speakHi: 'गुरुजी का प्यार!', emoji: '🙏✨', color: NEON.purple, fx: 'rings', synth: 'chord' },
    J: { label: 'JUGAAD', caption: '100% Desi Jugaad Activated!', speak: 'Desi joogaad!', speakHi: 'देसी जुगाड़!', emoji: '🛠️😎', color: NEON.yellow, fx: 'burst', synth: 'arp' },
    L: { label: 'LMAO DED', caption: 'System Hang Ho Gaya!', speak: 'System hang ho gayaa!', speakHi: 'सिस्टम हैंग हो गया!', emoji: '💀💻', color: NEON.pink, fx: 'glitch', synth: 'glitch', asset: 'glitch' },
    Z: { label: 'ZABARDAST', caption: 'ZABARDAST COMBO!', speak: 'Zabardast!', speakHi: 'ज़बरदस्त!', emoji: '⚡🚀', color: NEON.purple, fx: 'party', synth: 'laser' },
    X: { label: 'X-TREME', caption: 'X-TREME MEME OVERLOAD!', speak: 'Extreme overload!', emoji: '☢️🔥', color: NEON.cyan, fx: 'shockwave', synth: 'explosion', asset: 'explosion' },
    C: { label: 'CHILL MAADI', caption: 'Chill maadi boss! Everything fine!', speak: 'Chill maadi boss!', speakKn: 'ಚಿಲ್ ಮಾಡಿ ಬಾಸ್!', emoji: '🧊😎', color: NEON.green, fx: 'rings', synth: 'chime' },
    V: { label: 'VIBE CHECK', caption: 'VIBE CHECK PASSED!', speak: 'Vibe check!', emoji: '🎶🕺', color: NEON.yellow, fx: 'party', synth: 'stab' },
    N: { label: 'NAANU EN?', caption: 'Naanu en madide?! (What did I do?)', speak: 'Naanoo yen maadiday?', speakKn: 'ನಾನು ಏನ್ ಮಾಡಿದೆ?', emoji: '🥺👉👈', color: NEON.blue, fx: 'aayein', synth: 'boing' },

    // --- Number Keys 1-0 ---
    '1': { label: 'EXPLOSION', caption: '1: Small Explosion!', speak: 'Boom!', emoji: '💥', color: NEON.orange, fx: 'comicShake', synth: 'explosion', asset: 'explosion' },
    '2': { label: 'CROWD LOL', caption: '2: Crowd Laughter!', speak: 'Ha ha ha ha!', emoji: '😂👏', color: NEON.yellow, fx: 'laughCircles', synth: 'laugh', asset: 'laugh_track' },
    '3': { label: 'SUSPENSE', caption: '3: Dramatic Suspense...', speak: 'Dunn dunn dunn!', emoji: '🕵️‍♂️🥁', color: NEON.purple, fx: 'shockwave', synth: 'suspense', asset: 'suspense' },
    '4': { label: 'BOING!', caption: '4: Cartoon Boing!', speak: 'Boing!', emoji: '🪀🌀', color: NEON.green, fx: 'rings', synth: 'boing', asset: 'boing' },
    '5': { label: 'SCRATCH', caption: '5: Record Scratch!', speak: 'Wait a minute!', emoji: '💿✋', color: NEON.pink, fx: 'glitch', synth: 'scratch', asset: 'scratch' },
    '6': { label: 'VICTORY!', caption: '6: Victory Fanfare!', speak: 'Victory!', emoji: '🏆🎉', color: NEON.cyan, fx: 'party', synth: 'victory', asset: 'victory' },
    '7': { label: 'FUNNY CRY', caption: '7: Funny Crying Wah-Wah!', speak: 'Wah wah waaah!', emoji: '😭🎻', color: NEON.blue, fx: 'emojis', synth: 'wah' },
    '8': { label: 'PARTY MODE', caption: '8: Instant Party Mode!', speak: 'Party time!', emoji: '🪩🎊', color: NEON.pink, fx: 'party', synth: 'chord' },
    '9': { label: 'MEGA GLITCH', caption: '9: MEGA GLITCH!', speak: 'Mega glitch!', emoji: '👾⚡', color: NEON.green, fx: 'glitch', synth: 'glitch', asset: 'glitch' },
    '0': { label: 'SURPRISE!', caption: '0: Random Meme Surprise!', emoji: '🎁🎲', color: NEON.yellow, fx: 'surprise', synth: 'arp' },

    // --- Special Keys ---
    SHIFT: { label: 'TURBO', caption: 'SHIFT: TURBO BOOST!', speak: 'Turbo boost!', emoji: '🚀⚡', color: NEON.orange, fx: 'burst', synth: 'laser' },
    ENTER: { label: 'DROP IT!', caption: 'ENTER: MEME CONFIRMED!', speak: 'Drop it!', emoji: '✅💥', color: NEON.green, fx: 'comicShake', synth: 'victory', asset: 'victory' },
    ARROWUP: { label: 'PITCH UP', caption: 'UP: HYPE RISING!', speak: 'Hype up!', emoji: '⬆️🔥', color: NEON.cyan, fx: 'rings', synth: 'riser' },
    ARROWDOWN: { label: 'SUB DROP', caption: 'DOWN: HEAVY SUB!', speak: 'Sub drop!', emoji: '⬇️🔊', color: NEON.purple, fx: 'shockwave', synth: 'bassDrop' },
    ARROWLEFT: { label: 'REWIND', caption: 'LEFT: REWIND THAT!', speak: 'Rewind!', emoji: '⏪💿', color: NEON.pink, fx: 'glitch', synth: 'scratch', asset: 'scratch' },
    ARROWRIGHT: { label: 'NEXT!', caption: 'RIGHT: NEXT MEME!', speak: 'Next meme!', emoji: '⏩😎', color: NEON.yellow, fx: 'emojis', synth: 'zap' }
  };

  const KEYBOARD_ROWS = [
    { cls: 'kb-row-num', keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
    { cls: 'kb-row-q', keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] },
    { cls: 'kb-row-a', keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'] },
    { cls: 'kb-row-z', keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] },
    { cls: 'kb-row-special', keys: ['SHIFT', ' ', 'ENTER', 'ARROWLEFT', 'ARROWUP', 'ARROWDOWN', 'ARROWRIGHT'] }
  ];

  const RANDOM_MEMES = [
    { text: 'Bhai, ye kya ho gaya?', emoji: '🤯', key: 'Y' },
    { text: 'Aayein? Baigan?', emoji: '🍆🤨', key: 'A' },
    { text: 'En guru idu?', emoji: '😎💛', key: 'K' },
    { text: 'Ayyo paapa!', emoji: '🥺💔', key: 'N' },
    { text: 'Bhai, system hang ho gaya!', emoji: '💻💀', key: 'L' },
    { text: 'Naanu en madide?', emoji: '🙃👉👈', key: 'N' },
    { text: 'Ab toh game bajega!', emoji: '🎮🔥', key: 'M' },
    { text: 'Chill maadi boss, sab set hai!', emoji: '🧊✌️', key: 'C' },
    { text: 'Ruko zara, sabar karo!', emoji: '✋😂', key: 'R' },
    { text: 'Paisa barbaad benstocks!', emoji: '💸😭', key: 'P' }
  ];

  const IMPOSSIBLE_TAUNTS = [
    'NOPE!',
    'TOO SLOW!',
    'PAKAD KE DIKHA!',
    'TRY AGAIN!',
    'MISS HO GAYA!',
    'EN GURU SLOW?'
  ];

  /* ==================== 2. STATE & LOCALSTORAGE ==================== */
  const STORAGE_KEY = 'meme_machine_exe_v1';
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  })();

  const state = {
    soundEnabled: false, // Disabled until user explicitly enables audio
    volume: typeof saved.volume === 'number' ? saved.volume : 0.8,
    intensity: typeof saved.intensity === 'number' ? saved.intensity : 0.85,
    mode: saved.mode || 'meme',
    reducedMotion: !!saved.reducedMotion,
    highScore: saved.highScore || 0,
    totalKeys: 0,
    totalMemes: 0,
    combo: 0,
    streak: 0,
    highestCombo: 0,
    chaos: 0,
    maxChaos: 0,
    chaosActive: false,
    liveDemo: false,
    impossibleAttempts: 0,
    secretsUnlocked: new Set(),
    pressedKeys: new Set(),
    keyCooldowns: new Map(),
    keySequence: [],
    spaceTimestamps: [],
    comboTimer: null,
    chaosTimer: null
  };

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        volume: state.volume,
        intensity: state.intensity,
        mode: state.mode,
        reducedMotion: state.reducedMotion,
        highScore: state.highScore
      }));
    } catch { /* ignore quota errors */ }
  }

  /* ==================== 3. DOM REFERENCES ==================== */
  const el = {
    introScreen: document.getElementById('intro-screen'),
    stageScreen: document.getElementById('stage-screen'),
    finalScreen: document.getElementById('final-screen'),
    appShell: document.getElementById('app-shell'),
    bgCanvas: document.getElementById('bg-canvas'),
    beatCanvas: document.getElementById('beat-visualizer'),
    fxOverlay: document.getElementById('fx-overlay'),
    toastContainer: document.getElementById('toast-container'),
    virtualKeyboard: document.getElementById('virtual-keyboard'),
    liveCaption: document.getElementById('live-caption'),
    djHypeMsg: document.getElementById('dj-hype-msg'),
    statCombo: document.getElementById('stat-combo'),
    statStreak: document.getElementById('stat-streak'),
    statBest: document.getElementById('stat-best'),
    statKeys: document.getElementById('stat-keys'),
    chaosFill: document.getElementById('chaos-fill'),
    chaosPct: document.getElementById('chaos-pct'),
    chaosBtn: document.getElementById('chaos-btn'),
    exitChaosBtn: document.getElementById('exit-chaos-btn'),
    secretsBadge: document.getElementById('secrets-badge'),
    audioUnlockBanner: document.getElementById('audio-unlock-banner'),
    soundQuickBtn: document.getElementById('sound-quick-btn'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    volumeSlider: document.getElementById('volume-slider'),
    volumeVal: document.getElementById('volume-val'),
    intensitySlider: document.getElementById('intensity-slider'),
    intensityVal: document.getElementById('intensity-val'),
    modeSelect: document.getElementById('mode-select'),
    reducedMotionBtn: document.getElementById('reduced-motion-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    resetPerfBtn: document.getElementById('reset-perf-btn'),
    liveDemoBtn: document.getElementById('live-demo-btn'),
    exitDemoBtn: document.getElementById('exit-demo-btn'),
    judgeBanner: document.getElementById('judge-banner'),
    endShowBtn: document.getElementById('end-show-btn'),
    enterUniverseBtn: document.getElementById('enter-universe-btn'),
    randomMemeBtn: document.getElementById('random-meme-btn'),
    randomMemeOutput: document.getElementById('random-meme-output'),
    impossibleStage: document.getElementById('impossible-stage'),
    impossibleBtn: document.getElementById('impossible-btn'),
    impossibleAttempts: document.getElementById('impossible-attempts'),
    impossibleStatus: document.getElementById('impossible-status'),
    finalKeys: document.getElementById('final-keys'),
    finalMemes: document.getElementById('final-memes'),
    finalCombo: document.getElementById('final-combo'),
    finalChaos: document.getElementById('final-chaos'),
    playAgainBtn: document.getElementById('play-again-btn'),
    enterMadnessBtn: document.getElementById('enter-madness-btn')
  };

  /* ==================== 4. WEB AUDIO ENGINE & PRELOADER ==================== */
  let audioCtx = null;
  let masterGain = null;
  let analyser = null;
  let freqData = null;
  const audioBuffers = new Map();
  const htmlAudioPool = new Map();
  let activeVoices = 0;
  const MAX_VOICES = 14;

  // Preload HTMLAudioElements so sounds also work when opened via file:// (where fetch is CORS-blocked)
  function preloadHtmlAudio() {
    for (const [name, url] of Object.entries(SOUND_ASSET_FILES)) {
      try {
        const a = new Audio(url);
        a.preload = 'auto';
        htmlAudioPool.set(name, a);
      } catch { /* ignore */ }
    }
  }
  preloadHtmlAudio();

  function ensureAudioContext() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = state.soundEnabled ? state.volume : 0;

      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.ratio.value = 6;

      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      freqData = new Uint8Array(analyser.frequencyBinCount);

      masterGain.connect(compressor);
      compressor.connect(analyser);
      analyser.connect(audioCtx.destination);
      preloadAudioAssets();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  async function preloadAudioAssets() {
    if (!audioCtx) return;
    const entries = Object.entries(SOUND_ASSET_FILES);
    for (const [name, url] of entries) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const arr = await res.arrayBuffer();
        const decoded = await audioCtx.decodeAudioData(arr);
        audioBuffers.set(name, decoded);
      } catch {
        // Fallback to Web Audio API synthesis when offline/file:// blocks fetch
      }
    }
  }

  function playBuffer(name, rate = 1) {
    if (audioBuffers.has(name) && audioCtx && masterGain) {
      if (activeVoices >= MAX_VOICES) return true;
      const src = audioCtx.createBufferSource();
      src.buffer = audioBuffers.get(name);
      src.playbackRate.value = rate;
      const g = audioCtx.createGain();
      g.gain.value = 0.85;
      src.connect(g);
      g.connect(masterGain);
      activeVoices++;
      src.onended = () => { activeVoices = Math.max(0, activeVoices - 1); };
      src.start();
      return true;
    }
    const baseAudio = htmlAudioPool.get(name);
    if (baseAudio) {
      try {
        const clone = baseAudio.cloneNode();
        clone.volume = Math.min(1, state.volume * 0.85);
        clone.playbackRate = rate;
        clone.play().catch(() => {});
        return true;
      } catch { /* fall through to synth */ }
    }
    return false;
  }

  function playSynth(type) {
    if (!audioCtx || !masterGain || activeVoices >= MAX_VOICES) return;
    const now = audioCtx.currentTime;
    activeVoices++;
    const releaseVoice = (dur) => {
      setTimeout(() => { activeVoices = Math.max(0, activeVoices - 1); }, dur * 1000);
    };

    const osc = (wave, f1, f2, dur, gainVal = 0.38) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = wave;
      o.frequency.setValueAtTime(f1, now);
      if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(Math.max(25, f2), now + dur);
      g.gain.setValueAtTime(gainVal, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      o.connect(g);
      g.connect(masterGain);
      o.start(now);
      o.stop(now + dur);
      releaseVoice(dur);
    };

    switch (type) {
      case 'bassDrop':
        osc('sine', 160, 34, 0.75, 0.75);
        osc('triangle', 95, 28, 0.65, 0.45);
        break;
      case 'horn':
        osc('sawtooth', 220, 205, 0.45, 0.35);
        osc('sawtooth', 277, 260, 0.45, 0.3);
        break;
      case 'riser':
        osc('sawtooth', 190, 880, 0.32, 0.3);
        break;
      case 'laugh':
        [0, 0.11, 0.22, 0.33].forEach((offset, i) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(460 - i * 45, now + offset);
          g.gain.setValueAtTime(0.32, now + offset);
          g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);
          o.connect(g);
          g.connect(masterGain);
          o.start(now + offset);
          o.stop(now + offset + 0.1);
        });
        releaseVoice(0.45);
        break;
      case 'chord':
      case 'victory':
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(f, now + idx * 0.06);
          g.gain.setValueAtTime(0.22, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
          o.connect(g);
          g.connect(masterGain);
          o.start(now + idx * 0.06);
          o.stop(now + 0.5);
        });
        releaseVoice(0.5);
        break;
      case 'boing':
        osc('sine', 180, 520, 0.35, 0.42);
        break;
      case 'scratch':
        osc('square', 640, 140, 0.22, 0.28);
        break;
      case 'glitch':
        osc('square', 880, 110, 0.18, 0.3);
        break;
      case 'wah':
        osc('sawtooth', 420, 260, 0.35, 0.28);
        break;
      case 'laser':
        osc('sawtooth', 980, 140, 0.25, 0.32);
        break;
      case 'dhol':
        osc('sine', 190, 75, 0.24, 0.55);
        osc('triangle', 320, 160, 0.14, 0.3);
        break;
      case 'brass':
      case 'stab':
        osc('sawtooth', 330, 310, 0.26, 0.34);
        break;
      case 'arp':
        [330, 440, 554, 659].forEach((f, i) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, now + i * 0.045);
          g.gain.setValueAtTime(0.24, now + i * 0.045);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.14);
          o.connect(g);
          g.connect(masterGain);
          o.start(now + i * 0.045);
          o.stop(now + i * 0.045 + 0.15);
        });
        releaseVoice(0.35);
        break;
      default:
        osc('triangle', 300 + Math.random() * 260, 160, 0.22, 0.34);
    }
  }

  let isSpeaking = false;
  let speechTimer = null;
  let speechWatchdog = null;
  const activeUtterances = [];
  const voiceBank = { hi: null, kn: null, enIn: null, fallback: null };

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;
    // Strictly prefer local (offline) voices so there is ZERO cloud/network lag
    const pickLocal = (regex) =>
      voices.find((v) => regex.test(v.lang) && v.localService) || null;

    voiceBank.hi = pickLocal(/hi[-_]IN/i);
    voiceBank.kn = pickLocal(/kn[-_]IN/i);
    voiceBank.enIn = pickLocal(/en[-_]IN/i);
    voiceBank.fallback =
      voiceBank.enIn ||
      voices.find((v) => /en/i.test(v.lang) && v.localService) ||
      voices.find((v) => v.localService) ||
      voices[0];
  }

  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
  }

  function warmUpSpeech() {
    if (!('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch { /* ignore */ }
  }

  function runUtterance(meta) {
    if (!state.soundEnabled || !('speechSynthesis' in window) || !meta) {
      isSpeaking = false;
      return;
    }

    let text = meta.speak;
    let voice = voiceBank.fallback;
    let lang = voice?.lang || 'en-IN';

    if (meta.speakHi && voiceBank.hi) {
      text = meta.speakHi;
      voice = voiceBank.hi;
      lang = voiceBank.hi.lang;
    } else if (meta.speakKn && voiceBank.kn) {
      text = meta.speakKn;
      voice = voiceBank.kn;
      lang = voiceBank.kn.lang;
    }

    if (!text) {
      isSpeaking = false;
      return;
    }

    try {
      isSpeaking = true;
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = lang;
      u.volume = Math.min(1, state.volume);
      u.rate = state.mode === 'madness' ? 1.18 : state.mode === 'chill' ? 0.96 : 1.06;
      u.pitch = meta.pitch || 1.05;

      activeUtterances.push(u);
      const finish = () => {
        clearTimeout(speechWatchdog);
        const idx = activeUtterances.indexOf(u);
        if (idx !== -1) activeUtterances.splice(idx, 1);
        isSpeaking = false;
      };

      u.onend = finish;
      u.onerror = () => {
        finish();
        if (voice !== voiceBank.fallback && meta.speak) {
          try {
            const fb = new SpeechSynthesisUtterance(meta.speak);
            if (voiceBank.fallback) fb.voice = voiceBank.fallback;
            fb.volume = Math.min(1, state.volume);
            fb.rate = 1.05;
            fb.pitch = meta.pitch || 1.05;
            activeUtterances.push(fb);
            fb.onend = () => {
              const i = activeUtterances.indexOf(fb);
              if (i !== -1) activeUtterances.splice(i, 1);
            };
            window.speechSynthesis.speak(fb);
          } catch { /* ignore */ }
        }
      };
      clearTimeout(speechWatchdog);
      speechWatchdog = setTimeout(finish, 3800);

      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.speak(u);
    } catch {
      isSpeaking = false;
    }
  }

  function speakMeme(meta) {
    if (!state.soundEnabled || !('speechSynthesis' in window) || !meta?.speak) return;
    if (!voiceBank.fallback) pickVoice();

    clearTimeout(speechTimer);
    if (isSpeaking || window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      activeUtterances.length = 0;
      isSpeaking = false;
      speechTimer = setTimeout(() => runUtterance(meta), 15);
    } else {
      runUtterance(meta);
    }
  }

  function playKeySound(meta) {
    if (!state.soundEnabled) return;
    ensureAudioContext();
    const rate = state.mode === 'madness' ? 1.12 : state.mode === 'chill' ? 0.92 : 1.0;
    if (window.MemeCustom?.play(meta, rate)) return;
    const playedAsset = meta.asset ? playBuffer(meta.asset, rate) : false;
    if (!playedAsset || meta.synth === 'bassDrop') {
      // Keep synth subtle when speech is playing so words are never drowned out
      if (!meta.speak || meta.synth === 'bassDrop') {
        playSynth(meta.synth || 'stab');
      } else {
        setTimeout(() => playSynth(meta.synth || 'stab'), 0);
      }
    }
    if (meta.speak) {
      speakMeme(meta);
    }
  }

  /* ==================== 5. CANVAS PARTICLES & VISUALIZER ==================== */
  const ctx = el.bgCanvas.getContext('2d');
  const beatCtx = el.beatCanvas.getContext('2d');
  const particles = [];
  const rings = [];
  const shapes = [];

  function resizeCanvas() {
    el.bgCanvas.width = window.innerWidth;
    el.bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function spawnCanvasBurst(color, count = 26, x = null, y = null) {
    const mult = state.reducedMotion ? 0.25 : state.intensity * (state.mode === 'madness' ? 1.5 : state.mode === 'chill' ? 0.5 : 1);
    const total = Math.max(4, Math.floor(count * mult));
    const cx = x ?? Math.random() * el.bgCanvas.width;
    const cy = y ?? Math.random() * el.bgCanvas.height * 0.75;

    for (let i = 0; i < total; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 8;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        r: 2 + Math.random() * 4.5,
        color,
        alpha: 1,
        decay: 0.018 + Math.random() * 0.02
      });
    }

    rings.push({
      x: cx,
      y: cy,
      r: 12,
      maxR: 160 + Math.random() * 220,
      color,
      alpha: 0.9
    });

    if (shapes.length < 40) {
      shapes.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: 16 + Math.random() * 34,
        rot: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.14,
        sides: [3, 4, 5, 6][Math.floor(Math.random() * 4)],
        color,
        alpha: 0.85
      });
    }
  }

  function renderCanvasLoop() {
    ctx.fillStyle = state.chaosActive ? 'rgba(8, 4, 18, 0.22)' : 'rgba(5, 5, 10, 0.24)';
    ctx.fillRect(0, 0, el.bgCanvas.width, el.bgCanvas.height);

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.alpha -= p.decay;
      if (p.alpha <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Expanding Rings
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      r.r += 9;
      r.alpha *= 0.93;
      if (r.alpha <= 0.03 || r.r >= r.maxR) { rings.splice(i, 1); continue; }
      ctx.globalAlpha = r.alpha;
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Rotating Geometric Shapes
    for (let i = shapes.length - 1; i >= 0; i--) {
      const s = shapes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.rot += s.vRot;
      s.alpha -= 0.015;
      if (s.alpha <= 0) { shapes.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let k = 0; k < s.sides; k++) {
        const a = (k / s.sides) * Math.PI * 2;
        const px = Math.cos(a) * s.size;
        const py = Math.sin(a) * s.size;
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // Beat Visualizer in HUD
    beatCtx.clearRect(0, 0, el.beatCanvas.width, el.beatCanvas.height);
    const bars = 20;
    const bw = el.beatCanvas.width / bars;
    if (analyser && state.soundEnabled && freqData) {
      analyser.getByteFrequencyData(freqData);
    }
    for (let i = 0; i < bars; i++) {
      const val = (analyser && state.soundEnabled && freqData)
        ? freqData[i % freqData.length] / 255
        : (state.combo > 0 ? Math.random() * 0.45 : 0.08);
      const h = Math.max(3, val * (el.beatCanvas.height - 4));
      beatCtx.fillStyle = i % 2 === 0 ? NEON.cyan : NEON.pink;
      beatCtx.fillRect(i * bw + 2, el.beatCanvas.height - h, bw - 4, h);
    }

    requestAnimationFrame(renderCanvasLoop);
  }
  requestAnimationFrame(renderCanvasLoop);

  /* ==================== 6. FULL-SCREEN DOM EXPLOSIONS ==================== */
  const MAX_FX_NODES = 28;

  function addFxNode(node, ttlMs = 1050) {
    if (el.fxOverlay.childElementCount >= MAX_FX_NODES) {
      el.fxOverlay.firstElementChild?.remove();
    }
    el.fxOverlay.appendChild(node);
    setTimeout(() => node.remove(), ttlMs);
  }

  function triggerShake(heavy = false) {
    if (state.reducedMotion || state.mode === 'chill') return;
    const cls = heavy ? 'screen-shake-heavy' : 'screen-shake';
    el.appShell.classList.remove('screen-shake', 'screen-shake-heavy');
    void el.appShell.offsetWidth;
    el.appShell.classList.add(cls);
    setTimeout(() => el.appShell.classList.remove(cls), 500);
  }

  function spawnFlyingEmojis(emojiStr, count = 8) {
    if (state.reducedMotion) return;
    const chars = Array.from(emojiStr);
    const total = state.mode === 'madness' ? count + 6 : count;
    for (let i = 0; i < total; i++) {
      const span = document.createElement('span');
      span.className = 'fx-emoji';
      span.textContent = chars[i % chars.length] || '🔥';
      span.style.left = `${20 + Math.random() * 60}%`;
      span.style.top = `${25 + Math.random() * 50}%`;
      span.style.setProperty('--dx', `${(Math.random() - 0.5) * 340}px`);
      span.style.setProperty('--dy', `${-80 - Math.random() * 220}px`);
      span.style.setProperty('--rot', `${(Math.random() - 0.5) * 360}deg`);
      addFxNode(span, 1100);
    }
  }

  function triggerVisualExplosion(keyName, meta) {
    const cx = el.bgCanvas.width * (0.25 + Math.random() * 0.5);
    const cy = el.bgCanvas.height * (0.2 + Math.random() * 0.45);
    spawnCanvasBurst(meta.color, meta.fx === 'bassDrop' ? 56 : 26, cx, cy);

    const scaleBoost = state.liveDemo ? 1.25 : 1;

    switch (meta.fx) {
      case 'fahhhh': {
        const d = document.createElement('div');
        d.className = 'fx-burst-text';
        d.textContent = 'FAHHHH!';
        d.style.color = meta.color;
        d.style.fontSize = `${4.5 * scaleBoost}rem`;
        d.style.left = '50%';
        d.style.top = '38%';
        addFxNode(d, 950);
        spawnFlyingEmojis('😱🔥', 8);
        triggerShake(false);
        break;
      }
      case 'comicShake': {
        const d = document.createElement('div');
        d.className = 'fx-comic-box';
        d.textContent = meta.caption;
        d.style.color = meta.color;
        d.style.fontSize = `${2 * scaleBoost}rem`;
        d.style.left = '50%';
        d.style.top = '34%';
        addFxNode(d, 1050);
        triggerShake(true);
        break;
      }
      case 'aayein': {
        const d = document.createElement('div');
        d.className = 'fx-burst-text';
        d.textContent = meta.caption;
        d.style.color = meta.color;
        d.style.fontSize = `${3.2 * scaleBoost}rem`;
        d.style.left = '50%';
        d.style.top = '35%';
        addFxNode(d, 950);
        for (let i = 0; i < 6; i++) {
          const q = document.createElement('div');
          q.className = 'fx-spinner';
          q.textContent = '❓';
          q.style.fontSize = '2.8rem';
          q.style.left = `${15 + i * 14}%`;
          q.style.top = `${20 + (i % 2) * 30}%`;
          addFxNode(q, 1000);
        }
        break;
      }
      case 'laughCircles':
        spawnFlyingEmojis('😂🤣👏', 12);
        spawnCanvasBurst(NEON.yellow, 24, el.bgCanvas.width * 0.3, el.bgCanvas.height * 0.35);
        spawnCanvasBurst(NEON.green, 24, el.bgCanvas.width * 0.7, el.bgCanvas.height * 0.35);
        break;
      case 'kannada': {
        const d = document.createElement('div');
        d.className = 'fx-comic-box';
        d.textContent = 'ಏನ್ ಗುರು ಇದು?! 😎';
        d.style.color = NEON.yellow;
        d.style.borderColor = NEON.pink;
        d.style.fontSize = `${2.5 * scaleBoost}rem`;
        d.style.left = '50%';
        d.style.top = '35%';
        addFxNode(d, 1100);
        spawnFlyingEmojis('💛❤️🔥', 10);
        break;
      }
      case 'bassDrop': {
        const d = document.createElement('div');
        d.className = 'fx-burst-text';
        d.textContent = 'BASS DROP!!';
        d.style.color = NEON.cyan;
        d.style.fontSize = `${4.8 * scaleBoost}rem`;
        d.style.left = '50%';
        d.style.top = '40%';
        addFxNode(d, 950);
        spawnCanvasBurst(NEON.pink, 40, el.bgCanvas.width * 0.5, el.bgCanvas.height * 0.45);
        triggerShake(true);
        break;
      }
      case 'party':
        spawnFlyingEmojis('🥳🎉🪩✨', 14);
        spawnCanvasBurst(NEON.pink, 25);
        spawnCanvasBurst(NEON.yellow, 25);
        break;
      case 'glitch':
        triggerShake(false);
        spawnFlyingEmojis('👾⚡💀', 8);
        break;
      default: {
        const d = document.createElement('div');
        d.className = 'fx-burst-text';
        d.textContent = meta.label;
        d.style.color = meta.color;
        d.style.fontSize = `${3 * scaleBoost}rem`;
        d.style.left = `${30 + Math.random() * 40}%`;
        d.style.top = `${22 + Math.random() * 30}%`;
        addFxNode(d, 900);
        spawnFlyingEmojis(meta.emoji, 6);
      }
    }
  }

  /* ==================== 7. BUILD VIRTUAL KEYBOARD ==================== */
  const keyButtons = new Map();

  function displayKeyText(k) {
    if (k === ' ') return 'SPACE';
    if (k === 'ARROWLEFT') return '←';
    if (k === 'ARROWUP') return '↑';
    if (k === 'ARROWDOWN') return '↓';
    if (k === 'ARROWRIGHT') return '→';
    return k;
  }

  function buildKeyboard() {
    el.virtualKeyboard.innerHTML = '';
    for (const row of KEYBOARD_ROWS) {
      const rowDiv = document.createElement('div');
      rowDiv.className = `kb-row ${row.cls}`;
      for (const k of row.keys) {
        const meta = KEY_MAP[k];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'k-btn';
        btn.dataset.key = k;
        btn.style.setProperty('--key-color', meta.color);

        const ch = document.createElement('span');
        ch.className = 'k-char';
        ch.textContent = displayKeyText(k);

        const lb = document.createElement('span');
        lb.className = 'k-label';
        lb.textContent = meta.label;

        btn.append(ch, lb);
        btn.addEventListener('click', () => {
          handleKeyTrigger(k);
        });
        rowDiv.appendChild(btn);
        keyButtons.set(k, btn);
      }
      el.virtualKeyboard.appendChild(rowDiv);
    }
  }

  /* ==================== 8. KEY TRIGGER, DJ COMBO & EASTER EGGS ==================== */
  function showToast(title, message) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<div class="toast-title">${title}</div><div>${message}</div>`;
    el.toastContainer.appendChild(t);
    setTimeout(() => t.remove(), 3900);
  }

  function unlockSecret(id, title, msg) {
    if (state.secretsUnlocked.has(id)) return;
    state.secretsUnlocked.add(id);
    el.secretsBadge.textContent = `🔮 SECRETS: ${state.secretsUnlocked.size}/4`;
    showToast(`🏆 SECRET UNLOCKED: ${title}`, msg);
    spawnFlyingEmojis('🏆🔥✨', 12);
  }

  function checkEasterEggs(keyName) {
    const now = performance.now();
    state.keySequence.push({ k: keyName, t: now });
    state.keySequence = state.keySequence.filter((item) => now - item.t < 2400);
    const seqStr = state.keySequence.map((item) => item.k).join('');

    // 1. F + A + H together (or rapid sequence)
    if ((state.pressedKeys.has('F') && state.pressedKeys.has('A') && state.pressedKeys.has('H')) || seqStr.endsWith('FAH')) {
      unlockSecret('fahhh', 'FAHHHH MODE', 'F+A+H detected! Maximum FAHHHH energy!');
      spawnCanvasBurst(NEON.pink, 45);
    }
    // 2. B + H + A + I
    if ((state.pressedKeys.has('B') && state.pressedKeys.has('H') && state.pressedKeys.has('A') && state.pressedKeys.has('I')) || seqStr.endsWith('BHAI')) {
      unlockSecret('bhai', 'BHAI MODE', 'B+H+A+I detected! Bhai ne full control le liya!');
      triggerShake(true);
    }
    // 3. K + A + N + N + A + D + A
    if (seqStr.endsWith('KANNADA')) {
      unlockSecret('kannada', 'KANNADA MODE', 'K-A-N-N-A-D-A! Namma Bengaluru DJ Mode!');
      spawnFlyingEmojis('💛❤️😎', 14);
    }
    // 4. SPACE x5
    if (keyName === ' ') {
      state.spaceTimestamps.push(now);
      state.spaceTimestamps = state.spaceTimestamps.filter((t) => now - t < 2500);
      if (state.spaceTimestamps.length >= 5) {
        state.spaceTimestamps = [];
        unlockSecret('party', 'PARTY MODE', '5x SPACEBAR! Full club mode activated!');
        spawnFlyingEmojis('🪩🥳🎉', 16);
      }
    }
  }

  function updateDjHype() {
    let msg = 'DROPPING FRESH MEMES';
    if (state.combo >= 25) msg = 'WARNING: TOO MUCH MEME ENERGY!';
    else if (state.combo >= 15) msg = 'NEIGHBOURS ARE CONFUSED!';
    else if (state.combo >= 10) msg = 'THIS DJ HAS NO CONTROL!';
    else if (state.combo >= 5) msg = `MEME COMBO x${state.combo}!`;
    el.djHypeMsg.textContent = msg;
  }

  function updateStatsUI() {
    el.statCombo.textContent = `x${state.combo}`;
    el.statStreak.textContent = String(state.streak);
    el.statBest.textContent = `x${state.highScore}`;
    el.statKeys.textContent = String(state.totalKeys);
    el.chaosFill.style.width = `${state.chaos}%`;
    el.chaosPct.textContent = `${state.chaos}%`;
  }

  function handleKeyTrigger(rawKey) {
    let keyName = rawKey;
    if (keyName === '0') {
      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randKey = alpha[Math.floor(Math.random() * alpha.length)];
      const randMeta = KEY_MAP[randKey];
      triggerVisualExplosion('0', { ...KEY_MAP['0'], caption: `0: Surprise → ${randMeta.caption}`, color: randMeta.color });
      playKeySound(randMeta);
      keyName = '0';
    }

    const meta = KEY_MAP[keyName];
    if (!meta) return;

    const now = performance.now();
    const last = state.keyCooldowns.get(keyName) || 0;
    if (now - last < 75) return;
    state.keyCooldowns.set(keyName, now);

    // Highlight virtual key
    const btn = keyButtons.get(keyName);
    if (btn) {
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 150);
    }

    // Update stats & combo
    state.totalKeys++;
    state.totalMemes++;
    state.combo++;
    state.streak++;
    if (state.combo > state.highestCombo) state.highestCombo = state.combo;
    if (state.combo > state.highScore) {
      state.highScore = state.combo;
      savePrefs();
    }

    clearTimeout(state.comboTimer);
    state.comboTimer = setTimeout(() => {
      state.combo = 0;
      updateDjHype();
      updateStatsUI();
    }, 2200);

    // Chaos boost
    if (state.chaosActive || state.mode === 'madness') {
      setChaos(Math.min(100, state.chaos + 4));
    } else {
      setChaos(Math.min(100, state.chaos + 1));
    }

    // Caption update
    el.liveCaption.innerHTML = `
      <span class="caption-key" style="border-color:${meta.color};color:${meta.color}">${displayKeyText(keyName)}</span>
      <span class="caption-text">${meta.caption}</span>
      <span class="caption-emoji">${meta.emoji}</span>
    `;
    el.liveCaption.classList.remove('pop');
    void el.liveCaption.offsetWidth;
    el.liveCaption.classList.add('pop');

    if (keyName !== '0') {
      playKeySound(meta);
      triggerVisualExplosion(keyName, meta);
    }

    checkEasterEggs(keyName);
    updateDjHype();
    updateStatsUI();
  }

  /* ==================== 9. CHAOS MODE & CONTROLS ==================== */
  function setChaos(val) {
    const prev = state.chaos;
    state.chaos = Math.max(0, Math.min(100, Math.round(val)));
    if (state.chaos > state.maxChaos) state.maxChaos = state.chaos;
    if (state.chaos === 100 && prev < 100) {
      showToast('🚨 100% CHAOS REACHED', 'CONGRATULATIONS. YOU HAVE OFFICIALLY LOST CONTROL OF THE KEYBOARD.');
    }
    updateStatsUI();
  }

  function startChaosMode() {
    state.chaosActive = true;
    document.body.classList.add('chaos-active');
    el.chaosBtn.classList.add('hidden');
    el.exitChaosBtn.classList.remove('hidden');
    clearInterval(state.chaosTimer);
    state.chaosTimer = setInterval(() => {
      if (!state.chaosActive) return;
      setChaos(state.chaos + 5);
      const colors = Object.values(NEON);
      spawnCanvasBurst(colors[Math.floor(Math.random() * colors.length)], 16);
    }, 450);
  }

  function stopChaosMode() {
    state.chaosActive = false;
    document.body.classList.remove('chaos-active');
    el.chaosBtn.classList.remove('hidden');
    el.exitChaosBtn.classList.add('hidden');
    clearInterval(state.chaosTimer);
  }

  function setSoundEnabled(enabled) {
    state.soundEnabled = enabled;
    if (enabled) {
      ensureAudioContext();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      activeUtterances.length = 0;
      isSpeaking = false;
    }
    if (masterGain && audioCtx) {
      masterGain.gain.value = enabled ? state.volume : 0;
    }
    el.audioUnlockBanner?.classList.toggle('hidden', enabled);
    el.soundQuickBtn.textContent = enabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
    el.soundQuickBtn.className = `btn-pill ${enabled ? 'btn-sound-on' : 'btn-sound-off'}`;
    el.soundToggleBtn.textContent = enabled ? 'SOUND: ON' : 'SOUND: OFF';
    el.soundToggleBtn.className = `btn-ctrl ${enabled ? 'on' : 'off'}`;
  }

  function applyMode(mode) {
    state.mode = mode;
    document.body.classList.remove('mode-chill', 'mode-meme', 'mode-madness');
    document.body.classList.add(`mode-${mode}`);
    el.modeSelect.value = mode;
    savePrefs();
  }

  function resetPerformance() {
    state.totalKeys = 0;
    state.totalMemes = 0;
    state.combo = 0;
    state.streak = 0;
    state.highestCombo = 0;
    state.maxChaos = 0;
    stopChaosMode();
    setChaos(0);
    el.djHypeMsg.textContent = 'PERFORMANCE RESET — READY!';
    updateStatsUI();
  }

  /* ==================== 10. MINI-GAMES & NAVIGATION ==================== */
  el.randomMemeBtn.addEventListener('click', () => {
    const pick = RANDOM_MEMES[Math.floor(Math.random() * RANDOM_MEMES.length)];
    el.randomMemeOutput.innerHTML = `<span class="rm-emoji">${pick.emoji}</span><span class="rm-text">"${pick.text}"</span>`;
    if (KEY_MAP[pick.key]) {
      playKeySound(KEY_MAP[pick.key]);
      spawnCanvasBurst(KEY_MAP[pick.key].color, 18);
    }
  });

  function dodgeImpossibleBtn() {
    state.impossibleAttempts++;
    el.impossibleAttempts.textContent = String(state.impossibleAttempts);
    const stageRect = el.impossibleStage.getBoundingClientRect();
    const btnRect = el.impossibleBtn.getBoundingClientRect();
    const maxX = Math.max(10, stageRect.width - btnRect.width - 12);
    const maxY = Math.max(10, stageRect.height - btnRect.height - 12);
    const nx = 6 + Math.random() * maxX;
    const ny = 6 + Math.random() * maxY;
    el.impossibleBtn.style.transform = 'none';
    el.impossibleBtn.style.left = `${nx}px`;
    el.impossibleBtn.style.top = `${ny}px`;
    el.impossibleBtn.textContent = IMPOSSIBLE_TAUNTS[Math.floor(Math.random() * IMPOSSIBLE_TAUNTS.length)];

    if (state.impossibleAttempts >= 15) el.impossibleStatus.textContent = 'Legendary Persistence! 😂';
    else if (state.impossibleAttempts >= 7) el.impossibleStatus.textContent = 'Pakad nahi paoge! 🏃';
    else el.impossibleStatus.textContent = 'Too slow!';
  }

  el.impossibleBtn.addEventListener('mouseenter', dodgeImpossibleBtn);
  el.impossibleBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dodgeImpossibleBtn();
  });

  function switchScreen(target) {
    [el.introScreen, el.stageScreen, el.finalScreen].forEach((s) => s.classList.remove('active'));
    target.classList.add('active');
  }

  // Intro preview keyboard animation
  const previewKeys = Array.from(document.querySelectorAll('#intro-keyboard-preview .pk'));
  setInterval(() => {
    if (!el.introScreen.classList.contains('active') || previewKeys.length === 0) return;
    const pk = previewKeys[Math.floor(Math.random() * previewKeys.length)];
    pk.classList.add('lit');
    setTimeout(() => pk.classList.remove('lit'), 320);
  }, 160);

  el.enterUniverseBtn.addEventListener('click', () => {
    switchScreen(el.stageScreen);
  });

  el.endShowBtn.addEventListener('click', () => {
    stopChaosMode();
    el.finalKeys.textContent = String(state.totalKeys);
    el.finalMemes.textContent = String(state.totalMemes);
    el.finalCombo.textContent = `x${state.highestCombo}`;
    el.finalChaos.textContent = `${state.maxChaos}%`;
    switchScreen(el.finalScreen);
  });

  el.playAgainBtn.addEventListener('click', () => {
    resetPerformance();
    switchScreen(el.stageScreen);
  });

  el.enterMadnessBtn.addEventListener('click', () => {
    resetPerformance();
    applyMode('madness');
    startChaosMode();
    switchScreen(el.stageScreen);
  });

  /* ==================== 11. EVENT LISTENERS ==================== */
  el.audioUnlockBanner?.addEventListener('click', () => {
    setSoundEnabled(true);
    playSynth('victory');
  });
  el.soundQuickBtn.addEventListener('click', () => setSoundEnabled(!state.soundEnabled));
  el.soundToggleBtn.addEventListener('click', () => setSoundEnabled(!state.soundEnabled));

  el.volumeSlider.addEventListener('input', (e) => {
    state.volume = Number(e.target.value) / 100;
    el.volumeVal.textContent = `${e.target.value}%`;
    if (masterGain && audioCtx && state.soundEnabled) {
      masterGain.gain.setTargetAtTime(state.volume, audioCtx.currentTime, 0.02);
    }
    savePrefs();
  });

  el.intensitySlider.addEventListener('input', (e) => {
    state.intensity = Number(e.target.value) / 100;
    el.intensityVal.textContent = `${e.target.value}%`;
    savePrefs();
  });

  el.modeSelect.addEventListener('change', (e) => applyMode(e.target.value));

  el.reducedMotionBtn.addEventListener('click', () => {
    state.reducedMotion = !state.reducedMotion;
    document.body.classList.toggle('reduced-motion', state.reducedMotion);
    el.reducedMotionBtn.textContent = state.reducedMotion ? 'MOTION: REDUCED' : 'MOTION: FULL';
    savePrefs();
  });

  el.fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  });

  el.resetPerfBtn.addEventListener('click', resetPerformance);
  el.chaosBtn.addEventListener('click', startChaosMode);
  el.exitChaosBtn.addEventListener('click', stopChaosMode);

  function toggleLiveDemo(on) {
    state.liveDemo = on;
    document.body.classList.toggle('live-demo-active', on);
    el.judgeBanner.classList.toggle('hidden', !on);
  }
  el.liveDemoBtn.addEventListener('click', () => toggleLiveDemo(!state.liveDemo));
  el.exitDemoBtn.addEventListener('click', () => toggleLiveDemo(false));

  // Physical keyboard listener (safe: never overrides Ctrl/Alt/Meta/Tab/F-keys)
  window.addEventListener('keydown', (e) => {
    if (!el.stageScreen.classList.contains('active')) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    const raw = e.key === ' ' ? ' ' : e.key.toUpperCase();
    if (!KEY_MAP[raw]) return;

    if (raw === ' ' || raw === 'ENTER' || raw.startsWith('ARROW')) {
      e.preventDefault();
    }
    if (e.repeat) return;

    state.pressedKeys.add(raw);
    handleKeyTrigger(raw);
  });

  window.addEventListener('keyup', (e) => {
    const raw = e.key === ' ' ? ' ' : e.key.toUpperCase();
    state.pressedKeys.delete(raw);
  });

  /* ==================== 12. INITIALIZE ==================== */
  window.MemeKeyMap = KEY_MAP;
  buildKeyboard();
  applyMode(state.mode);
  el.volumeSlider.value = String(Math.round(state.volume * 100));
  el.volumeVal.textContent = `${Math.round(state.volume * 100)}%`;
  el.intensitySlider.value = String(Math.round(state.intensity * 100));
  el.intensityVal.textContent = `${Math.round(state.intensity * 100)}%`;
  if (state.reducedMotion) {
    document.body.classList.add('reduced-motion');
    el.reducedMotionBtn.textContent = 'MOTION: REDUCED';
  }
  setSoundEnabled(false);
  updateStatsUI();
})();

