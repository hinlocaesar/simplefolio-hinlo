# Simplefolio ⚡️ [![GitHub](https://img.shields.io/github/license/cobidev/simplefolio?color=blue)](https://github.com/cobidev/simplefolio/blob/master/LICENSE.md) ![GitHub stars](https://img.shields.io/github/stars/cobidev/simplefolio) ![GitHub forks](https://img.shields.io/github/forks/cobidev/simplefolio)

## A minimal portfolio template for Developers!

<h2 align="center">
  <img src="https://github.com/cobidev/gatsby-simplefolio/blob/master/examples/example.gif" alt="Simplefolio" width="600px" />
  <br>
</h2>

**_IMPORTANT NOTE_**: New fastest version came out, built with React + Gatsby! 🎉🎉🎉 See more: [Gatsby Simplefolio](https://github.com/cobidev/gatsby-simplefolio)

<h2 align="center">
  <img src="https://media.giphy.com/media/3oFzmq6Kj4yXZUVHmE/giphy.gif" alt="Look up!" width="600px" />
  <br>
</h2>

## Features

⚡️ Modern UI Design + Reveal Animations\
⚡️ One Page Layout\
⚡️ Built with Next.js 16 (App Router) + React 19\
⚡️ Custom SCSS, compiled by Turbopack\
⚡️ Fully Responsive\
⚡️ Valid HTML5 & CSS3\
⚡️ Server-rendered as one prerendered document\
⚡️ Well organized documentation

> Forked from Simplefolio by Jacobo Martinez and rebuilt on Next.js. See
> [Architecture](#architecture) for how the page is put together.

To view a demo example, **[click here](https://simplfolio.netlify.com/)**

---

## Need of portfolio for a developer ☝️

- Professional way to showcase your work
- Increases your visibility and online presence
- Shows you’re more than just a resume

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites 📋

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [NPM](http://npmjs.com)) installed on your computer.

```
node@22 or higher      (Next.js 16 requires 20.9+)
npm@10 or higher
git@2.17.1 or higher
```

This project uses `npm`; it is the package manager the CI workflow uses too.

---

## How To Use 🔧

From your command line, first clone Simplefolio:

```bash
# Clone this repository
$ git clone https://github.com/cobidev/simplefolio

# Go into the repository
$ cd simplefolio

# Remove current origin repository
$ git remote remove origin
```

Then install the dependencies and start the development server:

```bash
# Install dependencies
$ npm install

# Start development server on http://localhost:3000
$ npm run dev
```

To check the production build the way it will actually be served:

```bash
$ npm run build     # images -> srcset -> next build -> inline the stylesheet
$ npm start         # the production server
```

`npm start` boots the real server on port 3000 (`npm start -- --port 8080` to
change it) and prints your LAN address too, so a phone on the same wifi can load
the build.

Once your server has started, go to `http://localhost:3000/`.

---

## Template Instructions:

### Step 1 - STRUCTURE

The page is a set of React components in `components/`, one per section, composed
by `app/page.tsx`. There is no HTML template to edit: `components/Hero.tsx` is
the hero, `components/About.tsx` is the experience timeline, and so on.

The markup below is the upstream Simplefolio template's and is kept as a guide to
the general shape of each section. Read the component for the markup this fork
actually renders.

### Hero Section

- On `.hero-title`, put your custom title.
- On `.hero-cta`, put your custom button cta.

```html
<!-- **** Hero Section **** -->
<div id="hero" class="jumbotron">
  <div class="container">
    <h1 class="hero-title" class="load-hidden">
      Hi, my name is <span class="text-color-main">Your Name</span>
      <br />
      I'm the Unknow Developer.
    </h1>
    <p class="hero-cta" class="load-hidden">
      <a class="cta-btn cta-btn--hero" href="#about">Know more</a>
    </p>
  </div>
</div>
<!-- /END Hero Section -->
```

### About Section

- On `<img>` tag, fill the `src` property with your profile picture, your picture must be located inside `assets/` folder.
- On `<p>` tag with class-name `.about-wrapper__info-text`, include information about you, I recommend to use 2 paragraphs in order to work well and a maximum of 3 paragraphs.
- On last `<a>` tag, include your resume url on `href` property.

```html
<!-- **** About Section **** -->
<section id="about">
  <div class="container">
    <h2 class="section-title">About me</h2>
    <div class="row about-wrapper">
      <div class="col-md-6 col-sm-12">
        <div class="about-wrapper__image">
          <img
            class="img-fluid rounded shadow-lg"
            height="auto"
            width="300px"
            src="./assets/profile.jpg"
            alt="Profile Image"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="about-wrapper__info">
          <p class="about-wrapper__info-text">Lorem ipsum dolor sit, about my text.</p>
          <p class="about-wrapper__info-text">Lorem ipsum dolor sit, about my text.</p>
          <span class="d-flex mt-3">
            <a target="_blank" class="cta-btn cta-btn--resume" href=""> View Resume </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- /END About Section -->
```

### Projects Section

- Each project lives inside on a `row`.
- On `<h3>` tag with class-name `.project-wrapper__text-title`, include your project title.
- On `<p>` tag with `loremp ipsum` text, include your project information.
- On first `<a>` tag, put your project url on `href` property.
- On second `<a>` tag, put your project repository url on `href` property.

---

- Inside `<div>` tag with class-name `.project-wrapper__image`, put your project image url on the `src` of the `<img>` and put again your project url on `href` property of `<a>` tag.
- Recommended size for project image (1366 x 767px), your project image must live on `assets/` folder.

```html
<!-- **** Projects Section **** -->
<section id="projects">
  ...
  <!-- Each .row is a project -->
  <div class="row">
    <div class="col-lg-4 col-sm-12">
      <div class="project-wrapper__text">
        <h3 class="project-wrapper__text-title">[Project Title]</h3>
        <div>
          <p class="mb-4">Lorem ipsum dolor sit, my project information.</p>
        </div>
        <a target="_blank" class="cta-btn cta-btn--hero" href="#!"> See Live </a>
        <a target="_blank" class="cta-btn text-color-main" href="#!"> Source Code </a>
      </div>
    </div>
    <div class="col-lg-8 col-sm-12">
      <div class="project-wrapper__image">
        <a href="#!" target="_blank">
          <div data-tilt class="thumbnail rounded">
            <img class="img-fluid" src="./assets/project.jpg" />
          </div>
        </a>
      </div>
    </div>
  </div>
  <!-- /END Project block -->
  ...
</section>
```

### Contact Section

- On `<p>` tag with class-name `.contact-wrapper__text`, include some custom call-to-action message.
- On `<a>` tag, put your email address on `href` property.

```html
<!-- **** Contact Section **** -->
<section id="contact">
  <div class="container">
    <h2 class="section-title">Contact</h2>
    <div class="contact-wrapper">
      <p class="contact-wrapper__text">Put here your contact CTA</p>
      <a target="_blank" class="cta-btn cta-btn--resume" href="mailto:example@email.com"
        >Call to Action</a
      >
    </div>
  </div>
</section>
<!-- /END Contact Section -->
```

### Footer Section

- Put your social media link on each `<a>` links.
- If you have more social-media accounts, see [Font Awesome Icons](https://fontawesome.com/v4.7.0/icons/) to put the corresponding additional social icon `.class`
- You can delete or add as many `a` links your want.

```html
<footer class="footer navbar-static-bottom">
  ...
  <div class="social-links">
    <a href="#!" target="_blank">
      <i class="fa fa-twitter fa-inverse"></i>
    </a>
    <a href="#!" target="_blank">
      <i class="fa fa-codepen fa-inverse"></i>
    </a>
    <a href="#!" target="_blank">
      <i class="fa fa-linkedin fa-inverse"></i>
    </a>
    <a href="#!" target="_blank">
      <i class="fa fa-github fa-inverse"></i>
    </a>
  </div>
  ...
</footer>
```

### Step 2 - STYLES

Styles are plain SCSS under `app/styles/`, composed by `app/globals.scss`. The
only place that file needs touching when you add a partial is the `@import` list
at the top.

Change the color theme of the website ( choose 2 colors to create a gradient ):

Go to `app/styles/abstracts/_variables.scss` and only change the values on this classes `$main-color` and `$secondary-color` to your prefered HEX color

```scss
// Default values
$main-color: #02aab0;
$secondary-color: #00cdac;
```

**NOTE**: I highly recommend to checkout gradients variations on [UI Gradient](https://uigradients.com/#BrightVault)

---

## Architecture

One page, one route, and a deliberate split between what is rendered on the
server and what runs in the browser.

```
app/
  layout.tsx        <html>, metadata, the one global stylesheet
  page.tsx          composes the sections, in order
  globals.scss      @imports every partial in app/styles/
components/
  Hero.tsx ...      one Server Component per section, plain markup
  PageBehaviour.tsx the only client component; renders nothing
  behaviour/        nav, carousel, lightbox and scroll-reveal initialisers
public/assets/      generated on every build (gitignored)
src/assets/         image originals, including for the capture-*.mjs helpers
scripts/            the image pipeline and the measurement tooling
```

**The whole document is server-rendered.** Every section is a Server Component, so
the page ships as one prerendered HTML file and the client bundle is not on the
critical path for first paint. `PageBehaviour` is the only `"use client"` module;
it renders `null` and attaches the interactive parts to the markup that is already
there by class name. That is intentional — it keeps the scroll-spy, the mobile
menu, the lightbox and the reveals as progressive enhancements, so the page is
fully readable with JavaScript switched off entirely. `npm run verify` asserts
exactly that.

**The stylesheet is inlined.** `scripts/inline-css.mjs` runs as `postbuild` and
folds the single CSS chunk into the prerendered HTML, so first paint costs one
round trip instead of two.

**Images are hand-tuned, not optimized by the framework.** `scripts/optimize-images.mjs`
re-encodes every image to WebP at the size it is actually rendered at and writes a
`srcset` ladder for the project thumbnails; `scripts/apply-srcset.mjs` then
writes those ladders onto the card images in the components. `next/image` is
deliberately not used — see the comment in `next.config.ts`.

---

## Checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint 9, flat config, next/core-web-vitals
npm run format      # Prettier
npm run verify      # drives a browser against the production build
npm run audit       # Lighthouse against the production build
npm run shots       # review screenshots into scripts/shots/
npm run measure:fcp # FCP/LCP under an emulated slow connection
```

`npm run verify` is the important one. It boots the same server `npm start` runs
and checks the things that break silently: third-party requests creeping back
onto the critical path, the stylesheet no longer being inlined, the LCP image no
longer being preloaded, scroll reveals never firing, a lazy image never arriving,
the phone-only portrait being fetched by visitors who will never see it, and the
page still being readable with JavaScript off.

---

## Deployment 📦

This is a Node server, not a static bundle. `npm run build` produces both a normal
`.next` output and a self-contained `standalone/` one.

### Container (recommended)

```bash
$ docker build -t portfolio .
$ docker run --rm -p 3000:3000 portfolio
```

The image is a three-stage build: it generates the image set, builds Next.js, and
copies `standalone/` plus the `public/` and `.next/static` directories that Next.js
leaves out of the standalone output.

### Any Node host

Deploy `public/` and `.next/` and run:

```bash
$ npm ci && npm run build && npm start
```

Or publish `.next/standalone`, `.next/static` and `public/` together and run
`node server.js`.

Set `PORT` and `HOSTNAME` in the environment. There is nothing else to configure —
no database, no API, no secrets.

> Previously this deployed to GitHub Pages from `dist/`. GitHub Pages can only
> serve static files and cannot run a Next.js server, so that workflow has been
> replaced by `.github/workflows/ci.yml`, which builds, lints, typechecks and runs
> `npm run verify`. The URL changes from `hinlocaesar.github.io/portfolio/` to
> whatever host you point this at, which also means the hard-coded `homepage` in
> `package.json` and the project URLs in `components/` may want a look.

## Others versions 👥

[Gatsby Simplefolio](https://github.com/cobidev/gatsby-simplefolio) by [Jacobo Martinez](https://github.com/cobidev)\
[Ember.js Simplefolio](https://github.com/sernadesigns/simplefolio-ember) by [Michael Serna](https://github.com/sernadesigns)

## Technologies used 🛠️

- [Webpack](https://webpack.js.org/concepts/) - Static module bundler
- [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Front-end component library
- [Sass](https://sass-lang.com/documentation) - CSS extension language
- [ScrollReveal.js](https://scrollrevealjs.org/) - JavaScript library
- [Tilt.js](https://gijsroge.github.io/tilt.js/) - JavaScript tiny parallax library
- [Popper.js](https://popper.js.org/) - JavaScript popover library

## Authors

- **Jacobo Martinez** - [https://github.com/cobidev](https://github.com/cobidev)

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/75600296-89eb-4640-9e7e-fa87fba7ce76/deploy-status)](https://app.netlify.com/sites/simplfolio/deploys)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 🎁

I was motivated to create this project because I wanted to contribute on something useful for the dev community, thanks to [ZTM Community](https://github.com/zero-to-mastery) and [Andrei](https://github.com/aneagoie)
