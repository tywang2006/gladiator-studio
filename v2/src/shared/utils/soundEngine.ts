/**
 * Synthesized StarCraft-style sci-fi sound engine using Web Audio API.
 * No external audio files needed — all sounds generated programmatically.
 *
 * Sounds: ambient drone, button hover, button click, panel open/close,
 *         alert ping, transmission beep, warp whoosh.
 */

// ─── Singleton AudioContext (lazy init on first user gesture) ─────────────────

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambientSource: AudioBufferSourceNode | null = null;
let ambientRunning = false;
let muted = false;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.35;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function getMaster(): GainNode {
  getCtx();
  return masterGain!;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function createOsc(
  type: OscillatorType,
  freq: number,
  duration: number,
  gainValue: number,
  detune = 0,
): { osc: OscillatorNode; gain: GainNode } {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  gain.gain.value = gainValue;
  osc.connect(gain);
  gain.connect(getMaster());
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
  return { osc, gain };
}

function noise(duration: number, volume: number): AudioBufferSourceNode {
  const ac = getCtx();
  const len = Math.floor(ac.sampleRate * duration);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = (Math.random() * 2 - 1) * volume;
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  const gain = ac.createGain();
  gain.gain.value = 1;
  src.connect(gain);
  gain.connect(getMaster());
  src.start(ac.currentTime);
  src.stop(ac.currentTime + duration);
  return src;
}

// ─── Sound effects ───────────────────────────────────────────────────────────

/** Subtle hover beep — like SC menu hover */
function playHover(): void {
  if (muted) return;
  const { gain } = createOsc('sine', 1800, 0.06, 0.08);
  const ac = getCtx();
  gain.gain.setValueAtTime(0.08, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);
}

/** Button click — crisp SC-style confirmation */
function playClick(): void {
  if (muted) return;
  const ac = getCtx();
  // Primary click tone
  const { gain: g1 } = createOsc('square', 800, 0.08, 0.06);
  g1.gain.setValueAtTime(0.06, ac.currentTime);
  g1.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
  // Harmonic overtone
  const { gain: g2 } = createOsc('sine', 1600, 0.06, 0.04);
  g2.gain.setValueAtTime(0.04, ac.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);
}

/** Panel open — ascending sweep + bass thud */
function playPanelOpen(): void {
  if (muted) return;
  const ac = getCtx();
  // Sweep up
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(200, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(0.06, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.25);
  osc.connect(gain);
  gain.connect(getMaster());
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.25);
  // Sub bass thump
  const { osc: sub, gain: sg } = createOsc('sine', 60, 0.2, 0.12);
  sg.gain.setValueAtTime(0.12, ac.currentTime);
  sg.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
  sub.frequency.exponentialRampToValueAtTime(30, ac.currentTime + 0.2);
  // Noise burst
  noise(0.05, 0.06);
}

/** Panel close — descending sweep */
function playPanelClose(): void {
  if (muted) return;
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(900, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(0.05, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(getMaster());
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.2);
}

/** Transmission beep — like incoming data in SC */
function playTransmission(): void {
  if (muted) return;
  const ac = getCtx();
  for (let i = 0; i < 3; i++) {
    const t = ac.currentTime + i * 0.08;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200 + i * 200;
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(getMaster());
    osc.start(t);
    osc.stop(t + 0.06);
  }
}

/** Alert ping — for win events */
function playAlert(): void {
  if (muted) return;
  const ac = getCtx();
  // High ping
  const { gain: g1 } = createOsc('sine', 2400, 0.3, 0.07);
  g1.gain.setValueAtTime(0.07, ac.currentTime);
  g1.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
  // Harmony
  const { gain: g2 } = createOsc('sine', 3200, 0.2, 0.04);
  g2.gain.setValueAtTime(0.04, ac.currentTime + 0.05);
  g2.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
}

/** Big win fanfare */
function playBigWin(): void {
  if (muted) return;
  const ac = getCtx();
  const notes = [800, 1000, 1200, 1600];
  notes.forEach((freq, i) => {
    const t = ac.currentTime + i * 0.1;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(getMaster());
    osc.start(t);
    osc.stop(t + 0.25);
  });
}

// ─── Ambient background drone ────────────────────────────────────────────────

function startAmbient(): void {
  if (ambientRunning || muted) return;
  const ac = getCtx();

  // Generate a looping ambient buffer: deep drone + subtle harmonic movement
  const duration = 8;
  const len = Math.floor(ac.sampleRate * duration);
  const buf = ac.createBuffer(2, len, ac.sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const t = i / ac.sampleRate;
      // Deep bass drone (40Hz)
      const drone = Math.sin(2 * Math.PI * 40 * t) * 0.03;
      // Sub harmonic sweep (slowly modulated)
      const sweep = Math.sin(2 * Math.PI * (55 + Math.sin(t * 0.3) * 8) * t) * 0.02;
      // High shimmer
      const shimmer = Math.sin(2 * Math.PI * 220 * t) * Math.sin(t * 0.5) * 0.008;
      // Filtered noise texture
      const tex = (Math.random() * 2 - 1) * 0.004;
      // Stereo offset
      const offset = ch === 0 ? Math.sin(t * 0.7) * 0.005 : Math.cos(t * 0.7) * 0.005;

      data[i] = drone + sweep + shimmer + tex + offset;
    }
  }

  ambientSource = ac.createBufferSource();
  ambientSource.buffer = buf;
  ambientSource.loop = true;

  // Gentle fade in
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(1, ac.currentTime + 3);

  ambientSource.connect(gain);
  gain.connect(getMaster());
  ambientSource.start();
  ambientRunning = true;
}

function stopAmbient(): void {
  if (ambientSource) {
    try { ambientSource.stop(); } catch { /* already stopped */ }
    ambientSource = null;
  }
  ambientRunning = false;
}

// ─── Volume & mute control ───────────────────────────────────────────────────

function setVolume(v: number): void {
  if (masterGain) {
    masterGain.gain.value = Math.max(0, Math.min(1, v));
  }
}

function toggleMute(): boolean {
  muted = !muted;
  if (muted) {
    stopAmbient();
    if (masterGain) masterGain.gain.value = 0;
  } else {
    if (masterGain) masterGain.gain.value = 0.35;
    startAmbient();
  }
  return muted;
}

function isMuted(): boolean {
  return muted;
}

// ─── Public API (immutable object) ───────────────────────────────────────────

export const soundEngine = Object.freeze({
  hover: playHover,
  click: playClick,
  panelOpen: playPanelOpen,
  panelClose: playPanelClose,
  transmission: playTransmission,
  alert: playAlert,
  bigWin: playBigWin,
  startAmbient,
  stopAmbient,
  setVolume,
  toggleMute,
  isMuted,
});
