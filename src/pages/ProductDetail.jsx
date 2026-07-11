import { useMemo, useState, Suspense, lazy } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import WhatsAppButton from "../components/WhatsAppButton";
import ProductCard from "../components/ProductCard";
import site from "../config/site";

const Product3DViewer = lazy(() => import("../components/Product3DViewer"));

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [viewMode, setViewMode] = useState("photos");
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const related = useMemo(
    () =>
      product
        ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
        : [],
    [product]
  );

  if (!product) return <Navigate to="/shop" replace />;

  const color = product.colors[colorIdx];
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleColorChange = (idx) => {
    setColorIdx(idx);
    setImgIdx(0);
  };

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem(product, { size, color, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const productUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappMessage = `Hi! I'm interested in the ${product.brand} ${product.name} (${color.name}). Can you tell me more? ${productUrl}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 pb-24">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode("photos")}
              className={`px-4 py-2 font-tag text-xs uppercase tracking-widest border transition-colors ${
                viewMode === "photos"
                  ? "bg-brass text-ink border-brass"
                  : "border-white/15 text-bone/70 hover:border-brass hover:text-brass"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`px-4 py-2 font-tag text-xs uppercase tracking-widest border transition-colors ${
                viewMode === "3d"
                  ? "bg-brass text-ink border-brass"
                  : "border-white/15 text-bone/70 hover:border-brass hover:text-brass"
              }`}
            >
              360° View
            </button>
          </div>

          {viewMode === "3d" ? (
            <div className="mb-4">
              <Suspense
                fallback={
                  <div className="aspect-square bg-surface flex items-center justify-center">
                    <p className="font-tag text-mute text-xs uppercase tracking-widest">
                      Loading 360° view...
                    </p>
                  </div>
                }
              >
                <Product3DViewer category={product.category} colorHex={color.hex} brand={product.brand} />
              </Suspense>
            </div>
          ) : (
            <div className="aspect-square bg-surface overflow-hidden mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={color.images[imgIdx]}
                  src={color.images[imgIdx]}
                  alt={`${product.name} — ${color.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          )}

          <div className="flex gap-3">
            {color.images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => {
                  setImgIdx(i);
                  setViewMode("photos");
                }}
                className={`w-20 h-20 shrink-0 overflow-hidden border-2 transition-colors ${
                  viewMode === "photos" && imgIdx === i ? "border-brass" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <p className="font-tag text-mute text-xs uppercase tracking-widest">{product.brand}</p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide mt-1">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-thread">
              <FiStar fill="currentColor" size={16} />
              <span className="font-body text-sm text-bone">{product.rating}</span>
            </div>
            <span className="text-mute text-sm">·</span>
            <span className="font-body text-sm text-mute">{product.category === "machines" ? "Sewing Machine" : "Accessory"}</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="font-tag text-2xl sm:text-3xl text-brass font-bold">
              {site.currencySymbol}{product.price.toLocaleString("en-IN")}
            </span>
            {discount > 0 && (
              <>
                <span className="font-tag text-mute line-through text-lg">
                  {site.currencySymbol}{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="font-tag text-thread text-sm font-bold">-{discount}%</span>
              </>
            )}
          </div>

          <p className="font-body text-mute text-sm sm:text-base leading-relaxed mt-6">
            {product.description}
          </p>

          {/* Color selection */}
          <div className="mt-8">
            <p className="font-body font-bold text-sm mb-3">
              Color: <span className="text-mute font-normal">{color.name}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => handleColorChange(i)}
                  aria-label={c.name}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    colorIdx === i ? "border-brass scale-110" : "border-white/20"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="font-body font-bold text-sm">
                Variant{sizeError && <span className="text-red-400 font-normal ml-2">— pick a variant</span>}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={`min-w-[3rem] px-3 py-2 font-tag text-sm border transition-colors ${
                    size === s
                      ? "bg-brass text-ink border-brass"
                      : "border-white/15 text-bone/80 hover:border-brass hover:text-brass"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex items-center border border-white/15 w-fit">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-3 hover:text-brass"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              <span className="font-tag w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-3 hover:text-brass"
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brass text-ink font-display tracking-wide text-lg py-3 hover:bg-brass-soft transition-colors flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <FiCheck /> ADDED TO BAG
                </>
              ) : (
                "ADD TO BAG"
              )}
            </button>
          </div>

          <div className="mt-4">
            <WhatsAppButton
              floating={false}
              message={whatsappMessage}
              label="Ask about this on WhatsApp"
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl tracking-wide mb-8">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Link to="/shop" className="font-body text-sm text-mute hover:text-brass">
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
