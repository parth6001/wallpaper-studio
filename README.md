# Wallpaper Studio Ultimate v3.0

A standalone, mobile-first, privacy-first wallpaper studio using procedural WebGL2 shaders. No backend, paid API, accounts, npm install or billing.

## What's included
- Six curated styles: Liquid Glass, Cinematic Aurora, AMOLED, Chrome, Soft Sculpture and Fractal Flow
- GPU shaders for procedural shapes, glow and noise, with simple Canvas 2D fallback when WebGL2 is unavailable
- Effect intensity, flow, detail, bloom, grain and rotation controls
- Curated palettes and three custom colors
- Device presets, custom dimensions, PNG/WebP/JPEG downloads
- Undo/redo, lock screen simulation, local saved projects, JSON backup/restore
- Responsive phone-first UI, offline caching after first load

## Deploy
1. Extract this ZIP.
2. Upload its seven files into the ROOT of the `main` branch at https://github.com/parth6001/wallpaper-studio.
3. Replace existing index.html, app.js, sw.js, manifest.webmanifest and icon.svg; upload style.css and README.md.
4. GitHub Settings > Pages: Deploy from branch `main`, folder `/ (root)`.
5. Wait for Actions to show successful Pages deployment, then visit https://parth6001.github.io/wallpaper-studio/.
6. If the old app is cached, clear site data for the Pages URL and reload.

## Important limitations
These are procedural shader effects, **not photorealistic ray-traced refraction**. The Glass style uses layered signed-distance forms, highlights and approximated transparency. AMOLED shader background is black, but colored lines intentionally emit light. GPU memory limits vary by device, and exports are capped at 22 megapixels. The lock-screen preview is only a mockup and is excluded from exports. Offline use requires one successful online visit. Browser-only apps cannot directly set system live wallpapers.

## Validation
Run `node --check app.js` and `node --check sw.js`. Test WebGL2 and downloads on actual Android hardware before calling the build production ready.
