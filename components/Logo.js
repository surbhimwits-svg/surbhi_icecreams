/**
 * LogoMark renders the ice cream cone + scoop icon as a standalone SVG.
 * Kept to two brand colors (sky blue + butter yellow) plus one pink
 * accent so it still reads clearly at favicon size.
 */
export function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Surbhi Icecreams logo mark"
    >
      <defs>
        <clipPath id="surbhi-cone-clip">
          <path d="M19.5 33 H44.5 L34 59 Q32 63 30 59 Z" />
        </clipPath>
      </defs>

      {/* Cone */}
      <g clipPath="url(#surbhi-cone-clip)">
        <rect x="16" y="33" width="32" height="30" fill="#FFE680" />
        <g stroke="#F3C94D" strokeWidth="1.4" strokeLinecap="round">
          <line x1="14" y1="40" x2="50" y2="40" />
          <line x1="14" y1="47" x2="50" y2="47" />
          <line x1="14" y1="54" x2="50" y2="54" />
          <line x1="20" y1="30" x2="34" y2="64" />
          <line x1="28" y1="30" x2="42" y2="64" />
          <line x1="36" y1="30" x2="48" y2="60" />
          <line x1="20" y1="64" x2="34" y2="30" />
        </g>
      </g>

      {/* Scoop */}
      <circle cx="32" cy="25" r="16" fill="#AEE1F9" />
      <path
        d="M20 20 C20 13 44 13 44 20 C44 26.5 27 25 27 30.5 C27 34.5 39.5 34 39.5 29.5"
        fill="none"
        stroke="#5AA9D6"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Melt drip over the cone rim */}
      <path
        d="M18 33 Q23.5 39 29 33 Q34.5 40 40 33 Q45.5 39.5 46 33 L46 30 L18 30 Z"
        fill="#FFF7DC"
      />

      {/* Sprinkles */}
      <circle cx="24" cy="17" r="2" fill="#BAF5D0" />
      <circle cx="39" cy="16" r="2" fill="#FF8FAC" />
      <circle cx="34" cy="10" r="1.6" fill="#BAF5D0" />

      {/* Cherry on top */}
      <path
        d="M32 9 C32 5.5 35 4 35 4"
        fill="none"
        stroke="#8fe8b4"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="32" cy="9.5" r="4" fill="#FF8FAC" />
    </svg>
  );
}

/**
 * Full logo lockup: SVG mark + wordmark. The wordmark is real text (not
 * baked into the SVG) so it stays crisp, selectable, and accessible.
 */
export default function Logo({
  className = "",
  markClassName = "h-10 w-10 md:h-12 md:w-12",
  showWordmark = true,
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <span className="font-heading font-semibold leading-none tracking-tight text-lg md:text-xl">
          <span className="text-sky-deep">Surbhi</span>{" "}
          <span className="text-pink-dark">Icecreams</span>
        </span>
      )}
    </span>
  );
}
