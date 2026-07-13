// ============================================================
// ocean.js  ·  powered by the ocean-webgpu library
// github.com/AtharvaKirkole/ocean-webgpu
//
// GPU wave-equation simulation.
//   ∂²u/∂t² = c² ∇²u    (discrete, 2D, absorbing boundaries)
//
// Primary backend: WebGPU compute pipeline using a cooperative
//   shared-memory tiled kernel — every 16×16 workgroup stages an
//   18×18 haloed tile into on-chip var<workgroup> memory behind a
//   workgroupBarrier(), then runs the 5-point stencil entirely out
//   of shared memory (the same __shared__ halo-tile pattern used in
//   CUDA stencil solvers). One GPU thread per grid cell.
// Fallback backend: WebGL2 fragment-shader ping-pong.
//
// Both backends consume the same RippleField source list each
// frame (mouse trail + click splashes), so the image and the
// icon-bobbing stay coherent.
// ============================================================

const MAX_SOURCES_PER_FRAME = 24;
const GRID_CELLS_TARGET = 600 * 600;
const GRID_MAX_DIM = 1024;
const COURANT2 = 0.30;   // (c·dt/dx)^2 — must be < 0.5 for 2D stability
const DAMPING = 0.0012;

// Compute-kernel geometry: 16×16 = 256 threads per workgroup.
const TILE_W = 16;
const THREADS_PER_WG = TILE_W * TILE_W;

/* --------------------------------------------------------------------------
 * WGSL SHADERS
 * -------------------------------------------------------------------------- */

const WAVE_STEP_WGSL = /* wgsl */`
struct Params {
  resolution   : vec2<u32>,
  courant2     : f32,
  damping      : f32,
  srcCount     : u32,
  _pad0        : u32,
  _pad1        : u32,
  _pad2        : u32,
};

struct Source {
  pos    : vec2<f32>,   // pixel coords in grid space
  amp    : f32,
  radius : f32,
};

@group(0) @binding(0) var inTex     : texture_2d<f32>;           // .r=curr .g=prev
@group(0) @binding(1) var outTex    : texture_storage_2d<rgba16float, write>;
@group(0) @binding(2) var<uniform>         params  : Params;
@group(0) @binding(3) var<storage, read>   sources : array<Source>;

const TILE_W : u32 = 16u;   // main tile edge (= workgroup edge)
const HALO   : u32 = 1u;    // 5-point stencil needs a 1-cell halo
const TS     : u32 = 18u;   // staged tile edge = TILE_W + 2*HALO

// Cooperative on-chip tile: (u_current, u_previous) packed per cell.
// 18×18 = 324 slots × 8 bytes = 2.5 KB of workgroup shared memory.
var<workgroup> tile : array<vec2<f32>, 324>;

// Clamp-to-edge load — matches the absorbing-boundary behaviour of the
// naive kernel (the edge mask crushes amplitude near borders anyway).
fn loadClamped(x : i32, y : i32, W : i32, H : i32) -> vec2<f32> {
  let cx = clamp(x, 0, W - 1);
  let cy = clamp(y, 0, H - 1);
  let c = textureLoad(inTex, vec2<i32>(cx, cy), 0);
  return vec2<f32>(c.r, c.g);
}

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid : vec3<u32>,
        @builtin(local_invocation_id)  lid : vec3<u32>,
        @builtin(workgroup_id)         wid : vec3<u32>) {
  let W = i32(params.resolution.x);
  let H = i32(params.resolution.y);

  // ---- Stage 1: 256 threads cooperatively stage the 18×18 haloed tile
  // into shared memory (324 cells → at most 2 loads per thread). Each
  // neighbour value is then read from on-chip memory instead of being
  // re-fetched from the texture by 4 different threads.
  let tileX0 = i32(wid.x * TILE_W) - i32(HALO);
  let tileY0 = i32(wid.y * TILE_W) - i32(HALO);
  let tid = lid.y * TILE_W + lid.x;

  // Fixed 2-iteration loop (324 cells / 256 threads) keeps control flow
  // uniform for the barrier below; the guard inside reconverges.
  for (var j : u32 = 0u; j < 2u; j = j + 1u) {
    let idx = tid + j * 256u;
    if (idx < 324u) {
      let dy = idx / TS;
      let dx = idx - dy * TS;
      tile[idx] = loadClamped(tileX0 + i32(dx), tileY0 + i32(dy), W, H);
    }
  }
  workgroupBarrier();

  // ---- Stage 2: 5-point stencil + Verlet step, served from shared memory.
  let x = i32(gid.x);
  let y = i32(gid.y);
  if (x >= W || y >= H) { return; }

  let sx = lid.x + HALO;
  let sy = lid.y + HALO;
  let me = tile[sy * TS + sx];
  let u  = me.x;
  let up = me.y;
  let uL = tile[sy * TS + sx - 1u].x;
  let uR = tile[sy * TS + sx + 1u].x;
  let uD = tile[(sy - 1u) * TS + sx].x;
  let uU = tile[(sy + 1u) * TS + sx].x;

  let lap = uL + uR + uD + uU - 4.0 * u;
  var n   = 2.0 * u - up + params.courant2 * lap;
  n = n * (1.0 - params.damping);

  // Inject mouse sources (Gaussian bumps, broadcast via uniform cache).
  let p = vec2<f32>(f32(x), f32(y));
  var k : u32 = 0u;
  loop {
    if (k >= params.srcCount) { break; }
    let s = sources[k];
    let d = p - s.pos;
    let r2 = dot(d, d);
    let g = exp(-r2 / max(2.0 * s.radius * s.radius, 1e-3));
    n = n + s.amp * g;
    k = k + 1u;
  }

  // Absorbing boundary — taper the new amplitude to 0 near edges.
  let fx = f32(min(x, W - 1 - x));
  let fy = f32(min(y, H - 1 - y));
  let edge = 10.0;
  let mask = smoothstep(0.0, edge, min(fx, fy));
  n = n * mask;

  textureStore(outTex, vec2<i32>(x, y), vec4<f32>(n, u, 0.0, 1.0));
}
`;

