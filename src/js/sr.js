import assignProps from "./assignProps";

export default function initSr() {
  const defaultProps = {
    easing: "cubic-bezier(0.19, 1, 0.22, 1)",
    distance: "20px",
    duration: 1200,
    desktop: true,
    mobile: true,
  };

  /* Section Title */
  ScrollReveal().reveal(
    ".section-eyebrow, .section-title",
    assignProps(
      {
        delay: 200,
        distance: "0px",
        origin: "bottom",
      },
      defaultProps
    )
  );

  /* Hero Section */
  ScrollReveal().reveal(
    ".hero-eyebrow",
    assignProps({ delay: 300, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".hero-title",
    assignProps({ delay: 500, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".hero-divider",
    assignProps(
      { delay: 800, distance: "0px", origin: "bottom" },
      defaultProps
    )
  );

  ScrollReveal().reveal(
    ".hero-subtitle",
    assignProps({ delay: 900, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".hero-cta",
    assignProps({ delay: 1100, origin: "bottom" }, defaultProps)
  );

  /* About Section */
  ScrollReveal().reveal(
    ".about__portrait",
    assignProps({ delay: 400, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".about__content",
    assignProps(
      { delay: 700, origin: window.innerWidth > 900 ? "right" : "bottom" },
      defaultProps
    )
  );

  /* Skills Section */
  ScrollReveal().reveal(
    ".skills__group",
    assignProps(
      { interval: 150, origin: "bottom" },
      defaultProps
    )
  );

  /* Credentials Section */
  ScrollReveal().reveal(
    ".credentials__block",
    assignProps({ interval: 150, origin: "bottom" }, defaultProps)
  );

  /* Projects Section */
  ScrollReveal().reveal(
    ".project-card",
    assignProps(
      { interval: 120, origin: "bottom", distance: "24px" },
      defaultProps
    )
  );

  /* Contact Section */
  ScrollReveal().reveal(
    ".contact-wrapper",
    assignProps({ delay: 300, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".reference-card",
    assignProps({ interval: 150, origin: "bottom" }, defaultProps)
  );
}
