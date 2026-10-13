/** Line drawings of a destroyer, drawn with text tokens so they follow the theme. */

/** Side profile with its length, like a recognition card. */
export function ShipProfile({ length }: { length: string }) {
  return (
    <svg className="omega-ship-profile" viewBox="0 0 300 100" role="img" aria-label={`Side profile, ${length} long`}>
      <g className="omega-drawing">
        {/* Hull and waterline */}
        <path d="M12 54L286 49L296 47L287 71L24 72L12 63Z" />
        <path className="omega-drawing-faint" d="M4 72H296" />
        {/* Hangar and aft superstructure */}
        <path d="M58 53V40H112V52" />
        <path d="M112 51V35H128V51" />
        {/* Funnel */}
        <path d="M132 51L135 30H149L151 51" />
        {/* Forward superstructure, bridge and mast */}
        <path d="M156 51V36H184V30H206L210 50" />
        <path d="M186 30V26H200V30" />
        <path d="M174 36V10M166 16H182M168 22H180" />
        <path d="M160 38H178V46H160Z" />
        {/* Launch cells and gun */}
        <path d="M218 50V46H236V49.5" />
        <path d="M246 49V44H258L260 48.5" />
        <path d="M258 45.5L276 43" />
      </g>
      <g className="omega-drawing-faint">
        <path d="M12 94H296M12 90V98M296 90V98" />
      </g>
      <text x="154" y="88" textAnchor="middle" className="omega-drawing-label">
        {length}
      </text>
    </svg>
  );
}

/** A frame from an aircraft sensor: the ship from above, its wake, and the detection box. */
export function SensorFrame({ label }: { label: string }) {
  return (
    <svg className="omega-sensor-frame" viewBox="0 0 300 150" role="img" aria-label={`Sensor frame. ${label}.`}>
      <rect className="omega-sensor-water" width="300" height="150" />
      <g transform="translate(168 78) rotate(-32)">
        <path className="omega-drawing-faint" d="M-48 -4L-150 -30M-48 4L-150 30M-48 0L-150 0" />
        <path className="omega-sensor-ship" d="M-46 -6H24L46 0L24 6H-46Z" />
        <path className="omega-drawing" d="M-30 -3H-8V3H-30ZM0 -3.5H14V3.5H0Z" />
        <path
          className="omega-sensor-box"
          d="M-56 -20h12M-56 -20v10M56 -20h-12M56 -20v10M-56 20h12M-56 20v-10M56 20h-12M56 20v-10"
        />
      </g>
      <path className="omega-drawing-faint" d="M150 6V18M150 132V144M6 75H18M282 75H294" />
    </svg>
  );
}