const RENDER_WGSL = /* wgsl */`
struct VSOut {
  @builtin(position) pos : vec4<f32>,
  @location(0)       uv  : vec2<f32>,
};

@vertex
fn vs(@builtin(vertex_index) idx : u32) -> VSOut {
  var P = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 3.0, -1.0),
    vec2<f32>(-1.0,  3.0),
  );
  var out : VSOut;
  let p = P[idx];
  out.pos = vec4<f32>(p, 0.0, 1.0);
  var uv = p * 0.5 + vec2<f32>(0.5);
  uv.y = 1.0 - uv.y;
  out.uv = uv;
  return out;
}

struct RP {
  resolution : vec2<f32>,
  time       : f32,
  _pad       : f32,
};

@group(0) @binding(0) var heightTex : texture_2d<f32>;
@group(0) @binding(1) var lin       : sampler;
@group(0) @binding(2) var<uniform>  rp : RP;

fn H(uv : vec2<f32>) -> f32 {
  return textureSample(heightTex, lin, uv).r;
}

@fragment
fn fs(in : VSOut) -> @location(0) vec4<f32> {
  let texel = 1.0 / rp.resolution;
  let h  = H(in.uv);
  let hL = H(in.uv + vec2<f32>(-texel.x, 0.0));
  let hR = H(in.uv + vec2<f32>( texel.x, 0.0));
  let hD = H(in.uv + vec2<f32>(0.0, -texel.y));
  let hU = H(in.uv + vec2<f32>(0.0,  texel.y));

  let dhdx = (hR - hL) * 0.5;
  let dhdy = (hU - hD) * 0.5;

  // Scale gradient into a usable normal.
  let N = normalize(vec3<f32>(-dhdx * 180.0, -dhdy * 180.0, 1.0));

  let L = normalize(vec3<f32>(0.35, 0.55, 0.75));
  let V = vec3<f32>(0.0, 0.0, 1.0);
  let Hv = normalize(L + V);
  let diff = max(dot(N, L), 0.0);
  let spec = pow(max(dot(N, Hv), 0.0), 84.0);
  let fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);

  // Deep -> shallow palette
  let deep = vec3<f32>(0.012, 0.028, 0.070);
  let midC = vec3<f32>(0.040, 0.125, 0.270);
  let hi   = vec3<f32>(0.165, 0.420, 0.545);

  let hN = clamp(h * 0.5 + 0.5, 0.0, 1.0);
  var col = mix(deep, midC, smoothstep(0.0, 0.5, hN));
  col = mix(col, hi, smoothstep(0.5, 1.0, hN));

  // Vertical gradient for volumetric depth
  let vg = smoothstep(0.0, 1.0, 1.0 - in.uv.y);
  col = mix(col * 0.55, col, vg);

  col = col * (0.30 + 0.95 * diff);
  col = col + spec * vec3<f32>(0.85, 0.95, 1.0);
  col = col + fres * vec3<f32>(0.25, 0.55, 1.0) * 0.18;

  // Caustic shimmer
  let c1 = sin(in.uv.x * 42.0 + rp.time * 2.1 + h * 18.0);
  let c2 = sin(in.uv.y * 31.0 - rp.time * 1.7 + h * 14.0);
  let c3 = sin((in.uv.x + in.uv.y) * 26.0 + rp.time * 1.3);
  col = col + 0.035 * (c1 * c2 + 0.5 * c3) * vec3<f32>(0.45, 0.75, 1.0);

  // Foam on steep crests
  let steep = length(vec2<f32>(dhdx, dhdy));
  let foam = smoothstep(0.008, 0.025, steep) * 0.35;
  col = col + foam * vec3<f32>(1.0);

  // Vignette
  let d = in.uv - vec2<f32>(0.5, 0.5);
  col = col * (1.0 - smoothstep(0.2, 0.85, dot(d, d) * 2.0) * 0.55);

  return vec4<f32>(col, 1.0);
}
`;

