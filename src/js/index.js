import initSr from "./sr";
import initNav from "./nav";
import initCarousels from "./carousel";
import initLightbox from "./lightbox";
import { addResume } from "./utils";
import resume from "../assets/Caesar_Hinlo_Resume_Full_Stack_Developer.docx";

export default function initApp() {
  initSr();
  initNav();
  initCarousels();
  initLightbox();
  addResume(resume);
}
