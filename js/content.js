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
      <p>I'm a <strong>Computer Science graduate student</strong> at Michigan State University. I finished my <strong>BS in CS with Honors in 3 years</strong> (GPA 3.93) and I'm now on an accelerated one-year <strong>MS track</strong> (graduating Dec 2026) alongside the <strong>Graduate Certificate in High Performance Computing</strong>.</p>
      <p>I like the part of the stack where <em>physics meets code</em> — GPU kernels, compilers and runtimes, AI infrastructure, and web systems that have to be fast. This site itself is a 2D wave-equation PDE running on the GPU.</p>

      <h4>At a glance</h4>
      <div class="stat-grid">
        <div class="stat-card"><p class="k">Degrees</p><p class="v accent">BS → MS</p></div>
        <div class="stat-card"><p class="k">Undergrad GPA</p><p class="v">3.93</p></div>
        <div class="stat-card"><p class="k">Graduate GPA</p><p class="v">3.9</p></div>
        <div class="stat-card"><p class="k">BS finished in</p><p class="v">3 years</p></div>
        <div class="stat-card"><p class="k">MS target</p><p class="v">Dec 2026</p></div>
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

      <h4>Resume</h4>
      <p>
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Download PDF resume</a>
      </p>
    `,
  },

  /* ========================== EDUCATION ========================== */
  education: {
    eyebrow: "Education",
    title: "BS in 3 years · MS in 1",
    html: `
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Master of Science, Computer Science</span> · <span class="role-org">Michigan State University</span></div>
          <span class="role-date">Aug 2025 – Dec 2026</span>
        </div>
        <div class="role-loc">East Lansing, MI · GPA 3.9 · Accelerated 1-year program</div>
        <p>Pursuing the <strong>Graduate Certificate in High Performance Computing</strong> alongside the MS.</p>
        <div class="chip-row">
          <span class="chip">HPC Certificate</span>
          <span class="chip">CUDA / OpenMP</span>
          <span class="chip">Parallel Systems</span>
          <span class="chip">Advanced Algorithms</span>
        </div>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Bachelor of Science, Computer Science</span> · <span class="role-org">Michigan State University</span></div>
          <span class="role-date">Aug 2022 – Apr 2025</span>
        </div>
        <div class="role-loc">Graduated with Honors · GPA 3.93 · Business Minor · Honors College</div>
        <ul>
          <li>All-Semester <strong>Dean's List</strong> (every semester of the program).</li>
          <li>Inducted into <strong>Tau Beta Pi</strong> — engineering honor society.</li>
          <li>Inducted into the <strong>National Society of Scholars</strong>.</li>
          <li><strong>Resident Assistant Leader</strong> during undergrad.</li>
        </ul>
      </div>

      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Graduate Teaching Assistant</span> · <span class="role-org">Object-Oriented Principles</span></div>
          <span class="role-date">2025 – Present</span>
        </div>
        <div class="role-loc">CSE Department · Michigan State University</div>
        <ul>
          <li>Lead lab sections, grade assignments, hold weekly office hours.</li>
          <li>Guide students through C++17 projects — stack vs. heap, RAII, polymorphism, design patterns.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">C++17</span><span class="chip">RAII</span>
          <span class="chip">Polymorphism</span><span class="chip">Design Patterns</span>
        </div>
      </div>

      <h3>Graduate &amp; Advanced Coursework</h3>
      <div class="course-grid">
        <div class="course-pill"><span class="c">CSE</span>High Performance Computing</div>
        <div class="course-pill"><span class="c">CSE</span>Parallel Programming</div>
        <div class="course-pill"><span class="c">CSE</span>Advanced Algorithms</div>
        <div class="course-pill"><span class="c">CSE</span>Operating Systems</div>
        <div class="course-pill"><span class="c">CSE</span>Computer Architecture</div>
        <div class="course-pill"><span class="c">CSE</span>Machine Learning</div>
        <div class="course-pill"><span class="c">CSE</span>Deep Learning / NLP</div>
        <div class="course-pill"><span class="c">CSE</span>Database Systems</div>
        <div class="course-pill"><span class="c">CSE</span>Distributed Systems</div>
        <div class="course-pill"><span class="c">CSE</span>Object-Oriented Principles</div>
        <div class="course-pill"><span class="c">CSE</span>Software Engineering</div>
        <div class="course-pill"><span class="c">MTH</span>Linear Algebra</div>
        <div class="course-pill"><span class="c">MTH</span>Probability &amp; Statistics</div>
        <div class="course-pill"><span class="c">MTH</span>Discrete Structures</div>
      </div>
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
        <div class="stat-card"><p class="k">Graduated</p><p class="v">With Honors, 2025</p></div>
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
    `,
  },

  /* ============================ WORK ============================= */
  work: {
    eyebrow: "Work Experience",
    title: "Roles &amp; Impact",
    html: `
      <!-- Heard AI -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Speech AI Research Assistant</span> · <span class="role-org">Heard AI</span></div>
          <span class="role-date">Mar 2024 – Present</span>
        </div>
        <div class="role-loc">East Lansing, MI · NSF Convergence Accelerator Phase 2 ($5M)</div>
        
        <ul>
          <li>Full-stack speech tooling app — <em>Node.js, React, AWS Cloudscape</em>.</li>
          <li><strong>Stuttered-speech synthesis + personalized fine-tuning pipeline</strong> (~4 min/user) — up to <strong>23% accuracy improvement</strong>.</li>
          <li>Contributor on an NSF-funded project on accessible speech AI.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">Speech Synthesis</span><span class="chip">Fine-tuning</span>
          <span class="chip">React / Cloudscape</span><span class="chip">Node.js</span>
          <span class="chip">Accessibility</span><span class="chip">NSF</span>
        </div>
        <div class="role-links">
          <!-- replace with specific Heard AI project URL when available -->
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — Project info</a>
          <a class="inline-btn" href="https://linkedin.com/in/atharva-kirkole" target="_blank" rel="noopener">↗ Click here — More on LinkedIn</a>
        </div>
      </div>

      <!-- MSU IT -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Web Developer Intern</span> · <span class="role-org">MSU IT Services</span></div>
          <span class="role-date">Jun 2024 – Apr 2026</span>
        </div>
        <div class="role-loc">Michigan State University · East Lansing, MI</div>
       
        <ul>
          <li>Migrated <strong>50+ university websites</strong> across Sitecore CMS.</li>
          <li>Raised accessibility score from <strong>80% to 99.7%</strong> — WCAG 2.1, ADA, ARIA.</li>
          <li>Modernized services with PHP, JavaScript, Docker, custom Student-data REST APIs.</li>
          <li>Led full platform migration from <strong>Google Maps → ESRI ArcGIS</strong>, cutting IT expense ~20%.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">PHP</span><span class="chip">Docker</span><span class="chip">Sitecore</span>
          <span class="chip">ArcGIS / ESRI</span><span class="chip">Accessibility</span>
        </div>
        <div class="role-links">
          <!-- swap in specific MSU IT project URLs once public -->
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — Project info</a>
          <a class="inline-btn" href="https://tech.msu.edu/" target="_blank" rel="noopener">↗ Click here — MSU IT Services</a>
        </div>
      </div>

      <!-- Amazon -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Capstone Project Student</span> · <span class="role-org">Amazon</span></div>
          <span class="role-date">Jan 2025 – May 2025</span>
        </div>
        <div class="role-loc">East Lansing, MI</div>
       
        <ul>
          <li>AI-powered semantic code search with <strong>99% accuracy</strong> for internal architecture assets.</li>
          <li>Python, Node.js on <em>AWS Lambda, DynamoDB, S3, OpenSearch</em>.</li>
          <li><strong>Bedrock + SageMaker</strong> for dynamically-chunked vector embeddings; <strong>95% accurate RAG pipeline</strong>.</li>
          <li>Employee-recommendation system via vector similarity + GitHub contribution analysis.</li>
          <li>React + Cloudscape UI over RESTful APIs.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">AWS</span><span class="chip">Bedrock</span><span class="chip">SageMaker</span>
          <span class="chip">OpenSearch</span><span class="chip">RAG</span><span class="chip">React</span>
        </div>
        <div class="role-links">
          <!-- add a case-study link here when available -->
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — Project info</a>
          <a class="inline-btn" href="https://linkedin.com/in/atharva-kirkole" target="_blank" rel="noopener">↗ Click here — More on LinkedIn</a>
        </div>
      </div>

      <!-- Thompson Lab -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Machine Learning Researcher</span> · <span class="role-org">Thompson Maize Lab</span></div>
          <span class="role-date">Aug 2023 – May 2024</span>
        </div>
        <div class="role-loc">Michigan State University</div>
        
        <ul>
          <li>Scalable SQL + MongoDB architecture for <strong>120+ dimensional phenotypic &amp; genomic data</strong>.</li>
          <li>Random Forest / ML models (TensorFlow, Python, R) — <strong>72% accuracy</strong> yield prediction.</li>
          <li>Statistical analysis on Anthesis-Silking Interval (ASI); yield impact under stress.</li>
          <li>Presented at <strong>NAPPN Conference</strong>, Purdue — <a href="https://www.authorea.com/users/530254/articles/675202" target="_blank" rel="noopener">published abstract</a>.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">Random Forest</span><span class="chip">TensorFlow</span>
          <span class="chip">R</span><span class="chip">MongoDB</span><span class="chip">Genomics</span>
        </div>
        <div class="role-links">
          <a class="inline-btn" href="https://www.authorea.com/users/530254/articles/675202" target="_blank" rel="noopener">↗ Click here — Published abstract</a>
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — Code / notes</a>
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
        <div class="role-links">
          <a class="inline-btn" href="https://liveon.msu.edu/" target="_blank" rel="noopener">↗ Click here — MSU Live On (Housing)</a>
          <a class="inline-btn" href="https://linkedin.com/in/atharva-kirkole" target="_blank" rel="noopener">↗ Click here — More on LinkedIn</a>
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
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Speech AI Research Assistant</span> · <span class="role-org">Heard AI</span></div>
          <span class="role-date">Mar 2024 – Present</span>
        </div>
        <div class="role-loc">NSF Convergence Accelerator Phase 2 · $5M</div>
        
        <p>Working on <strong>accessible speech AI for speakers who stutter</strong>. Built a personalized fine-tuning pipeline that adapts a base model to a new speaker in roughly <strong>4 minutes</strong>, lifting downstream accuracy by <strong>up to 23%</strong>. Full-stack React/Node/Cloudscape tooling drives data collection and inference in real time.</p>
        <div class="chip-row">
          <span class="chip">Speech Synthesis</span><span class="chip">Fine-tuning</span>
          <span class="chip">Accessibility</span><span class="chip">NSF</span>
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

      <h3>HPC coursework &amp; research interests</h3>
      <p>The HPC Graduate Certificate is letting me go deeper on the <em>systems</em> side of AI: attention-kernel optimization (CUDA / OpenMP / SIMD / cache-aware tiling), distributed training, memory-hierarchy-aware algorithm design, and WebGPU as a vehicle for browser-native HPC (this site being exhibit A).</p>
      <div class="chip-row">
        <span class="chip">CUDA</span><span class="chip">OpenMP</span>
        <span class="chip">AVX2 / ISPC</span><span class="chip">Cache Tiling</span>
        <span class="chip">WebGPU / WGSL</span>
      </div>
    `,
  },

  /* ========================== PROJECTS =========================== */
  projects: {
    eyebrow: "Projects",
    title: "Selected Work",
    html: `
      <!-- NanoGPT HPC -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">NanoGPT Attention Kernel Optimization</span> · <span class="role-org">CUDA · OpenMP · ISPC</span></div>
          <span class="role-date">Jan 2026</span>
        </div>
        
        <ul>
          <li>Transformer attention in <strong>C++17</strong> with contiguous tensor layouts + 4D accessors for memory locality.</li>
          <li><strong>Cache-aware tiling / blocking</strong> for the matmuls — reduced DRAM traffic, improved L1/L2 reuse.</li>
          <li>Parallelized across batches / heads / rows with <strong>OpenMP</strong> + thread-private buffers; separate <strong>CUDA</strong> kernel path for GPU.</li>
          <li>Vectorized hot loops with <strong>SIMD intrinsics / ISPC (AVX2)</strong> for linear-algebra kernels.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">CUDA</span><span class="chip">OpenMP</span>
          <span class="chip">AVX2</span><span class="chip">ISPC</span>
          <span class="chip">Cache Tiling</span><span class="chip">Roofline</span>
        </div>
        <div class="role-links">
          <!-- swap href to the actual fork / repo URL when it's published -->
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — GitHub repo</a>
          <a class="inline-btn" href="https://github.com/karpathy/nanoGPT" target="_blank" rel="noopener">↗ Click here — Original NanoGPT</a>
        </div>
      </div>

      <!-- Amazon Capstone -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">Amazon Semantic Code Search</span> · <span class="role-org">AWS · RAG · Capstone</span></div>
          <span class="role-date">Jan – May 2025</span>
        </div>
        
        <ul>
          <li><strong>99% accuracy</strong> semantic search over internal architecture assets.</li>
          <li>Python / Node.js backend on Lambda, DynamoDB, S3, OpenSearch.</li>
          <li><strong>Bedrock + SageMaker</strong> for dynamically-chunked embeddings; 95% accurate RAG retrieval.</li>
          <li>Employee recommendation engine via vector similarity + GitHub contribution analysis.</li>
          <li>Responsive React + Cloudscape UI over RESTful APIs.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">AWS</span><span class="chip">Bedrock</span>
          <span class="chip">SageMaker</span><span class="chip">OpenSearch</span>
          <span class="chip">RAG</span><span class="chip">React</span>
        </div>
        <div class="role-links">
          <!-- Amazon capstones are typically NDA'd — link to a write-up when public -->
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — Case study</a>
          <a class="inline-btn" href="https://aws.amazon.com/bedrock/" target="_blank" rel="noopener">↗ Click here — AWS Bedrock</a>
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
        <div class="role-links">
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — GitHub repo</a>
          <a class="inline-btn" href="https://linkedin.com/in/atharva-kirkole" target="_blank" rel="noopener">↗ Click here — Project write-up</a>
        </div>
      </div>

      <!-- This site -->
      <div class="role">
        <div class="role-head">
          <div><span class="role-title">This site</span> · <span class="role-org">WebGPU · WGSL · WebGL2</span></div>
          <span class="role-date">2026</span>
        </div>
       
        <ul>
          <li>2D wave-equation PDE as a WGSL compute shader — ping-pong rgba16float textures at 512×512 cells/frame.</li>
          <li>Cursor emits decaying Gaussian sources; GPU propagates the wavefront with absorbing boundaries.</li>
          <li>Icons are displaced on the CPU using analytical ripple superposition, so the DOM bobs in sync with the GPU ocean.</li>
          <li>Full WebGL2 fragment-shader fallback for browsers without WebGPU.</li>
        </ul>
        <div class="chip-row">
          <span class="chip">WebGPU</span><span class="chip">WGSL</span>
          <span class="chip">WebGL2</span><span class="chip">PDE</span>
          <span class="chip">Shader Math</span>
        </div>
        <div class="role-links">
          <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">↗ Click here — View source on GitHub</a>
          <a class="inline-btn" href="https://www.w3.org/TR/webgpu/" target="_blank" rel="noopener">↗ Click here — WebGPU spec</a>
        </div>
      </div>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="https://github.com/kirkolea" target="_blank" rel="noopener">See more on GitHub →</a>
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
        <a class="contact-row" href="https://github.com/kirkolea" target="_blank" rel="noopener">
          <span class="contact-ico">🐙</span>
          <span class="contact-text">
            <span class="contact-k">GitHub</span>
            <span class="contact-v">github.com/kirkolea</span>
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
            <span class="contact-k">Graduation</span>
            <span class="contact-v">December 2026</span>
          </span>
        </div>
      </div>

      <h4>Interests</h4>
      <p>HPC &amp; parallel systems · GPU compute &amp; CUDA · compilers and runtimes · AI infrastructure &amp; RAG · systems for accessibility.</p>

      <p class="modal-footer-cta">
        <a class="inline-btn" href="assets/resume.pdf" download="Atharva_Kirkole_Resume.pdf">↓ Download resume (PDF)</a>
      </p>
    `,
  },
};
