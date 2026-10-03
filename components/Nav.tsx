/** **** Navigation **** */

/**
 * Site header.
 *
 * The scroll-spy, the mobile menu and the scrolled shadow all live in
 * `components/behaviour/NavBehaviour.tsx`, which attaches to this markup by
 * class name. That is deliberate: the behaviour is a progressive enhancement over
 * server-rendered HTML, so it must not be a reason for the nav to be missing.
 */

export default function Nav() {
  return (
    <nav className="site-nav" id="siteNav" aria-label="Primary navigation">
      <div className="site-nav__inner">
        <a className="site-nav__logo" href="#hero" aria-label="Caesar Hinlo home">
          C<span>H</span>.
        </a>
        <ul className="site-nav__links" id="navLinks">
          <li>
            <a className="site-nav__link" href="#hero">
              Home
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#skills">
              Skills
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#about">
              Experience
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#credentials">
              Credentials
            </a>
          </li>
          <li>
            <a className="site-nav__link" href="#contact">
              Contact
            </a>
          </li>
        </ul>
        <div className="site-nav__actions">
          <a className="site-nav__availability" href="#contact">
            Available for work
          </a>
          <button
            className="site-nav__toggle"
            id="navToggle"
            aria-label="Toggle navigation"
            aria-expanded="false"
            aria-controls="navLinks"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
