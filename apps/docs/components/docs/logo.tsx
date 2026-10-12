/**
 * The Clawscale mark: three rising strokes, a claw mark that doubles as a bar chart.
 * It takes the theme's primary color and corner shape, so it changes with the theme.
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className ? `docs-logo ${className}` : "docs-logo"}
      role="img"
      aria-label="Clawscale"
      style={{ height: size, width: size }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.5 23.5 12.5 15M15.5 23.5 19.5 11M21.5 23.5 25 13.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.75"
        />
      </svg>
    </span>
  );
}
