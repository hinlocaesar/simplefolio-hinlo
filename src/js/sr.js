import assignProps from "./assignProps";

/**
 * Scroll entrances.
 *
 * This used to be the ScrollReveal library from a CDN. Two reasons it is no
 * longer: it was a render-blocking third-party script in <head>, which put a
 * DNS lookup, TLS handshake and download on the critical path for every visitor
 * (measured as the single biggest drag on LCP), and the page now ships with the
 * fonts and everything else it needs, so depending on someone else's uptime for
 * its animations was a liability.
 *
 * The API is deliberately shaped like the calls that used to drive it, so the
 * selector list below still reads as the list of what animates in.
 */

/**
 * A shared observer: one IntersectionObserver watching every element keeps the
 * work off the main thread and off layout thrash. Elements are marked revealed
 * the first time they cross into view.
 */
const REVEALED = "is-revealed";

/** Reads `--reveal-delay` so a reveal can be staggered from CSS or inline. */
function delayFor(element) {
  const raw = element.style.getPropertyValue("--reveal-delay");
  return raw ? parseFloat(raw) : 0;
}

/** The offset an element starts from, as a translate along the reveal axis. */
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

function reveal(element, { distance, origin }) {
  const delay = delayFor(element);
  if (delay) {
    window.setTimeout(() => show(element), delay);
  } else {
    show(element);
  }
}

export default function initSr() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The hero is above the fold on every breakpoint: reveal it immediately rather
  // than making the visitor wait for an observer to fire on content they can
  // already see.
  const always = [
    ".hero__mobile-portrait",
    ".hero-headline",
    ".hero__name",
    ".hero__subtitle",
    ".hero__cta",
    ".hero__facts",
  ];

  const defaultProps = { distance: "26px", interval: 70, origin: "bottom" };

  const groups = [
    { selector: ".section-eyebrow, .section-title", props: assignProps({ distance: "0px", interval: 0 }, defaultProps) },
    { selector: ".about__summary", props: assignProps({ interval: 0 }, defaultProps) },
    { selector: ".timeline__item", props: defaultProps },
    { selector: ".skills__group", props: defaultProps },
    { selector: ".projects__rail-head", props: assignProps({ interval: 0 }, defaultProps) },
    { selector: ".project-card", props: assignProps({ distance: "34px", origin: "left", interval: 90 }, defaultProps) },
    { selector: ".credentials__block", props: defaultProps },
    { selector: ".contact-wrapper", props: assignProps({ interval: 0 }, defaultProps) },
    { selector: ".reference-card", props: defaultProps },
  ];

  // Reduced motion, or no IntersectionObserver at all: show everything at once.
  // Content is never left invisible because an effect did not run.
  if (reduced || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".load-hidden").forEach((el) => el.classList.remove("load-hidden"));
    document.querySelectorAll(".sr-item").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  const targets = [];

  /** Registers an element, parking it at its start offset until revealed. */
  const register = (element, props) => {
    element.classList.add("sr-item");
    element.style.transform = startOffset(props.origin, props.distance);
    targets.push({ element, ...props });
  };

  always.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      register(el, { distance: "26px", origin: "bottom" });
      // Anything marked load-hidden is a no-JS fallback guard; it is safe to
      // clear now that the reveal is running.
      el.classList.remove("load-hidden");
    });
  });

  for (const { selector, props } of groups) {
    const elements = Array.from(document.querySelectorAll(selector));

    elements.forEach((el) => {
      register(el, props);

      // Position within the group drives the stagger, so a list of cards
      // cascades without every element needing its own delay set in markup.
      const index = elements.indexOf(el);
      if (props.interval && index > 0) {
        el.style.setProperty("--reveal-delay", `${index * props.interval}ms`);
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = targets.find((t) => t.element === entry.target);
        if (target) reveal(entry.target, target);
        observer.unobserve(entry.target);
      }
    },
    // Fire a little before the element reaches the edge so it has finished
    // moving by the time it is properly on screen.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  targets.forEach(({ element }) => observer.observe(element));
}
