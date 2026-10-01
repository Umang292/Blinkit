import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Leaf,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import "./App.css";

const fallbackProducts = [
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

const categories = [
  { name: "All groceries", icon: "🛒" },
  { name: "Fresh produce", icon: "🥬" },
  { name: "Dairy & eggs", icon: "🥚" },
  { name: "Bakery", icon: "🥖" },
  { name: "Pantry", icon: "🫙" },
  { name: "Snacks", icon: "🍿" },
  { name: "Drinks", icon: "🧃" },
];

const money = (amount) => `₹${Number(amount).toFixed(0)}`;

function ProductCard({ product, quantity, onChange }) {
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100,
  );

  return (
    <article className="product-card">
      <div className="product-photo">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <span className="product-badge">{product.badge}</span>
        <span className="discount-badge">{discount}% off</span>
        <span className="product-emoji" aria-hidden="true">
          {product.emoji}
        </span>
        {quantity > 0 ? (
          <div
            className="quantity-control"
            aria-label={`${quantity} ${product.name} in bag`}
          >
            <button
              type="button"
              aria-label={`Remove one ${product.name}`}
              onClick={() => onChange(product.sku, -1)}
            >
              <Minus size={14} />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              aria-label={`Add one ${product.name}`}
              onClick={() => onChange(product.sku, 1)}
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            className="add-button"
            type="button"
            onClick={() => onChange(product.sku, 1)}
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>
      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-detail">{product.detail}</p>
        <div className="product-price">
          <strong>{money(product.price)}</strong>
          <del>{money(product.originalPrice)}</del>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [products, setProducts] = useState(fallbackProducts);
  const [catalogLive, setCatalogLive] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All groceries");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dashly-cart") || "{}");
    } catch {
      return {};
    }
  });
  const [location, setLocation] = useState(
    () => localStorage.getItem("dashly-location") || "Indiranagar, Bengaluru",
  );
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationDraft, setLocationDraft] = useState(location);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [address, setAddress] = useState("");
  const [notice, setNotice] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const sessionId = useMemo(() => {
    let id = localStorage.getItem("dashly-session");
    if (!id) {
      id = `dashly-${crypto.randomUUID()}`;
      localStorage.setItem("dashly-session", id);
    }
    return id;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Catalog unavailable");
        return response.json();
      })
      .then((data) => {
        if (data.products?.length) setProducts(data.products);
        setCatalogLive(true);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setCatalogLive(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem("dashly-cart", JSON.stringify(cart));
    fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": sessionId,
      },
      body: JSON.stringify({
        items: Object.entries(cart).map(([sku, quantity]) => ({
          sku,
          quantity,
        })),
      }),
    }).catch(() => {});
  }, [cart, sessionId]);

  const cartProducts = Object.entries(cart)
    .map(([sku, quantity]) => ({
      product: products.find((item) => item.sku === sku),
      quantity,
    }))
    .filter((item) => item.product && item.quantity > 0);
  const itemCount = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal === 0 || subtotal >= 399 ? 0 : 24;
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All groceries" || product.category === activeCategory;
    const matchesSearch =
      `${product.name} ${product.category} ${product.detail}`
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function changeQuantity(sku, amount) {
    setCart((current) => {
      const next = {
        ...current,
        [sku]: Math.max(0, (current[sku] || 0) + amount),
      };
      if (next[sku] === 0) delete next[sku];
      return next;
    });
  }

  function saveLocation(event) {
    event.preventDefault();
    const nextLocation = locationDraft.trim();
    if (!nextLocation) return;
    setLocation(nextLocation);
    localStorage.setItem("dashly-location", nextLocation);
    setLocationOpen(false);
    setNotice("Delivery spot updated");
    window.setTimeout(() => setNotice(""), 2600);
  }

  async function placeOrder(event) {
    event.preventDefault();
    setPlacingOrder(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          address: address.trim(),
          items: cartProducts.map(({ product, quantity }) => ({
            sku: product.sku,
            quantity,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Could not place your order");
      setCart({});
      setCartOpen(false);
      setCheckoutMode(false);
      setAddress("");
      setNotice(`Order ${data.orderId} is on its way`);
      window.setTimeout(() => setNotice(""), 4200);
    } catch (error) {
      setNotice(
        error.message ||
          "Could not place your order. Check that the API is running.",
      );
      window.setTimeout(() => setNotice(""), 4200);
    } finally {
      setPlacingOrder(false);
    }
  }

  const featuredProducts = products.slice(0, 5);

  return (
    <div className="site-shell">
      <div className="announcement">
        <Sparkles size={14} /> Your first delivery is on us <span>·</span> Fresh
        picks, at your door in 15 minutes
      </div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Dashly home">
          <span className="brand-mark">
            <ArrowDownRight size={24} strokeWidth={3} />
          </span>
          <span>
            dashly<span className="brand-period">.</span>
          </span>
        </a>
        <button
          className="delivery-location"
          type="button"
          onClick={() => {
            setLocationDraft(location);
            setLocationOpen(true);
          }}
        >
          <span className="location-icon">
            <MapPin size={17} />
          </span>
          <span className="location-copy">
            <small>DELIVERING TO</small>
            <strong>{location}</strong>
          </span>
          <ChevronDown size={15} />
        </button>
        <label className="search-box">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search fruit, snacks, oat milk..."
            aria-label="Search groceries"
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
          <kbd>⌘ K</kbd>
        </label>
        <div className="header-actions">
          <span className={`catalog-status ${catalogLive ? "is-live" : ""}`}>
            <span />
            {catalogLive ? "Live" : "Preview"}
          </span>
          <button
            className="bag-button"
            type="button"
            onClick={() => {
              setCartOpen(true);
              setCheckoutMode(false);
            }}
          >
            <ShoppingBag size={18} />
            <span>My bag</span>
            <span className="bag-count">{itemCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-banner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> THE GOOD STUFF, RIGHT ON TIME
            </p>
            <h1>
              A little more
              <br />
              fresh in your day.
            </h1>
            <p className="hero-description">
              Your neighbourhood's best produce, pantry staples and little
              treats. Picked with care. At your door in minutes.
            </p>
            <button
              className="hero-cta"
              type="button"
              onClick={() =>
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop the good stuff <ArrowRight size={17} />
            </button>
          </div>
          <div
            className="hero-art"
            aria-label="Fresh seasonal fruit and vegetables"
          >
            <div className="hero-sun" />
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=88"
              alt="A colorful market selection of fresh fruits and vegetables"
            />
            <div className="hero-delivery-note">
              <span>
                <Clock3 size={17} />
              </span>
              <div>
                <strong>At your door</strong>
                <small>in about 15 min</small>
              </div>
              <span className="note-check">
                <Check size={13} />
              </span>
            </div>
            <span className="hero-sticker">
              picked
              <br />
              today <Leaf size={15} />
            </span>
          </div>
          <span className="hero-grain" aria-hidden="true" />
        </section>

        <section className="category-section" aria-label="Shop by category">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">A GOOD PLACE TO START</p>
              <h2>What are you in the mood for?</h2>
            </div>
            <span className="category-hint">
              GOOD THINGS, THIS WAY <ArrowRight size={14} />
            </span>
          </div>
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-chip ${activeCategory === category.name ? "selected" : ""}`}
                type="button"
                onClick={() => {
                  setActiveCategory(category.name);
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="category-emoji">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="deals-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SMALL JOYS, BETTER PRICES</p>
              <h2>
                Today’s little wins <span className="heading-spark">✳</span>
              </h2>
            </div>
            <button
              className="text-link"
              type="button"
              onClick={() => {
                setActiveCategory("All groceries");
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See everything <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.sku}
                product={product}
                quantity={cart[product.sku] || 0}
                onChange={changeQuantity}
              />
            ))}
          </div>
        </section>

        <section className="mid-promo">
          <div className="promo-photo">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=85"
              alt="A freshly prepared meal with seasonal vegetables"
              loading="lazy"
            />
          </div>
          <div className="promo-content">
            <p className="eyebrow">THE 6:32 PM QUESTION, SOLVED</p>
            <h2>
              Tonight’s dinner
              <br />
              has a head start.
            </h2>
            <p>
              Tomatoes, greens, good olive oil. The little things that make a
              weeknight feel like a plan.
            </p>
            <button
              className="promo-link"
              type="button"
              onClick={() => {
                setActiveCategory("Fresh produce");
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop fresh produce <ArrowRight size={16} />
            </button>
          </div>
          <div className="promo-stamp">
            <span>fresh</span>
            <strong>⇢</strong>
            <span>sorted</span>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading shop-heading">
            <div>
              <p className="eyebrow">GOOD THINGS, ON YOUR WAY</p>
              <h2>
                {search
                  ? `Results for “${search}”`
                  : activeCategory === "All groceries"
                    ? "The everyday good list"
                    : activeCategory}
              </h2>
            </div>
            <span className="results-count">
              {visibleProducts.length} lovely finds
            </span>
          </div>
          <div className="shop-toolbar">
            <div className="shop-tabs">
              {["All groceries", "Fresh produce", "Pantry", "Snacks"].map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
            <span className="sort-note">
              <Sparkles size={14} /> Chosen for your everyday
            </span>
          </div>
          {visibleProducts.length ? (
            <div className="product-grid all-products-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  quantity={cart[product.sku] || 0}
                  onChange={changeQuantity}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span>🧺</span>
              <h3>Nothing on this shelf just yet.</h3>
              <p>Try another search or browse all the good things.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All groceries");
                }}
              >
                Show me everything
              </button>
            </div>
          )}
        </section>

        <section className="delivery-strip">
          <div className="delivery-strip-icon">
            <Truck size={22} />
          </div>
          <div>
            <strong>Fast is nice. Thoughtful is better.</strong>
            <p>
              Careful picks, chilled bags and a real person around the corner.
            </p>
          </div>
          <span className="delivery-strip-time">
            <Clock3 size={16} /> Usually 15 min
          </span>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="brand footer-brand">
          <span className="brand-mark">
            <ArrowDownRight size={22} strokeWidth={3} />
          </span>
          <span>
            dashly<span className="brand-period">.</span>
          </span>
        </a>
        <p>Good groceries. Good timing. Good day.</p>
        <span>© 2026 Dashly Market</span>
      </footer>

      {notice && (
        <div className="toast" role="status">
          <Check size={16} />
          {notice}
        </div>
      )}

      {locationOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLocationOpen(false);
          }}
        >
          <section
            className="location-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-title"
          >
            <button
              className="icon-button modal-close"
              type="button"
              aria-label="Close"
              onClick={() => setLocationOpen(false)}
            >
              <X size={19} />
            </button>
            <span className="modal-icon">
              <MapPin size={22} />
            </span>
            <p className="eyebrow">THE NEIGHBOURHOOD MATTERS</p>
            <h2 id="location-title">
              Where should we
              <br />
              bring the good stuff?
            </h2>
            <p className="modal-description">
              Set your delivery spot and we’ll show you what’s fresh nearby.
            </p>
            <form onSubmit={saveLocation}>
              <label htmlFor="location-input">Delivery area or address</label>
              <div className="modal-input">
                <MapPin size={17} />
                <input
                  id="location-input"
                  value={locationDraft}
                  onChange={(event) => setLocationDraft(event.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  autoFocus
                />
              </div>
              <button className="submit-button" type="submit">
                Set this as my spot <ArrowRight size={16} />
              </button>
            </form>
            <small className="modal-footnote">
              Currently delivering around Bengaluru
            </small>
          </section>
        </div>
      )}

      {cartOpen && (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">A GOOD LITTLE HAUL</p>
                <h2 id="cart-title">
                  {checkoutMode ? "One last thing" : "Your bag"}{" "}
                  <span>({itemCount})</span>
                </h2>
              </div>
              <button
                className="icon-button"
                type="button"
                aria-label="Close bag"
                onClick={() => setCartOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {cartProducts.length === 0 ? (
              <div className="empty-cart">
                <span className="empty-bag">
                  <ShoppingBag size={30} />
                </span>
                <h3>Your bag’s taking a breather.</h3>
                <p>Add something lovely and it’ll show up right here.</p>
                <button type="button" onClick={() => setCartOpen(false)}>
                  Go find the good stuff <ArrowRight size={15} />
                </button>
              </div>
            ) : checkoutMode ? (
              <form className="checkout-form" onSubmit={placeOrder}>
                <button
                  className="back-link"
                  type="button"
                  onClick={() => setCheckoutMode(false)}
                >
                  ← Back to your bag
                </button>
                <p className="checkout-caption">DELIVERING TO</p>
                <label htmlFor="checkout-address">Drop-off address</label>
                <textarea
                  id="checkout-address"
                  rows="3"
                  required
                  minLength="8"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder={`${location} · Add your building, street and flat number`}
                />
                <p className="checkout-note">
                  <Clock3 size={15} /> Your order should arrive in about 15
                  minutes.
                </p>
                <div className="checkout-summary">
                  <span>{itemCount} items</span>
                  <strong>{money(subtotal + deliveryFee)}</strong>
                </div>
                <button
                  className="checkout-button"
                  type="submit"
                  disabled={placingOrder}
                >
                  {placingOrder ? "Placing your order…" : "Place my order"}{" "}
                  <ArrowRight size={17} />
                </button>
                <small className="payment-note">
                  Demo checkout · no payment will be collected
                </small>
              </form>
            ) : (
              <>
                <div className="delivery-promise">
                  <span>
                    <Clock3 size={17} />
                  </span>
                  <div>
                    <strong>At your door in about 15 min</strong>
                    <small>To {location}</small>
                  </div>
                  <Check size={16} />
                </div>
                <div className="free-delivery">
                  <div className="free-delivery-copy">
                    <Truck size={16} />
                    <span>
                      {subtotal >= 399
                        ? "You’ve unlocked free delivery!"
                        : `Add ${money(399 - subtotal)} for free delivery`}
                    </span>
                  </div>
                  <div className="progress-track">
                    <span
                      style={{
                        width: `${Math.min((subtotal / 399) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="cart-items">
                  {cartProducts.map(({ product, quantity }) => (
                    <div className="cart-item" key={product.sku}>
                      <div className="cart-item-photo">
                        <img src={product.image} alt="" />
                        <span>{product.emoji}</span>
                      </div>
                      <div className="cart-item-copy">
                        <strong>{product.name}</strong>
                        <small>{product.detail}</small>
                        <b>{money(product.price * quantity)}</b>
                      </div>
                      <div className="quantity-control cart-quantity">
                        <button
                          type="button"
                          aria-label={`Remove one ${product.name}`}
                          onClick={() => changeQuantity(product.sku, -1)}
                        >
                          <Minus size={13} />
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Add one ${product.name}`}
                          onClick={() => changeQuantity(product.sku, 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-totals">
                  <div>
                    <span>Subtotal</span>
                    <strong>{money(subtotal)}</strong>
                  </div>
                  <div>
                    <span>Delivery</span>
                    <strong>{deliveryFee ? money(deliveryFee) : "Free"}</strong>
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{money(subtotal + deliveryFee)}</strong>
                  </div>
                </div>
                <button
                  className="checkout-button"
                  type="button"
                  onClick={() => setCheckoutMode(true)}
                >
                  Continue to checkout <ArrowRight size={17} />
                </button>
                <p className="secure-note">
                  <Check size={13} /> No surprise fees at the door
                </p>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
