/** **** Footer Section **** */

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <a rel="noreferrer" href="#top" className="back-to-top" aria-label="Back to top">
          <svg className="icon icon--lg" aria-hidden="true" focusable="false">
            <use href="#i-chevron-up" />
          </svg>
        </a>
        <div className="social-links">
          <a
            rel="noreferrer"
            href="https://caesar-hinlo-dev.netlify.app"
            target="_blank"
            aria-label="Portfolio"
          >
            <svg className="icon" aria-hidden="true" focusable="false">
              <use href="#i-globe" />
            </svg>
          </a>
          <a
            rel="noreferrer"
            href="https://www.linkedin.com/in/hinlocaesar"
            target="_blank"
            aria-label="LinkedIn"
          >
            <svg className="icon" aria-hidden="true" focusable="false">
              <use href="#i-linkedin" />
            </svg>
          </a>
          <a
            rel="noreferrer"
            href="https://github.com/hinlocaesar"
            target="_blank"
            aria-label="GitHub"
          >
            <svg className="icon" aria-hidden="true" focusable="false">
              <use href="#i-github" />
            </svg>
          </a>
          <a
            rel="noreferrer"
            href="https://www.loom.com/share/dc71216cbcbe4f6d8f9de1793b792a25"
            target="_blank"
            aria-label="Video Introduction"
          >
            <svg className="icon" aria-hidden="true" focusable="false">
              <use href="#i-video" />
            </svg>
          </a>
        </div>
        <hr />
        <p className="footer__text">© 2026 Caesar Hinlo. All rights reserved.</p>
      </div>
    </footer>
  );
}
