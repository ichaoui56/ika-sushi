# Ika Next.js app

This project contains the Ika site as native TSX pages in the Next.js App
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

## Database foundation

The platform database uses PostgreSQL and Prisma. Copy `.env.example` to `.env`
and set `DATABASE_URL` before running Prisma commands. Set `ADMIN_NAME`,
`ADMIN_PHONE`, and a unique `ADMIN_PASSWORD` of at least 8 characters before
seeding the initial administrator.

```bash
npm run db:generate
npm run db:validate
npm run db:migrate
npm run db:seed
```

The current schema and initial migration establish users, secure sessions and
permissions, catalog data, hero slides, delivery locations and addresses,
orders with immutable item snapshots and status history, delivery assignments,
and store settings. Do not commit `.env` or production credentials. Database
migrations require a reachable PostgreSQL instance; Pinata image operations
also require server-side credentials before they can be exercised.

## Delivery push notifications

Generate a VAPID key pair with `npx web-push generate-vapid-keys` and set
`NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` in the
deployment environment. Apply the Prisma migration with `npm run db:migrate`.
Couriers can then enable notifications from `/delivery`; assignment alerts are
sent to their subscribed browsers and installed home-screen app.
# ika-sushi