/* --------------------------------------------------------------------------
 * WebGPU backend
 * -------------------------------------------------------------------------- */
class OceanWebGPU {
  constructor(canvas, ripples) {
    this.canvas = canvas;
    this.ripples = ripples;
    this.backend = "WebGPU";
  }

  async init() {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) throw new Error("No WebGPU adapter");
    this.device = await adapter.requestDevice();

    this.ctx = this.canvas.getContext("webgpu");
    if (!this.ctx) throw new Error("Canvas context webgpu unavailable");

    this.format = navigator.gpu.getPreferredCanvasFormat();
    this.ctx.configure({
      device: this.device,
      format: this.format,
      alphaMode: "opaque",
    });

    this._setGridSize();

    // --- Compute pipeline ---
    this.computeModule = this.device.createShaderModule({ code: WAVE_STEP_WGSL });
    this.computePipeline = this.device.createComputePipeline({
      layout: "auto",
      compute: { module: this.computeModule, entryPoint: "main" },
    });

    this.paramsBuffer = this.device.createBuffer({
      size: 32,                     // vec2u + f32+f32 + u32 + 3*u32 pad = 8 u32s = 32B
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this.sourcesBuffer = this.device.createBuffer({
      size: Math.max(16, MAX_SOURCES_PER_FRAME * 16),
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    // --- Render pipeline ---
    this.renderModule = this.device.createShaderModule({ code: RENDER_WGSL });
    this.renderPipeline = this.device.createRenderPipeline({
      layout: "auto",
      vertex:   { module: this.renderModule, entryPoint: "vs" },
      fragment: { module: this.renderModule, entryPoint: "fs",
                  targets: [{ format: this.format }] },
      primitive: { topology: "triangle-list" },
    });
    this.renderParamsBuffer = this.device.createBuffer({
      size: 16, // vec2 + f32 + pad
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    this.linSampler = this.device.createSampler({
      magFilter: "linear", minFilter: "linear",
      addressModeU: "clamp-to-edge", addressModeV: "clamp-to-edge",
    });

    this._allocateStateTextures();

    this.t0 = performance.now();
    this.frame = 0;
  }

  _setGridSize() {
    const rect = this.canvas.getBoundingClientRect();
    const ratio = Math.max(0.3, (rect.width || 1) / (rect.height || 1));
    let W = Math.round(Math.sqrt(GRID_CELLS_TARGET * ratio));
    let H = Math.round(GRID_CELLS_TARGET / W);
    W = Math.min(GRID_MAX_DIM, Math.max(96, W));
    H = Math.min(GRID_MAX_DIM, Math.max(96, H));
    // round to multiple of TILE_W so every workgroup owns a full tile
    this.gridW = Math.ceil(W / TILE_W) * TILE_W;
    this.gridH = Math.ceil(H / TILE_W) * TILE_W;
  }

  _allocateStateTextures() {
    if (this.texA) this.texA.destroy();
    if (this.texB) this.texB.destroy();
    const desc = {
      size: { width: this.gridW, height: this.gridH },
      format: "rgba16float",
      usage: GPUTextureUsage.STORAGE_BINDING
           | GPUTextureUsage.TEXTURE_BINDING
           | GPUTextureUsage.COPY_DST,
    };
    this.texA = this.device.createTexture(desc);
    this.texB = this.device.createTexture(desc);
    // Zero-fill: upload a blank buffer to both.
    const zero = new Uint16Array(this.gridW * this.gridH * 4);
    for (const tex of [this.texA, this.texB]) {
      this.device.queue.writeTexture(
        { texture: tex },
        zero,
        { bytesPerRow: this.gridW * 8, rowsPerImage: this.gridH },
        { width: this.gridW, height: this.gridH, depthOrArrayLayers: 1 }
      );
    }
    this.readFromA = true;
  }

  resize(cssW, cssH) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width  = Math.max(1, Math.floor(cssW * dpr));
    this.canvas.height = Math.max(1, Math.floor(cssH * dpr));

    const oldW = this.gridW, oldH = this.gridH;
    this._setGridSize();
    if (oldW !== this.gridW || oldH !== this.gridH) {
      this._allocateStateTextures();
    }
  }

  _uploadParams(srcCount) {
    const buf = new ArrayBuffer(32);
    const u32 = new Uint32Array(buf);
    const f32 = new Float32Array(buf);
    u32[0] = this.gridW;
    u32[1] = this.gridH;
    f32[2] = COURANT2;
    f32[3] = DAMPING;
    u32[4] = srcCount;
    // 5..7 = pad
    this.device.queue.writeBuffer(this.paramsBuffer, 0, buf);
  }

  _uploadSources(viewportW, viewportH) {
    // Drain new ripple sources spawned this frame and map them into grid pixel coords.
    // We inject a portion of their amplitude each step (they are transient impulses
    // in the GPU sim; the CPU-side RippleField tracks the long-lived analytical wave).
    this.ripples.gc();
    const all = this.ripples.sources;
    const t = this.ripples.now();
    const data = new Float32Array(MAX_SOURCES_PER_FRAME * 4);
    let count = 0;
    for (let i = all.length - 1; i >= 0 && count < MAX_SOURCES_PER_FRAME; i--) {
      const s = all[i];
      const dt = t - s.t0;
      // Only inject while source is young — this becomes a real wavefront after propagation.
      if (dt > 0.08) continue;
      const gx = (s.x / viewportW) * this.gridW;
      const gy = (s.y / viewportH) * this.gridH;
      // Amplitude falls off after spawn so repeated inject doesn't explode energy.
      const ampScale = 0.55 * Math.exp(-dt * 28);
      data[count * 4 + 0] = gx;
      data[count * 4 + 1] = gy;
      data[count * 4 + 2] = s.amp * ampScale;
      data[count * 4 + 3] = Math.max(2.0, Math.min(this.gridW, this.gridH) * 0.012);
      count++;
    }
    this.device.queue.writeBuffer(this.sourcesBuffer, 0, data.buffer, 0, Math.max(16, count * 16));
    return count;
  }

  step(viewportW, viewportH) {
    const srcCount = this._uploadSources(viewportW, viewportH);
    this._uploadParams(srcCount);

    const inTex  = this.readFromA ? this.texA : this.texB;
    const outTex = this.readFromA ? this.texB : this.texA;

    const bindGroup = this.device.createBindGroup({
      layout: this.computePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: inTex.createView() },
        { binding: 1, resource: outTex.createView() },
        { binding: 2, resource: { buffer: this.paramsBuffer } },
        { binding: 3, resource: { buffer: this.sourcesBuffer } },
      ],
    });

    const enc = this.device.createCommandEncoder();
    const pass = enc.beginComputePass();
    pass.setPipeline(this.computePipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(this.gridW / TILE_W, this.gridH / TILE_W);
    pass.end();
    this.device.queue.submit([enc.finish()]);

    this.readFromA = !this.readFromA;
  }

  render() {
    const heightTex = this.readFromA ? this.texA : this.texB;

    const rp = new ArrayBuffer(16);
    const f = new Float32Array(rp);
    f[0] = this.gridW;
    f[1] = this.gridH;
    f[2] = (performance.now() - this.t0) / 1000;
    this.device.queue.writeBuffer(this.renderParamsBuffer, 0, rp);

    const bind = this.device.createBindGroup({
      layout: this.renderPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: heightTex.createView() },
        { binding: 1, resource: this.linSampler },
        { binding: 2, resource: { buffer: this.renderParamsBuffer } },
      ],
    });

    const enc = this.device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [{
        view: this.ctx.getCurrentTexture().createView(),
        loadOp: "clear",
        storeOp: "store",
        clearValue: { r: 0.008, g: 0.020, b: 0.058, a: 1 },
      }],
    });
    pass.setPipeline(this.renderPipeline);
    pass.setBindGroup(0, bind);
    pass.draw(3);
    pass.end();
    this.device.queue.submit([enc.finish()]);
  }

  get cells() { return this.gridW * this.gridH; }
  get workgroups() { return (this.gridW / TILE_W) * (this.gridH / TILE_W); }
  get threadsPerWorkgroup() { return THREADS_PER_WG; }
}

