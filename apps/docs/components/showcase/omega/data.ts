/**
 * Scenario data for the Omega showcase: one situation in the Meridian Sea, a fictional theater.
 * Every name, place and number is invented. Positions are world units (see geography.ts).
 * Times are hours from 14 Apr, 00:00 Z.
 */
import type { IconName, Intent } from "@clawscale/react";

export type Point = readonly [number, number];
export type Affiliation = "hostile" | "friendly" | "civilian";
export type ObjectId =
  | "talon"
  | "tarn-base"
  | "port-halden"
  | "fishing-fleet"
  | "exercise"
  | "arden"
  | "kell-base"
  | "uav";

/** The current time in the scenario: 17 Apr, 12:32 Z. */
export const NOW = 84 + 32 / 60;
/** The collection timeline covers five days from 14 Apr, 00:00 Z. */
export const TIMELINE_HOURS = 120;
/** Talon left its berth at 16 Apr, 10:00 Z and went dark three hours later. */
export const DEPARTURE = 58;
export const WENT_DARK = 61;

export function formatTime(hour: number): string {
  const minutes = Math.round(hour * 60);
  const day = 14 + Math.floor(minutes / 1440);
  const clock = minutes % 1440;
  const hh = String(Math.floor(clock / 60)).padStart(2, "0");
  const mm = String(clock % 60).padStart(2, "0");
  return `${day} Apr, ${hh}:${mm} Z`;
}

export function formatHours(hours: number): string {
  return Number.isInteger(hours) ? `${hours} h` : `${hours.toFixed(1)} h`;
}

/** Coordinates in the open South Pacific, far from any real coast, so the theater stays fictional. */
export function formatCoordinates([x, y]: Point): string {
  return `${(41 + y * 0.0135).toFixed(2)}° S ${(140 - x * 0.019).toFixed(2)}° W`;
}

/** Text with mentions of map objects, shown as links that select the object. */
export type RichText = readonly (string | { text: string; id: ObjectId })[];

export const placeLabels: { text: string; at: Point; kind: "land" | "sea" }[] = [
  { text: "Varkand", at: [300, 150], kind: "land" },
  { text: "Tarn Island", at: [292, 470], kind: "land" },
  { text: "Halden Island", at: [938, 236], kind: "land" },
  { text: "Kell Island", at: [985, 592], kind: "land" },
  { text: "Halden Strait", at: [780, 150], kind: "sea" },
  { text: "Meridian Sea", at: [800, 650], kind: "sea" },
];

/** A cubic Bezier curve sampled into a polyline. */
function curve(p0: Point, p1: Point, p2: Point, p3: Point, steps = 24): Point[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const c = 3 * u * t * t;
    const d = t * t * t;
    return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]] as const;
  });
}

/** The point at `fraction` of a polyline's length. */
export function pointAlong(points: readonly Point[], fraction: number): Point {
  const segments = points.slice(1).map((end, i) => {
    const start = points[i] ?? end;
    return { start, end, length: Math.hypot(end[0] - start[0], end[1] - start[1]) };
  });
  let remaining = Math.min(Math.max(fraction, 0), 1) * segments.reduce((sum, s) => sum + s.length, 0);
  for (const { start, end, length } of segments) {
    if (remaining <= length) {
      const t = length === 0 ? 0 : remaining / length;
      return [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t];
    }
    remaining -= length;
  }
  return points.at(-1) ?? [0, 0];
}

export const BERTH: Point = [404, 532];
export const LAST_FIX: Point = [456, 528];
/** Talon's known track from its berth to the last fix. */
export const departureTrack: Point[] = [BERTH, [430, 537], LAST_FIX];
/** Projected route A: toward the fishing fleet off Port Halden. */
export const routeA = curve(LAST_FIX, [560, 500], [700, 420], [832, 360]);
/** Projected route B: toward the declared exercise area. */
export const routeB = curve(LAST_FIX, [520, 560], [580, 592], [640, 598]);
/** Route A's vertex where the aircraft finds Talon, halfway along the route. */
export const DETECTION_INDEX = 12;
export const DETECTION: Point = routeA[DETECTION_INDEX] ?? LAST_FIX;
export const ARDEN_START: Point = [1092, 318];
/** Arden's escort transit, around Halden Island and north through the strait. */
export const escortRoute: Point[] = [
  ARDEN_START,
  [1064, 420],
  [968, 446],
  [868, 418],
  [806, 340],
  [776, 236],
  [766, 140],
];
export const KELL: Point = [990, 548];
/** Lark 21 flies from Kell air base to the middle of route A. */
export const uavRoute: Point[] = [KELL, [850, 500], [DETECTION[0] + 26, DETECTION[1] + 6]];

