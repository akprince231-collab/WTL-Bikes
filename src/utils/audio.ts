/**
 * Pure Web Audio API procedural sound engine for authentic bicycle audio.
 * Generates mechanical freehub clicks and subtle wind whoosh without external assets.
 */

let audioCtx: AudioContext | null = null;
let isAudioEnabled = false;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setAudioEnabled(enabled: boolean) {
  isAudioEnabled = enabled;
  if (enabled) {
    getAudioContext();
  }
}

export function isAudioOn(): boolean {
  return isAudioEnabled;
}

/**
 * Procedural authentic mechanical bicycle freehub ratchet click
 */
export function playFreehubClick(pitch = 1) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1400 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(320 * pitch, now + 0.012);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.014);
}

/**
 * Subtle aerodynamic wind rush effect
 */
export function playWindWhoosh() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.25;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(600, ctx.currentTime);
  filter.Q.setValueAtTime(1.5, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.018, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
}
