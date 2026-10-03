/** **** Personal Volunteer Initiatives Section **** */

export default function Volunteer() {
  return (
    <section id="volunteer" className="section">
      <div className="container">
        <div className="projects__rail">
          <div className="projects__rail-head">
            <div>
              <h2 className="projects__subheading">Personal Volunteer Initiatives</h2>
              <p className="projects__rail-copy">
                Projects I started and maintain on my own time for community impact, outside of paid
                client work.
              </p>
            </div>
          </div>
          <div className="volunteer__grid">
            {/* Animal Welfare PH */}
            <article className="project-card project-card--featured">
              <button
                type="button"
                className="project-card__image project-card__image--expandable"
                data-lightbox="/assets/project-images/animal-welfare-ph/desktop.webp"
                data-lightbox-alt="Animal Welfare Philippines website"
                aria-label="View full Animal Welfare Philippines screenshot"
              >
                <img
                  alt="Animal Welfare Philippines, volunteer initiative website"
                  src="/assets/project-images/thumbs/animal-welfare-ph/desktop.webp"
                  srcSet="/assets/project-images/thumbs/animal-welfare-ph/desktop-320.webp 320w, assets/project-images/thumbs/animal-welfare-ph/desktop-640.webp 640w, assets/project-images/thumbs/animal-welfare-ph/desktop-960.webp 960w, assets/project-images/thumbs/animal-welfare-ph/desktop.webp 1280w"
                  sizes="(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px"
                  width="1280"
                  height="720"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-card__body">
                <h3 className="project-card__title">Animal Welfare Philippines</h3>
                <p className="project-card__meta">Volunteer Initiative · Founder &amp; Developer</p>
                <p className="project-card__desc">
                  Volunteer-driven platform advocating for animal welfare in the Philippines. Serves
                  as an educational hub and coordination point for rescue efforts, adoption drives,
                  and legislative advocacy. Built as a static site with modern web technologies for
                  fast, reliable access on any device.
                </p>
                <div className="project-card__tags">
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
                    href="https://hinlocaesar.github.io/animal-welfare-ph/"
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
