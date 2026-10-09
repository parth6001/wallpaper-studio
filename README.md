# Wallpaper Studio

Free, client-side wallpaper generator, with no server, external APIs, subscriptions, CDN, or tracking. Nine procedural styles, 10 color palettes, device resolutions, live preview, seeded variations, presets saved in localStorage, PNG/JPG/WebP export, responsive UI, and PWA offline caching after first visit.

## Launch

Open `index.html` in a modern browser. Download and generation work locally. For offline installation and clipboard permissions, use a local server or GitHub Pages (HTTPS):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. For free hosting, make a public GitHub repository, upload the five web files at the root, and enable **Settings → Pages → Deploy from a branch → main / (root)**. The GitHub Pages URL will be `https://YOUR_USERNAME.github.io/REPOSITORY/`. Repository must meet GitHub Pages eligibility for your account. Once loaded through HTTPS, choose *Add to Home screen* / *Install app* in Chrome on Android.

## Notes

- Graphics are procedural illustrations, not AI-generated photorealistic imagery.
- Wallpapers are not automatically applied to phone home/lock screen; download and use Android's wallpaper settings.
- Export resolutions above 32 megapixels are intentionally blocked to reduce crashes. Very high resolutions may still exceed device memory.
- Local history contains up to 12 design settings, not full exported image files. Browser clearing may erase them.
- Some browsers may not support WebP saving or PWA SVG icons. PNG is the most compatible export.
- Everything uses built-in browser APIs; no analytics, API calls, or third-party dependencies.
