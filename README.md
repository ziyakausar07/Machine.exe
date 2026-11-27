# THE MEME MACHINE.EXE
### The Infinite Kannada / Hindi Meme Keyboard
**"PRESS A KEY. RELEASE THE MEME. DESTROY THE SILENCE."**

An interactive, Patatap-inspired full-screen Hindi & Kannada meme DJ soundboard built with **HTML5, CSS3, and Vanilla JavaScript** for the college **FUNNY WEBSITE CREATION** competition.

## Features
- **Cinematic Intro & Final Summary Screens**: Animated preview keyboard, live performance stats (keys pressed, memes triggered, highest combo, max chaos), and `[ PLAY AGAIN ]` / `[ ENTER TOTAL MADNESS ]`.
- **Full Interactive Meme Keyboard**: All `A–Z`, `0–9`, `SPACEBAR`, `SHIFT`, `ENTER`, and `Arrow` keys mapped to unique neon colors, custom animations, and synthesized/spoken meme reactions.
- **Iconic Hindi & Kannada Mapping**:
  - `F` → `"FAHHHH!"`
  - `B` → `"Bhai, maaro mujhe maaro!"`
  - `A` → `"AAYEIN?"`
  - `S` → Sadhu Kokila-style laughter
  - `M` → `"MAZA AAYA?"`
  - `K` → `"ಏನ್ ಗುರು ಇದು?!"` (Kannada funny dialogue)
  - `H` → `"HAAN BHAI HAAN!"`
  - `O` → `"OH BHAI!"`
  - `SPACEBAR` → Full-screen Bass Drop
- **Meme DJ Mode & Chaos Mode**: Live combo/streak counters, real-time Canvas beat visualizer, Chaos Level meter (`0%–100%`), and `[ ACTIVATE MAXIMUM CHAOS ]`.
- **Live Demo Mode**: One-click judge presentation mode (`"JUDGES, PRESS ANY KEY!"`) that hides extra panels and expands the stage.
- **Mini-Games**:
  - **Random Meme Generator**: `"WHAT WILL YOUR NEXT KEY SAY?"`
  - **Impossible Button Challenge**: `[ CLICK ME IF YOU CAN ]`
- **Secret Easter Eggs**:
  - `F + A + H` → **FAHHHH MODE**
  - `B + H + A + I` → **BHAI MODE**
  - `K + A + N + N + A + D + A` → **KANNADA MODE**
  - `SPACE` x5 → **PARTY MODE**

## Project Structure
- `index.html` — Intro screen, main performance stage, virtual keyboard, control panel, mini-games, and final summary screen.
- `style.css` — Neon Meme Universe styling, glitch effects, keyframe animations, and responsive mobile/tablet layout.
- `script.js` — Web Audio API synthesizer + WAV preloader, SpeechSynthesis voice reactions, Canvas particle/visualizer engine, keyboard listener, DJ/Chaos logic, and LocalStorage persistence.
- `assets/sounds/` — Original synthesized `.wav` sound effects (`bass_drop.wav`, `explosion.wav`, `boing.wav`, `scratch.wav`, `victory.wav`, `glitch.wav`, `suspense.wav`, `laugh_track.wav`) and audio licensing documentation.
- `assets/images/` — Custom neon SVG logo and favicon.

## Audio & Licensing
All audio is 100% original and royalty-free: generated via the included synthesized `.wav` assets in `assets/sounds/` plus real-time Web Audio API synthesis and browser SpeechSynthesis. Sound starts **OFF** by default and activates when the user clicks **SOUND: OFF** to enable audio.

