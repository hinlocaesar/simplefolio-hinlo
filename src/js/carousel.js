function getScrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export default function initCarousels() {
  const rails = document.querySelectorAll("[data-horizontal-rail]");

  rails.forEach((rail) => {
    const controls = document.querySelectorAll(
      `[data-rail-target="${rail.id}"]`
    );
    const previousButton = document.querySelector(
      `[data-rail-target="${rail.id}"][data-rail-control="previous"]`
    );
    const nextButton = document.querySelector(
      `[data-rail-target="${rail.id}"][data-rail-control="next"]`
    );

    if (!previousButton || !nextButton) return;

    const updateControls = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      previousButton.disabled = rail.scrollLeft <= 2;
      nextButton.disabled = rail.scrollLeft >= maxScroll - 2;
    };

    const scrollRail = (direction) => {
      const distance = Math.max(rail.clientWidth * 0.78, 320);
      rail.scrollBy({
        left: distance * direction,
        behavior: getScrollBehavior(),
      });
    };

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        const direction = control.dataset.railControl === "next" ? 1 : -1;
        scrollRail(direction);
      });
    });

    rail.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        scrollRail(event.key === "ArrowRight" ? 1 : -1);
      }
    });

    rail.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls, { passive: true });

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(updateControls);
      observer.observe(rail);
    }

    updateControls();
  });
}
