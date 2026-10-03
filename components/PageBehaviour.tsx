"use client";

import { useEffect } from "react";

import { initCarousels } from "./behaviour/carousel";
import { initLightbox } from "./behaviour/lightbox";
import { initNav } from "./behaviour/nav";
import { initReveal } from "./behaviour/reveal";

/**
 * The page's only client boundary.
 *
 * Renders nothing. Everything above it is a Server Component, so the whole
 * document -- all 2800-odd lines of it -- arrives as HTML and none of this code
 * is on the critical path for first paint.
 *
 * Each initialiser attaches to markup that is already in the DOM and is written
 * to be idempotent, so the guard below is belt-and-braces: React 19 StrictMode
 * intentionally double-invokes effects in development, and a second pass would
 * otherwise attach a duplicate set of listeners and observers.
 */
let started = false;

export default function PageBehaviour() {
  useEffect(() => {
    if (started) return;
    started = true;

    initReveal();
    initNav();
    initCarousels();
    initLightbox();
  }, []);

  return null;
}