/** Where Talon is at a point on the timeline, before anyone finds it again. */
export function talonPosition(hour: number): Point {
  if (hour <= DEPARTURE) return BERTH;
  if (hour >= WENT_DARK) return LAST_FIX;
  return pointAlong(departureTrack, (hour - DEPARTURE) / (WENT_DARK - DEPARTURE));
}

/** Fishing vessels near Port Halden over time, from radar and imagery counts. */
const fleetCounts: Point[] = [
  [0, 38],
  [48, 41],
  [60, 46],
  [72, 72],
  [80, 104],
  [NOW, 128],
];

export function fleetCount(hour: number): number {
  let previous = fleetCounts[0] ?? [0, 0];
  for (const point of fleetCounts) {
    const [h1, c1] = point;
    const [h0, c0] = previous;
    if (hour <= h1) return h1 === h0 ? c1 : Math.round(c0 + ((c1 - c0) * (hour - h0)) / (h1 - h0));
    previous = point;
  }
  return previous[1];
}

export interface Property {
  label: string;
  value: string;
  /** Makes the value a link to another object. */
  link?: ObjectId;
}

export interface ActivityChartData {
  title: string;
  labels: string[];
  values: number[];
  baseline: number;
  baselineLabel: string;
  /** Unit for tooltips and the table view, such as "vessels". */
  unit: string;
}

export interface Observation {
  model: string;
  vendor: string;
  text: string;
  /** Opens the imagery comparison when the observation is reviewed. */
  imagery?: boolean;
}

export interface MapObject {
  id: ObjectId;
  name: string;
  type: string;
  affiliation: Affiliation;
  icon: IconName;
  position: Point;
  /** Radius of an alert area, in world units. Alerts render as a pin inside an area. */
  area?: number;
  properties: Property[];
  description?: RichText;
  callout?: { intent: Intent; text: string };
  chart?: ActivityChartData;
  observation?: Observation;
  armament?: string[];
  report?: RichText[];
}

