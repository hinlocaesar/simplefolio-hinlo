/** **** Projects Section **** */

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section-eyebrow">Selected Work</p>
        <h2 className="section-title">Projects</h2>
        <div className="projects__rail">
          <div className="projects__rail-head">
            <div>
              <h3 className="projects__subheading">Production Originals</h3>
              <p className="projects__rail-copy">
                Web apps engineered and launched end to end, as part of a team and solo.
              </p>
            </div>
            <div className="projects__rail-nav" aria-label="Production project controls">
              <button
                type="button"
                className="projects__rail-button"
                data-rail-control="previous"
                data-rail-target="production-projects"
                aria-label="Scroll production projects left"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-chevron-left" />
                </svg>
              </button>
              <button
                type="button"
                className="projects__rail-button"
                data-rail-control="next"
                data-rail-target="production-projects"
                aria-label="Scroll production projects right"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-chevron-right" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="projects__grid"
            id="production-projects"
            data-horizontal-rail=""
            tabIndex={0}
            aria-label="Production projects"
          >
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/discoverjobs/desktop.webp"
                data-lightbox-alt="DiscoverJobs remote job board"
                aria-label="View full DiscoverJobs screenshot"
              >
                <img
                  alt="DiscoverJobs, US jobs listing"
                  src="/assets/project-images/thumbs/discoverjobs/desktop.webp"
                  srcSet="/assets/project-images/thumbs/discoverjobs/desktop-320.webp 320w, /assets/project-images/thumbs/discoverjobs/desktop-640.webp 640w, /assets/project-images/thumbs/discoverjobs/desktop-960.webp 960w, /assets/project-images/thumbs/discoverjobs/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">DiscoverJobs</h4>
                <p className="project-card__meta">DevResearch · Client Project</p>
                <p className="project-card__desc">
                  Full-Stack Job Board (discoverjobs.org): Built and deployed a multi-market
                  platform (Vue 3, Inertia.js, Laravel, Tailwind) handling seeker, employer, and
                  admin surfaces. Payments &amp; Storage: Integrated automated paid listings via
                  Xendit API/webhooks and Cloudflare R2 for file storage. Search &amp; Performance:
                  Engineered typo-tolerant search using Meilisearch and Redis cache warming fed by
                  external job aggregation APIs. Real-Time &amp; Security: Implemented WebSocket
                  chat and notifications (Laravel Reverb/Echo) with 2FA, passkeys (Fortify), and
                  RBAC policies. AI &amp; Microservices: Built a BIR-accredited accounting
                  microservice in under 1 month and integrated an AI admin tool (LangChain/RAG) for
                  tax data extraction. DevOps &amp; QA: Maintained PHPUnit test suites, automated
                  Forge deployments, and health monitoring via Laravel Nightwatch.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Vue 3</span>
                  <span className="tag tag--sm">Inertia.js</span>
                  <span className="tag tag--sm">Laravel</span>
                  <span className="tag tag--sm">Tailwind CSS</span>
                  <span className="tag tag--sm">Meilisearch</span>
                  <span className="tag tag--sm">Redis</span>
                  <span className="tag tag--sm">Xendit</span>
                  <span className="tag tag--sm">Laravel Nightwatch</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://discoverjobs.org"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--diagram project-card__image--expandable"
                data-lightbox="/assets/project-images/bircas/flow-diagram.webp"
                data-lightbox-alt="BIR CAS, website screenshot showing money flow overview"
                aria-label="View full BIR CAS website screenshot"
              >
                <img
                  alt="BIR CAS, website screenshot showing money flow overview"
                  src="/assets/project-images/thumbs/bircas/flow-diagram.webp"
                  srcSet="/assets/project-images/thumbs/bircas/flow-diagram-320.webp 320w, /assets/project-images/thumbs/bircas/flow-diagram-640.webp 640w, /assets/project-images/thumbs/bircas/flow-diagram-960.webp 960w, /assets/project-images/thumbs/bircas/flow-diagram.webp 1024w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1024"
                  height="490"
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-card__expand-hint">
                  <svg className="icon" aria-hidden="true" focusable="false">
                    <use href="#i-zoom-in" />
                  </svg>{" "}
                  View full screenshot
                </span>
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">BIR CAS</h4>
                <p className="project-card__meta">
                  Companion Service to DiscoverJobs · Sole Developer
                </p>
                <p className="project-card__desc">
                  AI-powered validation features for a BIR-accredited Computerized Accounting
                  System, built as a standalone Laravel service and integrated with DiscoverJobs via
                  an internal API client. Designed and deployed within one month. Tracks the full
                  money flow required under RR No. 9-2009: invoices and official receipts feed the
                  Sales, Cash Receipts, and Cash Disbursements books, rolling up through the General
                  Journal and Ledger to a Trial Balance, Statement of Comprehensive Income,
                  Statement of Financial Position, and a complete audit trail. Uses LangChain,
                  prompt engineering, and RAG to validate uploaded BIR Form 2307s. Structured so it
                  can ship as its own product.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Laravel</span>
                  <span className="tag tag--sm">PHP</span>
                  <span className="tag tag--sm">AI / LangChain</span>
                  <span className="tag tag--sm">BIR Compliance</span>
                  <span className="tag tag--sm">Accounting</span>
                  <span className="tag tag--sm">REST API</span>
                  <span className="tag tag--sm">Audit Trail</span>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/streamlineverify/desktop.webp"
                data-lightbox-alt="Streamline Verify healthcare compliance platform"
                aria-label="View full Streamline Verify screenshot"
              >
                <img
                  alt="Streamline Verify, healthcare compliance platform"
                  src="/assets/project-images/thumbs/streamlineverify/desktop.webp"
                  srcSet="/assets/project-images/thumbs/streamlineverify/desktop-320.webp 320w, /assets/project-images/thumbs/streamlineverify/desktop-640.webp 640w, /assets/project-images/thumbs/streamlineverify/desktop-960.webp 960w, /assets/project-images/thumbs/streamlineverify/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Streamline Verify</h4>
                <p className="project-card__meta">Elgada BPO Solutions · Client Project</p>
                <p className="project-card__desc">
                  AI-powered web app for Streamline Verify, a U.S. healthcare compliance and
                  exclusion-screening platform, across React, Next.js, Express, Node.js, GraphQL,
                  Vue, Laravel, and Python (Flask). Boosted query performance by up to 40%,
                  refactored legacy code for scalability, supported SOC 2 due diligence, and
                  mentored junior engineers.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Salesforce</span>
                  <span className="tag tag--sm">React</span>
                  <span className="tag tag--sm">Next.js</span>
                  <span className="tag tag--sm">Express.js</span>
                  <span className="tag tag--sm">Node.js</span>
                  <span className="tag tag--sm">GraphQL</span>
                  <span className="tag tag--sm">Vue</span>
                  <span className="tag tag--sm">Laravel</span>
                  <span className="tag tag--sm">Python</span>
                  <span className="tag tag--sm">Flask</span>
                  <span className="tag tag--sm">AI</span>
                  <span className="tag tag--sm">Sentry</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://streamlineverify.com/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/champion4heroes/desktop.webp"
                data-lightbox-alt="Champions 4 Heroes nonprofit website"
                aria-label="View full Champions 4 Heroes screenshot"
              >
                <img
                  alt="Champions 4 Heroes nonprofit website"
                  src="/assets/project-images/thumbs/champion4heroes/desktop.webp"
                  srcSet="/assets/project-images/thumbs/champion4heroes/desktop-320.webp 320w, /assets/project-images/thumbs/champion4heroes/desktop-640.webp 640w, /assets/project-images/thumbs/champion4heroes/desktop-960.webp 960w, /assets/project-images/thumbs/champion4heroes/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Champions 4 Heroes</h4>
                <p className="project-card__meta">
                  Champion4Heroes · Board Member &amp; Web Developer
                </p>
                <p className="project-card__desc">
                  Nonprofit site for Champions 4 Heroes, a 501(c)(3) program of the Michael Nathan
                  Twining Foundation that unites World Champion athletes and veterans to raise
                  awareness for traumatic brain injury, while honoring SSG Michael &quot;Nate&quot;
                  Twining of the 101st Airborne. Built and maintained on Umbraco: authored the
                  mission, story, and program content, wired up the video embeds, partner listings,
                  and contact flow, and handled the on-page SEO and social metadata. Also served on
                  the board, driving strategy and operational process improvements.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Umbraco</span>
                  <span className="tag tag--sm">.NET</span>
                  <span className="tag tag--sm">C#</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                  <span className="tag tag--sm">SEO</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://hinlocaesar.github.io/champion-4-heroes/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox-gallery={
                  '[{"src":"/assets/project-images/filipinova/desktop.webp","alt":"Filipino VA home page, Hire the best Filipino virtual assistants"},{"src":"/assets/project-images/filipinova/jobs.webp","alt":"Filipino VA job search page with filters for skill, pay and job type"},{"src":"/assets/project-images/filipinova/home-full.webp","alt":"Filipino VA home page, full scroll from hero to footer"}]'
                }
                aria-label="View full Filipino VA screenshots"
              >
                <img
                  alt="Filipino VA job board, Hire the best Filipino virtual assistants"
                  src="/assets/project-images/thumbs/filipinova/desktop.webp"
                  srcSet="/assets/project-images/thumbs/filipinova/desktop-320.webp 320w, /assets/project-images/thumbs/filipinova/desktop-640.webp 640w, /assets/project-images/thumbs/filipinova/desktop-960.webp 960w, /assets/project-images/thumbs/filipinova/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-card__expand-hint">
                  <svg className="icon" aria-hidden="true" focusable="false">
                    <use href="#i-zoom-in" />
                  </svg>{" "}
                  View full screenshots
                </span>
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Filipino VA</h4>
                <p className="project-card__meta">DevResearch · Product Build · In Development</p>
                <p className="project-card__desc">
                  Remote-work job marketplace connecting employers with pre-vetted Filipino VAs,
                  built end to end at DevResearch. The stack is Umbraco-based: Umbraco 17 runs
                  headless behind the Content Delivery API for CMS-managed pages and admin listing
                  moderation, feeding an ASP.NET Core marketplace API with EF Core, PostgreSQL, and
                  rotating JWT refresh tokens. The prerendered Vue 3 + TypeScript + Vite frontend
                  covers worker profiles, job posting, search and filtering, applications and
                  shortlisting, with 125 unit and 35 integration tests. Not yet publicly launched.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Umbraco 17</span>
                  <span className="tag tag--sm">Headless CMS</span>
                  <span className="tag tag--sm">ASP.NET Core</span>
                  <span className="tag tag--sm">C#</span>
                  <span className="tag tag--sm">EF Core</span>
                  <span className="tag tag--sm">PostgreSQL</span>
                  <span className="tag tag--sm">Vue 3</span>
                  <span className="tag tag--sm">TypeScript</span>
                  <span className="tag tag--sm">Vite</span>
                  <span className="tag tag--sm">Tailwind CSS</span>
                  <span className="tag tag--sm">Pinia</span>
                  <span className="tag tag--sm">REST API</span>
                  <span className="tag tag--sm">JWT</span>
                  <span className="tag tag--sm">Vitest</span>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/plumvillage/home.webp"
                data-lightbox-alt="Plum Village App, web edition home page"
                aria-label="View full Plum Village App screenshot"
              >
                <img
                  alt="Plum Village App, web edition home page"
                  src="/assets/project-images/thumbs/plumvillage/home.webp"
                  srcSet="/assets/project-images/thumbs/plumvillage/home-320.webp 320w, /assets/project-images/thumbs/plumvillage/home-640.webp 640w, /assets/project-images/thumbs/plumvillage/home-960.webp 960w, /assets/project-images/thumbs/plumvillage/home.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Plum Village App</h4>
                <p className="project-card__meta">DevResearch · Client Project</p>
                <p className="project-card__desc">
                  Web Edition (web.plumvillage.app): Built and launched the web edition of Plum
                  Village&apos;s mindfulness library end to end at DevResearch, pairing the iOS and
                  Android app with a public browser front end. Practice Library: Meditations, Talks,
                  and Resources each browse into a categorized catalogue of guided and silent
                  meditations, deep relaxations, dharma talks and short teachings, practice songs,
                  poems, chanting, sutras, and mindful movement. Practice Tools: a meditation timer
                  and mindfulness bell for timed sitting, alongside per-track durations and speaker
                  credits. Content &amp; Localization: a Latest Updates feed for new practice
                  material and a language switcher across the supported translations, with artwork
                  and media served from a CDN-backed image pipeline. Responsive from phone to
                  desktop, and paired with the mobile app that extends it with offline listening,
                  favorites, and playlists.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Next.js</span>
                  <span className="tag tag--sm">React</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://web.plumvillage.app/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="projects__rail">
          <div className="projects__rail-head">
            <div>
              <h3 className="projects__subheading">Enterprise &amp; Firmware</h3>
              <p className="projects__rail-copy">
                Embedded platforms, device software, and production-grade engineering systems.
              </p>
            </div>
            <div className="projects__rail-nav" aria-label="Enterprise project controls">
              <button
                type="button"
                className="projects__rail-button"
                data-rail-control="previous"
                data-rail-target="enterprise-projects"
                aria-label="Scroll enterprise projects left"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-chevron-left" />
                </svg>
              </button>
              <button
                type="button"
                className="projects__rail-button"
                data-rail-control="next"
                data-rail-target="enterprise-projects"
                aria-label="Scroll enterprise projects right"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-chevron-right" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="projects__grid"
            id="enterprise-projects"
            data-horizontal-rail=""
            tabIndex={0}
            aria-label="Enterprise and firmware projects"
          >
            <article className="project-card">
              <button
                type="button"
                className="project-card__image project-card__image--product project-card__image--expandable"
                data-lightbox="/assets/project-images/novatech-how-to-guides/desktop.webp"
                data-lightbox-alt="Kyocera MFP touchscreen-to-MFP integration showing Device Information"
                aria-label="View full Kyocera touchscreen integration sample"
              >
                <img
                  alt="Kyocera MFP touchscreen-to-MFP integration showing Device Information"
                  src="/assets/project-images/thumbs/novatech-how-to-guides/desktop.webp"
                  srcSet="/assets/project-images/thumbs/novatech-how-to-guides/desktop-320.webp 320w, /assets/project-images/thumbs/novatech-how-to-guides/desktop-640.webp 640w, /assets/project-images/thumbs/novatech-how-to-guides/desktop.webp 866w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="866"
                  height="690"
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-card__expand-hint">
                  <svg className="icon" aria-hidden="true" focusable="false">
                    <use href="#i-zoom-in" />
                  </svg>{" "}
                  View touchscreen sample
                </span>
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Kyocera MFP Touchscreen Integration</h4>
                <p className="project-card__meta">Kyocera Document Solutions · Feature Developer</p>
                <p className="project-card__desc">
                  Connected the touchscreen layer to the multifunctional printer (MFP) layer,
                  including Copy, Send, FAX, Custom Box, system menus, and Device Information
                  workflows.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Touchscreen</span>
                  <span className="tag tag--sm">MFP Integration</span>
                  <span className="tag tag--sm">Embedded</span>
                  <span className="tag tag--sm">Device Workflows</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://novatech.net/how-to-guides/find-your-kyocera-ip-address"
                  >
                    UI Sample
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <a
                className="project-card__image project-card__image--product"
                href="https://www.kyoceradocumentsolutions.com/asia/en/products/mfp/ecosys-fs1125mfp/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Kyocera Ecosys FS-1025MFP and FS-1125MFP"
                  src="/assets/project-images/thumbs/kyocera/ecosys-fs1125mfp.webp"
                  srcSet="/assets/project-images/thumbs/kyocera/ecosys-fs1125mfp-320.webp 320w, /assets/project-images/thumbs/kyocera/ecosys-fs1125mfp-640.webp 640w, /assets/project-images/thumbs/kyocera/ecosys-fs1125mfp-960.webp 960w, /assets/project-images/thumbs/kyocera/ecosys-fs1125mfp.webp 1273w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1273"
                  height="716"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-card__body">
                <h4 className="project-card__title">Kyocera Ecosys FS-1025MFP &amp; FS-1125MFP</h4>
                <p className="project-card__meta">
                  Kyocera Document Solutions · Firmware Developer
                </p>
                <p className="project-card__desc">
                  Firmware Developer for Fax and Maintenance Mode firmware in C; developed internal
                  frameworks and libraries with the Japan team through recurring JP–PH tech
                  transfer, alignment, and product rollout.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">C</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.kyoceradocumentsolutions.com/asia/en/products/mfp/ecosys-fs1125mfp/"
                  >
                    Product Page
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <a
                className="project-card__image project-card__image--product"
                href="https://www.kyoceradocumentsolutions.com/hk/en/products/mfp/taskalfa-2201/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Kyocera TASKalfa 2200 and 2201"
                  src="/assets/project-images/thumbs/kyocera/taskalfa-2201.webp"
                  srcSet="/assets/project-images/thumbs/kyocera/taskalfa-2201-320.webp 320w, /assets/project-images/thumbs/kyocera/taskalfa-2201-640.webp 640w, /assets/project-images/thumbs/kyocera/taskalfa-2201-960.webp 960w, /assets/project-images/thumbs/kyocera/taskalfa-2201.webp 1076w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1076"
                  height="604"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-card__body">
                <h4 className="project-card__title">TASKalfa 2200 / 2201</h4>
                <p className="project-card__meta">Kyocera Document Solutions · Team Leader</p>
                <p className="project-card__desc">
                  Team Leader for Fax and Maintenance Mode firmware in C++, using frameworks and
                  libraries designed and developed by the Philippine team. This role meant recurring
                  trips for JP–PH tech transfer, alignment, and product rollout.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">C++</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.kyoceradocumentsolutions.com/hk/en/products/mfp/taskalfa-2201/"
                  >
                    Product Page
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <a
                className="project-card__image project-card__image--product"
                href="https://www.kyoceradocumentsolutions.com/asia/en/products/business-application/command-center-rx.html"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Kyocera Command Center RX embedded web interface"
                  src="/assets/project-images/thumbs/kyocera/command-center-rx.webp"
                  srcSet="/assets/project-images/thumbs/kyocera/command-center-rx-320.webp 320w, /assets/project-images/thumbs/kyocera/command-center-rx-640.webp 640w, /assets/project-images/thumbs/kyocera/command-center-rx.webp 952w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="952"
                  height="522"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-card__body">
                <h4 className="project-card__title">Command Center RX</h4>
                <p className="project-card__meta">Kyocera Document Solutions · Web Product</p>
                <p className="project-card__desc">
                  Embedded web server built into Kyocera MFPs. Browser access via device IP for
                  device status, toner and paper levels, maintenance kits, job monitoring, address
                  book, document boxes, and admin configuration (network, security, remote
                  operation). Implemented web UI and backend features with ASP.NET Core, C#, PHP,
                  and jQuery.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">ASP.NET Core</span>
                  <span className="tag tag--sm">C#</span>
                  <span className="tag tag--sm">PHP</span>
                  <span className="tag tag--sm">jQuery</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.kyoceradocumentsolutions.com/asia/en/products/business-application/command-center-rx.html"
                  >
                    Product Page
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <a
                className="project-card__image project-card__image--product"
                href="https://www.kyoceradocumentsolutions.eu/en/products/mfp/ECOSYSM3860IDNF.html"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Kyocera ECOSYS M3860idnf"
                  src="/assets/project-images/thumbs/kyocera/ecosys-m3860idnf.webp"
                  srcSet="/assets/project-images/thumbs/kyocera/ecosys-m3860idnf-320.webp 320w, /assets/project-images/thumbs/kyocera/ecosys-m3860idnf-640.webp 640w, /assets/project-images/thumbs/kyocera/ecosys-m3860idnf-960.webp 960w, /assets/project-images/thumbs/kyocera/ecosys-m3860idnf.webp 1076w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1076"
                  height="604"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-card__body">
                <h4 className="project-card__title">ECOSYS M3860idnf</h4>
                <p className="project-card__meta">
                  Kyocera Document Solutions · Firmware Developer
                </p>
                <p className="project-card__desc">
                  Developed C++ firmware and internal frameworks and libraries for the ECOSYS
                  M3860idnf, working with the Japan team on technology transfer, alignment, and
                  product rollout.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">C++, HyPAS</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.kyoceradocumentsolutions.eu/en/products/mfp/ECOSYSM3860IDNF.html"
                  >
                    Product Page
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <a
                className="project-card__image project-card__image--product"
                href="https://www.kyoceradocumentsolutions.us/en/products/mfp/TASKALFAMZ7001CI.html"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Kyocera TASKalfa MZ7001ci"
                  src="/assets/project-images/thumbs/kyocera/taskalfa-mz7001ci.webp"
                  srcSet="/assets/project-images/thumbs/kyocera/taskalfa-mz7001ci-320.webp 320w, /assets/project-images/thumbs/kyocera/taskalfa-mz7001ci.webp 540w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="540"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-card__body">
                <h4 className="project-card__title">TASKalfa MZ7001ci</h4>
                <p className="project-card__meta">Kyocera Document Solutions · A3 Color MFP</p>
                <p className="project-card__desc">
                  High-speed A3 color MFP (70 ppm) with cloud-ready solutions, AI scanning features,
                  and embedded operation-panel software. Contributed embedded firmware and panel UI
                  work for the TASKalfa MZ series using C/C++ and company frameworks.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">C</span>
                  <span className="tag tag--sm">C++</span>
                  <span className="tag tag--sm">Embedded</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.kyoceradocumentsolutions.us/en/products/mfp/TASKALFAMZ7001CI.html"
                  >
                    Product Page
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <a
                className="project-card__image project-card__image--product"
                href="https://www.kyoceradocumentsolutions.us/en/products/mfp/TASKALFAMZ2501CI.html"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="Kyocera TASKalfa MZ2501ci"
                  src="/assets/project-images/thumbs/kyocera/taskalfa-mz2501ci.webp"
                  srcSet="/assets/project-images/thumbs/kyocera/taskalfa-mz2501ci-320.webp 320w, /assets/project-images/thumbs/kyocera/taskalfa-mz2501ci.webp 540w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="540"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <div className="project-card__body">
                <h4 className="project-card__title">TASKalfa MZ2501ci</h4>
                <p className="project-card__meta">Kyocera Document Solutions · A3 Color MFP</p>
                <p className="project-card__desc">
                  A3 color MFP (25 ppm) in the TASKalfa MZ series with integrated cloud solutions,
                  AI-assisted scanning, and durable long-life components. Contributed embedded
                  firmware and panel UI work using C/C++ and company frameworks.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">C</span>
                  <span className="tag tag--sm">C++</span>
                  <span className="tag tag--sm">Embedded</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.kyoceradocumentsolutions.us/en/products/mfp/TASKALFAMZ2501CI.html"
                  >
                    Product Page
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="projects__rail">
          <div className="projects__rail-head">
            <div>
              <h3 className="projects__subheading">Other Projects</h3>
              <p className="projects__rail-copy">Freelance websites and smaller client projects.</p>
            </div>
            <div className="projects__rail-nav" aria-label="Other project controls">
              <button
                type="button"
                className="projects__rail-button"
                data-rail-control="previous"
                data-rail-target="minor-projects"
                aria-label="Scroll other projects left"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-chevron-left" />
                </svg>
              </button>
              <button
                type="button"
                className="projects__rail-button"
                data-rail-control="next"
                data-rail-target="minor-projects"
                aria-label="Scroll other projects right"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-chevron-right" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="projects__grid"
            id="minor-projects"
            data-horizontal-rail=""
            tabIndex={0}
            aria-label="Other freelance projects"
          >
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/retreat2pk/desktop.webp"
                data-lightbox-alt="The Retreat at Possum Kingdom Lake website"
                aria-label="View full The Retreat screenshot"
              >
                <img
                  alt="The Retreat at Possum Kingdom Lake website"
                  src="/assets/project-images/thumbs/retreat2pk/desktop.webp"
                  srcSet="/assets/project-images/thumbs/retreat2pk/desktop-320.webp 320w, /assets/project-images/thumbs/retreat2pk/desktop-640.webp 640w, /assets/project-images/thumbs/retreat2pk/desktop-960.webp 960w, /assets/project-images/thumbs/retreat2pk/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">The Retreat</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Marketing site for The Retreat, a hillside vacation community on Possum Kingdom
                  Lake in Graford, Texas. Covers lake home sales, amenities, local guide, gallery,
                  and contact. Built on WordPress with the Avada theme, including brochure CTAs and
                  property branding for scenic remodeled lake homes.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">WordPress</span>
                  <span className="tag tag--sm">Avada</span>
                  <span className="tag tag--sm">PHP</span>
                  <span className="tag tag--sm">CSS</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://retreat2pk.com/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/thefallsrvpark/desktop.webp"
                data-lightbox-alt="The Falls RV Park marketing and booking website"
                aria-label="View full The Falls RV Park screenshot"
              >
                <img
                  alt="The Falls RV Park website"
                  src="/assets/project-images/thumbs/thefallsrvpark/desktop.webp"
                  srcSet="/assets/project-images/thumbs/thefallsrvpark/desktop-320.webp 320w, /assets/project-images/thumbs/thefallsrvpark/desktop-640.webp 640w, /assets/project-images/thumbs/thefallsrvpark/desktop-960.webp 960w, /assets/project-images/thumbs/thefallsrvpark/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">The Falls RV Park</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Marketing and booking site for The Falls RV Park in Davis, Oklahoma. Covers
                  amenities, rates, policies, FAQ, gallery, and online reservations for full-hookup
                  RV sites and onsite cabins. Built with GoDaddy Website Builder, including
                  membership bookings and contact details for onsite managers.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">GoDaddy</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://thefallsrvpark.com/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/lanterragroup/desktop.webp"
                data-lightbox-alt="Lanterra Group real estate development website"
                aria-label="View full Lanterra Group screenshot"
              >
                <img
                  alt="Lanterra Group, real estate development website"
                  src="/assets/project-images/thumbs/lanterragroup/desktop.webp"
                  srcSet="/assets/project-images/thumbs/lanterragroup/desktop-320.webp 320w, /assets/project-images/thumbs/lanterragroup/desktop-640.webp 640w, /assets/project-images/thumbs/lanterragroup/desktop-960.webp 960w, /assets/project-images/thumbs/lanterragroup/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Lanterra Group</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Marketing site for Lanterra Group, a North Texas real estate development and
                  construction firm covering story, team, markets, services, project portfolio,
                  careers, and contact. Built in Webflow with Lottie motion and a careers
                  application form.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Webflow</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://www.lanterragroup.com/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/sweetpopcorn/desktop.webp"
                data-lightbox-alt="Sweet Magic Popcorn custom-built website"
                aria-label="View full Sweet Magic Popcorn custom build screenshot"
              >
                <img
                  alt="Sweet Magic Popcorn custom-built website"
                  src="/assets/project-images/thumbs/sweetpopcorn/desktop.webp"
                  srcSet="/assets/project-images/thumbs/sweetpopcorn/desktop-320.webp 320w, /assets/project-images/thumbs/sweetpopcorn/desktop-640.webp 640w, /assets/project-images/thumbs/sweetpopcorn/desktop-960.webp 960w, /assets/project-images/thumbs/sweetpopcorn/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Sweet Magic Popcorn (Custom Build)</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Hand-coded rebuild of the Sweet Magic Popcorn brand and shop, replacing the
                  GoDaddy builder site with a static HTML/CSS/JavaScript build on GitHub Pages.
                  Covers product, packages, kernels, seasonings, nutrition, cooking, story,
                  documentary, media, and contact pages with a sticky header, dropdown and mobile
                  navigation, and full SEO and social metadata.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Umbraco</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                  <span className="tag tag--sm">GitHub Pages</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://hinlocaesar.github.io/sweet-popcorn/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/evajonesyoung/desktop.webp"
                data-lightbox-alt="Eva D. Jones-Young official website"
                aria-label="View full Eva D. Jones-Young screenshot"
              >
                <img
                  alt="Eva D. Jones-Young official website"
                  src="/assets/project-images/thumbs/evajonesyoung/desktop.webp"
                  srcSet="/assets/project-images/thumbs/evajonesyoung/desktop-320.webp 320w, /assets/project-images/thumbs/evajonesyoung/desktop-640.webp 640w, /assets/project-images/thumbs/evajonesyoung/desktop-960.webp 960w, /assets/project-images/thumbs/evajonesyoung/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Eva D. Jones-Young</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Official and personal site for Eva D. Jones-Young (“Sweet Magic”), a 14× martial
                  arts champion, 3× boxing world champion, and 10× Hall of Fame inductee. Built on
                  Wix with bio, documentary, news, affiliations, contact, merchandise, and a link
                  through to Sweet Magic Popcorn.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Wix</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://evajonesyoung.wixsite.com/sweetmagic"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/sweetmagicpopcorn/desktop.webp"
                data-lightbox-alt="Sweet Magic Popcorn brand and e-commerce website"
                aria-label="View full Sweet Magic Popcorn screenshot"
              >
                <img
                  alt="Sweet Magic Popcorn website"
                  src="/assets/project-images/thumbs/sweetmagicpopcorn/desktop.webp"
                  srcSet="/assets/project-images/thumbs/sweetmagicpopcorn/desktop-320.webp 320w, /assets/project-images/thumbs/sweetmagicpopcorn/desktop-640.webp 640w, /assets/project-images/thumbs/sweetmagicpopcorn/desktop-960.webp 960w, /assets/project-images/thumbs/sweetmagicpopcorn/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Sweet Magic Popcorn</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  E-commerce and brand site for Sweet Magic Popcorn LLC, featuring NON-GMO
                  Indiana-grown kernels, package details, salt and seasonings, nutrition info, and
                  links to Amazon and website stores. Built with GoDaddy Website Builder, including
                  brand story pages, media, and contact signup.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">GoDaddy</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://sweetmagicpopcorn.com/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/cosawi/desktop.webp"
                data-lightbox-alt="Cosawi business transformation consultancy website"
                aria-label="View full Cosawi screenshot"
              >
                <img
                  alt="Cosawi consultancy website"
                  src="/assets/project-images/thumbs/cosawi/desktop.webp"
                  srcSet="/assets/project-images/thumbs/cosawi/desktop-320.webp 320w, /assets/project-images/thumbs/cosawi/desktop-640.webp 640w, /assets/project-images/thumbs/cosawi/desktop-960.webp 960w, /assets/project-images/thumbs/cosawi/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="719"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Cosawi</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Marketing site for Cosawi, a consultancy that helps organizations with business
                  transformation from vision and strategy through implementation. Built on WordPress
                  with the Divi theme, covering who they are, their approach, resources, partner and
                  client showcases, and a contact form.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">WordPress</span>
                  <span className="tag tag--sm">Divi</span>
                  <span className="tag tag--sm">PHP</span>
                  <span className="tag tag--sm">CSS</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://cosawi.com/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card project-card--featured project-card--minor">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/councilor-dino-acuna/desktop.webp"
                data-lightbox-alt="Councilor Dino Acuna official website"
                aria-label="View full Councilor Dino Acuna screenshot"
              >
                <img
                  alt="Councilor Dino Acuna official website"
                  src="/assets/project-images/thumbs/councilor-dino-acuna/desktop.webp"
                  srcSet="/assets/project-images/thumbs/councilor-dino-acuna/desktop-320.webp 320w, /assets/project-images/thumbs/councilor-dino-acuna/desktop-640.webp 640w, /assets/project-images/thumbs/councilor-dino-acuna/desktop-960.webp 960w, /assets/project-images/thumbs/councilor-dino-acuna/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h4 className="project-card__title">Councilor Dino Acuna</h4>
                <p className="project-card__meta">Freelance · Minor Project</p>
                <p className="project-card__desc">
                  Official website for Councilor Dino Acuna, featuring his platform, legislative
                  initiatives, community programs, and contact information. Built with{" "}
                  <strong>Umbraco</strong> on GitHub Pages for fast, reliable access and easy
                  content updates.
                </p>
                <div className="project-card__tags">
                  <span className="tag tag--sm">Umbraco</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                  <span className="tag tag--sm">GitHub Pages</span>
                </div>
                <div className="project-card__links">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="project-card__link"
                    href="https://hinlocaesar.github.io/councilor-dino-acuna/"
                  >
                    Click to launch site
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
