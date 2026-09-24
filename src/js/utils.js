export function addResume(resumeUrl) {
  if (!resumeUrl) return;

  const resumeButtons = document.querySelectorAll(".cta-btn--resume");
  resumeButtons.forEach((button) => {
    button.setAttribute("href", resumeUrl);
    button.setAttribute(
      "download",
      "Senior_Full_Stack_Developer_Caesar_Hinlo_Resume.docx"
    );
  });
}
