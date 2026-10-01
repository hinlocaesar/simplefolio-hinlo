import initSr from "./sr";
import initNav from "./nav";
import initBoot from "./boot";
import initReticle from "./reticle";
import initCarousels from "./carousel";
import initLightbox from "./lightbox";
import { addResume } from "./utils";
import resume from "../assets/Senior_Full_Stack_Developer_Caesar_Hinlo_Resume.docx";

export default function initApp() {
  // Boot first: it gates the page visually, so the entrance animations below
  // should only start once it has handed over.
  initBoot();
  initReticle();
  initSr();
  initNav();
  initCarousels();
  initLightbox();
  addResume(resume);
}