/* --------------------------------------------------------------------------
 * WebGL2 fallback
 * -------------------------------------------------------------------------- */
const WEBGL2_VERT = `#version 300 es
layout(location = 0) in vec2 aPos;
out vec2 vUV;
void main() {
  vUV = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const WEBGL2_STEP_FRAG = `#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uState;
uniform vec2  uRes;
uniform float uCourant2;
uniform float uDamping;
uniform int   uSrcCount;
uniform vec4  uSrc[${MAX_SOURCES_PER_FRAME}];
out vec4 fragColor;

void main() {
  vec2 texel = 1.0 / uRes;
  vec2 uv = vUV;
  vec2 cs = texture(uState, uv).rg;
  float u  = cs.r;
  float up = cs.g;
  float l = texture(uState, uv + vec2(-texel.x, 0.0)).r;
  float r = texture(uState, uv + vec2( texel.x, 0.0)).r;
  float d = texture(uState, uv + vec2(0.0, -texel.y)).r;
  float t = texture(uState, uv + vec2(0.0,  texel.y)).r;
  float lap = l + r + d + t - 4.0 * u;
  float n = 2.0 * u - up + uCourant2 * lap;
  n *= (1.0 - uDamping);

  vec2 pPix = uv * uRes;
  for (int i = 0; i < ${MAX_SOURCES_PER_FRAME}; i++) {
    if (i >= uSrcCount) break;
    vec4 s = uSrc[i];
    vec2 dp = pPix - s.xy;
    float r2 = dot(dp, dp);
    float g = exp(-r2 / max(2.0 * s.w * s.w, 1e-3));
    n += s.z * g;
  }

  float fx = min(uv.x, 1.0 - uv.x);
  float fy = min(uv.y, 1.0 - uv.y);
  float k = smoothstep(0.0, 0.02, min(fx, fy));
  n *= k;

  fragColor = vec4(n, u, 0.0, 1.0);
}
`;

const WEBGL2_RENDER_FRAG = `#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uHeight;
uniform vec2 uRes;
uniform float uTime;
out vec4 fragColor;

