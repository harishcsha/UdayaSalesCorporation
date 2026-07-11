import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import site from "../config/site";

export default function OrderConfirmed() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-40 pb-24 text-center">
      <FiCheckCircle className="text-brass mx-auto mb-6" size={56} />
      <h1 className="font-display text-4xl tracking-wide mb-4">ORDER PLACED</h1>
      <p className="font-body text-mute mb-10">
        Payment received — we're already getting your order boxed up. A confirmation will follow
        on WhatsApp shortly. Questions in the meantime? We're one message away.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/shop" className="bg-brass text-ink font-display px-8 py-3 tracking-wide">
          KEEP SHOPPING
        </Link>
        <a
          href={`https://wa.me/${site.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-white/20 text-bone font-display px-8 py-3 tracking-wide hover:border-brass hover:text-brass transition-colors"
        >
          MESSAGE THE SHOP
        </a>
      </div>
    </div>
  );
}
