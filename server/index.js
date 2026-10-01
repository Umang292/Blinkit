import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const memoryCarts = new Map();
let databaseReady = false;

const seedProducts = [
  {
    sku: "bananas",
    name: "Organic bananas",
    detail: "5–6 pieces · approx. 500 g",
    category: "Fresh produce",
    price: 42,
    originalPrice: 58,
    emoji: "🍌",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=85",
    badge: "FARM FRESH",
  },
  {
    sku: "avocados",
    name: "Hass avocados",
    detail: "2 pieces · ready to eat",
    category: "Fresh produce",
    price: 119,
    originalPrice: 149,
    emoji: "🥑",
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=85",
    badge: "RIPE & READY",
  },
  {
    sku: "strawberries",
    name: "Sweet strawberries",
    detail: "1 punnet · 250 g",
    category: "Fresh produce",
    price: 89,
    originalPrice: 120,
    emoji: "🍓",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=85",
    badge: "FARM FRESH",
  },
  {
    sku: "milk",
    name: "Whole milk",
    detail: "Fresh dairy · 1 litre",
    category: "Dairy & eggs",
    price: 68,
    originalPrice: 74,
    emoji: "🥛",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85",
    badge: "DELIVERED COLD",
  },
  {
    sku: "sourdough",
    name: "Country sourdough",
    detail: "Slow fermented · 400 g",
    category: "Bakery",
    price: 125,
    originalPrice: 160,
    emoji: "🍞",
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=700&q=85",
    badge: "BAKED TODAY",
  },
  {
    sku: "eggs",
    name: "Free-range eggs",
    detail: "6 eggs · Grade A",
    category: "Dairy & eggs",
    price: 82,
    originalPrice: 99,
    emoji: "🥚",
    image:
      "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=700&q=85",
    badge: "FREE RANGE",
  },
  {
    sku: "olive-oil",
    name: "Extra virgin olive oil",
    detail: "Cold pressed · 500 ml",
    category: "Pantry",
    price: 349,
    originalPrice: 425,
    emoji: "🫒",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85",
    badge: "PANTRY PICK",
  },
  {
    sku: "pasta",
    name: "Bronze-cut fusilli",
    detail: "Italian durum wheat · 500 g",
    category: "Pantry",
    price: 99,
    originalPrice: 125,
    emoji: "🍝",
    image:
      "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=85",
    badge: "PANTRY PICK",
  },
  {
    sku: "tomatoes",
    name: "Heirloom tomatoes",
    detail: "Locally grown · 400 g",
    category: "Fresh produce",
    price: 76,
    originalPrice: 95,
    emoji: "🍅",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85",
    badge: "LOCAL GROWER",
  },
  {
    sku: "granola",
    name: "Honey oat granola",
    detail: "Small-batch · 350 g",
    category: "Snacks",
    price: 189,
    originalPrice: 230,
    emoji: "🥣",
    image:
      "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=700&q=85",
    badge: "SMALL BATCH",
  },
  {
    sku: "orange-juice",
    name: "Fresh orange juice",
    detail: "No added sugar · 750 ml",
    category: "Drinks",
    price: 115,
    originalPrice: 145,
    emoji: "🍊",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85",
    badge: "PRESSED TODAY",
  },
  {
    sku: "chips",
    name: "Sea salt kettle chips",
    detail: "Ridged & crunchy · 120 g",
    category: "Snacks",
    price: 65,
    originalPrice: 85,
    emoji: "🥔",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=85",
    badge: "SNACK TIME",
  },
];

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  detail: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true, min: 0 },
  emoji: String,
  image: String,
  badge: String,
});
const cartSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    items: [{ sku: String, quantity: { type: Number, min: 1 } }],
  },
  { timestamps: true },
);
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    sessionId: { type: String, required: true },
    items: [{ sku: String, name: String, quantity: Number, price: Number }],
    address: { type: String, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

app.use(cors());
app.use(express.json({ limit: "32kb" }));

async function getCatalog() {
  return databaseReady ? Product.find().sort({ name: 1 }).lean() : seedProducts;
}

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: databaseReady ? "mongodb" : "memory",
  });
});

app.get("/api/products", async (request, response, next) => {
  try {
    const { q = "", category = "" } = request.query;
    const catalog = await getCatalog();
    const normalizedQuery = String(q).trim().toLowerCase();
    const products = catalog.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.detail} ${product.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory =
        !category ||
        product.category.toLowerCase() === String(category).toLowerCase();
      return matchesQuery && matchesCategory;
    });
    response.json({ products, count: products.length });
  } catch (error) {
    next(error);
  }
});

app.put("/api/cart", async (request, response, next) => {
  try {
    const sessionId = request.get("x-session-id");
    if (!sessionId)
      return response
        .status(400)
        .json({ message: "A cart session is required." });
    const catalog = await getCatalog();
    const availableSkus = new Set(catalog.map((product) => product.sku));
    const items = Array.isArray(request.body.items)
      ? request.body.items
          .filter(
            (item) =>
              availableSkus.has(item.sku) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0,
          )
          .map(({ sku, quantity }) => ({ sku, quantity }))
      : [];

    if (databaseReady) {
      await Cart.findOneAndUpdate(
        { sessionId },
        { items },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    } else {
      memoryCarts.set(sessionId, items);
    }
    response.json({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/orders", async (request, response, next) => {
  try {
    const sessionId = request.get("x-session-id");
    const address = String(request.body.address || "").trim();
    const requestedItems = Array.isArray(request.body.items)
      ? request.body.items
      : [];
    if (!sessionId)
      return response
        .status(400)
        .json({ message: "A cart session is required." });
    if (address.length < 8)
      return response
        .status(400)
        .json({ message: "Please enter a full delivery address." });

    const catalog = await getCatalog();
    const productBySku = new Map(
      catalog.map((product) => [product.sku, product]),
    );
    const items = requestedItems.map(({ sku, quantity }) => {
      const product = productBySku.get(sku);
      if (
        !product ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 50
      )
        return null;
      return {
        sku: product.sku,
        name: product.name,
        quantity,
        price: product.price,
      };
    });
    if (!items.length || items.some((item) => !item))
      return response
        .status(400)
        .json({ message: "Your bag contains an unavailable item." });

    const orderId = `DS-${randomUUID().slice(0, 8).toUpperCase()}`;
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const total = subtotal + (subtotal < 399 ? 24 : 0);
    if (databaseReady) {
      await Order.create({ orderId, sessionId, items, address, total });
      await Cart.findOneAndUpdate(
        { sessionId },
        { items: [] },
        { upsert: true },
      );
    }
    memoryCarts.delete(sessionId);
    response
      .status(201)
      .json({ orderId, total, message: "Order placed successfully." });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response
    .status(500)
    .json({ message: "Something went wrong. Please try again." });
});

async function startServer() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      databaseReady = true;
      if ((await Product.countDocuments()) === 0)
        await Product.insertMany(seedProducts);
      console.log("MongoDB connected; catalog and orders are persistent.");
    } catch (error) {
      console.error(
        `MongoDB unavailable; using the demo catalog in memory. ${error.message}`,
      );
    }
  } else {
    console.log("MONGO_URI not set; using the demo catalog in memory.");
  }

  app.listen(port, () =>
    console.log(`Dashly API listening on http://localhost:${port}`),
  );
}

startServer();
