// Single source of truth for the product catalog.
// Swap `images` URLs for your own product photography whenever you have it —
// these are placeholder stock images so the site works out of the box.

const machineImg = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;
const accessoryImg = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

const products = [
  {
    id: "usha-dream-stitch",
    category: "machines",
    brand: "Usha",
    name: "Dream Stitch Automatic Zigzag",
    price: 8999,
    mrp: 10999,
    rating: 4.5,
    isNew: true,
    description:
      "A dependable electric machine for everyday tailoring — straight stitch, zigzag and buttonhole built in, with a quiet motor that runs all day without fuss. A great first machine for a home tailor or a growing boutique.",
    sizes: ["Standard", "With Cabinet Table"],
    colors: [
      { name: "Classic Black", hex: "#1B1712", images: [machineImg("photo-1641293498376-139cfe50ff67"), machineImg("photo-1560796952-f1c9b838544c")] },
      { name: "Ivory Cream", hex: "#ECE1C8", images: [machineImg("photo-1632157080329-98e59d514833"), machineImg("photo-1641293498376-139cfe50ff67")] },
    ],
  },
  {
    id: "usha-allure-dlx",
    category: "machines",
    brand: "Usha",
    name: "Allure DLX Electric",
    price: 10499,
    mrp: 12499,
    rating: 4.4,
    isNew: false,
    description:
      "Built for tailors who stitch in volume — a stronger motor, a bigger bobbin and a wider table area so heavier cottons and linens feed through evenly, stitch after stitch.",
    sizes: ["Standard", "With Cabinet Table"],
    colors: [
      { name: "Pearl White", hex: "#ECE6D8", images: [machineImg("photo-1632157080329-98e59d514833"), machineImg("photo-1641293498376-139cfe50ff67")] },
    ],
  },
  {
    id: "singer-tradition-2250",
    category: "machines",
    brand: "Singer",
    name: "Tradition 2250 Manual",
    price: 5499,
    mrp: 6499,
    rating: 4.6,
    isNew: false,
    description:
      "The hand-crank-friendly classic that never needed an instruction manual. Fully mechanical, easy to service anywhere in Koppal district, and built to be handed down to the next generation of tailors in the family.",
    sizes: ["Standard", "With Cabinet Table"],
    colors: [
      { name: "Vintage Black & Gold", hex: "#171310", images: [machineImg("photo-1528100111051-2abf86d8bb6c"), machineImg("photo-1560796952-f1c9b838544c")] },
    ],
  },
  {
    id: "singer-heavy-duty-4423",
    category: "machines",
    brand: "Singer",
    name: "Heavy Duty 4423",
    price: 13999,
    mrp: 16999,
    rating: 4.8,
    isNew: true,
    description:
      "A stainless-steel bedplate and a high-speed motor that pushes through denim, canvas and multiple layers of upholstery fabric without slowing down. The machine most local tailors ask for by name.",
    sizes: ["Standard", "With Cabinet Table"],
    colors: [
      { name: "Grey Steel", hex: "#4B4A46", images: [machineImg("photo-1641293498376-139cfe50ff67"), machineImg("photo-1632157080329-98e59d514833")] },
    ],
  },
  {
    id: "brother-bm3700",
    category: "machines",
    brand: "Brother",
    name: "BM3700 Computerised 37-Stitch",
    price: 15999,
    mrp: 18999,
    rating: 4.7,
    isNew: false,
    description:
      "Thirty-seven built-in stitches selected with the turn of a dial — decorative stitches, stretch stitches and a one-step buttonholer for shirts and salwar sets alike. A jump up in versatility for growing tailoring businesses.",
    sizes: ["Standard", "With Cabinet Table"],
    colors: [
      { name: "White & Brass", hex: "#ECE6D8", images: [machineImg("photo-1632157080329-98e59d514833"), machineImg("photo-1641293498376-139cfe50ff67")] },
    ],
  },
  {
    id: "juki-hzl-k85",
    category: "machines",
    brand: "Juki",
    name: "HZL-K85 Semi-Industrial",
    price: 24999,
    mrp: 28999,
    rating: 4.9,
    isNew: true,
    description:
      "A semi-industrial workhorse for tailoring shops that stitch every day of the week — a knee lifter for hands-free presser control, an extra-high presser foot lift, and a motor built to run long shifts.",
    sizes: ["Standard", "With Cabinet Table"],
    colors: [
      { name: "Industrial Grey", hex: "#5B564C", images: [machineImg("photo-1641293498376-139cfe50ff67"), machineImg("photo-1528100111051-2abf86d8bb6c")] },
    ],
  },
  {
    id: "uday-cover-table-combo",
    category: "accessories",
    brand: "Uday",
    name: "Machine Cover & Extension Table Combo",
    price: 799,
    mrp: 999,
    rating: 4.3,
    isNew: false,
    description:
      "A dust cover cut to fit most home sewing machines, paired with a snap-on extension table that gives you extra bed space for quilts, curtains and other large pieces.",
    sizes: ["Standard Fit", "Wide Cabinet Fit"],
    colors: [
      { name: "Walnut & Brass", hex: "#6B4A2C", images: [machineImg("photo-1641293498376-139cfe50ff67"), accessoryImg("photo-1776107490710-f5c08a0c6a98")] },
    ],
  },
  {
    id: "uday-bobbin-needle-kit",
    category: "accessories",
    brand: "Uday",
    name: "Universal Bobbins & Needles Kit",
    price: 349,
    mrp: 499,
    rating: 4.4,
    isNew: true,
    description:
      "A box of the parts every machine runs out of first — plastic and metal bobbins in the common sizes, plus a mixed pack of universal needles for cotton, denim and stretch fabrics.",
    sizes: ["Pack of 50", "Pack of 100"],
    colors: [
      { name: "Assorted", hex: "#C8703E", images: [accessoryImg("photo-1560796952-f1c9b838544c"), accessoryImg("photo-1776107490710-f5c08a0c6a98")] },
    ],
  },
  {
    id: "uday-pedal-belt-set",
    category: "accessories",
    brand: "Uday",
    name: "Foot Pedal & Motor Belt Set",
    price: 599,
    mrp: 799,
    rating: 4.2,
    isNew: false,
    description:
      "A direct replacement foot pedal and a spare drive belt, sized to fit most Usha and Singer domestic machines — the two parts that wear out first on a machine that gets used every day.",
    sizes: ["Single Set", "Twin Pack"],
    colors: [
      { name: "Universal Fit", hex: "#3A2E22", images: [machineImg("photo-1641293498376-139cfe50ff67"), accessoryImg("photo-1560796952-f1c9b838544c")] },
    ],
  },
  {
    id: "uday-thread-rack",
    category: "accessories",
    brand: "Uday",
    name: "Embroidery Thread Spool Rack",
    price: 1199,
    mrp: 1499,
    rating: 4.6,
    isNew: true,
    description:
      "A wall-mounted rack strung with forty shades of embroidery thread, sorted so you can find the exact colour mid-project instead of digging through a drawer.",
    sizes: ["40 Spools", "60 Spools"],
    colors: [
      { name: "40-Colour Set", hex: "#2F7A6B", images: [accessoryImg("photo-1776107490710-f5c08a0c6a98"), accessoryImg("photo-1560796952-f1c9b838544c")] },
    ],
  },
];

export const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];
export const categories = [
  { key: "all", label: "Everything" },
  { key: "machines", label: "Sewing Machines" },
  { key: "accessories", label: "Accessories" },
];

export default products;
