# NOXwear motion edition

This version keeps the current NOXwear name, contact links, product catalogue,
250 MAD unit price, 50 MAD order deposit, and checkout flow.

## Changes

- One responsive four-scene hero on phones and desktops, with a fixed wordmark,
  a gentle crossfade/zoom, progress, pause, keyboard arrows, and RTL swipe.
- Autoplay stops offscreen, in a hidden tab, on mouse hover or keyboard focus,
  after manual navigation, and when reduced motion is requested.
- Four clear category cards: two columns on mobile/tablet, four on large screens.
- Lightweight local WebP hero images at 800 and 1600 pixels.
- Locally hosted Cairo, Permanent Marker, and Space Grotesk fonts, with their licences.
- A local Flaticon WhatsApp icon, a visible attribution, and one-shot hover feedback.
- Native SVG navigation feedback, subtle card reveal/hover, FAQ indicator rotation,
  cart-add feedback, and keyboard focus containment in the cart.
- Shared styles/widgets included in all four world pages and in the generator.

## Use

The `dist` directory is the complete deployable website. Replace the existing
`dist` directory with this version, or apply the included Git patch to the base
commit listed in the handoff notes. Keep `build-world-pages.cjs` and the new
shared files together when making future changes.

Preview: `node preview-server.cjs`, then open `http://127.0.0.1:4173`.
Regenerate category pages: `node build-world-pages.cjs`.
Browser smoke test: install Playwright in your test environment and run
`node smoke-storefront.cjs`. An existing browser can be selected with
`CHROMIUM_EXECUTABLE`; `PLAYWRIGHT_MODULE` accepts an absolute Playwright module path.

## Sources and attribution

- Motion inspiration: SVGator, “31 Cool Website Animations Examples and Effects”,
  sections on animated icons, microinteractions, and hero animation:
  https://www.svgator.com/blog/website-animation-examples-and-effects/
  The implementation is original CSS/JavaScript, not an SVGator export and does
  not require a paid SVGator account or runtime.
- WhatsApp icon: Magnific on Flaticon, asset 3781677:
  https://www.flaticon.com/free-icon/whatsapp_3781677
  Source PNG: https://cdn-icons-png.flaticon.com/512/3781/3781677.png
  Free personal/commercial use with attribution. A visible credit is included
  in every footer; retain it unless you obtain an appropriate attribution-free licence.
- Campaign artwork: generated for this project in this conversation, optimized
  locally for web use. No stock watermark or third-party animation embed.

Only the motion reference and icon above were used from the supplied websites.
This is a prepared local edition; publishing requires write access to the repository
or deployment account.
