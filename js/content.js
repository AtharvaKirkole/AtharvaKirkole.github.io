// ============================================================
// content.js
// Seven primary sections + Contact.
// Each project and work role carries a .role-gallery slot that
// is shown as a styled placeholder until an image is dropped
// into assets/. Swap `<div class="media-frame">…</div>` with
// `<img src="assets/…">` and the layout stays the same.
// ============================================================

const mediaCard = (gradClass, glyph, caption) => `
  <figure class="media-card ${gradClass}">
    <div class="media-frame"><span class="media-glyph">${glyph}</span></div>
    <figcaption>${caption}</figcaption>
  </figure>`;

export const CONTENT = {

  /* ============================ ABOUT ============================ */
  about: {
    eyebrow: "About",
    title: "Atharva Kirkole",
    html: `
      <div class="photo-frame" aria-hidden="true"></div>
      <p>I'm a <strong>high-performance-computing researcher</strong> at Michigan State University on an <strong>accelerated path</strong> — <strong>B.S. in Computer Science with Honors in 3 years</strong> (GPA 3.92, Tau Beta Pi, May 2025), <strong>M.S. in 1 year</strong> (GPA 3.93, May 2026) with the <strong>Graduate Certificate in High-Performance Computing</strong>, and now a <strong>Ph.D. student</strong> doing HPC research at the <strong>SPaRTa Lab</strong> (Scalable Parallel Technologies).</p>
      <p>I like the part of the stack where <em>physics meets code</em> — CUDA kernels, MPI at scale, AI infrastructure, geospatial systems, and web systems that have to be fast. This site itself runs my open-source <strong>ocean-webgpu</strong> library: a 2D wave-equation PDE solved every frame by a shared-memory tiled GPU compute kernel.</p>

      <h4>At a glance</h4>
      <div class="stat-grid">
        <div class="stat-card"><p class="k">Degrees</p><p class="v accent">BS → MS → PhD</p></div>
        <div class="stat-card"><p class="k">Undergrad GPA</p><p class="v">3.92</p></div>
        <div class="stat-card"><p class="k">Graduate GPA</p><p class="v">3.93</p></div>
        <div class="stat-card"><p class="k">BS + MS in</p><p class="v">3 + 1 years</p></div>
        <div class="stat-card"><p class="k">Now</p><p class="v">PhD · SPaRTa Lab</p></div>
        <div class="stat-card"><p class="k">Location</p><p class="v">East Lansing, MI</p></div>
      </div>

      <h4>Where to go next</h4>
      <ul class="link-list">
        <li><a href="#/education">Education &amp; coursework →</a></li>
        <li><a href="#/work">Work experience →</a></li>
        <li><a href="#/projects">Selected projects →</a></li>
        <li><a href="#/research">Research →</a></li>
        <li><a href="#/achievements">Achievements →</a></li>
        <li><a href="#/hobbies">Hobbies →</a></li>
      </ul>

      <h4>Documents</h4>
      <p>
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Resume (PDF)</a>
        <a class="inline-btn" href="assets/transcript.pdf" download="Atharva_Kirkole_MSU_Transcript.pdf">↓ Official MSU transcript (PDF)</a>
      </p>
    `,
  },

  /* ========================== EDUCATION ========================== */
  education: {
    eyebrow: "Education",
    title: "BS in 3 · MS in 1 · now PhD",
    html: `
      <p><em>Accelerated path: B.S. in 3 years + M.S. in 1 year — both in Computer Science, both verified in the official transcript below.</em></p>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Ph.D., Computer Science</span> · <span class="role-org">Michigan State University</span></div>
          <span class="role-date">Fall 2026 – Present</span>
        </div>
        <div class="role-loc">East Lansing, MI · Doctoral program, College of Engineering</div>
        <p>Doctoral research in <strong>high-performance computing</strong> with the <strong>SPaRTa Lab</strong> (Scalable Parallel Technologies) — CUDA boundary-integral solvers for particulate Stokes flow. Enrolled in doctoral dissertation research (CSE 999).</p>
        <div class="chip-row">
          <span class="chip">HPC</span>
          <span class="chip">CUDA</span>
          <span class="chip">Numerical Methods</span>
          <span class="chip">SPaRTa Lab</span>
        </div>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Master of Science, Computer Science</span> · <span class="role-org">Michigan State University</span></div>
          <span class="role-date">Aug 2025 – May 2026</span>
        </div>
        <div class="role-loc">Degree granted May 2026 · GPA 3.93 · Completed in 1 year</div>
        <p>Earned alongside the <strong>Graduate Certificate in High-Performance Computing</strong>. Teaching Assistant for <strong>Object-Oriented Programming</strong> and <strong>Parallel Programming</strong>.</p>
        <div class="chip-row">
          <span class="chip">CSE 822 Parallel Computing · 4.0</span>
          <span class="chip">CSE 802 Pattern Recognition · 4.0</span>
          <span class="chip">CSE 850 Adversarial ML · 4.0</span>
          <span class="chip">CSE 881 Data Mining · 4.0</span>
        </div>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Bachelor of Science, Computer Science</span> · <span class="role-org">Michigan State University</span></div>
          <span class="role-date">Aug 2022 – Apr 2025</span>
        </div>
        <div class="role-loc">Degree granted May 2025, <strong>With Honor</strong> · GPA 3.92 · Business Minor · Honors College · 3 years</div>
        <ul>
          <li><strong>Dean's List every semester</strong> of the program.</li>
          <li>Inducted into <strong>Tau Beta Pi</strong> — engineering honor society.</li>
          <li>Took graduate courses while an undergrad — CSE 830 Design &amp; Theory of Algorithms (4.0), CSE 840 Computational Foundations in AI.</li>
          <li><strong>Resident Assistant Leader</strong> during undergrad.</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Graduate Teaching Assistant</span> · <span class="role-org">OOP &amp; Parallel Programming</span></div>
          <span class="role-date">Aug 2025 – May 2026</span>
        </div>
        <div class="role-loc">CSE Department · Michigan State University</div>
        <ul>
          <li>TA for <strong>Object-Oriented Programming</strong> and <strong>Parallel Programming</strong> — lab sections, grading, weekly office hours.</li>
          <li>Guide students through C++17 and parallel-computing projects — RAII, design patterns, OpenMP, MPI.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">C++17</span><span class="chip">OpenMP</span>
          <span class="chip">MPI</span><span class="chip">Design Patterns</span>
        </div>
      </div>

      <h3>Coursework — from the official transcript</h3>
      <div class="course-grid">
        <div class="course-pill"><span class="c">CSE 822</span>Parallel Computing</div>
        <div class="course-pill"><span class="c">CSE 802</span>Pattern Recognition &amp; Analysis</div>
        <div class="course-pill"><span class="c">CSE 850</span>Adv Topics in Adversarial ML</div>
        <div class="course-pill"><span class="c">CSE 881</span>Data Mining</div>
        <div class="course-pill"><span class="c">CSE 841</span>Artificial Intelligence</div>
        <div class="course-pill"><span class="c">CSE 842</span>Natural Language Processing</div>
        <div class="course-pill"><span class="c">CSE 825</span>Computer &amp; Network Security</div>
        <div class="course-pill"><span class="c">CSE 830</span>Design &amp; Theory of Algorithms</div>
        <div class="course-pill"><span class="c">CSE 840</span>Comp Foundations in AI</div>
        <div class="course-pill"><span class="c">CSE 482</span>Big Data Analysis</div>
        <div class="course-pill"><span class="c">CSE 440</span>Intro to AI</div>
        <div class="course-pill"><span class="c">CSE 404</span>Intro to Machine Learning</div>
        <div class="course-pill"><span class="c">CSE 331</span>Algorithms &amp; Data Structures</div>
        <div class="course-pill"><span class="c">CSE 325</span>Computer Systems</div>
        <div class="course-pill"><span class="c">CSE 320</span>Computer Org &amp; Architecture</div>
        <div class="course-pill"><span class="c">CSE 999</span>Doctoral Dissertation Research</div>
      </div>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="assets/transcript.pdf" download="Atharva_Kirkole_MSU_Transcript.pdf">↓ Official MSU transcript (PDF)</a>
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Resume (PDF)</a>
      </p>
    `,
  },

  /* ======================== ACHIEVEMENTS ========================= */
  achievements: {
    eyebrow: "Achievements",
    title: "Honors &amp; Recognition",
    html: `
      <div class="stat-grid">
        <div class="stat-card"><p class="k">Highest Intl Financial Award</p><p class="v accent">MSU</p></div>
        <div class="stat-card"><p class="k">Honor Society</p><p class="v">Tau Beta Pi</p></div>
        <div class="stat-card"><p class="k">Honor Society</p><p class="v">National Society of Scholars</p></div>
        <div class="stat-card"><p class="k">Dean's List</p><p class="v">Every Semester</p></div>
        <div class="stat-card"><p class="k">Honors College</p><p class="v">Member</p></div>
        <div class="stat-card"><p class="k">Degrees</p><p class="v">B.S. '25 With Honor · M.S. '26</p></div>
      </div>

      <h3>🏆 Highest International Student Financial Award</h3>
      <p>Awarded Michigan State University's <strong>highest scholarship available to international students</strong> — recognition of sustained academic performance and leadership across TA, RA, and research roles.</p>

      <h3>🎖 Tau Beta Pi</h3>
      <p>Inducted into the oldest engineering honor society in the United States. Membership is offered to the top of each engineering class.</p>

      <h3>🎖 National Society of Scholars</h3>
      <p>Inducted based on academic excellence and a record of service-leadership.</p>

      <h3>📚 Dean's List — Every Semester</h3>
      <p>Maintained Dean's List standing across every semester of the 3-year BS and first year of the MS program.</p>

      <h3>🏅 People's Choice — MSU AI Club</h3>
      <p>Navigator indoor-navigation app won <strong>People's Choice, Fall 2022</strong> — built with Flutter + Flask, CNN-based image localization, and A* routing.</p>

      <h3>📝 Research Recognition</h3>
      <ul>
        <li>Presented at the <strong>North American Plant Phenotyping Network (NAPPN) Conference</strong>, Purdue University.</li>
        <li>Abstract published — <a href="https://www.authorea.com/users/530254/articles/675202" target="_blank" rel="noopener">authorea.com/…/675202</a>.</li>
      </ul>

      <h3>🎓 Certifications</h3>
      <ul>
        <li><strong>Graduate Certificate in High-Performance Computing</strong>, Michigan State University.</li>
        <li><strong>CS50x</strong>, HarvardX (Verified).</li>
      </ul>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="assets/transcript.pdf" download="Atharva_Kirkole_MSU_Transcript.pdf">↓ Verify on the official transcript (PDF)</a>
      </p>
    `,
  },

  /* ============================ WORK ============================= */
  work: {
    eyebrow: "Work Experience",
    title: "Roles &amp; Impact",
    html: `
      <!-- SPaRTa Lab -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">High Performance Computing Research Assistant</span> · <span class="role-org">SPaRTa Lab (Scalable Parallel Technologies), MSU</span></div>
          <span class="role-date">Jun 2026 – Present</span>
        </div>
        <div class="role-loc">East Lansing, MI · Doctoral research group</div>

        <ul>
          <li>Parallelized the <strong>linearized Stokes equation over 10M+ sphere- and ellipsoid-surface points</strong>, simulating rigid bodies in viscous (low-Reynolds) flow — with applications in <strong>red-blood-cell dynamics and drug-discovery modeling</strong>.</li>
          <li>Built a <strong>CUDA boundary-integral solver reaching 60× speedup</strong> via coalesced memory access and shared-memory tiling.</li>
          <li>Applied numerical analysis and error-control techniques to n-body interactions, reducing numerical error from <strong>7% to 2%</strong>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">CUDA</span><span class="chip">Boundary Integral</span>
          <span class="chip">Stokes Flow</span><span class="chip">Shared-Memory Tiling</span>
          <span class="chip">Coalesced Access</span><span class="chip">Numerical Analysis</span>
        </div>
      </div>

      <!-- Heard AI -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Speech AI Research Assistant</span> · <span class="role-org">Heard AI</span></div>
          <span class="role-date">Mar 2026 – Jun 2026</span>
        </div>
        <div class="role-loc">East Lansing, MI · NSF Convergence Accelerator Phase 2 ($5M)</div>

        <ul>
          <li>Contributed to a <strong>$5M NSF Convergence Accelerator (Phase 2)</strong> project on accessible speech technologies; developed <strong>speaker diarization and stutter detection models</strong> to identify and classify dysfluent speech patterns.</li>
          <li>Built the initial <strong>stutter speech synthesis / regeneration pipeline</strong> generating fluent speech alternatives from stuttered input; engineered a full-stack application (Node.js, React, AWS Cloudscape) serving <strong>300 concurrent sessions at &lt;400 ms latency</strong>.</li>
          <li>Implemented a per-user fine-tuning framework achieving <strong>23% WER improvement (14% → 10.8%)</strong> using rapid adaptation.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">Speaker Diarization</span><span class="chip">Stutter Detection</span>
          <span class="chip">Speech Synthesis</span><span class="chip">Fine-tuning</span>
          <span class="chip">React / Cloudscape</span><span class="chip">Node.js</span>
          <span class="chip">NSF</span>
        </div>
      </div>

      <!-- MSU IT -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Software Developer</span> · <span class="role-org">MSU IT Services</span></div>
          <span class="role-date">Jun 2024 – Apr 2026</span>
        </div>
        <div class="role-loc">Michigan State University · East Lansing, MI</div>

        <ul>
          <li>Led end-to-end migration of the campus mapping platform off Google Maps onto a self-managed <strong>ESRI ArcGIS</strong> stack serving <strong>100K+ daily requests</strong>, rebuilding the map surface around custom geospatial layers and cutting licensing cost <strong>~20% (~$45K/yr)</strong>.</li>
          <li>Owned geospatial data modeling for <strong>~12K+ campus entities/POIs</strong>; built an <strong>automated telemetry ingestion pipeline</strong> processing real-time location signals to drive data-driven route optimization, cutting compute latency <strong>~30% (~210 ms → ~145 ms)</strong>.</li>
          <li>Engineered <strong>student/people information-system APIs and Dockerized service images</strong> (PHP, JavaScript); raised site accessibility from <strong>80% to 99.7%</strong> (WCAG 2.1 / ADA / ARIA) across <strong>40 production surfaces</strong>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">ESRI ArcGIS</span><span class="chip">ArcGIS Portal</span>
          <span class="chip">Geospatial Modeling</span><span class="chip">A* Routing</span>
          <span class="chip">PHP</span><span class="chip">Docker</span>
          <span class="chip">REST APIs</span><span class="chip">Accessibility</span>
        </div>
      </div>

      <!-- Amazon -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">University Capstone Project</span> · <span class="role-org">Amazon</span></div>
          <span class="role-date">Jan 2025 – May 2025</span>
        </div>
        <div class="role-loc">East Lansing, MI</div>

        <ul>
          <li>Built an AI-powered semantic code-search system over <strong>~10k internal architecture assets</strong> using <strong>AWS OpenSearch</strong> (Elasticsearch-compatible), Lambda, DynamoDB, and S3.</li>
          <li>Designed a <strong>RAG-style retrieval pipeline</strong> — dynamically chunked vector embeddings via <strong>Bedrock + SageMaker</strong>, indexed in OpenSearch — at <strong>~90 ms</strong>.</li>
          <li>Tuned indexing/ranking to lift top-k relevance <strong>~18% (NDCG@10)</strong> and added vector-similarity employee recommendations over GitHub signals.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">AWS</span><span class="chip">Bedrock</span><span class="chip">SageMaker</span>
          <span class="chip">OpenSearch</span><span class="chip">RAG</span>
          <span class="chip">NDCG@10</span><span class="chip">Vector Search</span>
        </div>
      </div>

      <!-- Thompson Lab -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Machine Learning Research Intern</span> · <span class="role-org">Thompson Maize Lab</span></div>
          <span class="role-date">Aug 2023 – May 2024</span>
        </div>
        <div class="role-loc">Michigan State University</div>

        <ul>
          <li>Built and evaluated <strong>Random Forest / ML models</strong> (TensorFlow, Python, R) for crop-yield prediction, querying <strong>120+ dimensional agronomic datasets from PostgreSQL</strong> with relational joins/aggregations at <strong>~72% accuracy</strong>.</li>
          <li>Presented at the <strong>NAPPN Conference</strong>, Purdue — <a href="https://www.authorea.com/users/530254/articles/675202" target="_blank" rel="noopener">published abstract</a>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">Random Forest</span><span class="chip">TensorFlow</span>
          <span class="chip">PostgreSQL</span><span class="chip">Python</span>
          <span class="chip">R</span><span class="chip">Genomics</span>
        </div>
      </div>

      <!-- RA Leader -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Resident Assistant Leader</span> · <span class="role-org">MSU Residence Education &amp; Housing</span></div>
          <span class="role-date">During Undergrad</span>
        </div>
        <div class="role-loc">Michigan State University · East Lansing, MI</div>
      
        <ul>
          <li>Led a floor of residents; ran community-building programs and on-call duty rotations.</li>
          <li>Coordinated with RD staff on crisis response, mental-health referrals, and overnight incident response.</li>
          <li>Advanced to <strong>RA Leader</strong> — mentored first-year RAs and reviewed programming plans.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">Leadership</span><span class="chip">Crisis Response</span>
          <span class="chip">Mentorship</span><span class="chip">Event Programming</span>
        </div>
      </div>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Download full resume (PDF)</a>
      </p>
    `,
  },

  /* =========================== RESEARCH ========================== */
  research: {
    eyebrow: "Research",
    title: "AI, HPC &amp; Systems",
    html: `
      <p>Doctoral research in high-performance computing, plus applied AI research in speech accessibility and computational agronomy.</p>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">HPC Research Assistant</span> · <span class="role-org">SPaRTa Lab (Scalable Parallel Technologies), MSU</span></div>
          <span class="role-date">Jun 2026 – Present</span>
        </div>
        <div class="role-loc">Doctoral research · particulate Stokes flow on GPUs</div>

        <p>Parallelizing the <strong>linearized Stokes equation over 10M+ sphere- and ellipsoid-surface points</strong> to simulate rigid bodies in viscous, low-Reynolds flow — the regime of <strong>red-blood-cell dynamics and drug-discovery modeling</strong>. Built a <strong>CUDA boundary-integral solver reaching 60× speedup</strong> through coalesced memory access and shared-memory tiling, and drove numerical error from <strong>7% down to 2%</strong> with error-control techniques on the n-body interactions.</p>
        <div class="chip-row">
          <span class="chip">CUDA</span><span class="chip">Boundary Integral Method</span>
          <span class="chip">Stokes Flow</span><span class="chip">Shared-Memory Tiling</span>
          <span class="chip">Error Control</span>
        </div>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Speech AI Research Assistant</span> · <span class="role-org">Heard AI</span></div>
          <span class="role-date">Mar 2026 – Jun 2026</span>
        </div>
        <div class="role-loc">NSF Convergence Accelerator Phase 2 · $5M</div>

        <p>Worked on <strong>accessible speech technologies</strong>: built <strong>speaker diarization and stutter detection models</strong> for classifying dysfluent speech, and the initial <strong>stutter speech synthesis / regeneration pipeline</strong> that generates fluent alternatives from stuttered input. Per-user fine-tuning framework lifted recognition accuracy <strong>23% (WER 14% → 10.8%)</strong>; the full-stack app served <strong>300 concurrent sessions at &lt;400 ms latency</strong>.</p>
        <div class="chip-row">
          <span class="chip">Speaker Diarization</span><span class="chip">Stutter Detection</span>
          <span class="chip">Speech Synthesis</span><span class="chip">Fine-tuning</span>
          <span class="chip">NSF</span>
        </div>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Machine Learning Researcher</span> · <span class="role-org">Thompson Maize Lab</span></div>
          <span class="role-date">Aug 2023 – May 2024</span>
        </div>
        <div class="role-loc">Michigan State University</div>
        
        <p>Designed a scalable SQL + MongoDB architecture for <strong>120+ dimensional</strong> phenotypic and genomic data, and built Random Forest models in TensorFlow + R reaching <strong>72% yield-prediction accuracy</strong>. Quantified Anthesis-Silking Interval (ASI) impact under environmental stress. Presented at the <strong>NAPPN Conference</strong> at Purdue.</p>
        <p>Published abstract: <a href="https://www.authorea.com/users/530254/articles/675202" target="_blank" rel="noopener">authorea.com/users/530254/articles/675202</a>.</p>
        <div class="chip-row">
          <span class="chip">Random Forest</span><span class="chip">TensorFlow</span>
          <span class="chip">R</span><span class="chip">MongoDB</span>
          <span class="chip">Statistical Analysis</span>
        </div>
      </div>

      <h3>HPC toolkit &amp; research interests</h3>
      <p>Graduate Certificate in High-Performance Computing + CSE 822 Parallel Computing (4.0) underpin the systems side: <strong>attention-kernel optimization</strong> (CUDA / OpenMP / AVX2, cache-aware tiling, online softmax), <strong>MPI at scale</strong> (non-blocking Isend/Irecv overlap, one-sided RMA over 100M+ elements/rank), memory-hierarchy-aware algorithm design, and <strong>WebGPU as browser-native HPC</strong> — the ocean behind this page is my open-source <a href="https://github.com/AtharvaKirkole/ocean-webgpu" target="_blank" rel="noopener">ocean-webgpu</a> library running a shared-memory tiled stencil kernel.</p>
      <div class="chip-row">
        <span class="chip">CUDA</span><span class="chip">MPI / RMA</span>
        <span class="chip">OpenMP</span><span class="chip">AVX2 / FMA</span>
        <span class="chip">Cache Tiling</span><span class="chip">WebGPU / WGSL</span>
      </div>
    `,
  },

  /* ========================== PROJECTS =========================== */
  projects: {
    eyebrow: "Projects",
    title: "Selected Work",
    html: `
      <p>The flagship is the ocean you're looking at — an open-source GPU library — followed by kernel-level HPC work and applied ML systems.</p>

      <!-- ocean-webgpu — flagship -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">ocean-webgpu — Open-Source GPU Wave-Simulation Library + API</span> · <span class="role-org">WebGPU · WGSL · WebGL2</span></div>
          <span class="role-date">2026 · MIT</span>
        </div>
        <div class="role-loc">Zero-dependency ES modules · a one-call embeddable API · powering this page right now</div>

        <ul>
          <li>Solves the 2D wave-equation PDE (∂²u/∂t² = c²∇²u) with a <strong>WGSL compute kernel</strong> — CFL-stable Verlet integration on ping-pong <code>rgba16float</code> textures, <strong>one GPU thread per grid cell</strong>.</li>
          <li><strong>Cooperative shared-memory tiling:</strong> each 16×16 workgroup stages an 18×18 haloed tile into on-chip <code>var&lt;workgroup&gt;</code> memory behind a <code>workgroupBarrier()</code>, then runs the 5-point stencil from shared memory — the same <code>__shared__</code> halo-tile pattern as CUDA stencil solvers, cutting redundant global loads ~3×.</li>
          <li><strong>Public one-call API:</strong> <code>Ocean.mount("#canvas", { palette, waveSpeed, foam, caustics, lighting, autoRain })</code> handles the render loop, pointer input, resize, and WebGPU→WebGL2 fallback. Everything is live-tunable (<code>set()</code>, <code>setPalette()</code>, <code>splash()</code>, <code>snapshot()</code>) with 10 built-in themes + arbitrary custom palettes.</li>
          <li><strong>Interactive playground</strong> with colour pickers, physics sliders, and a <strong>copy-paste embed-code generator</strong> — anyone can theme the ocean and drop it into their own site in three lines.</li>
          <li>On this page: <strong>~380K threads per step across ~1.5K workgroups</strong>, two sub-steps per frame ≈ <strong>45M cell-updates/sec</strong> at 60 fps. The bundled stress lab scales the same kernels to <strong>16.8M cells (4096²) with 512 moving sources</strong> and live GFLOP/s + bandwidth readouts.</li>
          <li>Open source: <a href="https://github.com/AtharvaKirkole/ocean-webgpu" target="_blank" rel="noopener">GitHub</a> · <a href="https://github.com/AtharvaKirkole/ocean-webgpu#api" target="_blank" rel="noopener">API docs</a> — <a href="https://atharvakirkole.github.io/ocean-webgpu/playground.html" target="_blank" rel="noopener">playground</a> · <a href="https://atharvakirkole.github.io/ocean-webgpu/" target="_blank" rel="noopener">live demo</a> · <a href="https://atharvakirkole.github.io/ocean-webgpu/stress.html" target="_blank" rel="noopener">stress lab</a>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">WebGPU</span><span class="chip">WGSL</span>
          <span class="chip">Shared-Memory Tiling</span><span class="chip">workgroupBarrier</span>
          <span class="chip">Embeddable API</span><span class="chip">10 Themes</span>
          <span class="chip">WebGL2 Fallback</span><span class="chip">MIT</span>
        </div>
        <p class="modal-footer-cta" style="margin-top:12px;">
          <a class="inline-btn" href="https://atharvakirkole.github.io/ocean-webgpu/playground.html" target="_blank" rel="noopener">🎛 Try the playground →</a>
          <a class="inline-btn" href="https://github.com/AtharvaKirkole/ocean-webgpu#api" target="_blank" rel="noopener">Read the API docs →</a>
        </p>
      </div>

      <!-- FitTrack -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">FitTrack — Wearable Time-Series Analytics &amp; Health Prediction</span> · <span class="role-org">Python · TensorFlow</span></div>
          <span class="role-date">2025</span>
        </div>

        <ul>
          <li>Real-time fitness analytics platform processing <strong>high-volume wearable sensor streams (~50 Hz)</strong> — heart rate, accelerometer, motion signals.</li>
          <li>Implemented <strong>streaming data pipelines, time-series SQL storage, and a live metrics dashboard</strong>.</li>
          <li>Trained ML models predicting <strong>age, gender, BMI, and body-fat %</strong> from sensor signals — <strong>~88% accuracy</strong>, <strong>~3.5% MAE</strong> on body-fat regression across <strong>~1.5M sample windows</strong>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">Python</span><span class="chip">TensorFlow</span>
          <span class="chip">Time-Series</span><span class="chip">Wearables</span>
          <span class="chip">Streaming Analytics</span>
        </div>
      </div>

      <!-- MyHouse + MyPro -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">MyHouse + MyPro — Two-Sided Home-Services Platform</span> · <span class="role-org">React · Node.js / Express</span></div>
          <span class="role-date">2025</span>
        </div>

        <ul>
          <li>A <strong>two-sided home-services platform</strong>, not just a repair-booking app. Consumer side (<strong>MyHouse</strong>) and provider side (<strong>MyPro</strong>) share one backend and one data model.</li>
          <li><strong>MyHouse:</strong> every home gets a persistent digital record — an interactive <strong>2D/3D "digital twin"</strong> of rooms and appliances, a <strong>warranty vault</strong> with auto-expiry reminders, and a full maintenance/repair history that accumulates over time instead of being overwritten.</li>
          <li><strong>MyPro:</strong> contractors get a <strong>job feed, bidding tools, route/schedule views, and performance analytics</strong>.</li>
          <li>Both apps run on one shared <strong>Node.js/Express</strong> backend, so every completed repair feeds back into a <strong>knowledge graph</strong> that improves future contractor matching, repair-cost predictions, and maintenance forecasting for that same household.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">React</span><span class="chip">Node.js / Express</span>
          <span class="chip">Digital Twin</span><span class="chip">Knowledge Graph</span>
          <span class="chip">Contractor Matching</span><span class="chip">Warranty Tracking</span>
        </div>
      </div>

      <!-- NanoGPT HPC -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">NanoGPT Attention Kernel Optimization</span> · <span class="role-org">CUDA · C++17 · OpenMP</span></div>
          <span class="role-date">Jan 2026</span>
        </div>

        <ul>
          <li>Implemented Transformer multi-head attention in <strong>C++17</strong> over <code>[B, H, N, D]</code> tensors with a <strong>4D accessor</strong> collapsing index/stride arithmetic.</li>
          <li><strong>Row-tiled Q·Kᵀ</strong> and P·V matmuls to keep K/V panels resident in L1/L2.</li>
          <li>Parallelized across (batch, head) with <strong>OpenMP</strong>, vectorized with <strong>AVX2 + FMA</strong>, and fused matmul–softmax–matmul for a <strong>68× speedup</strong>.</li>
          <li>Built a <strong>CUDA</strong> variant with cooperative shared-memory tiling and per-thread <strong>online-softmax</strong> state.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">CUDA</span><span class="chip">C++17</span>
          <span class="chip">OpenMP</span><span class="chip">AVX2 / FMA</span>
          <span class="chip">Online Softmax</span><span class="chip">Cache Tiling</span>
        </div>
      </div>

      <!-- Distributed Systems (MPI) -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Distributed Systems (MPI)</span> · <span class="role-org">Masters Parallel Computing Course · 4.0</span></div>
          <span class="role-date">Jan 2026</span>
        </div>

        <ul>
          <li><strong>Latency hiding:</strong> overlapped non-blocking communication (<code>MPI_Isend</code> / <code>MPI_Irecv</code>) with stencil computation.</li>
          <li><strong>One-sided RMA:</strong> <code>MPI_Win</code> / <code>MPI_Get</code> for direct remote-array access — measurable gains on <strong>100M+ elements per rank</strong>.</li>
          <li><strong>Custom datatypes &amp; topology:</strong> <code>MPI_Type_create_struct</code> with <code>offsetof</code> for efficient <code>MPI_Gather</code>; subcommunicators via <code>MPI_Comm_split</code>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">MPI</span><span class="chip">Isend / Irecv</span>
          <span class="chip">One-Sided RMA</span><span class="chip">Derived Datatypes</span>
          <span class="chip">Subcommunicators</span>
        </div>
      </div>

      <!-- Tensor-Core GEMM -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Tensor-Core GEMM (CUDA)</span> · <span class="role-org">CSE 822 · Parallel Programming</span></div>
          <span class="role-date">Jan 2026</span>
        </div>

        <ul>
          <li>Implemented a <strong>TF32 tensor-core GEMM</strong> using <code>mma.sync.m16n8k8</code> PTX intrinsics.</li>
          <li><strong>float4-vectorized coalesced HBM loads</strong> with <strong>padded shared memory</strong> to eliminate bank conflicts.</li>
          <li>Benchmarked across <strong>M ∈ [1, 3072] at K = N = 3072</strong>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">CUDA</span><span class="chip">PTX</span>
          <span class="chip">mma.sync.m16n8k8</span><span class="chip">TF32</span>
          <span class="chip">Bank Conflicts</span><span class="chip">HBM Coalescing</span>
        </div>
      </div>

      <!-- AI Club Navigator -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">AI Club Navigator</span> · <span class="role-org">Flutter + Flask + CNN</span></div>
          <span class="role-date">Jan 2023</span>
        </div>

        <ul>
          <li>Cross-platform indoor-navigation app — <strong>CNN for image-based localization</strong>.</li>
          <li>Real-time route optimization with <strong>A*</strong> pathfinding over building layouts.</li>
          <li><strong>People's Choice — MSU AI Club, Fall 2022.</strong></li>
        </ul>
        <div class="chip-row">
          <span class="chip">Flutter</span><span class="chip">Flask</span>
          <span class="chip">CNN</span><span class="chip">A*</span>
        </div>
      </div>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="https://github.com/AtharvaKirkole" target="_blank" rel="noopener">See more on GitHub →</a>
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Download resume (PDF)</a>
      </p>
    `,
  },

  /* =========================== HOBBIES =========================== */
  hobbies: {
    eyebrow: "Hobbies",
    title: "Off the keyboard",
    html: `
      <p>The things I do when the laptop is closed. Most of them are how I stay fresh for the long debugging sessions that the other tabs are about.</p>

      <h4>Highlights — photos &amp; clips</h4>
      <p class="muted-note" style="font-size:12px;color:var(--ink-2);margin:-2px 0 10px;">
        Drop photos into <em>assets/</em> and swap any <code>&lt;div class="media-frame"&gt;</code> below with
        <code>&lt;img src="assets/…"&gt;</code> or <code>&lt;video autoplay muted loop playsinline src="assets/…"&gt;</code>.
      </p>
     

      <h4>What I do</h4>
      <div class="hobby-grid">
        <div class="hobby-card">
          <div class="hobby-ico">🏀</div>
          <h3>Basketball</h3>
          <p>Pickup runs, intramural leagues, and late-night sessions at MSU's Rec facilities. Favorite role: defender who pushes the break.</p>
        </div>
        <div class="hobby-card">
          <div class="hobby-ico">⚽</div>
          <h3>Soccer</h3>
          <p>Grew up playing. Still one of the fastest ways I reset between deadlines.</p>
        </div>
        <div class="hobby-card">
          <div class="hobby-ico">🏋️</div>
          <h3>Strength &amp; Fitness</h3>
          <p>Compound lifts, conditioning, and recovery work on a weekly split. Consistency compounds faster than any training program.</p>
        </div>
        <div class="hobby-card">
          <div class="hobby-ico">💻</div>
          <h3>Side projects</h3>
          <p>Weekend experiments — small GPU kernels, shaders, this site. If I'm not building a thing, I'm sharpening for the next one.</p>
        </div>
        <div class="hobby-card">
          <div class="hobby-ico">🎧</div>
          <h3>Music</h3>
          <p>Long hip-hop &amp; ambient playlists while coding. Different genres for debugging vs. architecting — there's a system.</p>
        </div>
        <div class="hobby-card">
          <div class="hobby-ico">✈️</div>
          <h3>Travel</h3>
          <p>Exploring new cities and trail systems whenever the semester lets me. Michigan → Midwest → wherever the flights are cheap.</p>
        </div>
      </div>

      <div class="chip-row">
        <span class="chip">Intramural Basketball</span>
        <span class="chip">Pickup Soccer</span>
        <span class="chip">Strength Training</span>
        <span class="chip">Weekend Builds</span>
      </div>
    `,
  },

  /* =========================== CONTACT =========================== */
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    html: `
      <p>The fastest way to reach me is email. I'm actively looking for <strong>summer / full-time roles in HPC, AI systems, and systems engineering</strong>.</p>

      <div class="contact-list">
        <a class="contact-row" href="mailto:kirkolea@msu.edu">
          <span class="contact-ico">✉️</span>
          <span class="contact-text">
            <span class="contact-k">Email</span>
            <span class="contact-v">kirkolea@msu.edu</span>
          </span>
          <span class="contact-go">↗</span>
        </a>
        <a class="contact-row" href="tel:+15173560159">
          <span class="contact-ico">📞</span>
          <span class="contact-text">
            <span class="contact-k">Phone</span>
            <span class="contact-v">+1 (517) 356-0159</span>
          </span>
          <span class="contact-go">↗</span>
        </a>
        <a class="contact-row" href="https://linkedin.com/in/atharva-kirkole" target="_blank" rel="noopener">
          <span class="contact-ico">💼</span>
          <span class="contact-text">
            <span class="contact-k">LinkedIn</span>
            <span class="contact-v">linkedin.com/in/atharva-kirkole</span>
          </span>
          <span class="contact-go">↗</span>
        </a>
        <a class="contact-row" href="https://github.com/AtharvaKirkole" target="_blank" rel="noopener">
          <span class="contact-ico">🐙</span>
          <span class="contact-text">
            <span class="contact-k">GitHub</span>
            <span class="contact-v">github.com/AtharvaKirkole</span>
          </span>
          <span class="contact-go">↗</span>
        </a>
        <div class="contact-row static">
          <span class="contact-ico">📍</span>
          <span class="contact-text">
            <span class="contact-k">Location</span>
            <span class="contact-v">East Lansing, Michigan</span>
          </span>
        </div>
        <div class="contact-row static">
          <span class="contact-ico">🎓</span>
          <span class="contact-text">
            <span class="contact-k">Status</span>
            <span class="contact-v">B.S. '25 · M.S. '26 · Ph.D. in progress</span>
          </span>
        </div>
      </div>

      <h4>Interests</h4>
      <p>HPC &amp; parallel systems · GPU compute &amp; CUDA · MPI at scale · AI infrastructure &amp; RAG · geospatial systems · systems for accessibility.</p>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Resume (PDF)</a>
        <a class="inline-btn" href="assets/transcript.pdf" download="Atharva_Kirkole_MSU_Transcript.pdf">↓ Official transcript (PDF)</a>
      </p>
    `,
  },
};
