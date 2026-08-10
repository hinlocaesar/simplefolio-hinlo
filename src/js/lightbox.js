export default function initLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".image-lightbox__img");
  const triggers = document.querySelectorAll("[data-lightbox]");
  let lastFocusedElement = null;

  function openLightbox(src, alt) {
    lastFocusedElement = document.activeElement;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".image-lightbox__close").focus();
  }

  const PLACEHOLDER_SRC =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  function closeLightbox() {
    lightbox.classList.remove("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = PLACEHOLDER_SRC;
    lightboxImage.alt = "";
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const img = trigger.querySelector("img");
      const src = trigger.dataset.lightbox || img?.currentSrc || img?.src;
      const alt = trigger.dataset.lightboxAlt || img?.alt || "";
      if (src) openLightbox(src, alt);
    });
  });

  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("image-lightbox--open")) {
      closeLightbox();
    }
  });
}
