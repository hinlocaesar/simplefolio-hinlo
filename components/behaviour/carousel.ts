/**
 * Horizontal project rails: the previous/next buttons, keyboard paging, and
 * disabling a button when its rail is already at that end.
 *
 * Each rail is identified by the `id` on `[data-horizontal-rail]`, and its
 * buttons point back at it with `[data-rail-target]`.
 */
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function initCarousels(): void {
  const rails = document.querySelectorAll<HTMLElement>("[data-horizontal-rail]");

  rails.forEach((rail) => {
    const controls = document.querySelectorAll<HTMLButtonElement>(
      `[data-rail-target="${rail.id}"]`
    );
    const previousButton = document.querySelector<HTMLButtonElement>(
      `[data-rail-target="${rail.id}"][data-rail-control="previous"]`
    );
    const nextButton = document.querySelector<HTMLButtonElement>(
      `[data-rail-target="${rail.id}"][data-rail-control="next"]`
    );

    if (!previousButton || !nextButton) return;

    const updateControls = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      previousButton.disabled = rail.scrollLeft <= 2;
      nextButton.disabled = rail.scrollLeft >= maxScroll - 2;
    };

    const scrollRail = (direction: number) => {
      const distance = Math.max(rail.clientWidth * 0.78, 320);
      rail.scrollBy({ left: distance * direction, behavior: scrollBehavior() });
    };

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        scrollRail(control.dataset.railControl === "next" ? 1 : -1);
      });
    });

    rail.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      scrollRail(event.key === "ArrowRight" ? 1 : -1);
    });

    rail.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls, { passive: true });

    if ("ResizeObserver" in window) {
      new ResizeObserver(updateControls).observe(rail);
    }

    updateControls();
  });
}
