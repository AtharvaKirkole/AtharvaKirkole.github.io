# Atharva Kirkole — Personal Site

Personal portfolio for [Atharva Kirkole](https://linkedin.com/in/atharva-kirkole), MS Computer Science at Michigan State University. Seven glass-morphism icons floating on a real-time GPU ocean — every icon is a deep-linkable section.

> ∂²u/∂t² = c²∇²u running on your GPU, with React-free vanilla ES modules on top.

## Tech

- **WebGPU compute shaders** for the wave-equation PDE — finite-difference stencil on `r32float` ping-pong textures, 8×8 workgroups, single-pass step.
- **WebGL2 fragment-shader fallback** on `RGBA16F` render targets for non-WebGPU browsers (Firefox, older Safari).
- **CFL-stable** time integration (`courant² = 0.30 < 0.5` in 2D), absorbing edge boundaries via smoothstep mask.
- **Analytical CPU companion** (`ripples.js`) lets the DOM icons bob in sync with the GPU surface — no readback needed.
- **Hash-based routing** — every section is a shareable URL: `/#/work`, `/#/projects`, `/#/research`, etc.
- **Glass-morphism UI** — `backdrop-filter: blur()` on icons, modals, header, badges.
- **Zero dependencies.** Pure ES modules. No build step.

The wave simulation is published as a standalone library: **[ocean-webgpu](https://github.com/kirkolea/ocean-webgpu)**.

## Run locally

ES modules don't load over `file://`, so serve over HTTP:

```bash
python -m http.server 8080
# or
npx http-server -p 8080
```

Open <http://localhost:8080>.

## Deploy

The site is fully static — drop it on any host:

| Host | Cost | Notes |
|------|------|-------|
| **GitHub Pages** | free | enable in repo settings → Pages → main branch / root |
| **Cloudflare Pages** | free | best CDN performance, just point at this repo |
| **Netlify** | free | drag-and-drop the folder or connect the repo |
| **Vercel** | free | also good for static sites |

For a custom domain (~$10–15/yr), Cloudflare Registrar or Namecheap.

## Project layout

```
.
├── index.html        # site shell
├── css/main.css      # all styling — glass-morphism, modals, icons, hero
├── js/
│   ├── main.js       # bootstrap + render loop + input
│   ├── ocean.js      # GPU wave simulation (WebGPU + WebGL2)
│   ├── ripples.js    # CPU ripple-source list + analytical sampler
│   ├── icons.js      # 7 floating icons, hash-routed
│   ├── modals.js     # glass-morphism modals + #/<id> routing
│   └── content.js    # all section copy (about, work, projects, …)
└── assets/
    ├── resume.pdf    # CV (linked from header + several modal CTAs)
    ├── about-photo.jpg
    └── …             # role-gallery photos (see content.js for slot names)
```

## Filling in media

Each role / project / hobby card has a `<div class="media-frame"><span class="media-glyph">…</span></div>` placeholder rendered by the `mediaCard()` helper in `js/content.js`. To use a real image, replace the inner `<div>` with:

```html
<div class="media-frame"><img src="assets/work-heardai-app.jpg" alt="…"></div>
```

…or for video:

```html
<div class="media-frame">
  <video src="assets/hobby-basketball-clip.mp4" autoplay muted loop playsinline></video>
</div>
```

See the comments in `js/content.js` for the suggested filenames per slot.

## License

MIT — see [LICENSE](LICENSE).
