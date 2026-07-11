import site from "../config/site";

const sections = [
  {
    title: "1. About These Terms",
    body: `These Terms & Conditions govern purchases made through ${site.name}, whether in our
    Gangavathi store or through orders placed via this website and confirmed over WhatsApp.
    By placing an order with us, you agree to the terms below.`,
  },
  {
    title: "2. Orders & Payment",
    body: `Orders placed through the website are provisional until confirmed by our team over a
    call or WhatsApp message, since stock and pricing on certain machines can change day to
    day. We accept cash, UPI, card payment in-store, and EMI on select machines through
    partner lenders. Online payments made through the checkout are processed securely and are
    not stored on our servers.`,
  },
  {
    title: "3. Pricing",
    body: `Prices listed on the site are indicative and include applicable taxes unless stated
    otherwise. We reserve the right to correct pricing errors before an order is confirmed.
    Festival and clearance offers are valid for the period stated and cannot be combined with
    other discounts unless mentioned.`,
  },
  {
    title: "4. Delivery & Installation",
    body: `Free delivery applies within Gangavathi town limits; deliveries elsewhere in Koppal
    District may carry a small delivery charge, confirmed before dispatch. Every machine is
    demonstrated and set up at the time of delivery or in-store pickup — we do not consider a
    sale complete until you've seen the machine stitch.`,
  },
  {
    title: "5. Warranty",
    body: `All new machines carry the manufacturer's standard warranty (typically covering the
    motor and major mechanical parts) — the exact period depends on the brand and model and is
    stated on the machine's box and invoice. Warranty covers manufacturing defects only and
    does not cover damage from misuse, unauthorised repair, or normal wear items like needles,
    bobbins and belts.`,
  },
  {
    title: "6. Returns & Exchanges",
    body: `Machines may be returned or exchanged within 7 days of purchase if they are unused,
    in original packaging, and accompanied by the original invoice. Accessories and spare
    parts (needles, bobbins, belts, thread) are not eligible for return once opened, for
    hygiene and usability reasons. Refunds are processed to the original payment method within
    7–10 working days of an approved return.`,
  },
  {
    title: "7. After-Sales Service",
    body: `We provide servicing and repairs for machines purchased from us, and — where parts
    and expertise allow — for machines bought elsewhere as well. Service charges outside the
    warranty period are quoted before any work begins.`,
  },
  {
    title: "8. Website Use",
    body: `This website is provided to help you browse our catalogue and get in touch — product
    photography is representative and actual machines may vary slightly in finish. We update
    stock and pricing regularly but cannot guarantee real-time accuracy at every moment.`,
  },
  {
    title: "9. Governing Law",
    body: `These terms are governed by the laws of India, and any disputes are subject to the
    jurisdiction of the courts in Koppal District, Karnataka.`,
  },
  {
    title: "10. Contact Us",
    body: `For any questions about an order, a return, or these terms, reach us on WhatsApp or
    visit the store directly — details are on our Visit Us page.`,
  },
];

export default function Terms() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
      <p className="font-tag text-brass text-xs uppercase tracking-widest mb-2">Legal</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-wide mb-3">TERMS & CONDITIONS</h1>
      <p className="font-body text-mute text-sm mb-12">Last updated: July 2026</p>

      <div className="flex flex-col gap-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl sm:text-2xl tracking-wide mb-3">{s.title}</h2>
            <p className="font-body text-mute text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
