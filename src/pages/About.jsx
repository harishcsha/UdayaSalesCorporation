import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiTool, FiUsers, FiMapPin, FiAward } from "react-icons/fi";
import MapSection from "../components/MapSection";
import products from "../data/products";

const values = [
  {
    icon: FiTool,
    title: "We Service What We Sell",
    body: "Every machine leaving our store is set up in front of you, and our workbench stays open for it long after you've walked out.",
  },
  {
    icon: FiUsers,
    title: "Advice Before The Sale",
    body: "Tell us what you're stitching — daily wear, uniforms, quilting, embroidery — and we'll steer you to the machine built for it, not the most expensive one.",
  },
  {
    icon: FiMapPin,
    title: "Rooted In Gangavathi",
    body: "We're a local shop first. Parts, repairs and advice are a walk-in away, not a courier parcel away.",
  },
  {
    icon: FiAward,
    title: "Genuine Stock Only",
    body: "Usha, Singer, Brother and Juki — every machine we sell is authorised stock with a proper warranty behind it.",
  },
];

const stats = [
  { n: "1000+", l: "Machines Sold" },
  { n: "4", l: "Brands Stocked" },
  { n: "7-Day", l: "Service Turnaround" },
  { n: "Koppal", l: "District Coverage" },
];

export default function About() {
  const heroImg = products[0]?.colors[0].images[0];

  return (
    <>
      <section className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative z-10 h-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <p className="font-tag text-brass text-xs uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display text-4xl sm:text-6xl tracking-wide leading-tight">
            A SHOP BUILT ON<br />STITCHES, NOT SLOGANS.
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24 text-center">
        <p className="font-body text-mute text-base sm:text-lg leading-relaxed">
          Udaya Sales Corporation started as a small counter in Gangavathi selling spare parts to
          local tailors. Over time, the same tailors started asking for machines they could
          trust — and for someone nearby who'd still pick up the phone after the sale was done.
          That's still the whole business today: genuine machines from Usha, Singer, Brother and
          Juki, sold by people who can also fix them, in a town where a broken machine means a
          missed order.
        </p>
      </section>

      <section className="bg-surface border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-3xl sm:text-4xl text-brass">{s.n}</p>
              <p className="font-tag text-xs uppercase tracking-widest text-mute mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-center mb-12">
          WHAT WE STAND FOR
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
            >
              <div className="w-11 h-11 rounded-full bg-brass/10 border border-brass/30 flex items-center justify-center text-brass mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-xl tracking-wide mb-2">{title}</h3>
              <p className="font-body text-mute text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="rounded-3xl bg-brass text-ink p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="min-w-0 max-w-full">
            <h3 className="font-display text-2xl sm:text-3xl tracking-wide break-words">
              COME MEET US IN PERSON
            </h3>
            <p className="font-body font-medium mt-1">Test a machine on the counter before you take it home.</p>
          </div>
          <Link
            to="/visit"
            className="bg-ink text-brass font-display tracking-wide px-8 py-4 rounded-full hover:bg-surface transition-colors shrink-0 inline-flex items-center gap-2"
          >
            GET DIRECTIONS <FiArrowRight />
          </Link>
        </div>
      </section>

      <MapSection />
    </>
  );
}
