# Udaya Sales Corporation

A full e-commerce storefront for sewing machines & accessories (Usha, Singer, Brother, Juki,
and your own house brand), built with React, Tailwind CSS, React Router, Framer Motion and
a react-three-fiber 3D sewing machine hero.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). It's fully responsive —
resize the browser or open it on your phone to see the mobile layout.

To build for production:

```bash
npm run build
```

This outputs a static site to `dist/` that you can deploy anywhere (Vercel, Netlify,
Cloudflare Pages, your own hosting — it's just static files).

## First things to edit

### 1. Shop details — `src/config/site.js`

This one file drives the WhatsApp button, the footer, and the map:

- `whatsappNumber` — the real WhatsApp number for the shop, in international format
  (e.g. `"+919876543210"`).
- `address` — the shop's real address in Gangavathi, shown in the footer and the Visit page.
- `mapEmbedUrl` — currently a generic map centred on Gangavathi town. Go to Google Maps,
  search your exact shop location, click **Share -> Embed a map**, and copy the `src="..."`
  URL from the iframe code it gives you. Paste it here for a pin on your exact doorstep.
- `mapDirectionsUrl` — the shop's Google Maps share link (used for the "Get Directions" button).
- `instagram` — leave blank to hide the Instagram icon, or paste your profile URL to show it.
- `razorpayKeyId` — see the payments section below.

### 2. Products — `src/data/products.js`

Every machine and accessory lives in this one file as a plain JS array. Each product has:

- `category` — `"machines"` or `"accessories"` (drives the shop filters and category tiles)
- `brand`, `name`, `price`, `mrp` (used to show a strikethrough + discount %)
- `sizes` — used here as a variant list, e.g. `["Standard", "With Cabinet Table"]`
- `colors` — each entry has its own `hex` (for the swatch) and its own `images` array

To add a product, copy an existing object and edit it. The images currently point to
Unsplash stock photos so the site works out of the box — swap them for your own product
photography by replacing the URLs with paths to your own images (drop images in
`src/assets/products/` and import them, or host them anywhere and paste the URL).

### 3. Logo — `src/components/LogoMark.jsx`

There's no photo logo wired in yet — the navbar, footer, and favicon currently use a drawn
needle-and-thread emblem (`LogoMark.jsx`) so the site works without any brand artwork. Once
you have a real logo, replace the `<LogoMark />` usages in `Navbar.jsx` and `Footer.jsx` with
an `<img>` tag pointing at your file, and swap `public/favicon.svg` for your icon.

## Payments — UPI & netbanking via Razorpay

The checkout page opens Razorpay's hosted checkout, which natively supports UPI, netbanking,
cards, and wallets. To take real payments:

1. Create an account at dashboard.razorpay.com and complete KYC (needed before you can
   accept live payments).
2. Copy your **Key ID** (starts with `rzp_test_...` or `rzp_live_...`) into
   `razorpayKeyId` in `src/config/site.js`.
3. **Important:** the Key ID is safe to put in frontend code, but the **Key Secret** is not —
   never add it here. For production use, you'll eventually want a tiny backend (even a single
   serverless function) to create orders server-side and verify payment signatures — Razorpay's
   own docs walk through this ("Standard Checkout" integration). The current setup works for
   testing and low-volume use, but a signature-verified backend is the recommended path once
   you're processing real orders at scale.

Until Razorpay is fully set up, customers can still complete orders through the
**"Place Order via WhatsApp"** button on checkout — it sends you their cart, address, and
phone number as a formatted WhatsApp message.

## What's inside

- `src/pages/Home.jsx` — parallax hero (mouse-tilt, animated 3D sewing machine), brand marquee, category split, new arrivals
- `src/components/HeroScene.jsx` — the react-three-fiber sewing machine with an animated bobbing needle and spinning handwheel
- `src/components/Product3DViewer.jsx` — 360° product view: a full sewing machine model, or a thread-spool/bobbin model for accessories
- `src/pages/Shop.jsx` — the full catalogue with brand/category filters and sorting
- `src/pages/ProductDetail.jsx` — image gallery, color/variant picker, add to cart, WhatsApp inquiry
- `src/pages/Checkout.jsx` — shipping form + Razorpay + WhatsApp order options
- `src/context/CartContext.jsx` — cart state, persisted to the browser's local storage
- `src/components/MapSection.jsx` — embedded Google Map + directions button

## Notes

- Cart contents persist in the browser (localStorage) so a refresh doesn't wipe the bag.
- Colors/fonts/spacing are all controlled through `tailwind.config.js` if you want to
  retheme later — the brand palette (walnut ink, brass, deep thread red) lives there.
