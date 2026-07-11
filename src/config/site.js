// ────────────────────────────────────────────────────────────────
// SHOP CONFIG — edit these values with your real details.
// Everything on the site (WhatsApp button, map, footer, checkout
// fallback) reads from this single file.
// ────────────────────────────────────────────────────────────────

const site = {
  name: "Udaya Sales Corporation",
  tagline: "Gangavathi's Trusted Sewing Machine Store",
  instagram: "", // ⚠️ Add your Instagram URL here if you have one — the icon hides automatically until you do.

  // ⚠️ PLACEHOLDER — replace with the real shop WhatsApp number,
  // in international format with no spaces or symbols, e.g. "919876543210"
  whatsappNumber: "+919945351496",

  // Default message pre-filled when someone taps the WhatsApp button
  // from a non-product page.
  whatsappDefaultMessage:
    "ನಮಸ್ಕಾರ ಉದಯ ಸೇಲ್ಸ್ ಕಾರ್ಪೊರೇಷನ್! ನಿಮ್ಮ ಯಂತ್ರಗಳ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಲು ನಾನು ಇಷ್ಟಪಡುತ್ತೇನೆ. Hello Udaya Sales Corporation! I'd like to know more about your machines.",

  // ⚠️ PLACEHOLDER — replace with the real shop address / landmark.
  address: {
    line1: "Udaya Sales Corporation",
    line2: "Vidya Nagar, MG Road,",
    city: "Gangavathi, Koppal District, Karnataka 583227",
    Contact: "+91 99453 51496",
  },

  // ⚠️ PLACEHOLDER — this is a generic map centred on Gangavathi town.
  // Swap it for an embed link pointing at your exact shop location:
  // open the shop location on Google Maps → Share → Embed a map → copy the src URL.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.9865072134194!2d76.52568767625259!3d15.431279585159626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb7816c86af0b91%3A0xebc3946f9052c424!2sUdaya%20Sales%20Corporation!5e0!3m2!1sen!2sin!4v1783702925578!5m2!1sen!2sin",

  // Link used on the "Get Directions" button — replace with the shop's actual
  // Google Maps share link once you have one.
  mapDirectionsUrl:
    "https://maps.app.goo.gl/jjkEaGM4ZKiRDjas6",

  // ⚠️ PLACEHOLDER — Razorpay test/live key. Get one at dashboard.razorpay.com
  // Never put your Key Secret in frontend code — only the Key ID goes here.
  razorpayKeyId: "rzp_test_XXXXXXXXXXXX",

  currency: "INR",
  currencySymbol: "₹",
};

export default site;
