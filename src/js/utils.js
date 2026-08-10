export function addResume(pdf) {
  if (!pdf) return;

  const resumeButtons = document.querySelectorAll(".cta-btn--resume");
  resumeButtons.forEach((button) => button.setAttribute("href", pdf));
}