export const objects: Record<ObjectId, MapObject> = {
  talon: {
    id: "talon",
    name: "Talon",
    type: "Destroyer",
    affiliation: "hostile",
    icon: "ship",
    position: LAST_FIX,
    properties: [
      { label: "Hull", value: "D-317" },
      { label: "Class", value: "Kestrel class" },
      { label: "Length", value: "155 m" },
      { label: "Top speed", value: "29 kn" },
      { label: "Home port", value: "Tarn naval base", link: "tarn-base" },
      { label: "Last fix", value: formatTime(WENT_DARK) },
    ],
    armament: ["48 air defense missile cells", "8 anti-ship missiles", "1 naval gun, 130 mm"],
    chart: {
      title: "Days at sea per month",
      labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
      values: [4, 6, 3, 7, 9, 16],
      baseline: 6,
      baselineLabel: "Nov to Mar average",
      unit: "days",
    },
    observation: {
      model: "Movement detection",
      vendor: "Corvid Vision",
      text: "Left its berth at 10:00 Z on 16 Apr. No transponder signal since 13:00 Z.",
    },
  },
  "tarn-base": {
    id: "tarn-base",
    name: "Tarn naval base",
    type: "Naval base",
    affiliation: "hostile",
    icon: "shield",
    position: [392, 520],
    properties: [
      { label: "Operator", value: "Varkand navy" },
      { label: "Berths", value: "12" },
      { label: "Ships in port", value: "6 of 7" },
      { label: "Last imagery", value: formatTime(81) },
    ],
    description: [
      "Home port of ",
      { text: "Talon", id: "talon" },
      " and a carrier group. Range rings mark 100 km steps from the base.",
    ],
  },
  "port-halden": {
    id: "port-halden",
    name: "Port Halden",
    type: "Container port",
    affiliation: "civilian",
    icon: "anchor",
    position: [886, 352],
    properties: [
      { label: "Location", value: "Halden Island" },
      { label: "Daily traffic", value: "201 ships" },
      { label: "Area", value: "61 km²" },
      { label: "Primary use", value: "Container shipping" },
    ],
    callout: { intent: "warning", text: "Vessels near the port are 58% above the 30 day average." },
    chart: {
      title: "Vessels within 20 km, per day",
      labels: ["8 Apr", "9 Apr", "10 Apr", "11 Apr", "12 Apr", "13 Apr", "14 Apr", "15 Apr", "16 Apr", "17 Apr"],
      values: [188, 196, 191, 199, 193, 202, 206, 246, 288, 331],
      baseline: 210,
      baselineLabel: "30 day average",
      unit: "vessels",
    },
    observation: {
      model: "Vessel density",
      vendor: "Northwind Labs",
      text: "Fishing vessels near the port rose three days running.",
      imagery: true,
    },
  },
  "fishing-fleet": {
    id: "fishing-fleet",
    name: "Fishing fleet",
    type: "Activity alert",
    affiliation: "civilian",
    icon: "warning-sign",
    position: [838, 356],
    area: 42,
    properties: [
      { label: "First seen", value: formatTime(54) },
      { label: "Area", value: "Approach to Port Halden" },
      { label: "Nearest port", value: "Port Halden", link: "port-halden" },
      { label: "Flag", value: "Varkand, 94%" },
    ],
    description: [
      "Fishing vessels have massed off ",
      { text: "Port Halden", id: "port-halden" },
      " for three days, with no catch reported. Several carry no fishing gear on deck.",
    ],
    chart: {
      title: "Fishing vessels in the area",
      labels: ["12 Apr", "13 Apr", "14 Apr", "15 Apr", "16 Apr", "17 Apr"],
      values: [36, 38, 41, 52, 86, 128],
      baseline: 42,
      baselineLabel: "30 day average",
      unit: "vessels",
    },
  },
  exercise: {
    id: "exercise",
    name: "Exercise area",
    type: "Declared naval exercise",
    affiliation: "hostile",
    icon: "warning-sign",
    position: [650, 600],
    area: 58,
    properties: [
      { label: "Declared by", value: "Varkand navy" },
      { label: "Window", value: "18 Apr to 24 Apr" },
      { label: "Radius", value: "87 km" },
      { label: "Dossier", value: "Exercise report 0417" },
    ],
    report: [
      [
        "(U) Varkand declared a naval exercise from 18 to 24 Apr. The declared area has grown by 40% since March, toward the shipping lanes of ",
        { text: "Port Halden", id: "port-halden" },
        ".",
      ],
      [
        "(U) Imagery shows a carrier group and two submarines preparing at ",
        { text: "Tarn naval base", id: "tarn-base" },
        ". ",
        { text: "Talon", id: "talon" },
        " usually escorts the carrier group.",
      ],
      [
        "(U) Past exercises came before pressure on civilian shipping. Watch for blockade drills and live fire notices.",
      ],
    ],
  },
  arden: {
    id: "arden",
    name: "Arden",
    type: "Frigate",
    affiliation: "friendly",
    icon: "ship",
    position: ARDEN_START,
    properties: [
      { label: "Hull", value: "F-21" },
      { label: "Class", value: "Harbor class" },
      { label: "Speed", value: "16 kn, max 28 kn" },
      { label: "Fuel", value: "82%" },
      { label: "Crew", value: "190" },
    ],
  },
  "kell-base": {
    id: "kell-base",
    name: "Kell air base",
    type: "Air base",
    affiliation: "friendly",
    icon: "airplane",
    position: KELL,
    properties: [
      { label: "Runway", value: "2,800 m" },
      { label: "Aircraft", value: "4 fighters, 2 patrol, 3 UAVs" },
      { label: "Readiness", value: "30 minutes" },
    ],
  },
  uav: {
    id: "uav",
    name: "Lark 21",
    type: "Unmanned aircraft",
    affiliation: "friendly",
    icon: "drone-uav",
    position: KELL,
    properties: [
      { label: "Endurance", value: "26 h" },
      { label: "Sensors", value: "Electro-optical, infrared" },
      { label: "Base", value: "Kell air base", link: "kell-base" },
    ],
  },
};

