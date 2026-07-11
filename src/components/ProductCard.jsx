import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import site from "../config/site";

export default function ProductCard({ product, index = 0 }) {
  const primary = product.colors[0];
  const secondaryImg = primary.images[1] || primary.images[0];
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block rounded-2xl border border-white/10 bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-brass/60 hover:shadow-[0_18px_40px_-18px_rgba(200,112,62,0.45)]"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={primary.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            loading="lazy"
          />
          <img
            src={secondaryImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-thread text-bone text-[10px] font-tag font-bold px-2.5 py-1 rounded-full">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-brass text-ink text-[10px] font-tag font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <div className="p-4 flex items-start justify-between gap-2 border-t border-white/5">
          <div className="min-w-0">
            <p className="text-brass/80 text-[10px] font-tag uppercase tracking-wider">{product.brand}</p>
            <h3 className="font-body font-bold text-sm sm:text-base text-bone truncate group-hover:text-brass transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-tag text-sm font-bold leading-none text-bone">
              {site.currencySymbol}{product.price.toLocaleString("en-IN")}
            </p>
            {discount > 0 && (
              <p className="font-tag text-[10px] text-mute line-through leading-none mt-1">
                {site.currencySymbol}{product.mrp.toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
