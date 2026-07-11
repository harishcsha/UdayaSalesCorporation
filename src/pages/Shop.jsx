import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products, { brands, categories } from "../data/products";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";

  const [category, setCategory] = useState(urlCategory);
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  const handleCategory = (key) => {
    setCategory(key);
    setSearchParams(key === "all" ? {} : { category: key });
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => (category === "all" ? true : p.category === category));
    if (brand !== "All") list = list.filter((p) => p.brand === brand);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, brand, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 pb-24">
      <div className="mb-10">
        <p className="font-tag text-brass text-xs uppercase tracking-widest mb-2">The Full Catalogue</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide">SHOP THE STORE</h1>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => handleCategory(c.key)}
            className={`px-4 py-2 font-body text-sm font-bold border transition-colors ${
              category === c.key
                ? "bg-brass text-ink border-brass"
                : "border-white/15 text-bone/70 hover:border-brass hover:text-brass"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Brand + sort filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-10 pb-6 border-b border-white/10">
        <div className="flex gap-2 flex-wrap">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`px-3 py-1.5 font-tag text-xs uppercase tracking-wide border transition-colors ${
                brand === b
                  ? "border-thread text-thread"
                  : "border-white/10 text-mute hover:border-white/30 hover:text-bone"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-surface border border-white/15 text-bone font-body text-sm px-3 py-2 focus:border-brass"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-mute font-body text-center py-24">
          Nothing here yet — try a different filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
