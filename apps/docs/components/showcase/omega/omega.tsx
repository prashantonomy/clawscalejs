"use client";

import {
  Button,
  Icon,
  type IconName,
  KeyComboTag,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  OverlayToaster,
  Spinner,
  StatusBar,
  StatusBarItem,
  StatusBarSpacer,
  Tab,
  Tabs,
  type ToastProps,
  Tooltip,
  useHotkeys,
  useTheme,
} from "@clawscale/react";
import { Omnibar } from "@clawscale/react/select";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ThemePicker } from "@/components/docs/theme-picker";
import { AssetTasking, type TaskingOrder } from "./asset-tasking";
import {
  ARDEN_START,
  type AssetClass,
  collectionEvents,
  DEPARTURE,
  DETECTION,
  DETECTION_INDEX,
  departureTrack,
  detectionEvent,
  escortRoute,
  type FriendlyCoa,
  fleetCount,
  formatCoordinates,
  formatHours,
  formatTime,
  type MapObject,
  NOW,
  type ObjectId,
  objects,
  type Point,
  pointAlong,
  routeA,
  routeB,
  talonPosition,
  uavRoute,
  WENT_DARK,
} from "./data";
import { ImageryDialog, TaskOrderDialog } from "./dialogs";
import { Inspector, type ObjectStatus } from "./inspector";
import { defaultLayers, type Layers, LayersPanel } from "./layers-panel";
import { type MapAction, type MapArea, type MapMarker, type MapScene, type MapTrack, MapView } from "./map-view";
import { SituationPanel, type SituationStatus } from "./situation-panel";
import { TimelinePanel, type TimelineTab } from "./timeline-panel";
import { useElementSize } from "./use-element-size";

type LeftTab = "situation" | "assets" | "layers";

const apps: { id: string; label: string; icon: IconName }[] = [
  { id: "map", label: "Map", icon: "map" },
  { id: "graph", label: "Graph", icon: "graph" },
  { id: "dossiers", label: "Dossiers", icon: "document" },
  { id: "feeds", label: "Sensor feeds", icon: "mobile-video" },
  { id: "table", label: "Tables", icon: "th" },
];

const people = [
  { initials: "LR", name: "Capt. Reyes" },
  { initials: "KI", name: "Capt. Ito" },
  { initials: "AH", name: "Capt. Haddad" },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The Omega mark: an omega in the theme's primary color. */
function OmegaMark() {
  return (
    <span className="omega-mark">
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M8.5 23.5h5v-2.6a7.6 7.6 0 1 1 5 0v2.6h5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </span>
  );
}

/** Animates a value from 0 to 1 over `seconds` while `running`, then stops. */
function useProgress(running: boolean, seconds: number, onDone?: () => void): [number, (value: number) => void] {
  const [value, setValue] = useState(0);
  const finished = value >= 1;
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    if (!running || finished) return;
    if (prefersReducedMotion()) {
      setValue(1);
      return;
    }
    const step = 0.05 / seconds;
    const timer = window.setInterval(() => setValue((current) => Math.min(current + step, 1)), 50);
    return () => window.clearInterval(timer);
  }, [running, finished, seconds]);
  useEffect(() => {
    if (value >= 1) done.current?.();
  }, [value]);
  return [value, setValue];
}

