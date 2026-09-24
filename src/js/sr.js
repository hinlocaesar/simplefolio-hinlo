import assignProps from "./assignProps";

export default function initSr() {
  if (typeof window.ScrollReveal !== "function") {
    document.querySelectorAll(".load-hidden").forEach((element) => {
      element.classList.remove("load-hidden");
    });
    return;
  }

  const defaultProps = {
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    distance: "20px",
    duration: 900,
    desktop: true,
    mobile: true,
  };

  ScrollReveal().reveal(
    ".section-eyebrow, .section-title",
    assignProps(
      { delay: 100, distance: "0px", origin: "bottom" },
      defaultProps
    )
  );

  ScrollReveal().reveal(
    ".hero-headline, .hero__name, .hero__subtitle, .hero__cta, .hero__facts",
    assignProps({ origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".about__summary",
    assignProps({ delay: 150, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".timeline__item",
    assignProps({ interval: 100, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".skills__group",
    assignProps({ interval: 100, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".projects__rail-head",
    assignProps({ origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".credentials__block",
    assignProps({ interval: 100, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".contact-wrapper",
    assignProps({ delay: 150, origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".reference-card",
    assignProps({ interval: 100, origin: "bottom" }, defaultProps)
  );
}
