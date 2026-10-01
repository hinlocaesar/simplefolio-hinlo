// Self-hosted variable fonts. Imported here rather than from SCSS so the CSS
// lands in the bundle through the same pipeline as the app's own styles.
import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

import initApp from "./js/index";
import "./style/main.scss";

initApp();
