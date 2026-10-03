import assignProps from "./assignProps";

/**
 * Scroll entrances.
 *
 * This used to be the ScrollReveal library pulled from a CDN. It was a
 * render-blocking third-party script sitting in <head>, which put a DNS lookup,
 * a TLS handshake and a download ahead of the first byte of the page for every
 * visitor; measured on this site it was the difference between a first
 * contentful paint at 1.0s and one at 11.9s. The page ships everything else it
 * needs, so depending on someone else's uptime for its animations was also a
 * liability.
 *
 * The replacement runs off one shared IntersectionObserver. The API below is
 * deliberately shaped like the calls that used to drive it, so the list still
 * reads as the list of what animates in.
 */

/** Applied once an element has entered view, so it is never revealed twice. */
const REVEALED = "is-revealed";

/** Reads `--reveal-delay` so a stagger can be set from CSS or from the index. */
function delayFor(element) {
  const raw = element.style.getPropertyValue("--reveal-delay");
  return raw ? parseFloat(raw) : 0;
}

/** Where an element starts from, as a translate along the reveal axis. */
function startOffset(origin, distance) {
  if (origin === "left") return `translateX(${distance})`;
  if (origin === "right") return `translateX(-${distance})`;
  return `translateY(${distance})`;
}

function show(element) {
  element.style.transform = "none";
  element.style.opacity = "1";
  element.classList.add(REVEALED);
}

function reveal(element) {
  const delay = delayFor(element);
  if (delay) window.setTimeout(() => show(element), delay);
  else show(element);
}

export default function initSr() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasObserver = "IntersectionObserver" in window;

  const defaultProps = {
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    distance: "20px",
    origin: "bottom",
    delay: 0,
    interval: 0,
  };

  // The hero is deliberately absent from this list.
  //
  // It used to be registered here, which meant the headline — the largest
  // contentful paint — could not appear until this bundle downloaded and
  // executed. On a stalled connection that measured as a blank hero for 16.5s
  // after the document had fully arrived. Its entrance is a CSS animation in
  // _hero.scss now, so it needs nothing but the stylesheet.
  const groups = [
    assignProps(
      { selector: ".section-eyebrow, .section-title", delay: 100, distance: "0px" },
      defaultProps
    ),
    assignProps({ selector: ".about__summary", delay: 150 }, defaultProps),
    assignProps({ selector: ".timeline__item", interval: 100 }, defaultProps),
    assignProps({ selector: ".skills__group", interval: 100 }, defaultProps),
    assignProps({ selector: ".projects__rail-head" }, defaultProps),
    assignProps({ selector: ".volunteer__grid" }, defaultProps),
    assignProps({ selector: ".credentials__block", interval: 100 }, defaultProps),
    assignProps({ selector: ".contact-wrapper", delay: 150 }, defaultProps),
    assignProps({ selector: ".reference-card", interval: 100 }, defaultProps),
  ];

  // Reduced motion, or no IntersectionObserver: register nothing. Nothing in
  // the markup is hidden waiting for a reveal any more, so content stays
  // visible even if this bundle fails to execute entirely.
  if (reduced || !hasObserver) return;

  const targets = [];

  /** Parks an element at its start offset, ready to be revealed. */
  const register = (element, props, index) => {
    element.classList.add("sr-item");
    element.style.transform = startOffset(props.origin, props.distance);
    // Position within the group drives the stagger, so a list of cards or
    // timeline entries cascades without every element needing its own delay
    // written into the markup.
    if (props.interval && index > 0) {
      element.style.setProperty("--reveal-delay", `${index * props.interval}ms`);
    }
    if (props.delay) element.style.setProperty("--reveal-delay", `${props.delay}ms`);
    targets.push({ element });
  };

  groups.forEach((group) => {
    document
      .querySelectorAll(group.selector)
      .forEach((element, index) => register(element, group, index));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    // Fire a little before the element reaches the edge, so the motion has
    // finished by the time it is properly on screen.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  targets.forEach(({ element }) => observer.observe(element));
}
