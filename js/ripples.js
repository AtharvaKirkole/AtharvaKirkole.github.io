// ============================================================
// ripples.js
// Shared ripple source tracker. Both the GPU wave simulation
// and the CPU-side icon displacement read from this stream, so
// what you see on screen and how the icons bob are driven by
// the exact same mouse events.
// ============================================================

const MAX_SOURCES = 32;

export class RippleField {
  constructor() {
    this.sources = [];   // {x, y, t0, amp, freq, speed, decay}
    this.mousePx = { x: -1e9, y: -1e9 };
    this.lastInjectTime = 0;
    this.injectInterval = 0.028; // seconds between continuous drip sources
    this.timeStart = performance.now() / 1000;
  }

  now() {
    return performance.now() / 1000 - this.timeStart;
  }

  // Continuously-driven trail while the mouse moves.
  trackMouse(xPx, yPx) {
    this.mousePx.x = xPx;
    this.mousePx.y = yPx;
    const t = this.now();
    if (t - this.lastInjectTime > this.injectInterval) {
      this.spawn(xPx, yPx, { amp: 0.30, freq: 7.0, speed: 210, decay: 1.7 });
      this.lastInjectTime = t;
    }
  }

  // A big splash (click, icon select).
  splash(xPx, yPx, strength = 1.0) {
    this.spawn(xPx, yPx, {
      amp: 1.3 * strength,
      freq: 5.5,
      speed: 250,
      decay: 0.9,
    });
  }

  spawn(x, y, { amp, freq, speed, decay }) {
    this.sources.push({
      x, y,
      t0: this.now(),
      amp, freq, speed, decay,
    });
    if (this.sources.length > MAX_SOURCES) {
      this.sources.splice(0, this.sources.length - MAX_SOURCES);
    }
  }

  gc() {
    const t = this.now();
    this.sources = this.sources.filter((s) => (t - s.t0) * s.decay < 6);
  }

  // Analytical superposition: each ripple is a decaying radial wave
  //   h(r, t) = amp * exp(-decay*dt) * sin(freq*dt - k*r) * falloff(r)
  // falloff uses a Gaussian-times-sinc envelope so icons only move
  // once the wavefront reaches them, and damp out past it.
  sampleHeight(xPx, yPx) {
    const t = this.now();
    let h = 0;
    for (let i = 0; i < this.sources.length; i++) {
      const s = this.sources[i];
      const dt = t - s.t0;
      if (dt < 0) continue;
      const dx = xPx - s.x;
      const dy = yPx - s.y;
      const r = Math.sqrt(dx * dx + dy * dy);
      const wavefront = s.speed * dt;
      const distFromFront = r - wavefront;
      // Envelope: sharpest at front, fades in front and behind.
      const sigma = 130;
      const envelope = Math.exp(-(distFromFront * distFromFront) / (2 * sigma * sigma));
      const decayF = Math.exp(-s.decay * dt);
      // Physical angular wavenumber: k = ω / v. A wavelength of 2π·v/ω.
      const k = s.freq / Math.max(s.speed, 1);
      const phase = s.freq * dt - k * r;
      h += s.amp * decayF * envelope * Math.sin(phase) / (1 + r * 0.003);
    }
    return h;
  }
}
