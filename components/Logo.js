export function LogoMark({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <g stroke="#c2f800" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19 19 9" strokeWidth="3" />
        <path d="M5.5 15.5 12.5 22.5M3.5 17.5 10.5 24.5" strokeWidth="3" />
        <path d="M15.5 5.5 22.5 12.5M17.5 3.5 24.5 10.5" strokeWidth="3" />
      </g>
    </svg>
  );
}
