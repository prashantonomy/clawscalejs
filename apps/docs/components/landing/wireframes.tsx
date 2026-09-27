/** Faint line drawings of data-dense UI, the backdrop of the landing hero. */
export function Wireframes() {
  const rows = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg
      className="landing-wireframes"
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      {/* Toolbar with buttons and a search field */}
      <rect x="40" y="40" width="380" height="44" rx="6" />
      <rect x="54" y="52" width="72" height="20" rx="4" />
      <rect x="134" y="52" width="72" height="20" rx="4" />
      <rect x="276" y="52" width="130" height="20" rx="10" />
      <circle cx="290" cy="62" r="4" />

      {/* Data table */}
      <rect x="40" y="112" width="380" height="236" rx="6" />
      <line x1="40" y1="142" x2="420" y2="142" />
      {rows.map((row) => (
        <g key={row}>
          <line x1="40" y1={172 + row * 25} x2="420" y2={172 + row * 25} opacity="0.6" />
          <line x1="56" y1={157 + row * 25} x2="150" y2={157 + row * 25} strokeWidth="3" opacity="0.5" />
          <rect x="230" y={151 + row * 25} width="44" height="12" rx="6" opacity="0.7" />
          <line x1="340" y1={157 + row * 25} x2="404" y2={157 + row * 25} strokeWidth="3" opacity="0.5" />
        </g>
      ))}
      <line x1="210" y1="112" x2="210" y2="348" opacity="0.5" />
      <line x1="320" y1="112" x2="320" y2="348" opacity="0.5" />

      {/* Metric tiles with sparklines */}
      <rect x="1020" y="40" width="180" height="96" rx="6" />
      <line x1="1036" y1="62" x2="1100" y2="62" strokeWidth="3" opacity="0.5" />
      <line x1="1036" y1="88" x2="1130" y2="88" strokeWidth="6" opacity="0.6" />
      <polyline points="1036,120 1060,112 1084,116 1108,104 1132,108 1156,96 1184,100" />
      <rect x="1220" y="40" width="180" height="96" rx="6" />
      <line x1="1236" y1="62" x2="1300" y2="62" strokeWidth="3" opacity="0.5" />
      <line x1="1236" y1="88" x2="1310" y2="88" strokeWidth="6" opacity="0.6" />
      <polyline points="1236,100 1260,108 1284,102 1308,114 1332,110 1356,120 1384,116" />

      {/* Line chart */}
      <rect x="1020" y="160" width="380" height="188" rx="6" />
      {[0, 1, 2, 3].map((line) => (
        <line key={line} x1="1044" y1={200 + line * 36} x2="1380" y2={200 + line * 36} opacity="0.35" />
      ))}
      <polyline points="1044,300 1100,280 1156,290 1212,240 1268,252 1324,214 1380,222" strokeWidth="2" />
      <polyline points="1044,318 1100,310 1156,300 1212,296 1268,276 1324,282 1380,262" opacity="0.6" />

      {/* Tree */}
      <rect x="40" y="380" width="220" height="220" rx="6" />
      {[0, 1, 2, 3, 4, 5].map((node) => (
        <g key={node}>
          <rect x={node % 3 === 0 ? 58 : 80} y={400 + node * 30} width="12" height="10" rx="2" />
          <line
            x1={node % 3 === 0 ? 80 : 102}
            y1={405 + node * 30}
            x2={node % 3 === 0 ? 180 : 210}
            y2={405 + node * 30}
            strokeWidth="3"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Form fields */}
      <rect x="290" y="380" width="260" height="220" rx="6" />
      {[0, 1, 2].map((field) => (
        <g key={field}>
          <line x1="310" y1={404 + field * 56} x2="380" y2={404 + field * 56} strokeWidth="3" opacity="0.5" />
          <rect x="310" y={414 + field * 56} width="220" height="24" rx="4" />
        </g>
      ))}
      <rect x="440" y="568" width="90" height="22" rx="4" />

      {/* Bar chart */}
      <rect x="1100" y="380" width="300" height="220" rx="6" />
      {[70, 120, 95, 150, 110, 170, 135].map((height, bar) => (
        <rect key={height} x={1124 + bar * 38} y={580 - height} width="24" height={height} rx="3" opacity="0.7" />
      ))}
      <line x1="1116" y1="580" x2="1384" y2="580" />

      {/* Dialog */}
      <rect x="880" y="420" width="190" height="150" rx="8" />
      <line x1="880" y1="452" x2="1070" y2="452" />
      <line x1="898" y1="480" x2="1040" y2="480" strokeWidth="3" opacity="0.5" />
      <line x1="898" y1="500" x2="1010" y2="500" strokeWidth="3" opacity="0.5" />
      <rect x="990" y="534" width="64" height="22" rx="4" />
    </svg>
  );
}
