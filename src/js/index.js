import initSr from "./sr";
import initNav from "./nav";
import initLightbox from "./lightbox";
import { addResume } from "./utils";
import resume from "../assets/Caesar_Hinlo_Resume_Full_Stack_Developer.docx";

export default function initApp() {
  initSr();
  initNav();
  initLightbox();
  // comment this if you don't want to attach your resume
  addResume(resume);
}
