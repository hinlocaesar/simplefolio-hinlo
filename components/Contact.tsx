/** **** Contact Section **** */

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="section-eyebrow">Get In Touch</p>
        <h2 className="section-title">Contact</h2>
        <div className="contact-wrapper">
          <p className="contact-wrapper__text">Open to new projects and full-time roles.</p>
          <div className="contact-wrapper__cta">
            <a
              rel="noreferrer"
              target="_blank"
              className="cta-btn cta-btn--primary"
              href="mailto:caesar.hinlo.jobs@gmail.com"
            >
              Email Me
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              className="cta-btn cta-btn--outline"
              href="https://www.linkedin.com/in/hinlocaesar"
            >
              LinkedIn
            </a>
          </div>
          <ul className="contact-details">
            <li>
              <a href="mailto:caesar.hinlo.jobs@gmail.com">caesar.hinlo.jobs@gmail.com</a>
            </li>
            <li>
              <a href="tel:+639452582115">+63 945 258 2115</a>
            </li>
            <li>Victorias City, Negros Occidental, Philippines 6119</li>
          </ul>
        </div>
        <div className="references">
          <h3 className="references__title">References</h3>
          <div className="references__grid">
            <div className="reference-card">
              <p className="reference-card__name">Kevin Dormido</p>
              <p className="reference-card__role">IT Manager, Kyocera Document Solutions</p>
              <p className="reference-card__contact">
                <a href="mailto:nonoykevin27@icloud.com">nonoykevin27@icloud.com</a>
                <span className="reference-card__sep" aria-hidden="true">
                  ·
                </span>
                <a href="tel:+639285523415">09285523415</a>
              </p>
            </div>
            <div className="reference-card">
              <p className="reference-card__name">Jaepi Dingle</p>
              <p className="reference-card__role">Technical Consultant, CoCompetence</p>
              <p className="reference-card__contact">
                <a href="mailto:jaepi.dingle@gmail.com">jaepi.dingle@gmail.com</a>
                <span className="reference-card__sep" aria-hidden="true">
                  ·
                </span>
                <a href="tel:+639985384707">09985384707</a>
              </p>
            </div>
            <div className="reference-card">
              <p className="reference-card__name">Airyn Gale de Gracia</p>
              <p className="reference-card__role">Senior QA Engineer, Full Scale</p>
              <p className="reference-card__contact">
                <a href="mailto:Airyngale.degracia@gmail.com">Airyngale.degracia@gmail.com</a>
                <span className="reference-card__sep" aria-hidden="true">
                  ·
                </span>
                <a href="tel:+639560582432">09560582432</a>
              </p>
            </div>
            <div className="reference-card">
              <p className="reference-card__name">Warren Caruana</p>
              <p className="reference-card__role">Full-Stack Developer, Deployed Outsourcing</p>
              <p className="reference-card__contact">
                <a href="mailto:warrencaruana1@gmail.com">warrencaruana1@gmail.com</a>
                <span className="reference-card__sep" aria-hidden="true">
                  ·
                </span>
                <a href="tel:+639985925940">09985925940</a>
              </p>
            </div>
            <div className="reference-card">
              <p className="reference-card__name">Mel Twining</p>
              <p className="reference-card__role">CEO, Champions 4 Heroes</p>
              <p className="reference-card__contact">
                <a href="mailto:meltwining1961@gmail.com">meltwining1961@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
