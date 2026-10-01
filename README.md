# Dashly Market

A responsive quick-commerce storefront built with React, Vite, Express, and MongoDB/Mongoose.

## Run locally

```sh
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). Vite proxies API requests to Express on port 5000. Without MongoDB, the API uses a seeded demo catalog and in-memory carts/orders.

For persistent data, copy `.env.example` to `.env`, set `MONGO_URI`, and restart the API. On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Included flows

- Catalog browsing, category filtering, and product search
- Quantity controls and a cart saved in the browser
- Address capture and demo order placement
- Mongoose product, cart, and order models with catalog seeding
- API health check at `/api/health`

Payment processing, user accounts, and live delivery estimates are not connected.
