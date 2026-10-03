import About from "@/components/About";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IconSprite from "@/components/IconSprite";
import Lightbox from "@/components/Lightbox";
import Nav from "@/components/Nav";
import PageBehaviour from "@/components/PageBehaviour";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Volunteer from "@/components/Volunteer";

/**
 * The whole site.
 *
 * Everything here is a Server Component, so this tree is rendered to HTML at
 * build time and shipped as one document. `PageBehaviour` is the only client
 * component on the page and it renders nothing -- see the note in
 * `components/PageBehaviour.tsx` for why the interactive parts attach to this
 * markup rather than owning it.
 */
export default function Page() {
  return (
    <>
      <div id="top" />

      <IconSprite />
      <Nav />
      <div className="site-nav__backdrop" id="navBackdrop" />

      <Hero />
      <Skills />
      <About />
      <Projects />
      <Volunteer />
      <Credentials />
      <Contact />
      <Footer />

      <Lightbox />

      <PageBehaviour />
    </>
  );
}
