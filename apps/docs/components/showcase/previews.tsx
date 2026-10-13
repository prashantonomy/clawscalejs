import { land } from "./omega/geography";

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

/** World units to preview pixels: the scale and offset frame the situation between the panels. */
const S = 0.3;
const at = (x: number, y: number) => [37 + x * S, 16 + y * S] as const;

export function OmegaPreview() {
  const [baseX, baseY] = at(392, 520);
  const markers: { point: readonly [number, number]; tone: string }[] = [
    { point: at(456, 528), tone: "danger" },
    { point: at(392, 520), tone: "danger" },
    { point: at(886, 352), tone: "neutral" },
    { point: at(1092, 318), tone: "primary" },
    { point: at(990, 548), tone: "primary" },
  ];
  const [fleetX, fleetY] = at(838, 356);
  const [exerciseX, exerciseY] = at(650, 600);
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className="showcase-preview-sea" width="480" height="300" />
      <g transform={`translate(37 16) scale(${S})`}>
        {land.map((d) => (
          <path key={d.slice(0, 24)} className="showcase-preview-land" d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      {[20, 40, 60].map((radius) => (
        <circle key={radius} className="showcase-preview-ring" cx={baseX} cy={baseY} r={radius} />
      ))}
      <circle className="showcase-preview-area" cx={fleetX} cy={fleetY} r={12.6} />
      <circle className="showcase-preview-area" cx={exerciseX} cy={exerciseY} r={17.4} />
      <path className="showcase-preview-route" d="M173.8 174.4C205 166 247 142 286.6 124" />
      <path className="showcase-preview-route" d="M173.8 174.4C193 184 211 193.6 229 195.4" />
      <path className="showcase-preview-track" d="M158.2 175.6L166 177.1L173.8 174.4" />
      {markers.map(({ point: [x, y], tone }) => (
        <circle key={`${x}-${y}`} className={`showcase-preview-${tone} showcase-preview-marker`} cx={x} cy={y} r={4} />
      ))}

      <rect className="showcase-preview-success-subtle" width="480" height="5" />
      <rect className="showcase-preview-surface" y="5" width="480" height="20" />
      <path className="showcase-preview-border" d="M0 25.5H480M22.5 26V300" />
      <rect className="showcase-preview-primary" x="8" y="10" width="10" height="10" rx="3" />
      <Text x={24} y={13} width={30} />
      <Text x={70} y={13} width={50} faint />
      <rect className="showcase-preview-card" x="330.5" y="10.5" width="70" height="10" rx="3" />
      <rect className="showcase-preview-surface" y="26" width="22" height="274" />
      {[0, 1, 2, 3, 4].map((icon) => (
        <rect key={icon} className="showcase-preview-faint" x="7" y={36 + icon * 16} width="8" height="8" rx="2" />
      ))}

      <Card x={30} y={34} width={98} height={258} />
      <Text x={38} y={44} width={28} />
      <Text x={74} y={44} width={22} faint />
      <path className="showcase-preview-border" d="M30 54.5H128" />
      <rect className="showcase-preview-danger-subtle" x="38" y="62" width="14" height="14" rx="3" />
      <Text x={58} y={64} width={44} />
      <Text x={58} y={72} width={26} faint />
      {[0, 1, 2].map((line) => (
        <Text key={line} x={38} y={88 + line * 8} width={line === 2 ? 50 : 80} faint />
      ))}
      {[0, 1, 2, 3].map((card) => (
        <g key={card}>
          <Card x={38} y={122 + card * 40} width={82} height={34} />
          <Text x={45} y={130 + card * 40} width={50} />
          <Text x={45} y={140 + card * 40} width={36} faint />
          <rect
            className={
              card === 0
                ? "showcase-preview-danger"
                : card === 3
                  ? "showcase-preview-success"
                  : "showcase-preview-faint"
            }
            x={100}
            y={128 + card * 40}
            width={14}
            height={6}
            rx={3}
          />
        </g>
      ))}

      <Card x={384} y={34} width={88} height={258} />
      <rect className="showcase-preview-danger" x="392" y="42" width="14" height="14" rx="3" />
      <Text x={412} y={44} width={32} />
      <Text x={412} y={52} width={24} faint />
      <path
        className="showcase-preview-drawing"
        d="M392 84L460 82.5L464 82L461 89L395 89.5ZM406 82V77H418V82M424 82V74H436V82"
      />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <Text x={392} y={102 + row * 10} width={22} faint />
          <Text x={420} y={102 + row * 10} width={40} />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((bar) => {
        const height = [8, 12, 6, 14, 22, 34][bar] ?? 8;
        return (
          <rect
            key={bar}
            className={bar >= 4 ? "showcase-preview-warning" : "showcase-preview-bar"}
            x={394 + bar * 12}
            y={190 - height}
            width={7}
            height={height}
            rx={1.5}
          />
        );
      })}
      <path className="showcase-preview-baseline" d="M392 176H462" />

      <Card x={136} y={232} width={240} height={60} />
      <Text x={144} y={240} width={48} />
      <Text x={198} y={240} width={30} faint />
      <path className="showcase-preview-border" d="M136 250.5H376" />
      <rect className="showcase-preview-faint" x="214" y="258" width="44" height="7" rx="2" />
      <rect className="showcase-preview-faint" x="260" y="258" width="16" height="7" rx="2" />
      <rect className="showcase-preview-faint" x="278" y="258" width="78" height="7" rx="2" />
      <rect className="showcase-preview-faint" x="214" y="268" width="10" height="7" rx="2" />
      <rect className="showcase-preview-primary" x="214" y="278" width="10" height="7" rx="2" />
      <rect className="showcase-preview-primary" x="226" y="278" width="40" height="7" rx="2" />
      {[0, 1, 2].map((row) => (
        <Text key={row} x={144} y={259.5 + row * 10} width={56} faint={row !== 2} />
      ))}
    </svg>
  );
}
