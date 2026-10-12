/*
 * Small schematics of each showcase for the /showcase/ index. They use the same tokens as the
 * real screens, so they follow the theme, accent and color scheme. Decorative: the card text
 * carries the meaning.
 */

/** A bar that stands in for a line of text. */
function Text({ x, y, width, faint }: { x: number; y: number; width: number; faint?: boolean }) {
  return (
    <rect
      className={faint ? "showcase-preview-faint" : "showcase-preview-text"}
      x={x}
      y={y}
      width={width}
      height={4}
      rx={2}
    />
  );
}

function Card({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return <rect className="showcase-preview-card" x={x + 0.5} y={y + 0.5} width={width} height={height} rx={4} />;
}

export function PipelinesPreview() {
  const rows = [0, 1, 2, 3, 4, 5];
  const status = ["success", "danger", "primary", "success", "success", "warning"];
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className="showcase-preview-canvas" width="480" height="300" />
      <rect className="showcase-preview-surface" width="480" height="24" />
      <path className="showcase-preview-border" d="M0 24.5H480M86.5 25V284M376.5 25V284M0 284.5H480" />
      <rect className="showcase-preview-primary" x="10" y="7" width="10" height="10" rx="3" />
      <Text x={26} y={10} width={48} />
      <Text x={96} y={10} width={30} faint />
      <Text x={134} y={10} width={34} />
      <Text x={176} y={10} width={30} faint />
      <rect className="showcase-preview-surface" y="25" width="86" height="259" />
      {rows.map((row) => (
        <Text
          key={row}
          x={row % 3 === 0 ? 10 : 20}
          y={40 + row * 16}
          width={row % 3 === 0 ? 50 : 42}
          faint={row % 3 !== 0}
        />
      ))}
      <Text x={96} y={36} width={90} />
      {[0, 1, 2, 3].map((tile) => (
        <g key={tile}>
          <Card x={96 + tile * 70} y={48} width={64} height={42} />
          <Text x={103 + tile * 70} y={56} width={30} faint />
          <rect className="showcase-preview-text" x={103 + tile * 70} y={64} width={26} height={7} rx={2} />
          <polyline
            className="showcase-preview-line-1"
            points={`${103 + tile * 70},84 ${113 + tile * 70},${80 - tile} ${123 + tile * 70},82 ${133 + tile * 70},${77 + tile} ${143 + tile * 70},79 ${153 + tile * 70},74`}
          />
        </g>
      ))}
      <Card x={96} y={98} width={170} height={76} />
      <polyline className="showcase-preview-line-1" points="106,160 130,150 154,154 178,134 202,140 226,122 252,126" />
      <polyline className="showcase-preview-line-2" points="106,166 130,162 154,158 178,156 202,148 226,150 252,140" />
      <Card x={272} y={98} width={96} height={76} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
        <rect
          key={bar}
          className="showcase-preview-bar"
          x={280 + bar * 10.5}
          y={166 - (18 + ((bar * 7) % 5) * 9)}
          width={6}
          height={18 + ((bar * 7) % 5) * 9}
          rx={1.5}
        />
      ))}
      <Card x={96} y={182} width={272} height={96} />
      <path className="showcase-preview-border" d="M96 196.5H368" />
      {rows.slice(0, 5).map((row) => (
        <g key={row}>
          <Text x={104} y={204 + row * 15} width={56} />
          <rect className={`showcase-preview-${status[row]}`} x={170} y={202 + row * 15} width={24} height={8} rx={4} />
          <Text x={208} y={204 + row * 15} width={40} faint />
          <Text x={330} y={204 + row * 15} width={28} faint />
        </g>
      ))}
      <rect className="showcase-preview-surface" x="377" y="25" width="103" height="259" />
      <Text x={386} y={38} width={60} />
      <rect className="showcase-preview-danger" x={386} y={50} width={30} height={8} rx={4} />
      {rows.map((row) => (
        <g key={row}>
          <Text x={386} y={70 + row * 13} width={28} faint />
          <Text x={424} y={70 + row * 13} width={44} />
        </g>
      ))}
      <polyline className="showcase-preview-line-1" points="386,170 400,162 414,166 428,152 442,158 456,146 470,150" />
      <rect className="showcase-preview-surface" y="285" width="480" height="15" />
      <rect className="showcase-preview-success" x={10} y={290} width={6} height={6} rx={3} />
      <Text x={22} y={291} width={40} faint />
    </svg>
  );
}
