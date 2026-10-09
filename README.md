# Wallpaper Studio v4.0 — Reference Edition

A fast, minimalist wallpaper generator inspired by the **look and workflow** of the user's WLLPR reference screenshots. It uses original, standalone code and a deterministic drawing engine, **not** copied source code, images, brand assets or fonts from the reference site.

**Host it for ₹0 on GitHub Pages. No server, database, API key, account or paid plan required.**

## Features

- Six editable core patterns: Terrain, Gradient, Soft Dunes, Landscapes, Concentric Arcs and Contours
- Three optional experimental patterns in "Extra Styles": Aurora, AMOLED Neon and Glass Forms
- 14 curated color themes with **Dark** and **Light** wallpaper modes
- Real-time **desktop 4K + phone** previews; toggle **Android / iPhone**
- Simulated date/time lock-screen preview; optional clock visibility; clock is **never baked into downloads**
- "Generate variation" (new procedural seed), surprise-me mode, and a selectable set of four variants
- Fine-tune layer count, curvature, artwork height, detail and glow
- Recent history (last 18) and favorites (up to 30), stored privately in this browser via localStorage
- Direct full-resolution PNG downloads: **3840 × 2160** desktop, **1080 × 2400** Android, **1290 × 2796** iPhone
- Share a complete design by URL (configuration in query string)
- PWA manifest and service-worker caching for offline access **after successful online installation/visit**

## Publish to existing GitHub Pages repository

1. Download and extract `wallpaper-studio-v4-reference-github-ready.zip`.
2. Open `https://github.com/parth6001/wallpaper-studio` on branch **main**. The project must live in the **repository root**, not in a nested directory.
3. Upload **all eight** files from the ZIP to the repository root. Replace older copies of `index.html`, `app.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `README.md`. **Also upload the new `engine.js` and `styles.css`.** `styles.css` is not named `style.css`.
4. Commit the changes. In **Settings → Pages**, select **Deploy from branch → main → / (root)** if not already enabled.
5. Wait until GitHub Pages deployment completes in **Actions**. Visit `https://parth6001.github.io/wallpaper-studio/`.
6. If you still see an old v2/v3 version, reload with cache bypass or clear *site data* for the GitHub Pages domain and reload. The updated service worker uses a new cache name and purges previous Wallpaper Studio caches upon activation.

## Local development

Serve the extracted folder using any static HTTP server. For example:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`. There are **no dependencies or build steps**. Some browser features (especially the service worker) require localhost or HTTPS, so opening `index.html` as `file://` is not ideal for testing.

## Files

| File | Purpose |
|---|---|
| `index.html` | Accessible UI and previews |
| `styles.css` | Responsive light interface |
| `engine.js` | Nine deterministic Canvas2D drawing styles; no network access |
| `app.js` | Interactions, preview, palette, history, export, sharing |
| `sw.js` | PWA offline asset caching and cache-version cleanup |
| `manifest.webmanifest` | Installable web-app metadata |
| `icon.svg` | Original geometric app icon |
| `README.md` | Setup, behavior and limits |

## Verified

Checked with headless Chromium using locally injected static resources (network navigation was restricted in the test environment):

- JavaScript syntax checks passed for `engine.js`, `app.js` and `sw.js`.
- UI and canvas rendering had no uncaught JavaScript errors in tested browser runs.
- Mobile interface checked at widths of **320, 360, 393, 600, 768** pixels; desktop at **1024 and 1440**; no horizontal overflow.
- Selection, palettes, dark/light switching, variation gallery, favorites, lock-clock toggle, slider controls and Android/iPhone switch tested.
- Full-sized PNG export verified at **3840 × 2160** (desktop) and **1290 × 2796** (iPhone).

## Known limitations

- Advanced effects are stylized Canvas artwork, **not** photorealistic 3D or AI image generation. The six geometric styles are the priority.
- Saving uses localStorage: browser data clearance or private browsing may erase recent history/favorites. Designs are not synced across devices.
- The wallpaper clock is a **preview only** and is not included in PNG exports.
- Downloads may fail on browsers/devices that cannot allocate large canvases; try another browser or desktop for 4K output.
- Service-worker registration and offline deployment were not tested on the actual GitHub Pages origin or a real Android device; test there before calling the PWA production-ready.
- GitHub repo was **not** modified directly; manual upload or a connected GitHub workflow is required.

## Privacy

Everything is generated and stored locally on the user's device. There are no analytics, third-party scripts, external fonts, paid AI calls or remote image dependencies.
