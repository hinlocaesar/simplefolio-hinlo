/** **** Hero Section **** */

export default function Hero() {
  return (
    <header id="hero" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img className="hero__bg" src="/assets/hero-team.webp" alt="" decoding="async" />
        <div className="hero__scrim" />
      </div>
      <div className="hero__glow hero__glow--right" aria-hidden="true" />
      <div className="hero__glow hero__glow--left" aria-hidden="true" />
      <div className="container hero__container">
        <div className="hero__grid">
          <div className="hero__content">
            <div className="hero__mobile-portrait">
              {/* Phone-only, and the markup says so rather than JavaScript: the
                frame is display:none above 37.5em, and a <source media> that
                does not match is never fetched, so desktop visitors download
                nothing for a picture they will not see. That was 183 KB of a
                319 KB page. */}
              <picture>
                <source media="(max-width: 37.5em)" srcSet="/assets/profile.webp" />
                <img className="hero__mobile-photo" alt="Caesar Herman Hinlo" decoding="async" />
              </picture>
            </div>
            <h1 className="hero-headline">
              <span className="hero-headline__line">Senior Full‑Stack Engineer</span>
            </h1>
            <p className="hero__name">Caesar Herman Hinlo</p>
            <p className="hero__subtitle">
              I have 14 years of experience across a wide range of technologies, including extensive
              work in embedded firmware and web development, turning complex ideas into
              production-ready software.
            </p>
            <div className="hero__cta">
              <a className="cta-btn cta-btn--primary" href="#projects">
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-play" />
                </svg>{" "}
                Explore my work
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                className="cta-btn cta-btn--outline"
                href="https://www.loom.com/share/dc71216cbcbe4f6d8f9de1793b792a25"
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href="#i-circle-play" />
                </svg>{" "}
                Watch overview
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                className="cta-btn cta-btn--outline-light cta-btn--resume"
                href="/assets/Senior_Full_Stack_Developer_Caesar_Hinlo_Resume.docx"
              >
                View résumé
              </a>
            </div>
            <div className="hero__facts" aria-label="Career highlights">
              <div className="hero__fact">
                <span className="hero__fact-value">14</span>
                <span className="hero__fact-label">Years building</span>
              </div>
              <div className="hero__fact">
                <span className="hero__fact-value">Top 5%</span>
                <span className="hero__fact-label">Kyocera (Former Epson) hire</span>
              </div>
              <div className="hero__fact">
                <span className="hero__fact-value">$3.19B</span>
                <span className="hero__fact-label">
                  2012–2020 Kyocera product-line sales impact
                </span>
              </div>
              <div className="hero__fact">
                <span className="hero__fact-value">Team Leader</span>
                <span className="hero__fact-label">Product &amp; engineering teams</span>
              </div>
              <div className="hero__fact">
                <span className="hero__fact-value">Patent Trainer</span>
                <span className="hero__fact-label">Patent documentation &amp; submissions</span>
              </div>
              <div className="hero__fact">
                <span className="hero__fact-value">ISO Auditor</span>
                <span className="hero__fact-label">Internal quality-system audits</span>
              </div>
              <div className="hero__fact">
                <span className="hero__fact-value">Osaka, Japan</span>
                <span className="hero__fact-label">Kyocera R&amp;D tech-transfer assignments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__scroll-cue" aria-hidden="true">
        Keep exploring
      </div>
    </header>
  );
}
