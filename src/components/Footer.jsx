import { Link } from "react-router-dom";
import { FiInstagram, FiMonitor } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import site from "../config/site";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LogoMark className="h-12 w-12 shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg text-bone">UDAY</span>
              <span className="font-tag text-[10px] uppercase tracking-[0.25em] text-brass/80 mt-1">
                Sewing Machine
              </span>
            </div>
          </div>
          <p className="text-mute text-sm font-body leading-relaxed max-w-xs">
            Usha, Singer, Brother & Juki machines plus every spare part in between. Based in
            Gangavathi, Koppal District, Karnataka — serving home tailors and boutiques across
            the district.
          </p>
          <div className="flex gap-4 mt-5">
            {site.instagram && (
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-brass transition-colors">
                <FiInstagram size={20} />
              </a>
            )}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mute hover:text-brass transition-colors"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-tag text-xs uppercase tracking-widest text-brass mb-4">Shop</h4>
          <ul className="space-y-2 font-body text-sm text-mute">
            <li><Link to="/shop?category=machines" className="hover:text-bone">Sewing Machines</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-bone">Accessories</Link></li>
            <li><Link to="/shop" className="hover:text-bone">All Products</Link></li>
            <li><Link to="/about" className="hover:text-bone">About Us</Link></li>
            <li><Link to="/visit" className="hover:text-bone">Visit the Store</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-tag text-xs uppercase tracking-widest text-brass mb-4">Find Us</h4>
          <p className="font-body text-sm text-mute leading-relaxed">
            {site.address.line1}<br />
            {site.address.line2}<br />
            {site.address.city}<br />
            {site.address.landmark}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center text-mute text-xs font-body">
        <span>© {new Date().getFullYear()} Udaya Sales Corporation. All rights reserved.</span>
        <Link to="/terms" className="hover:text-brass underline underline-offset-2">Terms & Conditions</Link>
        <Link to="https://harishcsha.github.io/HarishPortfolio/" className="flex items-center gap-1.5 text-bone font-semibold hover:text-cyan">
            <FiMonitor size={14} className="text-cyan" />
            Website designed by Harish C Jingade.
        </Link>
      </div>
    </footer>
  );
}
