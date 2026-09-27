/** The Clawscale mark: three rising strokes, a claw mark that doubles as a bar chart. */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Clawscale"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="var(--docs-logo-bg, #3563E9)" />
      <path
        d="M9.5 23.5 12.5 15M15.5 23.5 19.5 11M21.5 23.5 25 13.5"
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth="2.75"
      />
    </svg>
  );
}
