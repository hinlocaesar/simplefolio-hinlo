import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Motion layer: Lenis for smooth scrolling, GSAP ScrollTrigger for everything
 * that moves.
 *
 * Scroll position is driven from GSAP's ticker rather than the browser's own
 * smooth-scroll, so Lenis and ScrollTrigger read from a single clock and never
 * disagree about where the page is. `lagSmoothing(0)` stops GSAP from
 * "correcting" for a slow frame, which otherwise shows up as a visible jump
 * after a long task.
 *
 * Everything here is skipped under prefers-reduced-motion. Content is left in
 * its final state rather than animated to it, so nothing depends on an effect
 * having run.
 */
export default function initMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.registerPlugin(ScrollTrigger);

  if (reduced) {
    // No smooth scroll, no reveals. The markup is already in its final state.
    initMarquees({ reduced: true });
    return;
  }

  const lenis = new Lenis({
    duration: 1.1,
    // Slight ease-out on the wheel: enough to feel damped, not enough to feel
    // like the page is lagging behind the cursor.
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Native touch scrolling is already smooth on modern phones, and hijacking
    // it tends to fight the browser's own momentum.
    syncTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links must go through Lenis, otherwise the page jumps natively and
  // then fights the smooth-scroll position for a second.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -Number(getComputedStyle(target).scrollMarginTop?.replace("px", "") ?? 0) });
    });
  });

  initReveals();
  initMarquees();
  initHeroParallax();
  initCounters();

  // Webfonts change text metrics, which invalidates every trigger position
  // calculated against them.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/**
 * Reveals. Elements are batched so one trigger covers a whole group and the
 * stagger is per-item, rather than one trigger and listener per element.
 */
function initReveals() {
  const groups = [
    ".section-eyebrow",
    ".section-title",
    ".about__summary",
    ".timeline__item",
    ".skills__group",
    ".projects__rail-head",
    ".project-card",
    ".credentials__block",
    ".contact-wrapper",
    ".reference-card",
    ".marquee",
  ];

  groups.forEach((selector) => {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;

    // Set the start state up front rather than in the tween, so nothing flashes
    // at full opacity before the tween is built.
    gsap.set(elements, { autoAlpha: 0, y: 28 });

    ScrollTrigger.batch(elements, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
          overwrite: true,
        }),
    });
  });
}

/**
 * Marquees. The track holds two identical groups; translating it by -50% of
 * its own width lands exactly on the start of the second group, so the repeat
 * has no seam.
 */
function initMarquees({ reduced = false } = {}) {
  document.querySelectorAll(".marquee__track").forEach((track) => {
    if (reduced) return;
    const speed = Number(track.dataset.speed ?? 40);

    gsap.to(track, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
      // Jumping the playhead when the tab is backgrounded stops the marquee from
      // "catching up" with a jump when the visitor returns.
      modifiers: {
        xPercent: (x) => `${parseFloat(x) % 50}`,
      },
    });
  });
}

/**
 * A slow drift on the nebula as the hero scrolls away. Scrubbed rather than
 * timed so it tracks the scroll position exactly.
 */
function initHeroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  gsap.to(hero.querySelectorAll(".hero__glow, .hero__parallax"), {
    yPercent: -18,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Counts a number up once, for elements carrying `data-count`. Kept separate
 * from the reveal because the count has to start when the number is on screen,
 * not when its container is.
 */
function initCounters() {
  document.querySelectorAll("[data-count]").forEach((element) => {
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;

    const suffix = element.dataset.countSuffix ?? "";
    const decimals = Number(element.dataset.countDecimals ?? 0);

    // Set the final value immediately so the number is correct without JS and
    // is never wrong if the tween is interrupted.
    element.textContent = target.toFixed(decimals) + suffix;

    ScrollTrigger.create({
      trigger: element,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to({ value: 0 }, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate() {
            element.textContent = this.targets()[0].value.toFixed(decimals) + suffix;
          },
        }),
    });
  });
}
