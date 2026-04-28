// ============================================================
// modals.js
// Glass-morphism modals + hash routing so every section is a
// shareable URL: /#/work, /#/projects, /#/about, etc.
// ============================================================

import { CONTENT } from "./content.js";

const root = () => document.getElementById("modal-root");

let active = null;           // { id, backdrop, modal, onKey }
let suppressHashChange = false;

function buildBackdrop() {
  const bd = document.createElement("div");
  bd.className = "modal-backdrop";
  bd.addEventListener("click", () => close());
  return bd;
}

function buildModal(id, data) {
  const m = document.createElement("div");
  m.className = "modal";
  m.setAttribute("role", "dialog");
  m.setAttribute("aria-modal", "true");
  m.setAttribute("aria-labelledby", `modal-title-${id}`);
  m.innerHTML = `
    <div class="modal-head">
      <div class="modal-head-text">
        <div class="modal-eyebrow">${data.eyebrow}</div>
        <h2 class="modal-title" id="modal-title-${id}">${data.title}</h2>
      </div>
      <button class="modal-close" aria-label="Close">×</button>
    </div>
    <div class="modal-body">${data.html}</div>
  `;
  m.querySelector(".modal-close").addEventListener("click", () => close());
  return m;
}

export function open(id, { updateHash = true } = {}) {
  const data = CONTENT[id];
  if (!data) return;
  if (active && active.id === id) return;
  if (active) close({ updateHash: false });

  const r = root();
  r.innerHTML = "";
  const bd = buildBackdrop();
  const m = buildModal(id, data);
  r.appendChild(bd);
  r.appendChild(m);
  active = { id, backdrop: bd, modal: m };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bd.classList.add("show");
      m.classList.add("show");
    });
  });
  document.body.classList.add("modal-open");

  const onKey = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  active.onKey = onKey;

  if (updateHash) {
    const target = `#/${id}`;
    if (location.hash !== target) {
      suppressHashChange = true;
      location.hash = target;
      setTimeout(() => { suppressHashChange = false; }, 0);
    }
  }
}

export function close({ updateHash = true } = {}) {
  if (!active) return;
  const { backdrop, modal, onKey } = active;
  backdrop.classList.remove("show");
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onKey);
  const b = backdrop;
  setTimeout(() => {
    if (root().contains(b)) root().innerHTML = "";
  }, 450);
  active = null;

  if (updateHash && location.hash && location.hash !== "#") {
    suppressHashChange = true;
    history.replaceState(null, "", location.pathname + location.search);
    setTimeout(() => { suppressHashChange = false; }, 0);
  }
}

export function isOpen() { return active !== null; }

export function initRouting() {
  const resolve = () => {
    if (suppressHashChange) return;
    const id = location.hash.replace(/^#\/?/, "").trim();
    if (id && CONTENT[id]) {
      open(id, { updateHash: false });
    } else if (active) {
      close({ updateHash: false });
    }
  };
  resolve();
  window.addEventListener("hashchange", resolve);
}
