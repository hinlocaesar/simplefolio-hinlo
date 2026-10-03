/**
 * Image lightbox.
 *
 * Triggers are anything carrying `data-lightbox` (a single image) or
 * `data-lightbox-gallery` (a JSON array of `{ src, alt }`), which the project
 * cards and the timeline both use. The dialog shell is server-rendered by
 * `components/Lightbox.tsx`; this only drives its open state.
 */
interface GalleryItem {
  src: string;
  alt: string;
}

const PLACEHOLDER_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function parseGallery(trigger: HTMLElement): GalleryItem[] {
  const galleryAttr = trigger.dataset.lightboxGallery;
  if (galleryAttr) {
    try {
      const items: unknown = JSON.parse(galleryAttr);
      if (Array.isArray(items) && items.length) {
        return items.map((item) => {
          const entry = item as Partial<GalleryItem>;
          return { src: entry.src ?? "", alt: entry.alt || "" };
        });
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

export function initLightbox(): void {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector<HTMLImageElement>(".image-lightbox__img");
  const counter = lightbox.querySelector<HTMLParagraphElement>(".image-lightbox__counter");
  const prevBtn = lightbox.querySelector<HTMLButtonElement>(".image-lightbox__nav--prev");
  const nextBtn = lightbox.querySelector<HTMLButtonElement>(".image-lightbox__nav--next");
  const triggers = document.querySelectorAll<HTMLElement>(
    "[data-lightbox], [data-lightbox-gallery]"
  );
  if (!lightboxImage) return;

  let lastFocusedElement: HTMLElement | null = null;
  let gallery: GalleryItem[] = [];
  let currentIndex = 0;

  function showSlide(index: number) {
    if (!gallery.length) return;
    currentIndex = (index + gallery.length) % gallery.length;
    const item = gallery[currentIndex];
    lightboxImage!.src = item.src;
    lightboxImage!.alt = item.alt;

    const isGallery = gallery.length > 1;
    lightbox!.classList.toggle("image-lightbox--gallery", isGallery);

    if (counter) {
      counter.textContent = isGallery ? `${currentIndex + 1} / ${gallery.length}` : "";
      counter.hidden = !isGallery;
    }

    if (prevBtn) prevBtn.hidden = !isGallery;
    if (nextBtn) nextBtn.hidden = !isGallery;
  }

  function openLightbox(items: GalleryItem[]) {
    if (!items.length) return;
    lastFocusedElement = document.activeElement as HTMLElement | null;
    gallery = items;
    showSlide(0);
    lightbox!.classList.add("image-lightbox--open");
    lightbox!.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightbox!.querySelector<HTMLButtonElement>(".image-lightbox__close")?.focus();
  }

  function closeLightbox() {
    lightbox!.classList.remove("image-lightbox--open", "image-lightbox--gallery");
    lightbox!.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage!.src = PLACEHOLDER_SRC;
    lightboxImage!.alt = "";
    gallery = [];
    currentIndex = 0;
    if (counter) {
      counter.textContent = "";
      counter.hidden = true;
    }
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
    lastFocusedElement?.focus();
  }

  const showPrev = () => showSlide(currentIndex - 1);
  const showNext = () => showSlide(currentIndex + 1);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(parseGallery(trigger)));
  });

  prevBtn?.addEventListener("click", showPrev);
  nextBtn?.addEventListener("click", showNext);

  lightbox.querySelectorAll<HTMLElement>("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox!.classList.contains("image-lightbox--open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft" && gallery.length > 1) {
      showPrev();
    } else if (event.key === "ArrowRight" && gallery.length > 1) {
      showNext();
    }
  });
}