export const situation = {
  title: "Halden Strait",
  created: "4 hours ago",
  owner: "Capt. Reyes",
  theater: "Meridian Sea",
  details: [
    "Destroyer ",
    { text: "Talon", id: "talon" },
    " left ",
    { text: "Tarn naval base", id: "tarn-base" },
    " 26 hours ago and went dark three hours later. A ",
    { text: "fishing fleet", id: "fishing-fleet" },
    " has massed off ",
    { text: "Port Halden", id: "port-halden" },
    " for three days. If Talon joins it, the group could close the strait.",
  ] satisfies RichText,
};

export interface EnemyCoa {
  id: string;
  title: string;
  proposedBy: string;
  assessment: { label: string; intent: Intent };
  route: "a" | "b";
}

export const enemyCoas: EnemyCoa[] = [
  {
    id: "e1",
    title: "Talon escorts the fishing fleet",
    proposedBy: "Capt. Reyes",
    assessment: { label: "High risk", intent: "danger" },
    route: "a",
  },
  {
    id: "e2",
    title: "Talon joins the naval exercise",
    proposedBy: "Capt. Novak",
    assessment: { label: "Likely", intent: "warning" },
    route: "b",
  },
];

export interface Phase {
  label: string;
  start: number;
  end: number;
}

export interface FriendlyCoa {
  id: string;
  title: string;
  analyst: string;
  hours: number;
  assessment?: { label: string; intent: Intent };
  feasibility: string;
  risk: string;
  review: string;
  tasking: { icon: IconName; label: string };
  phases: Phase[];
}

export const friendlyCoas: FriendlyCoa[] = [
  {
    id: "f1",
    title: "Reinforce Kell air base",
    analyst: "Maj. Lindqvist",
    hours: 19,
    feasibility: "Unknown",
    risk: "Low",
    review: "Not validated",
    tasking: { icon: "airplane", label: "2 fighters from the mainland" },
    phases: [
      { label: "Prepare", start: 0, end: 4 },
      { label: "Transit", start: 4, end: 6 },
      { label: "Deploy", start: 6, end: 19 },
    ],
  },
  {
    id: "f2",
    title: "Patrol flight over the strait",
    analyst: "Capt. Ito",
    hours: 1.5,
    assessment: { label: "High risk", intent: "danger" },
    feasibility: "Feasible",
    risk: "High",
    review: "Not validated",
    tasking: { icon: "airplane", label: "Patrol 4, Kell air base" },
    phases: [
      { label: "Transit", start: 0, end: 0.5 },
      { label: "Patrol", start: 0.5, end: 1.5 },
    ],
  },
  {
    id: "f3",
    title: "Escort transit through the strait",
    analyst: "Capt. Haddad",
    hours: 6,
    assessment: { label: "Feasible", intent: "success" },
    feasibility: "Feasible",
    risk: "Low",
    review: "Validated",
    tasking: { icon: "ship", label: "Frigate Arden" },
    phases: [
      { label: "Prepare", start: 0, end: 1 },
      { label: "Escort transit", start: 1, end: 6 },
    ],
  },
];

export const reviewStages = [
  { id: "safety", label: "Civilian safety review", done: "10 min ago by Capt. Osei" },
  { id: "feasibility", label: "Feasibility", done: "Just now by Omega" },
  { id: "risk", label: "Risk review", done: "30 min ago by Capt. Novak" },
  { id: "validation", label: "Secondary validation", done: "2 min ago by Capt. Haddad" },
] as const;

export type AssetClass = "uav" | "aircraft" | "satellite";

export interface Asset {
  id: string;
  name: string;
  assetClass: AssetClass;
  status: { label: string; intent: Intent };
  base: string;
  eta: string;
  recommended?: boolean;
  disabled?: boolean;
}

