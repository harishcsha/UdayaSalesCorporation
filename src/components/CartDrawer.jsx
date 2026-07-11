import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import site from "../config/site";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface z-[70] flex flex-col border-l border-white/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="font-display text-xl tracking-wide">YOUR BAG</h2>
              <button onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 && (
                <p className="text-mute font-body text-sm mt-10 text-center">
                  Your bag is empty. Time to fix that.
                </p>
              )}
              {items.map((item) => (
                <div key={item.lineId} className="flex gap-3 border-b border-white/5 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-surface2 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold text-sm truncate">{item.name}</p>
                    <p className="text-mute text-xs mt-0.5">
                      {item.color} · {item.size}
                    </p>
                    <p className="font-tag text-brass text-sm mt-1">
                      {site.currencySymbol}{item.price.toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-white/20 hover:border-brass"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="font-tag text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-white/20 hover:border-brass"
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        className="ml-auto text-mute hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-5 space-y-3">
                <div className="flex justify-between font-body text-sm text-mute">
                  <span>Subtotal</span>
                  <span className="font-tag text-bone">
                    {site.currencySymbol}{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-mute">Shipping & taxes calculated at checkout.</p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block text-center w-full bg-brass text-ink font-display tracking-wide text-lg py-3 hover:bg-brass-soft transition-colors"
                >
                  CHECKOUT
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
