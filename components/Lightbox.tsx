/**
 * Lightbox shell.
 *
 * The dialog itself is always in the markup; only its open state, the current
 * image and the counter are driven from `LightboxBehaviour`. Keeping the shell
 * server-rendered means the markup, and therefore the CSS, is identical whether
 * or not the bundle ever runs.
 */

export default function Lightbox() {
  return (
    <div id="image-lightbox" className="image-lightbox" aria-hidden="true">
      <div className="image-lightbox__backdrop" data-lightbox-close="" />
      <div
        className="image-lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Expanded project image"
      >
        <button
          type="button"
          className="image-lightbox__close"
          data-lightbox-close=""
          aria-label="Close"
        >
          ×
        </button>
        <button
          type="button"
          className="image-lightbox__nav image-lightbox__nav--prev"
          aria-label="Previous image"
          hidden
        >
          ‹
        </button>
        <button
          type="button"
          className="image-lightbox__nav image-lightbox__nav--next"
          aria-label="Next image"
          hidden
        >
          ›
        </button>
        <img
          className="image-lightbox__img"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt=""
        />
        <p className="image-lightbox__counter" hidden />
      </div>
    </div>
  );
}