float H(vec2 uv) { return texture(uHeight, uv).r; }

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);
  vec2 texel = 1.0 / uRes;
  float h  = H(uv);
  float hL = H(uv + vec2(-texel.x, 0.0));
  float hR = H(uv + vec2( texel.x, 0.0));
  float hD = H(uv + vec2(0.0, -texel.y));
  float hU = H(uv + vec2(0.0,  texel.y));

  float dhdx = (hR - hL) * 0.5;
  float dhdy = (hU - hD) * 0.5;
  vec3 N = normalize(vec3(-dhdx * 180.0, -dhdy * 180.0, 1.0));

  vec3 L = normalize(vec3(0.35, 0.55, 0.75));
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 Hv = normalize(L + V);
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, Hv), 0.0), 84.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);

  vec3 deep = vec3(0.012, 0.028, 0.070);
  vec3 midC = vec3(0.040, 0.125, 0.270);
  vec3 hi   = vec3(0.165, 0.420, 0.545);

  float hN = clamp(h * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(deep, midC, smoothstep(0.0, 0.5, hN));
  col = mix(col, hi, smoothstep(0.5, 1.0, hN));

  float vg = smoothstep(0.0, 1.0, 1.0 - uv.y);
  col = mix(col * 0.55, col, vg);

  col = col * (0.30 + 0.95 * diff);
  col += spec * vec3(0.85, 0.95, 1.0);
  col += fres * vec3(0.25, 0.55, 1.0) * 0.18;

  float c1 = sin(uv.x * 42.0 + uTime * 2.1 + h * 18.0);
  float c2 = sin(uv.y * 31.0 - uTime * 1.7 + h * 14.0);
  float c3 = sin((uv.x + uv.y) * 26.0 + uTime * 1.3);
  col += 0.035 * (c1 * c2 + 0.5 * c3) * vec3(0.45, 0.75, 1.0);

  float steep = length(vec2(dhdx, dhdy));
  float foam = smoothstep(0.008, 0.025, steep) * 0.35;
  col += foam * vec3(1.0);

  vec2 dc = vUV - 0.5;
  col *= 1.0 - smoothstep(0.2, 0.85, dot(dc, dc) * 2.0) * 0.55;

  fragColor = vec4(col, 1.0);
}
`;

class OceanWebGL2 {
  constructor(canvas, ripples) {
    this.canvas = canvas;
    this.ripples = ripples;
    this.backend = "WebGL2";
  }

  init() {
    const gl = this.canvas.getContext("webgl2", {
      antialias: false, alpha: false, powerPreference: "high-performance"
    });
    if (!gl) throw new Error("WebGL2 unavailable");
    this.gl = gl;

    // RGBA16F render target support
    const floatExt = gl.getExtension("EXT_color_buffer_float")
                  || gl.getExtension("EXT_color_buffer_half_float");
    if (!floatExt) throw new Error("Float render targets unavailable");

    this.progStep   = this._makeProg(WEBGL2_VERT, WEBGL2_STEP_FRAG);
    this.progRender = this._makeProg(WEBGL2_VERT, WEBGL2_RENDER_FRAG);

    // Full-screen triangle
    const verts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    this._setGridSize();
    this._allocateFBOs();

    this.t0 = performance.now();
  }

  _makeProg(vsSrc, fsSrc) {
    const gl = this.gl;
    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error("Shader compile error: " + log);
      }
      return sh;
    };
    const prog = gl.createProgram();
    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "aPos");
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(prog);
      throw new Error("Program link error: " + log);
    }
    return prog;
  }

  _setGridSize() {
    const rect = this.canvas.getBoundingClientRect();
    const ratio = Math.max(0.3, (rect.width || 1) / (rect.height || 1));
    let W = Math.round(Math.sqrt(GRID_CELLS_TARGET * ratio));
    let H = Math.round(GRID_CELLS_TARGET / W);
    W = Math.min(GRID_MAX_DIM, Math.max(96, W));
    H = Math.min(GRID_MAX_DIM, Math.max(96, H));
    this.gridW = W;
    this.gridH = H;
  }

  _allocateFBOs() {
    const gl = this.gl;
    const makeFBO = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, this.gridW, this.gridH, 0, gl.RGBA, gl.HALF_FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fbo };
    };
    if (this.fA) { gl.deleteTexture(this.fA.tex); gl.deleteFramebuffer(this.fA.fbo); }
    if (this.fB) { gl.deleteTexture(this.fB.tex); gl.deleteFramebuffer(this.fB.fbo); }
    this.fA = makeFBO();
    this.fB = makeFBO();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.readFromA = true;
  }

  resize(cssW, cssH) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width  = Math.max(1, Math.floor(cssW * dpr));
    this.canvas.height = Math.max(1, Math.floor(cssH * dpr));
    const oldW = this.gridW, oldH = this.gridH;
    this._setGridSize();
    if (oldW !== this.gridW || oldH !== this.gridH) this._allocateFBOs();
  }

  _gatherSources(viewportW, viewportH) {
    this.ripples.gc();
    const all = this.ripples.sources;
    const t = this.ripples.now();
    const data = new Float32Array(MAX_SOURCES_PER_FRAME * 4);
    let count = 0;
    for (let i = all.length - 1; i >= 0 && count < MAX_SOURCES_PER_FRAME; i--) {
      const s = all[i];
      const dt = t - s.t0;
      if (dt > 0.08) continue;
      const gx = (s.x / viewportW) * this.gridW;
      // No Y flip here. The render shader flips uv.y when sampling, so the
      // step pass writes at texel (gx, s.y*H/viewportH) and the render pass
      // then reads that exact texel for the canvas-top fragment.
      const gy = (s.y / viewportH) * this.gridH;
      const ampScale = 0.55 * Math.exp(-dt * 28);
      data[count * 4 + 0] = gx;
      data[count * 4 + 1] = gy;
      data[count * 4 + 2] = s.amp * ampScale;
      data[count * 4 + 3] = Math.max(2.0, Math.min(this.gridW, this.gridH) * 0.012);
      count++;
    }
    return { data, count };
  }

  step(viewportW, viewportH) {
    const gl = this.gl;
    const src = this._gatherSources(viewportW, viewportH);

    const inF  = this.readFromA ? this.fA : this.fB;
    const outF = this.readFromA ? this.fB : this.fA;

    gl.bindFramebuffer(gl.FRAMEBUFFER, outF.fbo);
    gl.viewport(0, 0, this.gridW, this.gridH);
    gl.useProgram(this.progStep);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inF.tex);
    gl.uniform1i(gl.getUniformLocation(this.progStep, "uState"), 0);
    gl.uniform2f(gl.getUniformLocation(this.progStep, "uRes"), this.gridW, this.gridH);
    gl.uniform1f(gl.getUniformLocation(this.progStep, "uCourant2"), COURANT2);
    gl.uniform1f(gl.getUniformLocation(this.progStep, "uDamping"), DAMPING);
    gl.uniform1i(gl.getUniformLocation(this.progStep, "uSrcCount"), src.count);
    gl.uniform4fv(gl.getUniformLocation(this.progStep, "uSrc[0]"), src.data);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.readFromA = !this.readFromA;
  }

  render() {
    const gl = this.gl;
    const outF = this.readFromA ? this.fA : this.fB;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.progRender);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, outF.tex);
    gl.uniform1i(gl.getUniformLocation(this.progRender, "uHeight"), 0);
    gl.uniform2f(gl.getUniformLocation(this.progRender, "uRes"), this.gridW, this.gridH);
    gl.uniform1f(gl.getUniformLocation(this.progRender, "uTime"), (performance.now() - this.t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  get cells() { return this.gridW * this.gridH; }
}

/* --------------------------------------------------------------------------
 * Factory
 * -------------------------------------------------------------------------- */
export async function createOcean(canvas, ripples, onStatus) {
  if (navigator.gpu) {
    try {
      onStatus?.("Requesting WebGPU adapter");
      const ocean = new OceanWebGPU(canvas, ripples);
      await ocean.init();
      onStatus?.("Compiled 16×16 shared-memory tiled WGSL pipelines");
      return ocean;
    } catch (err) {
      console.warn("WebGPU init failed, falling back to WebGL2:", err);
      onStatus?.("WebGPU unavailable, compiling WebGL2 shaders");
    }
  } else {
    onStatus?.("WebGPU not present, using WebGL2 ping-pong");
  }
  const ocean = new OceanWebGL2(canvas, ripples);
  ocean.init();
  return ocean;
}
