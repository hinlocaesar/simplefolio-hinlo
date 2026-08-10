import initSr from "./sr";
import initNav from "./nav";
import { addResume } from "./utils";
import resume from "../assets/Caesar_Hinlo_Resume_Full_Stack_Developer.docx";

export default function initApp() {
  initSr();
  initNav();
  // comment this if you don't want to attach your resume
  addResume(resume);
}
