// A live, animated "stitching" backdrop: three seam lines run across the
// scene, each with a dashed thread trailing a needle that travels the
// length of the seam and bobs up and down as it goes — a lightweight
// stand-in for a sewing-machine animation, built entirely from SVG + CSS
// (no video file needed).
const paths = [
  "M -100 160 Q 300 90 600 165 T 1300 145",
  "M -100 420 Q 350 490 650 405 T 1300 435",
  "M -100 680 Q 300 610 650 690 T 1300 655",
];

export default function StitchBackground({ className = "" }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <g key={i}>
          {/* faint seam guide */}
          <path d={d} fill="none" stroke="rgba(200,112,62,0.10)" strokeWidth="1" />
          {/* dashed thread, slowly cycling so it reads as being drawn */}
          <path
            d={d}
            fill="none"
            stroke="rgba(200,112,62,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="14 11"
            className={`stitch-thread stitch-thread-${i}`}
          />
          {/* needle travelling the seam */}
          <g className={`stitch-needle stitch-needle-${i}`} style={{ offsetPath: `path("${d}")` }}>
            <g className="stitch-needle-bob">
              <line x1="0" y1="-24" x2="0" y2="12" stroke="#F2EEE6" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="0" cy="-20" r="3" fill="none" stroke="#F2EEE6" strokeWidth="1.4" />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
