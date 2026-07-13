// ============================================================
// main.js
// Orchestrates the ocean, ripple sources, icon field, nav,
// modals, FPS badge, and resize handling.
// ============================================================

import { RippleField } from "./ripples.js";
import { createOcean } from "./ocean.js";
import { IconField } from "./icons.js";
import { open as openModal, initRouting } from "./modals.js";

const canvas     = document.getElementById("ocean-canvas");
const iconRoot   = document.getElementById("icon-field");
const loader     = document.getElementById("loader");
const loaderSub  = document.getElementById("loader-sub");
const badge      = document.getElementById("backend-badge");
const badgeName  = document.getElementById("backend-name");
const fpsEl      = document.getElementById("fps");
const cellsEl    = document.getElementById("cells");
const wgSepEl    = document.getElementById("wg-sep");
const wgInfoEl   = document.getElementById("wg-info");

const ripples = new RippleField();
let ocean = null;
let icons = null;

let viewportW = window.innerWidth;
let viewportH = window.innerHeight;

function setSize() {
  viewportW = window.innerWidth;
  viewportH = window.innerHeight;
  if (ocean) ocean.resize(viewportW, viewportH);
}

/* -------- Bootstrap -------- */
(async function boot() {
  try {
    canvas.width  = viewportW;
    canvas.height = viewportH;

    ocean = await createOcean(canvas, ripples, (msg) => {
      if (loaderSub) loaderSub.textContent = msg;
    });

    setSize();
    icons = new IconField(iconRoot, ripples);

    badgeName.textContent = ocean.backend;
    cellsEl.textContent = ocean.cells.toLocaleString();
    if (ocean.workgroups) {
      // One GPU thread per cell — surface the dispatch geometry so the
      // parallelism is visible, not implied.
      wgInfoEl.textContent =
        `${ocean.workgroups.toLocaleString()} workgroups × ${ocean.threadsPerWorkgroup} threads`;
    } else {
      wgSepEl?.remove();
      wgInfoEl?.remove();
    }
    badge.classList.remove("hidden");

    // Seed a gentle initial ripple so the ocean isn't completely still
    // while the user gets their bearings.
    ripples.splash(viewportW * 0.5, viewportH * 0.5, 0.5);
    setTimeout(() => ripples.splash(viewportW * 0.3, viewportH * 0.4, 0.35), 220);
    setTimeout(() => ripples.splash(viewportW * 0.7, viewportH * 0.6, 0.35), 430);

    loader.classList.add("gone");
    setTimeout(() => loader.remove(), 700);

    // Hash-based routing — deep links like /#/work open the right modal.
    initRouting();

    requestAnimationFrame(frame);
  } catch (err) {
    console.error("Boot failure:", err);
    if (loaderSub) {
      loaderSub.textContent = "No WebGPU / WebGL2 support: " + (err?.message || err);
      loaderSub.style.color = "#ff6b6b";
    }
  }
})();

/* -------- Interaction -------- */
window.addEventListener("pointermove", (ev) => {
  ripples.trackMouse(ev.clientX, ev.clientY);
}, { passive: true });

window.addEventListener("pointerdown", (ev) => {
  // Skip clicks landing on interactive chrome — icons, nav, modal content.
  // Everything else (open ocean, through the translucent hero) splashes.
  if (ev.target.closest(".icon, button, a, .modal, .modal-backdrop, input, textarea")) return;
  ripples.splash(ev.clientX, ev.clientY, 1.4);
}, { passive: true });

// Nav links
document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.open;
    if (id) openModal(id);
  });
});

window.addEventListener("resize", () => {
  // Debounce a tiny bit so fullscreen / DPR changes settle.
  clearTimeout(window.__resizeT);
  window.__resizeT = setTimeout(setSize, 80);
});

/* -------- Render loop -------- */
let last = performance.now();
let fpsAcc = 0;
let fpsFrames = 0;

function frame(now) {
  const dt = (now - last) / 1000;
  last = now;

  // Multiple sub-steps help the wave field stay responsive without
  // breaking CFL stability — courant² = 0.30 is safe at any fps.
  const SUB_STEPS = 2;
  for (let i = 0; i < SUB_STEPS; i++) {
    ocean.step(viewportW, viewportH);
  }
  ocean.render();
  icons.update(viewportW, viewportH);

  fpsAcc += dt;
  fpsFrames++;
  if (fpsAcc >= 0.5) {
    fpsEl.textContent = Math.round(fpsFrames / fpsAcc);
    fpsAcc = 0;
    fpsFrames = 0;
  }

  requestAnimationFrame(frame);
}
