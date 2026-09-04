export default function initLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".image-lightbox__img");
  const counter = lightbox.querySelector(".image-lightbox__counter");
  const prevBtn = lightbox.querySelector(".image-lightbox__nav--prev");
  const nextBtn = lightbox.querySelector(".image-lightbox__nav--next");
  const triggers = document.querySelectorAll("[data-lightbox], [data-lightbox-gallery]");
  let lastFocusedElement = null;
  let gallery = [];
  let currentIndex = 0;

  const PLACEHOLDER_SRC =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  function parseGallery(trigger) {
    const galleryAttr = trigger.dataset.lightboxGallery;
    if (galleryAttr) {
      try {
        const items = JSON.parse(galleryAttr);
        if (Array.isArray(items) && items.length) {
          return items.map((item) => ({
            src: item.src,
            alt: item.alt || "",
          }));
        }
      } catch {
        // Fall through to single-image handling
      }
    }

    const img = trigger.querySelector("img");
    const src = trigger.dataset.lightbox || img?.currentSrc || img?.src;
    const alt = trigger.dataset.lightboxAlt || img?.alt || "";
    return src ? [{ src, alt }] : [];
  }

  function showSlide(index) {
    if (!gallery.length) return;
    currentIndex = (index + gallery.length) % gallery.length;
    const item = gallery[currentIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;

    const isGallery = gallery.length > 1;
    lightbox.classList.toggle("image-lightbox--gallery", isGallery);

    if (counter) {
      counter.textContent = isGallery
        ? `${currentIndex + 1} / ${gallery.length}`
        : "";
      counter.hidden = !isGallery;
    }

    if (prevBtn) prevBtn.hidden = !isGallery;
    if (nextBtn) nextBtn.hidden = !isGallery;
  }

  function openLightbox(items) {
    if (!items.length) return;
    lastFocusedElement = document.activeElement;
    gallery = items;
    showSlide(0);
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".image-lightbox__close").focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("image-lightbox--open", "image-lightbox--gallery");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = PLACEHOLDER_SRC;
    lightboxImage.alt = "";
    gallery = [];
    currentIndex = 0;
    if (counter) {
      counter.textContent = "";
      counter.hidden = true;
    }
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function showPrev() {
    showSlide(currentIndex - 1);
  }

  function showNext() {
    showSlide(currentIndex + 1);
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(parseGallery(trigger));
    });
  });

  prevBtn?.addEventListener("click", showPrev);
  nextBtn?.addEventListener("click", showNext);

  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("image-lightbox--open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft" && gallery.length > 1) {
      showPrev();
    } else if (event.key === "ArrowRight" && gallery.length > 1) {
      showNext();
    }
  });
}
