"use client";

import { Button, ButtonGroup, ContextMenu, Icon, type IconName, Menu, MenuDivider, MenuItem } from "@clawscale/react";
import {
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type Affiliation, formatCoordinates, type ObjectId, type Point, placeLabels, pointAlong } from "./data";
import { land, WORLD } from "./geography";
import { layoutLabels } from "./label-layout";
import { type Size, useElementSize } from "./use-element-size";

export interface MapMarker {
  id: ObjectId;
  label: string;
  /** Accessible name, for example "Talon, destroyer, hostile". */
  description: string;
  icon: IconName;
  affiliation: Affiliation;
  position: Point;
  /** Alerts draw an outlined badge. Their area is a separate `MapArea`. */
  alert?: boolean;
  /** A last known position: the badge gets a dashed ring. */
  uncertain?: boolean;
}

export interface MapTrack {
  id: string;
  points: readonly Point[];
  tone: "hostile" | "friendly";
  line: "solid" | "dashed" | "dotted";
  emphasis?: "strong" | "muted";
  /** Short label near the end of the track. */
  label?: string;
}

export interface MapArea {
  id: string;
  center: Point;
  /** World units. */
  radius: number;
  tone: "danger" | "primary";
  dashed?: boolean;
}

export interface MapScene {
  markers: MapMarker[];
  tracks: MapTrack[];
  areas: MapArea[];
  /** Range rings around a point, in kilometer steps. */
  rings?: { center: Point; stepKm: number; count: number };
  labels: boolean;
}

export type MapAction = "collect" | "search" | "geofence" | "copy";

/** Space that floating panels cover, in pixels. The map frames the situation inside the rest. */
export interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface View {
  scale: number;
  x: number;
  y: number;
}

/** The part of the world the map frames by default: Tarn Island to Halden Island. */
const FRAME = { x0: 300, y0: 110, x1: 1110, y1: 650 };
const ZOOM_STEP = 1.4;

function fitView(size: Size, insets: Insets): View {
  const width = Math.max(size.width - insets.left - insets.right, 160);
  const height = Math.max(size.height - insets.top - insets.bottom, 160);
  const frameWidth = FRAME.x1 - FRAME.x0;
  const frameHeight = FRAME.y1 - FRAME.y0;
  const scale = Math.min(width / frameWidth, height / frameHeight);
  return {
    scale,
    x: insets.left + (width - frameWidth * scale) / 2 - FRAME.x0 * scale,
    y: insets.top + (height - frameHeight * scale) / 2 - FRAME.y0 * scale,
  };
}

/** Zooms around a screen point, within limits relative to the fitted scale. */
function zoomAround(view: View, factor: number, px: number, py: number, fitted: number): View {
  const scale = Math.min(Math.max(view.scale * factor, fitted * 0.5), fitted * 8);
  const ratio = scale / view.scale;
  return { scale, x: px - (px - view.x) * ratio, y: py - (py - view.y) * ratio };
}

/** A distance for the scale bar that draws between about 50 and 130 pixels. */
function scaleBar(view: View): { km: number; width: number } {
  const pxPerKm = view.scale / WORLD.kmPerUnit;
  const km = [10, 25, 50, 100, 200, 400].findLast((step) => step * pxPerKm <= 130) ?? 10;
  return { km, width: km * pxPerKm };
}

export interface MapViewProps {
  scene: MapScene;
  selectedId: ObjectId | null;
  onSelect: (id: ObjectId) => void;
  onAction: (action: MapAction, point: Point) => void;
  insets: Insets;
  /** Centers the map on a point each time `nonce` changes. */
  focus: { point: Point; nonce: number } | null;
  /** Map tools, shown at the top right of the free area. */
  controls?: ReactNode;
}

