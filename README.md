# Wallpaper Studio v4.2 — Final Reference Edition

A lightweight mobile-first wallpaper generator with original procedural artwork inspired by the *visual approach* of the user's WLLPR screenshots. All designs are drawn locally with Canvas 2D. No copied third-party source code or images.

**Cost:** ₹0 on GitHub Pages. No hosting bill, keys, AI services, backend, npm dependencies or account.

## Included

- 6 minimal geometric styles: Terrain, Gradient, Soft Dunes, Landscapes, Concentric Arcs, Contours
- 3 optional stylized effects: Aurora, AMOLED Neon, Glass Forms (not photorealistic)
- 14 palettes, independent wallpaper dark/light mode and website dark/light appearance
- One-tap new variations, four-choice variation gallery, local favorites and recent history
- Desktop (3840×2160), Android (1080×2400), iPhone (1290×2796) previews / PNG exports
- Lock-screen clock preview (never included in downloaded PNG), clock preference remembered
- Advanced adjustments for layers, curvature, height, detail and glow
- Shareable design links; offline PWA assets cached after first successful online visit

## Publish to your existing site

1. Extract `wallpaper-studio-v4-2-final-github-ready.zip`.
2. In `https://github.com/parth6001/wallpaper-studio`, open branch `main` and upload **all 8 files to repository root**, replacing matching older versions.
3. Keep file names exactly as shown; especially `styles.css`, `engine.js`, `app.js`, `sw.js`.
4. In repository Settings → Pages, ensure branch **main** and folder **/(root)** are selected.
5. Commit and wait for Actions to deploy. Open `https://parth6001.github.io/wallpaper-studio/`.
6. On Android, reload the page; if a cached old version remains, clear site data for the Pages URL and open again. Be aware that clearing site data erases locally saved favorites/history.

## Run locally

```
python -m http.server 8000
```

Visit `http://localhost:8000` (rather than opening `index.html` via `file://`). No build is necessary.

## Privacy and constraints

Everything runs in your browser. Favorites and recent settings live only in localStorage on the device, with no cross-device syncing. A large PNG export can fail on devices with low available memory. Wallpaper effects are Canvas illustrations, not AI-generated photographs. Preview clock is a mockup and is never included in the export. Offline availability requires a successful initial visit. This package does **not** automatically push code to GitHub.

## Source files

`index.html`, `styles.css`, `engine.js`, `app.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `README.md`.
