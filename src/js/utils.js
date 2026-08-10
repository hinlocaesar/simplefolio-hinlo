export function addResume(resumeUrl) {
  if (!resumeUrl) return;

  const resumeButtons = document.querySelectorAll(".cta-btn--resume");
  resumeButtons.forEach((button) => {
    button.setAttribute("href", resumeUrl);
    button.setAttribute(
      "download",
      "Caesar_Hinlo_Resume_Full_Stack_Developer.docx"
    );
  });
}
