# Sound Assets & Audio Licensing Documentation

**THE MEME MACHINE.EXE** uses 100% original, legally safe, royalty-free audio generated in real time via the **Web Audio API** (synthesizers, FM percussion, noise buffers, formant filters, sub-bass drops, arpeggios, and pitch-modulated Web Speech API vocal reactions), with optional `.wav` asset preloading support.

## Why Procedural Web Audio + Speech Synthesis?
1. **Zero Copyright Risk**: All sound effects and meme reactions are synthesized originally in-browser or spoken via the browser's built-in SpeechSynthesis engine—no copyrighted Bollywood, film, or viral audio clips are redistributed.
2. **Offline Ready**: Works 100% offline immediately after page load with zero external network dependencies.
3. **Zero Latency & Polyphonic**: Simultaneous key presses stack cleanly with automatic voice-limiting and cooldowns so rapid DJ remixing never clips.

## Custom User Audio Overrides
If you wish to drop in your own legally cleared `.wav` or `.mp3` files (e.g. `f.wav`, `b.wav`, `space.wav`), place them in this directory (`assets/sounds/`) and register their filenames in `SOUND_ASSET_FILES` inside `script.js`. If any file is missing or fails to load, the engine automatically falls back to its built-in Web Audio API synthesizer.