export const assets: Asset[] = [
  {
    id: "lark-21",
    name: "Lark 21",
    assetClass: "uav",
    status: { label: "Ready", intent: "success" },
    base: "Kell air base",
    eta: "35 min to area",
    recommended: true,
  },
  {
    id: "lark-24",
    name: "Lark 24",
    assetClass: "uav",
    status: { label: "Ready", intent: "success" },
    base: "Kell air base",
    eta: "50 min to area",
    recommended: true,
  },
  {
    id: "kite-3",
    name: "Kite 3",
    assetClass: "uav",
    status: { label: "Maintenance", intent: "warning" },
    base: "Kell air base",
    eta: "Back in 6 h",
    disabled: true,
  },
  {
    id: "patrol-4",
    name: "Patrol 4",
    assetClass: "aircraft",
    status: { label: "Ready", intent: "success" },
    base: "Kell air base",
    eta: "1 h 10 min to area",
  },
  {
    id: "patrol-7",
    name: "Patrol 7",
    assetClass: "aircraft",
    status: { label: "Refueling", intent: "warning" },
    base: "Kell air base",
    eta: "Ready in 2 h",
    disabled: true,
  },
  {
    id: "tern-2",
    name: "Tern 2",
    assetClass: "satellite",
    status: { label: "Available", intent: "none" },
    base: "Low earth orbit",
    eta: "In range in 2 h",
  },
  {
    id: "plover-5",
    name: "Plover 5",
    assetClass: "satellite",
    status: { label: "Available", intent: "none" },
    base: "Low earth orbit",
    eta: "In range in 4 h",
  },
];

export const models = [
  { id: "threat", name: "Threat avoidance", vendor: "Northwind Labs", fit: 91 },
  { id: "equipment", name: "Equipment detection", vendor: "Corvid Vision", fit: 85 },
  { id: "ship", name: "Ship detection", vendor: "Halcyon AI", fit: 78 },
  { id: "size", name: "Ship size estimation", vendor: "Atlas Optics", fit: 72 },
  { id: "lowlight", name: "Low light enhancement", vendor: "Skylark Imaging", fit: 68 },
] as const;

export const taskingSteps = [
  "Request sent",
  "Request received",
  "Approved by Lt. Brennan",
  "Tasking received",
  "On station over route A",
] as const;

export type SourceId = "imagery" | "signals" | "radar" | "aircraft";

/** Collection sources in their fixed chart color order. */
export const sources: { id: SourceId; label: string }[] = [
  { id: "imagery", label: "Satellite imagery" },
  { id: "signals", label: "Signals intelligence" },
  { id: "radar", label: "Coastal radar" },
  { id: "aircraft", label: "Aircraft sensors" },
];

export interface CollectionEvent {
  id: string;
  source: SourceId;
  hour: number;
  text: string;
}

export const collectionEvents: CollectionEvent[] = [
  { id: "c1", source: "imagery", hour: 10, text: "Talon at its berth, Tarn naval base" },
  { id: "c2", source: "imagery", hour: 34, text: "Talon at its berth, crew loading stores" },
  { id: "c3", source: "imagery", hour: 57, text: "Talon at its berth, engines running" },
  { id: "c4", source: "signals", hour: 59, text: "Navigation radar east of Tarn Island" },
  { id: "c5", source: "signals", hour: 61, text: "Talon transponder signal lost" },
  { id: "c6", source: "radar", hour: 63, text: "Unidentified contact east of Tarn Island, 18 kn" },
  { id: "c7", source: "imagery", hour: 69, text: "Talon berth empty" },
  { id: "c8", source: "radar", hour: 74, text: "Fishing vessel contacts off Port Halden pass 70" },
  { id: "c9", source: "signals", hour: 77, text: "Short transmission burst, central Meridian Sea" },
  { id: "c10", source: "imagery", hour: 81, text: "104 fishing vessels off Port Halden" },
];

/** The event Lark 21 adds when it finds Talon. */
export const detectionEvent: CollectionEvent = {
  id: "c11",
  source: "aircraft",
  hour: NOW,
  text: "Lark 21 finds Talon on route A, heading 055, 12 kn",
};
