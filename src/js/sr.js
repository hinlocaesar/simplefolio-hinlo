import assignProps from "./assignProps";

/**
 * Scroll entrances. ScrollReveal drives them when it loaded; without it (a
 * blocked CDN, for instance) everything is revealed immediately so the content
 * is never left invisible.
 *
 * The motion vocabulary is deliberately narrow: content rises a short distance
 * and fades, and multi-item groups stagger. Anything more would fight the
 * layout on a page this long.
 */
export default function initSr() {
  if (typeof window.ScrollReveal !== "function") {
    document.querySelectorAll(".load-hidden").forEach((element) => {
      element.classList.remove("load-hidden");
    });
    return;
  }

  const defaultProps = {
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    distance: "26px",
    duration: 800,
    interval: 70,
    desktop: true,
    mobile: true,
  };

  ScrollReveal().reveal(
    ".section-eyebrow, .section-title",
    assignProps({ delay: 60, distance: "0px", origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(
    ".hero__mobile-portrait, .hero-headline, .hero__name, .hero__subtitle, .hero__cta, .hero__facts",
    assignProps({ origin: "bottom" }, defaultProps)
  );

  ScrollReveal().reveal(".about__summary", assignProps({ origin: "bottom" }, defaultProps));

  ScrollReveal().reveal(".timeline__item", assignProps({ origin: "bottom" }, defaultProps));

  ScrollReveal().reveal(".skills__group", assignProps({ origin: "bottom" }, defaultProps));

  ScrollReveal().reveal(".projects__rail-head", assignProps({ origin: "bottom" }, defaultProps));

  // Cards sit in a horizontal rail that is already horizontally offset, so they
  // reveal from the left rather than rising — sliding sideways reads as "this
  // rail is loading", which is what it is.
  ScrollReveal().reveal(
    ".project-card",
    assignProps({ distance: "34px", origin: "left", interval: 90 }, defaultProps)
  );

  ScrollReveal().reveal(".credentials__block", assignProps({ origin: "bottom" }, defaultProps));

  ScrollReveal().reveal(".contact-wrapper", assignProps({ origin: "bottom" }, defaultProps));

  ScrollReveal().reveal(".reference-card", assignProps({ origin: "bottom" }, defaultProps));
}
