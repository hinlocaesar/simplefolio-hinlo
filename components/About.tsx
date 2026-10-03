/** **** About Section **** */

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-eyebrow">Career</p>
        <h2 className="section-title">Experience</h2>
        <div className="about__intro">
          <p className="about__summary">
            In addition to my development experience, I am a technical trainer for new hires with
            expertise in JP-PH tech transfer and modernizing legacy code. I also created workflows
            and monitoring metrics that improved section productivity.
          </p>
        </div>
        <div className="timeline">
          <div className="timeline__item">
            <span className="timeline__dot" />
            <p className="timeline__label">
              Full-Stack Developer, DevResearch Software Development Solutions
            </p>
            <p className="timeline__meta">2025 – Present · Remote</p>
            <details className="timeline__client">
              <summary className="timeline__client-label">
                <span className="timeline__client-heading">
                  <span className="timeline__client-tag">Client</span> DiscoverJobs
                </span>
              </summary>
              <div className="timeline__client-body">
                <ul className="timeline__list timeline__list--labeled">
                  <li>
                    <strong>
                      Full-Stack Job Board ({" "}
                      <a rel="noreferrer" target="_blank" href="https://discoverjobs.org">
                        discoverjobs.org
                      </a>
                      ):
                    </strong>{" "}
                    Built and deployed a multi-market platform (Vue 3, Inertia.js, Laravel,
                    Tailwind) handling seeker, employer, and admin surfaces.
                  </li>
                  <li>
                    <strong>Payments &amp; Storage:</strong> Integrated automated paid listings via
                    Xendit API/webhooks and Cloudflare R2 for file storage.
                  </li>
                  <li>
                    <strong>Search &amp; Performance:</strong> Engineered typo-tolerant search using
                    Meilisearch and Redis cache warming fed by external job aggregation APIs.
                  </li>
                  <li>
                    <strong>Real-Time &amp; Security:</strong> Implemented WebSocket
                    chat/notifications (Laravel Reverb/Echo) and robust security with 2FA, passkeys
                    (Fortify), and RBAC policies.
                  </li>
                  <li>
                    <strong>AI &amp; Microservices:</strong> Built a BIR-accredited accounting
                    microservice in under 1 month and integrated an AI admin tool (LangChain/RAG)
                    for tax data extraction.
                  </li>
                  <li>
                    <strong>DevOps &amp; QA:</strong> Maintained PHPUnit test suites, automated
                    Forge deployments, and health monitoring via Laravel Nightwatch.
                  </li>
                </ul>
                <p className="timeline__links-label">Web technologies stack</p>
                <div className="timeline__stack">
                  <span className="tag tag--sm">Vue 3</span>
                  <span className="tag tag--sm">Inertia.js</span>
                  <span className="tag tag--sm">Laravel</span>
                  <span className="tag tag--sm">Tailwind CSS</span>
                  <span className="tag tag--sm">Meilisearch</span>
                  <span className="tag tag--sm">Redis</span>
                  <span className="tag tag--sm">Cloudflare R2</span>
                  <span className="tag tag--sm">Xendit</span>
                  <span className="tag tag--sm">Laravel Reverb</span>
                  <span className="tag tag--sm">Echo / WebSockets</span>
                  <span className="tag tag--sm">Laravel Fortify</span>
                  <span className="tag tag--sm">2FA / Passkeys</span>
                  <span className="tag tag--sm">LangChain / RAG</span>
                  <span className="tag tag--sm">PHPUnit</span>
                  <span className="tag tag--sm">Laravel Forge</span>
                  <span className="tag tag--sm">Laravel Nightwatch</span>
                </div>
                <p className="timeline__links-label">Website links</p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://discoverjobs.org"
                >
                  Visit DiscoverJobs
                </a>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox="/assets/project-images/discoverjobs/photo-with-client.webp"
                  data-lightbox-alt="Photo with DiscoverJobs client"
                  aria-label="View photo with client"
                >
                  View photo with client
                </button>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox="/assets/project-images/bircas/flow-diagram.webp"
                  data-lightbox-alt="BIR CAS money flow overview"
                  aria-label="View BIR CAS screenshot"
                >
                  View BIR CAS screenshot
                </button>
              </div>
            </details>
            <details className="timeline__client">
              <summary className="timeline__client-label">
                <span className="timeline__client-heading">
                  <span className="timeline__client-tag">Client</span> Filipino VA
                </span>
              </summary>
              <div className="timeline__client-body">
                <ul className="timeline__list timeline__list--labeled">
                  <li>
                    <strong>Remote-Work Marketplace:</strong> Built a job marketplace connecting
                    employers with pre-vetted Filipino virtual assistants, end to end at
                    DevResearch.
                  </li>
                  <li>
                    <strong>Headless CMS:</strong> Umbraco 17 runs headless behind the Content
                    Delivery API for CMS-managed pages and admin listing moderation.
                  </li>
                  <li>
                    <strong>Backend &amp; Data:</strong> ASP.NET Core marketplace API with EF Core,
                    PostgreSQL, and rotating JWT refresh tokens.
                  </li>
                  <li>
                    <strong>Frontend:</strong> Prerendered Vue 3 + TypeScript + Vite frontend
                    covering worker profiles, job posting, search and filtering, applications, and
                    shortlisting.
                  </li>
                  <li>
                    <strong>Quality:</strong> 125 unit and 35 integration tests. Not yet publicly
                    launched.
                  </li>
                </ul>
                <p className="timeline__links-label">Web technologies stack</p>
                <div className="timeline__stack">
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
                <p className="timeline__links-label">Screenshots</p>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox-gallery={
                    '[{"src":"/assets/project-images/filipinova/desktop.webp","alt":"Filipino VA home page, Hire the best Filipino virtual assistants"},{"src":"/assets/project-images/filipinova/jobs.webp","alt":"Filipino VA job search page with filters for skill, pay and job type"},{"src":"/assets/project-images/filipinova/home-full.webp","alt":"Filipino VA home page, full scroll from hero to footer"}]'
                  }
                  aria-label="View full Filipino VA screenshots"
                >
                  View Filipino VA screenshots
                </button>
              </div>
            </details>
            <details className="timeline__client">
              <summary className="timeline__client-label">
                <span className="timeline__client-heading">
                  <span className="timeline__client-tag">Client</span> Plum Village App
                </span>
              </summary>
              <div className="timeline__client-body">
                <ul className="timeline__list timeline__list--labeled">
                  <li>
                    <strong>Web Edition (</strong>
                    web.plumvillage.app <strong>):</strong> Built and launched the web edition of
                    Plum Village&apos;s mindfulness library end to end at DevResearch, pairing the
                    iOS and Android app with a public browser front end. Practice Library:
                    Meditations, Talks, and Resources each browse into a categorized catalogue of
                    guided and silent meditations, deep relaxations, dharma talks, and short
                    teachings. Practice Tools: meditation timer and mindfulness bell for timed
                    sitting. Content &amp; Localization: Latest Updates feed and language switcher
                    across supported translations, with artwork and media served from a CDN-backed
                    image pipeline.
                  </li>
                </ul>
                <p className="timeline__links-label">Web technologies stack</p>
                <div className="timeline__stack">
                  <span className="tag tag--sm">Next.js</span>
                  <span className="tag tag--sm">React</span>
                </div>
                <p className="timeline__links-label">Website links</p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://web.plumvillage.app/"
                >
                  Visit Plum Village App
                </a>
              </div>
            </details>
          </div>
          <div className="timeline__item">
            <span className="timeline__dot" />
            <p className="timeline__label">Full-Stack Developer, Elgada BPO Solutions</p>
            <p className="timeline__meta">2021 – 2025 · Remote</p>
            <details className="timeline__client">
              <summary className="timeline__client-label">
                <span className="timeline__client-heading">
                  <span className="timeline__client-tag">Client</span> Streamline Verify
                </span>
              </summary>
              <div className="timeline__client-body">
                <ul className="timeline__list timeline__list--labeled">
                  <li>
                    <strong>Full-Stack Engineering:</strong> Developed core compliance features for
                    Streamline Verify using React, Next.js, Express, Node.js, GraphQL, Vue, Laravel,
                    and Python (Flask).
                  </li>
                  <li>
                    <strong>Performance &amp; Optimization:</strong> Boosted query speeds and
                    responsiveness up to 40% via targeted UI and SQL optimizations; refactored
                    legacy code for scalability.
                  </li>
                  <li>
                    <strong>Security &amp; Compliance:</strong> Managed technical security due
                    diligence, leading responses for client SOC 2 questionnaires and vendor risk
                    assessments.
                  </li>
                  <li>
                    <strong>Leadership &amp; Mentorship:</strong> Mentored junior engineers,
                    directing daily task execution, code reviews, and quality standards.
                  </li>
                </ul>
                <p className="timeline__links-label">Web technologies stack</p>
                <div className="timeline__stack">
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
                  <span className="tag tag--sm">SQL</span>
                  <span className="tag tag--sm">SOC 2</span>
                  <span className="tag tag--sm">Sentry</span>
                </div>
                <p className="timeline__links-label">Website links</p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://streamlineverify.com/"
                >
                  Visit Streamline Verify
                </a>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox-gallery={
                    '[{"src":"/assets/project-images/elgada-bpo/photo-with-client.webp","alt":"Photo with Streamline Verify at Elgada BPO Solutions team building 2023 in El Nido, Palawan"},{"src":"/assets/project-images/elgada-bpo/team-photo-with-client.webp","alt":"Elgada BPO Solutions team photo with Streamline Verify"}]'
                  }
                  aria-label="View photos with client"
                >
                  View photos with client
                </button>
              </div>
            </details>
          </div>
          <div className="timeline__item">
            <span className="timeline__dot" />
            <p className="timeline__label">
              Full-Stack Developer &amp; Board Member, Champion4Heroes
            </p>
            <p className="timeline__meta">
              2020 – 2021 · Remote, 501(c)(3) nonprofit uniting World Champion athletes with
              Veterans to honor and memorialize their service.
            </p>
            <details className="timeline__client">
              <summary className="timeline__client-label">
                <span className="timeline__client-heading">
                  <span className="timeline__client-tag">Organization</span> Champion4Heroes
                </span>
              </summary>
              <div className="timeline__client-body">
                <ul className="timeline__list timeline__list--labeled">
                  <li>
                    <strong>Board Governance &amp; Strategy:</strong> Served as a remote Board
                    Member, driving strategic decision-making and operational process improvements.
                  </li>
                  <li>
                    <strong>Web Development &amp; Maintenance:</strong> Developed and maintained the
                    core organizational website and its content on Umbraco, tailoring the site to
                    support the foundation&apos;s advocacy, TBI education, and veteran outreach.
                  </li>
                </ul>
                <p className="timeline__links-label">Web technologies stack</p>
                <div className="timeline__stack">
                  <span className="tag tag--sm">Umbraco</span>
                  <span className="tag tag--sm">.NET</span>
                  <span className="tag tag--sm">C#</span>
                  <span className="tag tag--sm">HTML</span>
                  <span className="tag tag--sm">CSS</span>
                  <span className="tag tag--sm">JavaScript</span>
                  <span className="tag tag--sm">SEO</span>
                  <span className="tag tag--sm">Webflow Hosting</span>
                </div>
                <p className="timeline__links-label">Website links</p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://hinlocaesar.github.io/champion-4-heroes/"
                >
                  Visit Champions 4 Heroes
                </a>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox="/assets/project-images/champion4heroes/board-mention.webp"
                  data-lightbox-alt="Facebook post from Mel Twining naming Caesar Herman Hinlo as a Champion4Heroes board member from the Philippines"
                  aria-label="View photo with client"
                >
                  View photo with client
                </button>
              </div>
            </details>
          </div>
          <div className="timeline__item">
            <span className="timeline__dot" />
            <p className="timeline__label">Senior Software Engineer, Kyocera Document Solutions</p>
            <p className="timeline__meta">2012 – 2020</p>
            <details className="timeline__client">
              <summary className="timeline__client-label">
                <span className="timeline__client-heading">
                  <span className="timeline__client-tag">Focus</span> Embedded software &amp;
                  product platforms
                </span>
              </summary>
              <div className="timeline__client-body">
                <ul className="timeline__list timeline__list--labeled">
                  <li>
                    <strong>Embedded &amp; Full-Stack Engineering:</strong> Led C/C++ embedded
                    software development for multifunctional printers; built extended web features
                    using ASP.NET Core, C#, PHP, and jQuery.
                  </li>
                  <li>
                    <strong>Global Leadership &amp; Tech Transfer:</strong> Selected for 3–5 Osaka,
                    Japan assignments to lead Japan-to-Philippines technology transfers, team
                    training, and product rollouts.
                  </li>
                  <li>
                    <strong>Mentorship &amp; Instruction:</strong> Taught Unit Testing standards to
                    30+ new developers and mentored engineers through patent documentation and
                    submission.
                  </li>
                  <li>
                    <strong>Quality, ISO &amp; Hiring:</strong> Ranked in the top 5% of hires;
                    served as an initial ISO internal auditor helping secure first-round
                    certification while conducting code quality reviews.
                  </li>
                </ul>
                <p className="timeline__links-label">Technologies stack</p>
                <div className="timeline__stack">
                  <span className="tag tag--sm">C</span>
                  <span className="tag tag--sm">C++</span>
                  <span className="tag tag--sm">Embedded Systems</span>
                  <span className="tag tag--sm">C#</span>
                  <span className="tag tag--sm">ASP.NET Core</span>
                  <span className="tag tag--sm">PHP</span>
                  <span className="tag tag--sm">jQuery</span>
                  <span className="tag tag--sm">Touchscreen</span>
                  <span className="tag tag--sm">MFP Integration</span>
                  <span className="tag tag--sm">ISO Auditing</span>
                </div>
                <p className="timeline__links-label">Website links</p>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox="/assets/project-images/novatech-how-to-guides/desktop.webp"
                  data-lightbox-alt="Kyocera MFP touchscreen-to-MFP integration showing Device Information"
                  aria-label="View touchscreen integration sample"
                >
                  View touchscreen sample
                </button>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://www.kyoceradocumentsolutions.com/asia/en/products/mfp/ecosys-fs1125mfp/"
                >
                  Visit Ecosys FS-1125MFP
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://www.kyoceradocumentsolutions.com/hk/en/products/mfp/taskalfa-2201/"
                >
                  Visit TASKalfa 2201
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://www.kyoceradocumentsolutions.com/asia/en/products/business-application/command-center-rx.html"
                >
                  Visit Command Center RX
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://www.kyoceradocumentsolutions.eu/en/products/mfp/ECOSYSM3860IDNF.html"
                >
                  Visit ECOSYS M3860idnf
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://www.kyoceradocumentsolutions.us/en/products/mfp/TASKALFAMZ7001CI.html"
                >
                  Visit TASKalfa MZ7001ci
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="cta-btn cta-btn--outline timeline__btn"
                  href="https://www.kyoceradocumentsolutions.us/en/products/mfp/TASKALFAMZ2501CI.html"
                >
                  Visit TASKalfa MZ2501ci
                </a>
                <button
                  type="button"
                  className="cta-btn cta-btn--outline timeline__btn"
                  data-lightbox="/assets/project-images/kyocera/photo-with-client.webp"
                  data-lightbox-alt="Team dinner with Kyocera colleagues in Japan"
                  aria-label="View photo with client"
                >
                  View photo with client
                </button>
              </div>
            </details>
          </div>
          <div className="timeline__item timeline__item--freelance">
            <span className="timeline__dot" />
            <p className="timeline__label">Freelance Web Developer · Minor Projects</p>
            <p className="timeline__meta">Remote</p>
            <details className="timeline__project-group">
              <summary className="timeline__project-group-summary">
                <span className="timeline__project-group-heading">
                  <span className="timeline__project-group-tag">Minor Projects</span>
                  <span className="timeline__project-group-title">View freelance projects</span>
                </span>
                <span className="timeline__project-group-count">7 projects</span>
              </summary>
              <div className="timeline__project-group-body">
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> The Retreat
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Built the marketing site for The Retreat, a hillside vacation community on
                        Possum Kingdom Lake in Graford, Texas. Covers lake home sales, amenities,
                        local guide, gallery, and contact.
                      </li>
                      <li>
                        Delivered the site on WordPress with the Avada theme, including brochure
                        CTAs and property branding for scenic remodeled lake homes.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">WordPress</span>
                      <span className="tag tag--sm">Avada</span>
                      <span className="tag tag--sm">PHP</span>
                      <span className="tag tag--sm">CSS</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://retreat2pk.com/"
                    >
                      Visit The Retreat
                    </a>
                    <details className="timeline__client">
                      <summary className="timeline__client-label">
                        <span className="timeline__client-heading">
                          <span className="timeline__client-tag">Freelance</span> Councilor Dino
                          Acuna
                        </span>
                      </summary>
                      <div className="timeline__client-body">
                        <ul className="timeline__list">
                          <li>
                            Official website for Councilor Dino Acuna, featuring his platform,
                            legislative initiatives, community programs, and contact information.
                            Built with <strong>Umbraco</strong> on GitHub Pages for fast, reliable
                            access and easy content updates.
                          </li>
                        </ul>
                        <p className="timeline__links-label">Web technologies stack</p>
                        <div className="timeline__stack">
                          <span className="tag tag--sm">Umbraco</span>
                          <span className="tag tag--sm">Umbraco</span>
                          <span className="tag tag--sm">HTML</span>
                          <span className="tag tag--sm">CSS</span>
                          <span className="tag tag--sm">JavaScript</span>
                          <span className="tag tag--sm">GitHub Pages</span>
                        </div>
                        <p className="timeline__links-label">Website links</p>
                        <a
                          rel="noreferrer"
                          target="_blank"
                          className="cta-btn cta-btn--outline timeline__btn"
                          href="https://hinlocaesar.github.io/councilor-dino-acuna/"
                        >
                          Visit Councilor Dino Acuna
                        </a>
                      </div>
                    </details>
                  </div>
                </details>
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> The Falls RV Park
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Built the marketing and booking site for The Falls RV Park in Davis,
                        Oklahoma. Covers amenities, rates, policies, FAQ, gallery, and online
                        reservations for full-hookup RV sites and onsite cabins.
                      </li>
                      <li>
                        Delivered the site with GoDaddy Website Builder, including membership
                        bookings and contact details for onsite managers.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">GoDaddy</span>
                      <span className="tag tag--sm">HTML</span>
                      <span className="tag tag--sm">CSS</span>
                      <span className="tag tag--sm">JavaScript</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://thefallsrvpark.com/"
                    >
                      Visit The Falls RV Park
                    </a>
                  </div>
                </details>
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> Cosawi
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Built the marketing site for Cosawi, a consultancy that helps organizations
                        with business transformation from vision and strategy through
                        implementation.
                      </li>
                      <li>
                        Delivered the site on WordPress with the Divi theme, covering company story,
                        approach, resources, partner and client showcases, and a contact form.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">WordPress</span>
                      <span className="tag tag--sm">Divi</span>
                      <span className="tag tag--sm">PHP</span>
                      <span className="tag tag--sm">CSS</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://cosawi.com/"
                    >
                      Visit Cosawi
                    </a>
                  </div>
                </details>
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> Lanterra Group
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Built the marketing site for Lanterra Group, a North Texas real estate
                        development and construction firm covering story, team, markets, services,
                        project portfolio, careers, and contact.
                      </li>
                      <li>
                        Delivered the site in Webflow with Lottie motion and a careers application
                        form.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">Webflow</span>
                      <span className="tag tag--sm">Lottie</span>
                      <span className="tag tag--sm">HTML</span>
                      <span className="tag tag--sm">CSS</span>
                      <span className="tag tag--sm">JavaScript</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://www.lanterragroup.com/"
                    >
                      Visit Lanterra Group
                    </a>
                  </div>
                </details>
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> Eva Jones-Young
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Built the official and personal site for Eva D. Jones-Young (“Sweet Magic”),
                        a 14× martial arts champion, 3× boxing world champion, and 10× Hall of Fame
                        inductee. Built on Wix with bio, documentary, news, affiliations,
                        merchandise, and contact.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">Wix</span>
                      <span className="tag tag--sm">HTML</span>
                      <span className="tag tag--sm">CSS</span>
                      <span className="tag tag--sm">JavaScript</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://evajonesyoung.wixsite.com/sweetmagic"
                    >
                      Visit Eva Jones-Young
                    </a>
                  </div>
                </details>
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> Sweet Magic Popcorn
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Delivered the e-commerce and brand site for Sweet Magic Popcorn LLC on
                        GoDaddy Website Builder, including package details, nutrition info, brand
                        story, media, and store links to Amazon and the web shop.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">GoDaddy</span>
                      <span className="tag tag--sm">HTML</span>
                      <span className="tag tag--sm">CSS</span>
                      <span className="tag tag--sm">JavaScript</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://sweetmagicpopcorn.com/"
                    >
                      Visit Sweet Magic Popcorn
                    </a>
                  </div>
                </details>
                <details className="timeline__client">
                  <summary className="timeline__client-label">
                    <span className="timeline__client-heading">
                      <span className="timeline__client-tag">Freelance</span> Sweet Magic Popcorn
                      (Custom Build)
                    </span>
                  </summary>
                  <div className="timeline__client-body">
                    <ul className="timeline__list">
                      <li>
                        Hand-coded the Sweet Magic Popcorn brand and shop as a static
                        HTML/CSS/JavaScript site on GitHub Pages, replacing the GoDaddy Website
                        Builder version with a build I fully control.
                      </li>
                      <li>
                        Shipped the full page set (shop, packages, kernels, seasonings, nutrition,
                        cooking, story, documentary, media, contact) with dropdown and mobile
                        navigation, scroll reveals, and SEO and Open Graph metadata throughout.
                      </li>
                    </ul>
                    <p className="timeline__links-label">Web technologies stack</p>
                    <div className="timeline__stack">
                      <span className="tag tag--sm">Umbraco</span>
                      <span className="tag tag--sm">HTML</span>
                      <span className="tag tag--sm">CSS</span>
                      <span className="tag tag--sm">JavaScript</span>
                      <span className="tag tag--sm">GitHub Pages</span>
                    </div>
                    <p className="timeline__links-label">Website links</p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="cta-btn cta-btn--outline timeline__btn"
                      href="https://hinlocaesar.github.io/sweet-popcorn/"
                    >
                      Visit Sweet Magic Popcorn Build
                    </a>
                  </div>
                </details>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