export function MapView({ scene, selectedId, onSelect, onAction, insets, focus, controls }: MapViewProps) {
  const [ref, size] = useElementSize<HTMLDivElement>({ width: 1280, height: 760 });
  const fitted = useMemo(() => fitView(size, insets), [size, insets]);
  const [userView, setUserView] = useState<View | null>(null);
  const view = userView ?? fitted;
  const viewRef = useRef(view);
  viewRef.current = view;
  const drag = useRef<{ x: number; y: number; view: View; moved: boolean } | null>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const [menuPoint, setMenuPoint] = useState<Point>([0, 0]);

  const toScreen = ([wx, wy]: Point): Point => [view.x + wx * view.scale, view.y + wy * view.scale];
  const toWorld = (px: number, py: number): Point => [(px - view.x) / view.scale, (py - view.y) / view.scale];

  // The middle of the area that no panel covers.
  const centerX = insets.left + (size.width - insets.left - insets.right) / 2;
  const centerY = insets.top + (size.height - insets.top - insets.bottom) / 2;

  const zoomBy = (factor: number) => setUserView(zoomAround(viewRef.current, factor, centerX, centerY, fitted.scale));

  // Recenter when asked, keeping the zoom.
  const lastNonce = useRef<number | null>(null);
  useEffect(() => {
    if (!focus || focus.nonce === lastNonce.current) return;
    lastNonce.current = focus.nonce;
    const { scale } = viewRef.current;
    setUserView({ scale, x: centerX - focus.point[0] * scale, y: centerY - focus.point[1] * scale });
  }, [focus, centerX, centerY]);

  // A native listener, so pinch zoom on a trackpad zooms the map instead of the page.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const box = element.getBoundingClientRect();
      const factor = Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.0015));
      setUserView(zoomAround(viewRef.current, factor, event.clientX - box.left, event.clientY - box.top, fitted.scale));
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [ref, fitted.scale]);

  const localPoint = (event: { clientX: number; clientY: number }): [number, number] => {
    const box = ref.current?.getBoundingClientRect();
    return [event.clientX - (box?.left ?? 0), event.clientY - (box?.top ?? 0)];
  };

  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, view, moved: false };
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const [px, py] = localPoint(event);
    if (readout.current) readout.current.textContent = formatCoordinates(toWorld(px, py));
    const start = drag.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.moved && Math.hypot(dx, dy) < 3) return;
    start.moved = true;
    setUserView({ ...start.view, x: start.view.x + dx, y: start.view.y + dy });
  };

  const endDrag = () => {
    drag.current = null;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    const pan: Record<string, Point> = {
      ArrowLeft: [80, 0],
      ArrowRight: [-80, 0],
      ArrowUp: [0, 80],
      ArrowDown: [0, -80],
    };
    const step = pan[event.key];
    if (step) {
      event.preventDefault();
      setUserView({ ...view, x: view.x + step[0], y: view.y + step[1] });
    } else if (event.key === "+" || event.key === "=") {
      zoomBy(ZOOM_STEP);
    } else if (event.key === "-") {
      zoomBy(1 / ZOOM_STEP);
    } else if (event.key === "0") {
      setUserView(null);
    }
  };

  const onContextMenu = (event: MouseEvent<HTMLElement>) => {
    const [px, py] = localPoint(event);
    setMenuPoint(toWorld(px, py));
  };

  const path = (points: readonly Point[]) =>
    points
      .map((point, i) => {
        const [x, y] = toScreen(point);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join("");

  const bar = scaleBar(view);
  const rings = scene.rings;
  const ringCenter = rings ? toScreen(rings.center) : null;
  const layout = scene.labels
    ? layoutLabels(
        scene.markers.map((marker) => ({ id: marker.id, at: toScreen(marker.position), text: marker.label })),
        scene.tracks.flatMap((track) =>
          track.label
            ? [
                {
                  id: track.id,
                  text: track.label,
                  candidates: [0.72, 0.6, 0.84, 0.48].map((fraction) => toScreen(pointAlong(track.points, fraction))),
                },
              ]
            : [],
        ),
        placeLabels.map(({ text, at }) => ({ text, at: toScreen(at), fontSize: 12 })),
        selectedId,
        // The scale bar and coordinates take the bottom strip of the free area.
        { x0: insets.left, y0: insets.top, x1: size.width - insets.right, y1: size.height - insets.bottom - 32 },
      )
    : null;

  return (
    <ContextMenu
      ref={ref}
      className="omega-map"
      role="region"
      aria-label="Map of the Meridian Sea. Arrow keys pan, plus and minus zoom."
      tabIndex={0}
      onKeyDown={onKeyDown}
      onContextMenu={onContextMenu}
      content={
        <Menu aria-label="Map actions">
          <MenuDivider title={formatCoordinates(menuPoint)} />
          <MenuItem icon="satellite" text="Collect imagery here" onClick={() => onAction("collect", menuPoint)} />
          <MenuItem icon="geosearch" text="Search around" onClick={() => onAction("search", menuPoint)} />
          <MenuItem icon="geofence" text="Create geofence" onClick={() => onAction("geofence", menuPoint)} />
          <MenuDivider />
          <MenuItem icon="duplicate" text="Copy coordinates" onClick={() => onAction("copy", menuPoint)} />
        </Menu>
      }
    >
      <svg
        className="omega-map-canvas"
        width={size.width}
        height={size.height}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <rect className="omega-map-sea" width={size.width} height={size.height} />
        <g transform={`translate(${view.x.toFixed(2)} ${view.y.toFixed(2)}) scale(${view.scale.toFixed(4)})`}>
          {land.map((d) => (
            <path key={d.slice(0, 24)} className="omega-map-land" d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {rings &&
          ringCenter &&
          Array.from({ length: rings.count }, (_, i) => {
            const km = rings.stepKm * (i + 1);
            const radius = (km / WORLD.kmPerUnit) * view.scale;
            return (
              <g key={km} className="omega-map-ring">
                <circle cx={ringCenter[0]} cy={ringCenter[1]} r={radius} />
                <text x={ringCenter[0]} y={ringCenter[1] - radius - 4} textAnchor="middle">
                  {km} km
                </text>
              </g>
            );
          })}
        {scene.areas.map((area) => {
          const [cx, cy] = toScreen(area.center);
          return (
            <circle
              key={area.id}
              className="omega-map-area"
              data-tone={area.tone}
              data-dashed={area.dashed || undefined}
              cx={cx}
              cy={cy}
              r={area.radius * view.scale}
            />
          );
        })}
        {scene.tracks.map((track) => (
          <path
            key={track.id}
            className="omega-map-track"
            data-tone={track.tone}
            data-line={track.line}
            data-emphasis={track.emphasis}
            d={path(track.points)}
          />
        ))}
      </svg>

      {layout && (
        <div className="omega-map-overlay" aria-hidden="true">
          {placeLabels
            .filter(({ text }) => layout.places.has(text))
            .map(({ text, at, kind }) => {
              const [x, y] = toScreen(at);
              return (
                <span key={text} className="omega-map-place" data-kind={kind} style={{ left: x, top: y }}>
                  {text}
                </span>
              );
            })}
          {scene.tracks.map((track) => {
            const spot = layout.routes.get(track.id);
            return spot ? (
              <span key={track.id} className="omega-map-track-label" style={{ left: spot[0], top: spot[1] }}>
                {track.label}
              </span>
            ) : null;
          })}
        </div>
      )}

      <div className="omega-map-overlay">
        {scene.markers.map((marker) => {
          const [x, y] = toScreen(marker.position);
          const placement = layout?.markers.get(marker.id) ?? null;
          return (
            <button
              key={marker.id}
              type="button"
              className="omega-marker"
              data-label={placement ?? undefined}
              data-uncertain={marker.uncertain || undefined}
              aria-label={marker.description}
              aria-pressed={selectedId === marker.id}
              style={{ left: x, top: y }}
              onClick={() => onSelect(marker.id)}
            >
              <span
                className="omega-badge"
                data-affiliation={marker.affiliation}
                data-alert={marker.alert || undefined}
              >
                <Icon icon={marker.icon} size={14} />
              </span>
              {placement && <span className="omega-marker-label">{marker.label}</span>}
            </button>
          );
        })}
      </div>

      <div className="omega-map-tools" style={{ top: insets.top, right: insets.right }}>
        <ButtonGroup vertical className="omega-map-zoom">
          <Button icon="plus" aria-label="Zoom in" onClick={() => zoomBy(ZOOM_STEP)} />
          <Button icon="minus" aria-label="Zoom out" onClick={() => zoomBy(1 / ZOOM_STEP)} />
          <Button icon="zoom-to-fit" aria-label="Frame the situation" onClick={() => setUserView(null)} />
        </ButtonGroup>
        {controls}
      </div>

      <div className="omega-map-footer" style={{ left: insets.left, bottom: insets.bottom }}>
        <span className="omega-map-scale">
          <span className="omega-map-scale-bar" style={{ width: bar.width }} />
          {bar.km} km
        </span>
        <span className="omega-map-readout" ref={readout}>
          {formatCoordinates(toWorld(centerX, centerY))}
        </span>
      </div>
    </ContextMenu>
  );
}
