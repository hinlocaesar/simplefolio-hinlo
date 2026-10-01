/**
 * Boot sequence: the page powers on like a machine starting up.
 *
 * This is the most intrusive thing on the site, so it is built defensively:
 *
 * - Runs at most once per browser session. Coming back to a page should not
 *   mean sitting through the same intro again.
 * - Never blocks the page. It is removed from the DOM when it finishes, and any
 *   click, key press or scroll dismisses it immediately.
 * - Skipped entirely for `prefers-reduced-motion`, where an animation this long
 *   is an accessibility problem rather than a flourish.
 * - Purely decorative (`aria-hidden`, no focusable content), so assistive tech
 *   never encounters it.
 */
const LINES = [
  "INITIALISING GRID",
  "LOADING KERNEL v14.2",
  "MOUNTING /skills",
  "DECRYPTING /experience",
  "RESOLVING /projects",
  "HANDSHAKE",
];

export default function initBoot() {
  const overlay = document.querySelector(".boot");
  const log = document.querySelector(".boot__log");
  const bar = document.querySelector(".boot__bar");

  // No markup, or the visitor has asked for less motion: nothing to do.
  if (!overlay || !log || !bar) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = (() => {
    try {
      return sessionStorage.getItem("boot-seen");
    } catch {
      // Private mode can throw on storage access; treat that as "not seen".
      return null;
    }
  })();

  if (reduced || seen) {
    overlay.remove();
    return;
  }

  document.documentElement.classList.add("is-booting");
  overlay.removeAttribute("aria-hidden");

  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    overlay.classList.add("is-complete");
    document.documentElement.classList.remove("is-booting");

    window.removeEventListener("keydown", finish);
    window.removeEventListener("pointerdown", finish);
    window.removeEventListener("wheel", finish);
    window.removeEventListener("touchstart", finish);

    // The exit transition needs the node to stay put until it has played.
    window.setTimeout(() => overlay.remove(), 700);
  };

  window.addEventListener("keydown", finish, { passive: true });
  window.addEventListener("pointerdown", finish, { passive: true });
  window.addEventListener("wheel", finish, { passive: true });
  window.addEventListener("touchstart", finish, { passive: true });

  try {
    sessionStorage.setItem("boot-seen", "1");
  } catch {
    // Nothing to persist to; the sequence just plays again next visit.
  }

  // Type the lines out in sequence. Each line appends itself and fills a bit
  // more of the progress bar, so the bar and the log stay in step.
  let line = 0;
  const typeNext = () => {
    if (done || line >= LINES.length) {
      window.setTimeout(finish, 260);
      return;
    }

    const row = document.createElement("p");
    row.className = "boot__row";
    row.textContent = `> ${LINES[line]}`;
    log.append(row);

    // Keep the log pinned to the newest line as it grows.
    log.scrollTop = log.scrollHeight;
    bar.style.setProperty("--boot-progress", `${((line + 1) / LINES.length) * 100}%`);

    line += 1;
    window.setTimeout(typeNext, line === LINES.length ? 200 : 95 + Math.random() * 70);
  };

  // One frame of delay lets the overlay paint before the log starts filling, so
  // the first line is not lost inside the initial paint.
  requestAnimationFrame(() => requestAnimationFrame(typeNext));
}
