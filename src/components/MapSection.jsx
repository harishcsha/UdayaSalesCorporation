import { FiMapPin, FiClock, FiNavigation } from "react-icons/fi";
import site from "../config/site";

export default function MapSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div className="min-w-0 max-w-full">
          <p className="font-tag text-brass text-xs uppercase tracking-widest mb-2">Landmark</p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-wide break-words">VISIT THE STORE</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-white/10">
        <div className="lg:col-span-3 h-72 sm:h-96 lg:h-auto">
          <iframe
            title={`${site.name} location`}
            src={site.mapEmbedUrl}
            className="w-full h-full border-0 grayscale-[30%] contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="lg:col-span-2 bg-surface p-6 sm:p-8 flex flex-col justify-center gap-6">
          <div className="flex gap-3">
            <FiMapPin className="text-brass shrink-0 mt-1" size={20} />
            <div>
              <p className="font-body font-bold text-bone">{site.address.line1}</p>
              <p className="font-body text-mute text-sm mt-1">
                {site.address.line2}<br />
                {site.address.city}<br />
                {site.address.Contact}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <FiClock className="text-brass shrink-0 mt-1" size={20} />
            <div>
              <p className="font-body font-bold text-bone">Store Hours</p>
              <p className="font-body text-mute text-sm mt-1">Mon – Sun · 09:00 AM – 09:00 PM</p>
              <p className="font-body text-mute text-sm mt-1">⚠️ Note: Every Thursday Holiday</p>
            </div>
          </div>
          <a
            href={site.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-brass text-brass font-body font-bold py-3 hover:bg-brass hover:text-ink transition-colors"
          >
            <FiNavigation size={16} /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
