/**
 * HUD reticle: a crosshair that tracks the pointer.
 *
 * A cursor-replacement flourish, so it stays strictly opt-out: it is skipped on
 * touch pointers (where there is no cursor to track), when the visitor prefers
 * reduced motion, and whenever the OS reports a coarse pointer. It also leaves
 * the DOM entirely on coarse pointers so it never costs anything on mobile.
 */
export default function initReticle() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const reticle = document.createElement("div");
  reticle.className = "hud-reticle";
  reticle.setAttribute("aria-hidden", "true");
  document.body.append(reticle);

  let x = 0;
  let y = 0;
  let raf = 0;

  // The dot is eased toward the pointer rather than snapped to it, so the
  // reticle feels like it has mass. One rAF drives the whole thing so a fast
  // pointer cannot queue up layout work.
  const render = () => {
    reticle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      reticle.classList.add("is-visible");

      if (!raf) raf = requestAnimationFrame(render);
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => {
    reticle.classList.remove("is-visible");
  });

  // The reticle lights up over anything interactive, so it reads as targeting
  // a control rather than always sitting flat on the page.
  document.addEventListener(
    "pointerover",
    (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button, summary, [role='button']")) {
        reticle.classList.add("is-hot");
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerout",
    (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button, summary, [role='button']")) {
        reticle.classList.remove("is-hot");
      }
    },
    { passive: true }
  );
}
