# Foodu Next.js app

This project contains the Foodu site as native TSX pages in the Next.js App
Router. The template styles, images, and legacy interaction scripts are
retained to preserve the original design and behavior.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The site pages are available at routes such as
`/`, `/about-us`, `/food-menu`, and `/shop`. Previous `.html` URLs redirect to
their matching App Router routes.

Each page lives in its route's `app/<route>/page.tsx` file. Static assets are
served from `public/`.

## Production

```bash
npm run build
npm start
```
# ika-sushi
