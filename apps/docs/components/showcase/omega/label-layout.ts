/**
 * Greedy label placement for the map, in screen pixels. Marker labels try below, right, left and
 * above their badge, and take the first spot that overlaps nothing placed before them. Route and
 * place labels come after, and hide when they would cover a marker or its label.
 */

export type Placement = "below" | "right" | "left" | "above";

export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

type Point = readonly [number, number];

/** Half the badge size, the gap to the label and the label height, matching omega.css. */
const BADGE = 13;
const GAP = 4;
const HEIGHT = 16;
const placements: Placement[] = ["below", "right", "left", "above"];

/** A generous width estimate for a label, so near misses count as overlaps. */
export function textWidth(text: string, fontSize = 11): number {
  return text.length * fontSize * 0.6 + 12;
}

function overlaps(a: Box, b: Box): boolean {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}

function centered([x, y]: Point, width: number, height: number): Box {
  return { x0: x - width / 2, y0: y - height / 2, x1: x + width / 2, y1: y + height / 2 };
}

function labelBox([x, y]: Point, width: number, placement: Placement): Box {
  const near = BADGE + GAP;
  switch (placement) {
    case "below":
      return { x0: x - width / 2, y0: y + near, x1: x + width / 2, y1: y + near + HEIGHT };
    case "above":
      return { x0: x - width / 2, y0: y - near - HEIGHT, x1: x + width / 2, y1: y - near };
    case "right":
      return { x0: x + near, y0: y - HEIGHT / 2, x1: x + near + width, y1: y + HEIGHT / 2 };
    case "left":
      return { x0: x - near - width, y0: y - HEIGHT / 2, x1: x - near, y1: y + HEIGHT / 2 };
  }
}

export interface LabelLayout {
  /** Where each marker's label goes, or null when every spot is taken. */
  markers: Map<string, Placement | null>;
  /** Free spot for each route label, or null to hide it. */
  routes: Map<string, Point | null>;
  /** Place names that fit. */
  places: Set<string>;
}

export function layoutLabels(
  markers: { id: string; at: Point; text: string }[],
  routes: { id: string; candidates: Point[]; text: string }[],
  places: { text: string; at: Point; fontSize: number }[],
  priority: string | null,
  /** The part of the map no panel covers. Labels outside it count as hidden. */
  visible: Box,
): LabelLayout {
  const taken: Box[] = markers.map(({ at }) => centered(at, BADGE * 2, BADGE * 2));
  const fits = (box: Box) =>
    box.x0 >= visible.x0 &&
    box.x1 <= visible.x1 &&
    box.y0 >= visible.y0 &&
    box.y1 <= visible.y1 &&
    taken.every((other) => !overlaps(other, box));
  const result: LabelLayout = { markers: new Map(), routes: new Map(), places: new Set() };
  const ordered = [...markers].sort((a, b) => Number(b.id === priority) - Number(a.id === priority));

  // A label sits next to its own badge by construction, so testing every badge is safe.
  for (const marker of ordered) {
    const width = textWidth(marker.text);
    const free = placements.find((placement) => fits(labelBox(marker.at, width, placement)));
    const placement = free ?? (marker.id === priority ? "below" : null);
    if (placement) taken.push(labelBox(marker.at, width, placement));
    result.markers.set(marker.id, placement);
  }

  for (const route of routes) {
    const width = textWidth(route.text);
    const spot = route.candidates.find((at) => fits(centered(at, width, HEIGHT)));
    if (spot) taken.push(centered(spot, width, HEIGHT));
    result.routes.set(route.id, spot ?? null);
  }

  for (const place of places) {
    const box = centered(place.at, textWidth(place.text, place.fontSize), place.fontSize + 6);
    if (fits(box)) {
      taken.push(box);
      result.places.add(place.text);
    }
  }
  return result;
}
