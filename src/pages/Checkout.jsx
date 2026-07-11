import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiLock, FiShare2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import site from "../config/site";

const SHIPPING_FLAT = 99;
const FREE_SHIP_THRESHOLD = 999;

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [placing, setPlacing] = useState(false);
  const [sharingPhotos, setSharingPhotos] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [error, setError] = useState("");

  // Feature-detect the Web Share API's file-sharing support (mobile browsers
  // mostly; desktop Chrome/Firefox generally don't support sharing files).
  useEffect(() => {
    if (navigator.share && navigator.canShare) {
      const probe = new File(["probe"], "probe.txt", { type: "text/plain" });
      setCanShareFiles(navigator.canShare({ files: [probe] }));
    }
  }, []);

  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const formValid = form.name && form.phone.length >= 10 && form.address && form.pincode.length === 6;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const orderSummaryText = () => {
    const lines = items.map(
      (i) => `• ${i.name} (${i.color}, ${i.size}) x${i.quantity} — ${site.currencySymbol}${(i.price * i.quantity).toLocaleString("en-IN")}`
    );
    const imageUrls = items.map((i) => i.image);
    return [
      `New order from ${form.name || "a customer"}:`,
      ...lines,
      `Subtotal: ${site.currencySymbol}${subtotal.toLocaleString("en-IN")}`,
      `Shipping: ${shipping === 0 ? "Free" : site.currencySymbol + shipping}`,
      `Total: ${site.currencySymbol}${total.toLocaleString("en-IN")}`,
      form.phone ? `Phone: ${form.phone}` : "",
      form.address ? `Address: ${form.address}, ${form.pincode}` : "",
      imageUrls.length ? `Images: [${imageUrls.join(", ")}]` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsAppOrder = () => {
    if (!formValid) {
      setError("Fill in your name, phone, address & pincode first — the shop needs it to ship your order.");
      return;
    }
    const text = encodeURIComponent(orderSummaryText());
    window.open(`https://wa.me/${site.whatsappNumber}?text=${text}`, "_blank");
  };

  // Attaches the actual product photos as files via the device's native share
  // sheet, so they show up as real inline images in WhatsApp (or wherever the
  // customer shares to) rather than just a link preview. The customer picks
  // WhatsApp and the shop's contact themselves in the share sheet — this API
  // has no way to target a specific number the way wa.me links do.
  const handleShareWithPhotos = async () => {
    if (!formValid) {
      setError("Fill in your name, phone, address & pincode first.");
      return;
    }
    setError("");
    setSharingPhotos(true);
    try {
      const files = (
        await Promise.all(
          items.map(async (item, idx) => {
            try {
              const res = await fetch(item.image);
              const blob = await res.blob();
              const ext = blob.type.split("/")[1] || "jpg";
              return new File([blob], `${item.name.replace(/\s+/g, "-")}-${idx}.${ext}`, {
                type: blob.type || "image/jpeg",
              });
            } catch {
              return null; // skip any image that fails to fetch (e.g. CORS)
            }
          })
        )
      ).filter(Boolean);

      const shareData = {
        title: `${site.name} — New Order`,
        text: orderSummaryText(),
        files,
      };

      if (files.length && navigator.canShare && navigator.canShare({ files })) {
        await navigator.share(shareData);
      } else {
        // Fall back to a text-only share if the photos couldn't be attached
        await navigator.share({ title: shareData.title, text: shareData.text });
        setError("Photos couldn't be attached on this browser, so only order details were shared.");
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        setError("Sharing didn't go through. Try the WhatsApp button instead.");
      }
    } finally {
      setSharingPhotos(false);
    }
  };

  const handleRazorpayPay = async () => {
    if (!formValid) {
      setError("Fill in your name, phone, address & pincode first.");
      return;
    }
    setError("");
    setPlacing(true);
    const loaded = await loadRazorpayScript();
    setPlacing(false);
    if (!loaded) {
      setError("Couldn't load the payment gateway. Check your connection and try again.");
      return;
    }

    const options = {
      key: site.razorpayKeyId, // ⚠️ replace with your real Razorpay Key ID in src/config/site.js
      amount: total * 100, // Razorpay expects the amount in paise
      currency: site.currency,
      name: site.name,
      description: `Order — ${items.length} item${items.length > 1 ? "s" : ""}`,
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      notes: {
        address: `${form.address}, ${form.pincode}`,
      },
      theme: { color: "#C8703E" },
      handler: function () {
        clearCart();
        navigate("/order-confirmed");
      },
      modal: {
        ondismiss: function () {
          setError("Payment was cancelled.");
        },
      },
    };

    // ⚠️ This will only succeed once a real Razorpay Key ID is set in
    // src/config/site.js — with the placeholder key the checkout modal
    // will open but the payment step itself needs a live/test account.
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function () {
      setError("Payment failed. You can try again, or place the order via WhatsApp instead.");
    });
    rzp.open();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-24 text-center">
        <h1 className="font-display text-3xl tracking-wide mb-4">YOUR BAG IS EMPTY</h1>
        <p className="text-mute font-body mb-8">Add something you like before checking out.</p>
        <Link to="/shop" className="bg-brass text-ink font-display px-8 py-3 tracking-wide">
          BROWSE THE SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 pb-24">
      <h1 className="font-display text-4xl tracking-wide mb-10">CHECKOUT</h1>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Shipping form */}
        <div className="lg:col-span-3">
          <h2 className="font-tag text-brass text-xs uppercase tracking-widest mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <div>
              <label className="font-body text-sm text-mute block mb-1.5">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-surface border border-white/15 px-4 py-3 font-body focus:border-brass"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-body text-sm text-mute block mb-1.5">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                className="w-full bg-surface border border-white/15 px-4 py-3 font-body focus:border-brass"
                placeholder="10-digit mobile number"
              />
            </div>
            <div>
              <label className="font-body text-sm text-mute block mb-1.5">Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full bg-surface border border-white/15 px-4 py-3 font-body focus:border-brass resize-none"
                placeholder="House / street / area / city"
              />
            </div>
            <div>
              <label className="font-body text-sm text-mute block mb-1.5">Pincode</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                maxLength={6}
                className="w-full sm:w-48 bg-surface border border-white/15 px-4 py-3 font-body focus:border-brass"
                placeholder="560001"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 font-body text-sm mt-4 border border-red-400/30 bg-red-400/5 px-4 py-3">
              {error}
            </p>
          )}

          <div className="mt-8 space-y-3">
            <button
              onClick={handleRazorpayPay}
              disabled={placing}
              className="w-full flex items-center justify-center gap-2 bg-brass text-ink font-display text-lg tracking-wide py-4 hover:bg-brass-soft transition-colors disabled:opacity-60"
            >
              <FiLock size={16} />
              {placing ? "LOADING..." : "PAY WITH UPI / NETBANKING"}
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-ink font-body font-bold py-4 hover:bg-[#1ebe5b] transition-colors"
            >
              <FaWhatsapp size={20} /> PLACE ORDER VIA WHATSAPP
            </button>
            {canShareFiles && (
              <button
                onClick={handleShareWithPhotos}
                disabled={sharingPhotos}
                className="w-full flex items-center justify-center gap-2 border-2 border-white/20 text-bone font-body font-bold py-4 hover:border-brass hover:text-brass transition-colors disabled:opacity-60"
              >
                <FiShare2 size={18} />
                {sharingPhotos ? "PREPARING PHOTOS..." : "SHARE ORDER WITH PHOTOS"}
              </button>
            )}
            <p className="text-xs text-mute font-body text-center pt-1">
              Card, UPI & netbanking are processed securely by Razorpay. The WhatsApp button opens
              a chat with us directly and previews your item photos as links
              {canShareFiles && " — or use \"Share with Photos\" to send the actual images and pick WhatsApp yourself"}.
            </p>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <h2 className="font-tag text-brass text-xs uppercase tracking-widest mb-4">Order Summary</h2>
          <div className="bg-surface border border-white/10 p-5 space-y-4">
            {items.map((item) => (
              <div key={item.lineId} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-surface2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-bold text-sm truncate">{item.name}</p>
                  <p className="text-mute text-xs">{item.color} · {item.size} · x{item.quantity}</p>
                </div>
                <p className="font-tag text-sm shrink-0">
                  {site.currencySymbol}{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between font-body text-sm text-mute">
                <span>Subtotal</span>
                <span className="font-tag text-bone">{site.currencySymbol}{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-mute">
                <span>Shipping</span>
                <span className="font-tag text-bone">{shipping === 0 ? "Free" : `${site.currencySymbol}${shipping}`}</span>
              </div>
              <div className="flex justify-between font-body font-bold text-base pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="font-tag text-brass">{site.currencySymbol}{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
