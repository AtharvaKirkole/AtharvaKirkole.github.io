// ============================================================
// icons.js
// Seven themed icons floating in the ocean. Each one bobs on
// the analytical ripple field (ripples.js) and routes to a
// dedicated section via hash URL when clicked.
// ============================================================

import { open as openModal } from "./modals.js";

export const ICONS = [
  // Upper arc — identity, learning, recognition
  { modal: "about",         x: 0.18, y: 0.22, letters: "AK",  label: "About Me",         variant: "mag" },
  { modal: "education",     x: 0.50, y: 0.14, glyph: "🎓",    label: "Education" },
  { modal: "achievements",  x: 0.82, y: 0.22, glyph: "🏆",    label: "Achievements",     variant: "gold" },

  // Sides — applied work
  { modal: "work",          x: 0.05, y: 0.55, glyph: "💼",    label: "Work Experience" },
  { modal: "research",      x: 0.95, y: 0.55, glyph: "🔬",    label: "Research",         variant: "warm" },

  // Lower arc — what I build, what I love
  { modal: "projects",      x: 0.30, y: 0.85, glyph: "💻",    label: "Projects" },
  { modal: "hobbies",       x: 0.70, y: 0.85, glyph: "🏀",    label: "Hobbies" },
];

const DISPLACEMENT = 20;
const SLOPE_TILT   = 14;
const SLOPE_SAMPLE = 34;

export class IconField {
  constructor(root, ripples) {
    this.root = root;
    this.ripples = ripples;
    this.items = [];
    this._buildDOM();
    this._bindClicks();
  }

  _buildDOM() {
    this.root.innerHTML = "";
    for (let i = 0; i < ICONS.length; i++) {
      const cfg = ICONS[i];
      const el = document.createElement("button");
      el.className = "icon";
      if (cfg.variant) el.classList.add(`variant-${cfg.variant}`);
      el.setAttribute("aria-label", cfg.label);
      el.dataset.modal = cfg.modal;

      if (cfg.letters) {
        el.innerHTML = `<span class="letters">${cfg.letters}</span><span class="label">${cfg.label}</span>`;
      } else {
        el.innerHTML = `<span class="glyph">${cfg.glyph}</span><span class="label">${cfg.label}</span>`;
      }
      this.root.appendChild(el);
      this.items.push({
        cfg,
        el,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  _bindClicks() {
    this.root.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".icon");
      if (!btn) return;
      const modal = btn.dataset.modal;
      const rect = btn.getBoundingClientRect();
      this.ripples.splash(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.3);
      openModal(modal);
    });
  }

  update(viewportW, viewportH) {
    const t = this.ripples.now();
    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i];
      const x = it.cfg.x * viewportW;
      const y = it.cfg.y * viewportH;
      const h  = this.ripples.sampleHeight(x, y);
      const hL = this.ripples.sampleHeight(x - SLOPE_SAMPLE, y);
      const hR = this.ripples.sampleHeight(x + SLOPE_SAMPLE, y);
      const slope = (hR - hL) * 0.5;

      const base = Math.sin(t * 0.9 + it.phase) * 2.0;
      const dy = h * DISPLACEMENT + base;
      const tilt = slope * SLOPE_TILT;
      it.el.style.transform =
        `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${(y + dy).toFixed(1)}px) rotate(${tilt.toFixed(2)}deg)`;
    }
  }
}
