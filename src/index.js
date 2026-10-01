// Self-hosted variable fonts. Imported here rather than from SCSS so the CSS
// lands in the bundle through the same pipeline as the app's own styles.
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

import initMotion from "./js/scroll";
import initNav from "./js/nav";
import initHeroPortrait from "./js/hero";
import initCarousels from "./js/carousel";
import initLightbox from "./js/lightbox";
import { addResume } from "./js/utils";
import resume from "./assets/Senior_Full_Stack_Developer_Caesar_Hinlo_Resume.docx";
import "./style/main.scss";

initHeroPortrait();
initMotion();
initNav();
initCarousels();
initLightbox();
addResume(resume);

/**
 * Three.js is ~120 KB of library for one decorative panel, so it is loaded as
 * its own chunk once the browser is idle rather than being pulled into the
 * critical bundle. The panel has a CSS background behind it, so the page is
 * complete and legible before this arrives, and the diagram fades in when it
 * does.
 */
function loadOrbit() {
  import("./js/orbit")
    .then(({ default: initOrbit }) => {
      initOrbit();
      document.querySelector(".hero__orbit")?.classList.add("is-ready");
    })
    .catch(() => {
      // No WebGL, or the chunk failed to load. The CSS nebula still carries
      // the atmosphere, so there is nothing to recover and nothing to report.
    });
}

if ("requestIdleCallback" in window) {
  requestIdleCallback(loadOrbit, { timeout: 2000 });
} else {
  setTimeout(loadOrbit, 400);
}
