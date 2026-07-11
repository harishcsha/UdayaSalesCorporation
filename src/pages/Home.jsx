import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiArrowRight,
  FiArrowDown,
  FiCheckCircle,
  FiCreditCard,
  FiTruck,
  FiTool,
} from "react-icons/fi";
import HeroScene from "../components/HeroScene";
import StitchBackground from "../components/StitchBackground";
import ProductCard from "../components/ProductCard";
import MapSection from "../components/MapSection";
import products from "../data/products";
import site from "../config/site";

const trustPoints = [
  { icon: FiCheckCircle, label: "Genuine Machines Only", note: "Authorised Usha, Singer, Brother & Juki stock" },
  { icon: FiCreditCard, label: "EMI Available", note: "Take a machine home, pay in parts" },
  { icon: FiTruck, label: "Free Local Delivery", note: "Anywhere within Gangavathi town" },
  { icon: FiTool, label: "After-Sales Service", note: "We service what we sell — for years" },
];

const brandStrip = ["USHA", "SINGER", "BROTHER", "JUKI", "UDAYA"];

export default function Home() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -120]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroSceneY = useTransform(heroProgress, [0, 1], [0, -40]);
  const heroSceneScale = useTransform(heroProgress, [0, 1], [1, 0.9]);

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const storyImgY = useTransform(storyProgress, [0, 1], ["-12%", "12%"]);
  const storyImg2Y = useTransform(storyProgress, [0, 1], ["8%", "-8%"]);

  const bestSellers = products.filter((p) => p.category === "machines").slice(0, 2);
  const newDrops = products.filter((p) => p.isNew).slice(0, 4);
  const machinesPreview = products.filter((p) => p.category === "machines")[0];
  const accessoriesPreview = products.filter((p) => p.category === "accessories")[0];

  return (
    <>
      {/* HERO — full-bleed, scroll-parallax, machine as the single centred anchor */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0"
        >
          <StitchBackground className="opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(200,112,62,0.16),transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-ink" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 text-center"
        >
          <p className="font-tag text-brass text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            Gangavathi · Koppal District
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-wide">
            EVERY STITCH<br /><span className="text-outline">STARTS HERE.</span>
          </h1>
          <p className="font-body text-mute mt-6 max-w-xl mx-auto text-base sm:text-lg">
            Usha, Singer, Brother & Juki machines — sold, set up and serviced by Udaya Sales
            Corporation. Tell us the work, we'll match the machine.
          </p>
        </motion.div>

        <motion.div
          style={{ y: heroSceneY, scale: heroSceneScale }}
          className="absolute inset-x-0 bottom-0 sm:bottom-[-4%] flex justify-center z-0"
        >
          <div className="w-[80vw] max-w-[620px]">
            <HeroScene />
          </div>
        </motion.div>

        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 z-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brass text-ink font-display text-base sm:text-lg tracking-wide px-7 py-3.5 hover:bg-brass-soft transition-colors rounded-full"
          >
            SHOP THE STORE <FiArrowRight />
          </Link>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-mute/60 mt-2"
          >
            <FiArrowDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-surface border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.map(({ icon: Icon, label, note }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-brass/10 border border-brass/30 flex items-center justify-center text-brass">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-body font-bold text-sm text-bone">{label}</p>
                <p className="font-body text-xs text-mute mt-0.5">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS — editorial alternating layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <p className="font-tag text-brass text-xs uppercase tracking-widest mb-2 text-center">
          Most Trusted
        </p>
        <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-center mb-12">
          BEST-SELLING MACHINES
        </h2>
        <div className="flex flex-col gap-16 sm:gap-24">
          {bestSellers.map((p, i) => (
            <div
              key={p.id}
              className={`grid sm:grid-cols-2 gap-8 sm:gap-12 items-center ${
                i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]"
              >
                <img
                  src={p.colors[0].images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="font-tag text-brass text-xs uppercase tracking-widest mb-2">{p.brand}</p>
                <h3 className="font-display text-3xl sm:text-4xl tracking-wide mb-4">{p.name}</h3>
                <p className="font-body text-mute mb-6 max-w-md">{p.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-tag text-2xl font-bold text-bone">
                    {site.currencySymbol}{p.price.toLocaleString("en-IN")}
                  </span>
                  <span className="font-tag text-sm text-mute line-through">
                    {site.currencySymbol}{p.mrp.toLocaleString("en-IN")}
                  </span>
                </div>
                <Link
                  to={`/product/${p.id}`}
                  className="inline-flex items-center gap-2 border-2 border-brass text-brass font-display tracking-wide px-6 py-3 hover:bg-brass hover:text-ink transition-colors rounded-full"
                >
                  VIEW MACHINE <FiArrowRight />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { data: machinesPreview, label: "Sewing Machines", to: "/shop?category=machines" },
            { data: accessoriesPreview, label: "Accessories & Parts", to: "/shop?category=accessories" },
          ].map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src={cat.data.colors[0].images[0]}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                <h3 className="font-display text-2xl sm:text-3xl text-bone tracking-wide">{cat.label}</h3>
                <span className="font-tag text-xs uppercase tracking-widest text-brass flex items-center gap-2 shrink-0">
                  Browse <FiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY / PARALLAX BAND */}
      <section ref={storyRef} className="relative h-[70vh] min-h-[440px] overflow-hidden">
        <motion.div style={{ y: storyImgY }} className="absolute inset-0 scale-110">
          <img
            src={bestSellers[0]?.colors[0].images[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/70" />
        <motion.div
          style={{ y: storyImg2Y }}
          className="relative z-10 h-full max-w-3xl mx-auto px-6 flex flex-col items-center justify-center text-center"
        >
          <p className="font-tag text-brass text-xs uppercase tracking-widest mb-3">Since Gangavathi</p>
          <h2 className="font-display text-3xl sm:text-5xl tracking-wide leading-tight mb-4">
            BUILT ON TRUST,<br />ONE MACHINE AT A TIME.
          </h2>
          <p className="font-body text-bone/80 max-w-lg mb-6">
            Every machine we sell, we service ourselves. That's the whole story.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-bone text-ink font-display tracking-wide px-6 py-3 hover:bg-brass transition-colors rounded-full"
          >
            OUR STORY <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* BRAND STRIP */}
      <section className="bg-surface border-y border-white/10 py-10">
        <p className="font-tag text-mute text-xs uppercase tracking-widest text-center mb-6">
          Brands We Stock
        </p>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {[...brandStrip, ...brandStrip, ...brandStrip].map((b, i) => (
              <span
                key={i}
                className="font-display text-2xl sm:text-3xl text-mute/40 tracking-widest whitespace-nowrap"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div className="min-w-0 max-w-full">
            <p className="font-tag text-brass text-xs uppercase tracking-widest mb-2">Fresh Into Stock</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide break-words">NEW ARRIVALS</h2>
          </div>
          <Link
            to="/shop"
            className="font-body font-bold text-sm text-bone/80 hover:text-brass flex items-center gap-1"
          >
            View All <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newDrops.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="rounded-3xl bg-brass text-ink p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="min-w-0 max-w-full">
            <h3 className="font-display text-2xl sm:text-3xl tracking-wide break-words">NOT SURE WHICH MACHINE FITS?</h3>
            <p className="font-body font-medium mt-1">Message us on WhatsApp — we'll match it to the work you do.</p>
          </div>
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-brass font-display tracking-wide px-8 py-4 rounded-full hover:bg-surface transition-colors shrink-0"
          >
            CHAT NOW
          </a>
        </div>
      </section>

      <MapSection />
    </>
  );
}
