// A drawn emblem standing in for a real logo file — a needle stitching a
// looping thread inside a ring, rendered entirely in brass/thread tones so
// no image asset is required. Swap this out for a real logo whenever you
// have artwork for the shop.
export default function LogoMark({ className = "h-12 w-12" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Udaya Sales Corporation emblem"
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="#C8703E" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#C8703E" strokeWidth="1" opacity="0.5" />
      {/* stitched thread loop */}
      <path
        d="M20 58 Q35 30 50 58 T80 42"
        fill="none"
        stroke="#2F7A6B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 5"
      />
      {/* needle */}
      <line x1="50" y1="18" x2="50" y2="66" stroke="#F2EEE6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="24" r="3.4" fill="none" stroke="#F2EEE6" strokeWidth="2" />
    </svg>
  );
}
