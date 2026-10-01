/**
 * Loads the hero's phone-only portrait only on phone widths.
 *
 * It is a 183 KB source rendered inside a 96px circle, and the frame is
 * `display: none` above the phone breakpoint. Both `loading="lazy"` (wrong,
 * because on a phone the portrait is the first thing in the hero) and an
 * unconditional `src` (wrong, because every desktop visitor downloads it) cost
 * something. Resolving the source against a media query avoids both: the URL is
 * never assigned on desktop, so no request is made at all.
 */
const PHONE = "(max-width: 37.5em)";

export default function initHeroPortrait() {
  const image = document.querySelector(".hero__mobile-photo");
  if (!image) return;

  // Honour an explicit source if the markup ever ships one, and skip the work
  // entirely when the visitor never sees the portrait.
  if (!window.matchMedia(PHONE).matches) {
    image.removeAttribute("src");
    return;
  }

  const source = image.getAttribute("data-src");
  if (source) {
    image.setAttribute("src", source);
    image.removeAttribute("data-src");
  }
}
