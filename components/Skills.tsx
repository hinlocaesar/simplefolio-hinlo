/** **** Skills Section **** */

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-eyebrow">Expertise</p>
        <h2 className="section-title">Skills &amp; Tools</h2>
        <div className="skills__grid">
          <div className="skills__group">
            <h3 className="skills__group-title">Frameworks &amp; Libraries</h3>
            <div className="skills__subgroup">
              <p className="skills__subgroup-title">Frameworks</p>
              <div className="skills__tags">
                <span className="tag tag--strong tag--certified">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/vuejs.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Vue.js
                </span>
                <span className="tag tag--strong">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/react.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  React
                </span>
                <span className="tag tag--strong">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon tag__icon--invert"
                    src="/assets/skill-icons/nextjs.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Next.js
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/laravel.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Laravel
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon tag__icon--invert"
                    src="/assets/skill-icons/flask.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Flask
                </span>
                <span className="tag tag--strong">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/dotnetcore.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  ASP.NET Core
                </span>
                <span
                  className="tag tag--strong skills__combined-tag"
                  aria-label="Express.js and Node.js"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/express.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Express.js{" "}
                  <span className="skills__plus" aria-hidden="true">
                    +
                  </span>
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/nodejs.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Node.js
                </span>
              </div>
            </div>
            <div className="skills__subgroup">
              <p className="skills__subgroup-title">Libraries</p>
              <div className="skills__tags">
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/pinia.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Pinia
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/redux.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Redux
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/inertia.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Inertia.js
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/jquery.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  jQuery
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/tailwindcss.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Tailwind CSS
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/shadcnui.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  shadcn/ui
                </span>
                <span className="tag">
                  <img
                    loading="lazy"
                    decoding="async"
                    className="tag__icon"
                    src="/assets/skill-icons/semanticui.svg"
                    alt=""
                    width="18"
                    height="18"
                  />
                  Semantic UI
                </span>
              </div>
            </div>
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">Languages</h3>
            <div className="skills__tags">
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/html5.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                HTML
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/css3.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                CSS
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/javascript.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                JavaScript
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/typescript.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                TypeScript
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/php.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                PHP
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/python.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Python
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/c.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                C
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/cplusplus.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                C++
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/csharp.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                C#
              </span>
            </div>
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">APIs &amp; Integration</h3>
            <div className="skills__tags">
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/rest-api.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                REST API
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/graphql.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                GraphQL
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/webhooks.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Webhooks
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/laravel.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Laravel Reverb / Echo
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/xendit.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Xendit Payments
              </span>
            </div>
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">Databases, Cloud &amp; Monitoring</h3>
            <div className="skills__tags">
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/mysql.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                MySQL
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/postgresql.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                PostgreSQL
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/prisma.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Prisma ORM
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/dotnetcore.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Entity Framework Core
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/sql.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                SQL
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/sql.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Microsoft SQL Server
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/redis.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Redis
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/meilisearch.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Meilisearch
              </span>
              <span className="tag tag--certified">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/azure.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Microsoft Azure
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/aws.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Amazon Web Services (AWS)
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/cloudflare.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Cloudflare R2
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/laravel.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Laravel Forge
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/sentry.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Sentry
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/laravel.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Laravel Nightwatch
              </span>
            </div>
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">Tools &amp; Platforms</h3>
            <div className="skills__tags">
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/linux.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Linux
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/wordpress.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                WordPress CMS
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/wordpress-studio.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                WordPress Studio
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/elementor.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Elementor
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/webflow.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Webflow
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/godaddy.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                GoDaddy Website Builder
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/umbraco.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Umbraco
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/githubactions.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                CI/CD
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/webauthn.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Fortify / 2FA / WebAuthn
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/cursor.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Cursor
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/claude.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Claude Code
              </span>
              <span className="tag">Clearforce</span>
              <span className="tag">Jira</span>
            </div>
          </div>
          <div className="skills__group">
            <h3 className="skills__group-title">Practices</h3>
            <div className="skills__tags">
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/fullstack.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Full-Stack Development
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/embedded.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Embedded Systems
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/legacy.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Legacy Code Refactoring
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/iso.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                ISO Auditing
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/training.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Technical Training
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/cursor.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                AI-Assisted Development
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/scrum.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Scrum
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/waterfall.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                Waterfall
              </span>
              <span className="tag">
                <img
                  loading="lazy"
                  decoding="async"
                  className="tag__icon"
                  src="/assets/skill-icons/vmodel.svg"
                  alt=""
                  width="18"
                  height="18"
                />
                V-Model
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
