"use client";

import { Alignment, Icon, type IconName, Switch } from "@clawscale/react";
import type { Affiliation } from "./data";

export type LayerId = "tracks" | "routes" | "areas" | "rings" | "friendly" | "geofences" | "labels";
export type Layers = Record<LayerId, boolean>;

export const defaultLayers: Layers = {
  tracks: true,
  routes: true,
  areas: true,
  rings: true,
  friendly: true,
  geofences: true,
  labels: true,
};

const layerList: { id: LayerId; label: string; description: string; icon: IconName }[] = [
  { id: "tracks", label: "Known tracks", description: "Talon from its berth to the last fix", icon: "path" },
  { id: "routes", label: "Projected routes", description: "Where Talon could be heading", icon: "route" },
  { id: "areas", label: "Alert areas", description: "Fishing fleet and exercise area", icon: "warning-sign" },
  { id: "rings", label: "Range rings", description: "100 km steps from Tarn naval base", icon: "range-ring" },
  { id: "friendly", label: "Friendly units", description: "Ships, aircraft and bases", icon: "shield" },
  { id: "geofences", label: "Geofences", description: "Drawn from the map menu", icon: "geofence" },
  { id: "labels", label: "Labels", description: "Place and unit names", icon: "label" },
];

const legend: { affiliation: Affiliation; label: string; alert?: boolean; icon: IconName }[] = [
  { affiliation: "hostile", label: "Hostile unit", icon: "ship" },
  { affiliation: "friendly", label: "Friendly unit", icon: "ship" },
  { affiliation: "civilian", label: "Civilian site", icon: "anchor" },
  { affiliation: "hostile", label: "Alert", alert: true, icon: "warning-sign" },
];

export function LayersPanel({ layers, onChange }: { layers: Layers; onChange: (layers: Layers) => void }) {
  return (
    <div className="omega-layers">
      <h3 className="omega-panel-title">Map layers</h3>
      <div className="omega-layer-list">
        {layerList.map((layer) => (
          <Switch
            key={layer.id}
            className="omega-layer"
            alignIndicator={Alignment.END}
            checked={layers[layer.id]}
            onChange={(event) => onChange({ ...layers, [layer.id]: event.currentTarget.checked })}
            labelElement={
              <span className="omega-card-row">
                <Icon icon={layer.icon} size={14} className="omega-card-icon" />
                <span className="omega-card-text">
                  <strong>{layer.label}</strong>
                  <span>{layer.description}</span>
                </span>
              </span>
            }
          />
        ))}
      </div>
      <h3 className="omega-panel-title">Legend</h3>
      <ul className="omega-legend">
        {legend.map((item) => (
          <li key={item.label}>
            <span className="omega-badge" data-affiliation={item.affiliation} data-alert={item.alert || undefined}>
              <Icon icon={item.icon} size={12} />
            </span>
            {item.label}
          </li>
        ))}
        <li>
          <span className="omega-legend-line" data-tone="hostile" data-line="dashed" />
          Projected route
        </li>
        <li>
          <span className="omega-legend-line" data-tone="friendly" data-line="dotted" />
          Planned route
        </li>
      </ul>
    </div>
  );
}