export function Omega() {
  const { resolvedColorScheme, setColorScheme } = useTheme();
  const toaster = useRef<OverlayToaster>(null);
  const [selectedId, setSelectedId] = useState<ObjectId | null>("talon");
  const [focus, setFocus] = useState<{ point: Point; nonce: number } | null>(null);
  const [leftTab, setLeftTab] = useState<LeftTab>("situation");
  const [layers, setLayers] = useState<Layers>(defaultLayers);
  const [focusedRoute, setFocusedRoute] = useState<"a" | "b" | null>(null);
  const [expandedCoa, setExpandedCoa] = useState<string | null>("f3");
  const [taskedCoas, setTaskedCoas] = useState<ReadonlySet<string>>(new Set());
  const [dialogCoa, setDialogCoa] = useState<FriendlyCoa | null>(null);
  const [imageryOpen, setImageryOpen] = useState(false);
  const [status, setStatus] = useState<SituationStatus>("active");
  const resolving = useRef<number | undefined>(undefined);
  const [hour, setHour] = useState(NOW);
  const [playing, setPlaying] = useState(false);
  const [timelineTab, setTimelineTab] = useState<TimelineTab>("coas");
  const [timelineCollapsed, setTimelineCollapsed] = useState(false);
  const [assetClass, setAssetClass] = useState<AssetClass>("uav");
  const [order, setOrder] = useState<TaskingOrder | null>(null);
  const [located, setLocated] = useState(false);
  const [geofences, setGeofences] = useState<Point[]>([]);
  const [dismissed, setDismissed] = useState<ReadonlySet<ObjectId>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [starred, setStarred] = useState(true);
  const [leftRef, leftSize] = useElementSize<HTMLDivElement>({ width: 340, height: 0 });
  const [rightRef, rightSize] = useElementSize<HTMLDivElement>({ width: 340, height: 0 });
  const [bottomRef, bottomSize] = useElementSize<HTMLDivElement>({ width: 0, height: 214 });

  const notify = useCallback((toast: ToastProps, key?: string) => toaster.current?.show(toast, key), []);

  // Moving objects: selection reads their latest position, also from toasts made earlier.
  const positions = useRef<Partial<Record<ObjectId, Point>>>({});
  const select = useCallback((id: ObjectId, center = false) => {
    setSelectedId(id);
    const point = positions.current[id] ?? objects[id].position;
    if (center) setFocus((current) => ({ point, nonce: (current?.nonce ?? 0) + 1 }));
  }, []);

  const centerOn = useCallback(
    (point: Point) => setFocus((current) => ({ point, nonce: (current?.nonce ?? 0) + 1 })),
    [],
  );

  const hotkeys = useMemo(
    () => [
      {
        combo: "mod+k",
        global: true,
        label: "Search the map",
        preventDefault: true,
        onKeyDown: () => setSearchOpen(true),
      },
    ],
    [],
  );
  useHotkeys(hotkeys);

  // Playback runs the collection timeline up to now, about ten hours a second.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setHour((current) => Math.min(current + 0.5, NOW)), 50);
    return () => window.clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    if (playing && hour >= NOW) setPlaying(false);
  }, [playing, hour]);

  // The tasking order moves one step at a time, then the aircraft flies to route A.
  const flying = order !== null && order.stepsDone === 4;
  const [flight, setFlight] = useProgress(flying, 4.5, () =>
    setOrder((current) => (current && current.stepsDone === 4 ? { ...current, stepsDone: 5 } : current)),
  );
  useEffect(() => {
    if (!order || order.stepsDone >= 4) return;
    const timer = window.setTimeout(
      () => setOrder((current) => current && { ...current, stepsDone: current.stepsDone + 1 }),
      order.stepsDone === 1 ? 700 : 1000,
    );
    return () => window.clearTimeout(timer);
  }, [order]);
  useEffect(() => {
    if (!order || order.stepsDone < 5 || located) return;
    const timer = window.setTimeout(() => {
      setLocated(true);
      setHour(NOW);
      notify({
        intent: "danger",
        icon: "locate",
        message: `${order.asset.name} found Talon on route A, heading toward Port Halden.`,
        action: { text: "Show", onClick: () => select("talon", true) },
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [order, located, notify, select]);

  // Arden sails the escort route once its task order goes out.
  const [escort, setEscort] = useProgress(taskedCoas.has("f3"), 9);

  const deploy = (asset: TaskingOrder["asset"]) => {
    setFlight(0);
    setOrder({ asset, stepsDone: 1 });
  };

  const resetTasking = () => {
    setOrder(null);
    setFlight(0);
  };

  const submitOrder = (coa: FriendlyCoa) => {
    setTaskedCoas((current) => new Set(current).add(coa.id));
    setDialogCoa(null);
    if (coa.id === "f3") setEscort(0);
    notify({
      intent: "success",
      icon: "tick",
      message: `Task order sent: ${coa.tasking.label}.`,
      action: coa.id === "f3" ? { text: "Show Arden", onClick: () => select("arden", true) } : undefined,
    });
  };

  const resolve = () => {
    setStatus("resolving");
    notify(
      {
        icon: <Spinner size={16} aria-label="Updating" className="omega-toast-spinner" />,
        message: "Updating Halden Strait to resolved.",
        timeout: 0,
        action: {
          text: "Cancel",
          onClick: () => {
            window.clearTimeout(resolving.current);
            setStatus("active");
          },
        },
      },
      "resolve",
    );
    // The same toast turns into the result. Dismissing one toast and showing another in the same
    // tick makes Blueprint's toaster play the exit transition on the new one, which hides it.
    resolving.current = window.setTimeout(() => {
      setStatus("resolved");
      notify(
        {
          intent: "success",
          icon: "tick-circle",
          message: "Halden Strait is resolved. Write the after action report while the details are fresh.",
          action: {
            text: "Start report",
            // The action closes this toast first, so the next one waits for the exit transition.
            onClick: () =>
              window.setTimeout(
                () => notify({ icon: "document", message: "Draft report created in Halden Strait, Reports." }),
                400,
              ),
          },
        },
        "resolve",
      );
    }, 2000);
  };

  useEffect(() => () => window.clearTimeout(resolving.current), []);

  const mapAction = (action: MapAction, point: Point) => {
    const place = formatCoordinates(point);
    if (action === "collect") {
      setLeftTab("assets");
      setAssetClass("satellite");
      notify({ icon: "satellite", message: `Collection area set to ${place}.` });
    } else if (action === "search") {
      const near = Object.values(objects).filter(
        (object) => Math.hypot(object.position[0] - point[0], object.position[1] - point[1]) < 100,
      );
      notify({ icon: "geosearch", message: `${near.length} objects within 150 km of ${place}.` });
    } else if (action === "geofence") {
      setGeofences((current) => [...current, point]);
      setLayers((current) => ({ ...current, geofences: true }));
      notify({
        icon: "geofence",
        message: "Geofence created. Alerts fire when a hostile unit enters it.",
        action: { text: "Undo", onClick: () => setGeofences((current) => current.filter((p) => p !== point)) },
      });
    } else {
      void navigator.clipboard?.writeText(place);
      notify({ icon: "duplicate", message: `Copied ${place}.` });
    }
  };

  // What the map shows at the playhead.
  // The sighting happens at now, so scrubbing back shows Talon's history again.
  const sighted = located && hour >= NOW;
  const talonDark = !sighted && hour >= WENT_DARK;
  const talonAt = sighted ? DETECTION : talonPosition(hour);
  const fleet = fleetCount(hour);
  const uavVisible = order !== null && order.stepsDone >= 4;
  const uavAt = pointAlong(uavRoute, flight);
  const ardenAt = pointAlong(escortRoute, escort);
  const ardenMoving = taskedCoas.has("f3");
  positions.current = { talon: talonAt, arden: ardenMoving ? ardenAt : ARDEN_START, uav: uavAt };

  const scene = useMemo<MapScene>(() => {
    const markers: MapMarker[] = [
      {
        id: "talon",
        label: talonDark ? "Talon, last fix" : "Talon",
        description: `Talon, destroyer, hostile${talonDark ? ", last known position" : ""}`,
        icon: "ship",
        affiliation: "hostile",
        position: talonAt,
        uncertain: talonDark,
      },
      {
        id: "tarn-base",
        label: "Tarn naval base",
        description: "Tarn naval base, hostile",
        icon: "shield",
        affiliation: "hostile",
        position: objects["tarn-base"].position,
      },
      {
        id: "port-halden",
        label: "Port Halden",
        description: "Port Halden, civilian port",
        icon: "anchor",
        affiliation: "civilian",
        position: objects["port-halden"].position,
      },
      {
        id: "fishing-fleet",
        label: `Fishing fleet, ${fleet}`,
        description: `Fishing fleet alert, ${fleet} vessels`,
        icon: "warning-sign",
        affiliation: "civilian",
        alert: true,
        position: objects["fishing-fleet"].position,
      },
      {
        id: "exercise",
        label: "Exercise area",
        description: "Declared naval exercise area, hostile",
        icon: "warning-sign",
        affiliation: "hostile",
        alert: true,
        position: objects.exercise.position,
      },
    ];
    if (layers.friendly) {
      markers.push(
        {
          id: "arden",
          label: "Arden",
          description: "Arden, frigate, friendly",
          icon: "ship",
          affiliation: "friendly",
          position: ardenMoving ? ardenAt : ARDEN_START,
        },
        {
          id: "kell-base",
          label: "Kell air base",
          description: "Kell air base, friendly",
          icon: "airplane",
          affiliation: "friendly",
          position: objects["kell-base"].position,
        },
      );
      if (uavVisible && order) {
        markers.push({
          id: "uav",
          label: order.asset.name,
          description: `${order.asset.name}, ${order.asset.assetClass === "uav" ? "unmanned aircraft" : "aircraft"}, friendly`,
          icon: order.asset.assetClass === "uav" ? "drone-uav" : "airplane",
          affiliation: "friendly",
          position: uavAt,
        });
      }
    }

    const areas: MapArea[] = [];
    if (layers.areas) {
      areas.push(
        { id: "fleet", center: objects["fishing-fleet"].position, radius: 18 + fleet * 0.19, tone: "danger" },
        { id: "exercise", center: objects.exercise.position, radius: objects.exercise.area ?? 50, tone: "danger" },
      );
    }
    if (layers.geofences) {
      for (const [i, point] of geofences.entries()) {
        areas.push({ id: `geofence-${i}`, center: point, radius: 30, tone: "primary", dashed: true });
      }
    }
    if (layers.friendly && uavVisible && flight >= 1) {
      // The aircraft circles its target. Its route ends on this circle.
      areas.push({ id: "orbit", center: DETECTION, radius: 27, tone: "primary", dashed: true });
    }

    const tracks: MapTrack[] = [];
    if (layers.routes && hour >= WENT_DARK) {
      tracks.push(
        {
          id: "route-a",
          points: sighted ? routeA.slice(DETECTION_INDEX) : routeA,
          tone: "hostile",
          line: "dashed",
          emphasis: focusedRoute === "a" || sighted ? "strong" : focusedRoute === "b" ? "muted" : undefined,
          label: "Route A",
        },
        {
          id: "route-b",
          points: routeB,
          tone: "hostile",
          line: "dashed",
          emphasis: focusedRoute === "b" ? "strong" : focusedRoute === "a" || sighted ? "muted" : undefined,
          label: "Route B",
        },
      );
    }
    if (layers.tracks && hour > DEPARTURE) {
      const known = hour >= WENT_DARK ? departureTrack : [departureTrack[0] ?? talonAt, talonAt];
      tracks.push({
        id: "talon-track",
        points: sighted ? [...known, ...routeA.slice(1, DETECTION_INDEX + 1)] : known,
        tone: "hostile",
        line: "solid",
      });
    }
    if (layers.friendly && ardenMoving) {
      const along = Math.max(1, Math.ceil(escort * (escortRoute.length - 1)));
      tracks.push(
        { id: "arden-done", points: [...escortRoute.slice(0, along), ardenAt], tone: "friendly", line: "solid" },
        { id: "arden-plan", points: [ardenAt, ...escortRoute.slice(along)], tone: "friendly", line: "dotted" },
      );
    }
    if (layers.friendly && uavVisible && flight < 1) {
      tracks.push({ id: "uav-plan", points: [uavAt, ...uavRoute.slice(-1)], tone: "friendly", line: "dotted" });
    }

    return {
      markers,
      tracks,
      areas,
      rings: layers.rings ? { center: objects["tarn-base"].position, stepKm: 100, count: 3 } : undefined,
      labels: layers.labels,
    };
  }, [
    layers,
    talonDark,
    talonAt,
    fleet,
    ardenMoving,
    ardenAt,
    escort,
    uavVisible,
    uavAt,
    flight,
    order,
    geofences,
    sighted,
    hour,
    focusedRoute,
  ]);

  const selected: MapObject | null = selectedId
    ? { ...objects[selectedId], name: selectedId === "uav" && order ? order.asset.name : objects[selectedId].name }
    : null;

  const objectStatus = (id: ObjectId): ObjectStatus | undefined => {
    switch (id) {
      case "talon":
        if (sighted) return { label: "Sighted on route A", intent: "danger", icon: "eye-open" };
        if (hour < DEPARTURE) return { label: "In port", intent: "none", icon: "anchor" };
        if (hour < WENT_DARK) return { label: "Under way", intent: "warning", icon: "route" };
        return { label: `Dark for ${formatHours(Math.floor(hour - WENT_DARK))}`, intent: "warning", icon: "eye-off" };
      case "fishing-fleet":
        return { label: `${fleet} vessels`, intent: "danger", icon: "warning-sign" };
      case "exercise":
        return { label: "Starts 18 Apr", intent: "warning", icon: "calendar" };
      case "arden":
        if (!ardenMoving) return { label: "Ready", intent: "success", icon: "tick-circle" };
        return escort < 1
          ? { label: "Escorting", intent: "primary", icon: "route" }
          : { label: "On station", intent: "success", icon: "tick-circle" };
      case "uav":
        if (!order || order.stepsDone < 4) return { label: "Awaiting tasking", intent: "none", icon: "time" };
        if (order.stepsDone === 4) return { label: "En route", intent: "primary", icon: "route" };
        return located
          ? { label: "Tracking Talon", intent: "primary", icon: "locate" }
          : { label: "On station", intent: "success", icon: "tick-circle" };
      case "kell-base":
        return { label: "Ready", intent: "success", icon: "tick-circle" };
      default:
        return undefined;
    }
  };

  const progress =
    selectedId === "arden" && ardenMoving && escort < 1
      ? { label: "Escort transit", value: escort }
      : selectedId === "uav" && order?.stepsDone === 4
        ? { label: "Transit to route A", value: flight }
        : undefined;

  const searchable = Object.values(objects).filter((object) => object.id !== "uav" || uavVisible);
  const events = located ? [...collectionEvents, detectionEvent] : collectionEvents;
  const insets = {
    top: 12,
    left: leftSize.width > 0 ? leftSize.width + 24 : 12,
    right: rightSize.width > 0 ? rightSize.width + 24 : 12,
    bottom: bottomSize.height > 0 ? bottomSize.height + 24 : 12,
  };

  return (
    <div className="omega">
      <div className="omega-banner" role="note">
        Unclassified. Notional data for demonstration.
      </div>
      <Navbar className="omega-navbar">
        <NavbarGroup>
          <Link href="/showcase/" className="omega-brand" aria-label="Omega, back to all showcases">
            <OmegaMark />
            <span>Omega</span>
          </Link>
          <NavbarDivider />
          <Icon icon="globe-network" size={14} className="omega-title-icon" />
          <h1 className="omega-title">Meridian Sea</h1>
          <Button
            icon={starred ? "star" : "star-empty"}
            variant="minimal"
            size="small"
            aria-label="Favorite"
            aria-pressed={starred}
            className="omega-star"
            onClick={() => setStarred(!starred)}
          />
          <span className="omega-saved">
            <Icon icon="cloud-tick" size={12} />
            Saved
          </span>
        </NavbarGroup>
        <NavbarGroup align="end" className="omega-navbar-end">
          <Button
            className="omega-search"
            icon="search"
            text="Search the map"
            aria-label="Search the map"
            endIcon={<KeyComboTag combo="mod+k" minimal />}
            alignText="start"
            onClick={() => setSearchOpen(true)}
          />
          <span className="omega-people">
            {people.map((person) => (
              <span key={person.initials} className="omega-person" role="img" aria-label={person.name}>
                {person.initials}
              </span>
            ))}
          </span>
          <Button icon="people" text="Share" variant="minimal" />
          <Button icon="notifications" variant="minimal" aria-label="Notifications" />
          <ThemePicker className="omega-theme" />
          <Button
            variant="minimal"
            aria-label="Toggle dark mode"
            onClick={() => setColorScheme(resolvedColorScheme === "dark" ? "light" : "dark")}
          >
            <Icon icon="moon" className="scheme-show-light" />
            <Icon icon="flash" className="scheme-show-dark" />
          </Button>
        </NavbarGroup>
      </Navbar>

      <div className="omega-body">
        <nav className="omega-rail" aria-label="Apps">
          {apps.map((app) => (
            <Tooltip key={app.id} content={app.label} placement="right">
              <Button
                icon={app.icon}
                variant="minimal"
                aria-label={app.label}
                active={app.id === "map"}
                aria-current={app.id === "map" ? "page" : undefined}
              />
            </Tooltip>
          ))}
          <span className="omega-rail-spacer" />
          <Tooltip content="Help" placement="right">
            <Button icon="help" variant="minimal" aria-label="Help" />
          </Tooltip>
          <Tooltip content="Settings" placement="right">
            <Button icon="cog" variant="minimal" aria-label="Settings" />
          </Tooltip>
        </nav>

        <main className="omega-workspace">
          <MapView
            scene={scene}
            selectedId={selectedId}
            onSelect={(id) => select(id)}
            onAction={mapAction}
            insets={insets}
            focus={focus}
            controls={
              <Button
                icon="layers"
                aria-label="Map layers"
                className="omega-map-layers"
                onClick={() => setLeftTab("layers")}
              />
            }
          />

          <div className="omega-panel omega-left" ref={leftRef}>
            <Tabs
              id="omega-left-tabs"
              selectedTabId={leftTab}
              onChange={(id) => setLeftTab(id as LeftTab)}
              renderActiveTabPanelOnly
              fill
            >
              <Tab
                id="situation"
                icon="issue"
                title="Situation"
                panel={
                  <SituationPanel
                    status={status}
                    located={located}
                    focusedRoute={focusedRoute}
                    expandedCoa={expandedCoa}
                    taskedCoas={taskedCoas}
                    onResolve={resolve}
                    onSelect={(id) => select(id, true)}
                    onFocusRoute={(route) => {
                      setFocusedRoute(route);
                      if (route) setLayers((current) => ({ ...current, routes: true }));
                    }}
                    onExpandCoa={setExpandedCoa}
                    onCompare={(id) => {
                      setExpandedCoa(id);
                      setTimelineTab("coas");
                      setTimelineCollapsed(false);
                    }}
                    onChooseCoa={setDialogCoa}
                  />
                }
              />
              <Tab
                id="assets"
                icon="drone-uav"
                title="Assets"
                panel={
                  <AssetTasking
                    assetClass={assetClass}
                    onAssetClass={setAssetClass}
                    order={order}
                    located={located}
                    onDeploy={deploy}
                    onShowTalon={() => select("talon", true)}
                    onReset={resetTasking}
                  />
                }
              />
              <Tab
                id="layers"
                icon="layers"
                title="Layers"
                panel={<LayersPanel layers={layers} onChange={setLayers} />}
              />
            </Tabs>
          </div>

          <div className="omega-right" ref={rightRef}>
            {selected && (
              <Inspector
                key={selected.id}
                object={selected}
                status={objectStatus(selected.id)}
                progress={progress}
                located={located}
                observationDismissed={dismissed.has(selected.id)}
                onSelect={(id) => select(id, true)}
                onClose={() => setSelectedId(null)}
                onCenter={() => select(selected.id, true)}
                onProjectRoutes={() => {
                  setLayers((current) => ({ ...current, routes: true }));
                  setHour(NOW);
                  centerOn([640, 470]);
                }}
                onTaskAsset={() => {
                  setLeftTab("assets");
                  setAssetClass("uav");
                }}
                onReviewObservation={() => setImageryOpen(true)}
                onDismissObservation={() => setDismissed((current) => new Set(current).add(selected.id))}
              />
            )}
          </div>

          <div className="omega-bottom" ref={bottomRef}>
            <TimelinePanel
              tab={timelineTab}
              onTab={setTimelineTab}
              collapsed={timelineCollapsed}
              onCollapsed={setTimelineCollapsed}
              playing={playing}
              onPlaying={(next) => {
                if (next && hour >= NOW) setHour(0);
                setPlaying(next);
              }}
              hour={hour}
              events={events}
              onHour={(next) => {
                setPlaying(false);
                setHour(next);
              }}
              focusedCoa={expandedCoa}
              taskedCoas={taskedCoas}
              onFocusCoa={(id) => {
                setExpandedCoa(id);
                setLeftTab("situation");
              }}
            />
          </div>
        </main>
      </div>

      <StatusBar className="omega-statusbar">
        <StatusBarItem icon="tick-circle" intent="success">
          Connected
        </StatusBarItem>
        <StatusBarItem icon="database">6 sources</StatusBarItem>
        <StatusBarItem icon="path">148 tracks</StatusBarItem>
        <StatusBarItem icon="time">Updated 2 min ago</StatusBarItem>
        <StatusBarSpacer />
        <StatusBarItem icon="globe">Meridian Sea</StatusBarItem>
        <StatusBarItem>{formatTime(NOW)}</StatusBarItem>
      </StatusBar>

      <Omnibar<MapObject>
        isOpen={searchOpen}
        items={searchable}
        itemPredicate={(query, object) =>
          `${object.name} ${object.type}`.toLowerCase().includes(query.trim().toLowerCase())
        }
        itemRenderer={(object, { handleClick, handleFocus, id, modifiers, ref }) =>
          modifiers.matchesPredicate ? (
            <MenuItem
              key={object.id}
              ref={ref}
              id={id}
              active={modifiers.active}
              disabled={modifiers.disabled}
              icon={object.icon}
              label={object.type}
              onClick={handleClick}
              onFocus={handleFocus}
              roleStructure="listoption"
              text={object.id === "uav" && order ? order.asset.name : object.name}
            />
          ) : null
        }
        noResults={<MenuItem disabled text="Nothing on the map matches." roleStructure="listoption" />}
        inputProps={{ placeholder: "Search units, sites and alerts", "aria-label": "Search the map" }}
        onClose={() => setSearchOpen(false)}
        onItemSelect={(object) => {
          setSearchOpen(false);
          select(object.id, true);
        }}
        resetOnSelect
      />

      <TaskOrderDialog coa={dialogCoa} onClose={() => setDialogCoa(null)} onSubmit={submitOrder} />
      <ImageryDialog
        isOpen={imageryOpen}
        onClose={() => setImageryOpen(false)}
        onCreatePlan={() => {
          setImageryOpen(false);
          setLeftTab("situation");
          setExpandedCoa("f3");
          notify({ icon: "flow-linear", message: "Plan started from the observation. Pick a course of action." });
        }}
      />
      <OverlayToaster ref={toaster} position="top" />
    </div>
  );
}
