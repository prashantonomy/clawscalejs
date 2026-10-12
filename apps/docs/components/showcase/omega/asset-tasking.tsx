"use client";

import {
  Alignment,
  Button,
  Callout,
  CheckboxCard,
  Icon,
  InputGroup,
  RadioCard,
  RadioGroup,
  SegmentedControl,
  Spinner,
  Tag,
} from "@clawscale/react";
import { useState } from "react";
import { type Asset, type AssetClass, assets, formatTime, models, NOW, taskingSteps } from "./data";

export interface TaskingOrder {
  asset: Asset;
  /** How many of `taskingSteps` are complete. */
  stepsDone: number;
}

export interface AssetTaskingProps {
  assetClass: AssetClass;
  onAssetClass: (assetClass: AssetClass) => void;
  order: TaskingOrder | null;
  located: boolean;
  onDeploy: (asset: Asset) => void;
  onShowTalon: () => void;
  onReset: () => void;
}

const classOptions: { label: string; value: AssetClass }[] = [
  { label: "Unmanned", value: "uav" },
  { label: "Aircraft", value: "aircraft" },
  { label: "Satellites", value: "satellite" },
];

const assetIcon: Record<AssetClass, "drone-uav" | "airplane" | "satellite"> = {
  uav: "drone-uav",
  aircraft: "airplane",
  satellite: "satellite",
};

function fitIntent(fit: number) {
  return fit >= 80 ? "success" : fit >= 70 ? "none" : "warning";
}

function Order({
  order,
  located,
  onShowTalon,
  onReset,
}: Omit<AssetTaskingProps, "assetClass" | "onAssetClass" | "onDeploy"> & { order: TaskingOrder }) {
  const finished = order.stepsDone >= taskingSteps.length;
  return (
    <div className="omega-tasking-order">
      <div className="omega-tasking-heading">
        <h3>Tasking order for {order.asset.name}</h3>
        <span>{order.asset.base}</span>
      </div>
      <ol className="omega-steps" aria-label="Tasking progress">
        {taskingSteps.map((step, i) => {
          const state = i < order.stepsDone ? "done" : i === order.stepsDone ? "active" : "pending";
          return (
            <li key={step} data-state={state}>
              {state === "done" ? (
                <Icon icon="tick-circle" intent="success" size={16} />
              ) : state === "active" ? (
                <Spinner size={16} aria-label={`${step}, in progress`} />
              ) : (
                <Icon icon="circle" size={16} />
              )}
              <span>{step}</span>
            </li>
          );
        })}
      </ol>
      {located && (
        <Callout intent="danger" icon="locate" title="Talon found" compact>
          {order.asset.name} found Talon on route A, 140 km southwest of Port Halden, heading 055 at 12 knots.
          <div className="omega-callout-actions">
            <Button size="small" text="Show Talon" onClick={onShowTalon} />
          </div>
        </Callout>
      )}
      <Button
        className="omega-tasking-reset"
        icon="reset"
        text="Task another asset"
        variant="minimal"
        disabled={!finished}
        onClick={onReset}
      />
    </div>
  );
}

/** Find an asset, choose the models it runs, then follow the tasking order. */
export function AssetTasking({
  assetClass,
  onAssetClass,
  order,
  located,
  onDeploy,
  onShowTalon,
  onReset,
}: AssetTaskingProps) {
  const [step, setStep] = useState<"asset" | "models">("asset");
  const [query, setQuery] = useState("");
  const [assetId, setAssetId] = useState("lark-21");
  const [chosen, setChosen] = useState<ReadonlySet<string>>(new Set(["threat", "equipment", "ship"]));

  if (order) return <Order order={order} located={located} onShowTalon={onShowTalon} onReset={onReset} />;

  const options = assets.filter(
    (asset) => asset.assetClass === assetClass && asset.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const selected = assets.find((asset) => asset.id === assetId && asset.assetClass === assetClass && !asset.disabled);
  const blocked = assetClass === "satellite";

  if (step === "models" && selected) {
    return (
      <div className="omega-tasking">
        <div className="omega-tasking-heading">
          <h3>Choose models</h3>
          <span>Sorted by best fit for {selected.name}</span>
        </div>
        <div className="omega-model-list">
          {models.map((model) => (
            <CheckboxCard
              key={model.id}
              compact
              alignIndicator={Alignment.END}
              checked={chosen.has(model.id)}
              onChange={() =>
                setChosen((current) => {
                  const next = new Set(current);
                  if (next.has(model.id)) next.delete(model.id);
                  else next.add(model.id);
                  return next;
                })
              }
            >
              <span className="omega-card-row">
                <Icon icon="predictive-analysis" size={14} className="omega-card-icon" />
                <span className="omega-card-text">
                  <strong>{model.name}</strong>
                  <span>{model.vendor}</span>
                </span>
                <Tag minimal intent={fitIntent(model.fit)}>
                  {model.fit}% fit
                </Tag>
              </span>
            </CheckboxCard>
          ))}
        </div>
        <Button variant="minimal" size="small" text="See all 58 models" className="omega-tasking-more" />
        <div className="omega-tasking-footer">
          <Button text="Back" icon="arrow-left" onClick={() => setStep("asset")} />
          <Button
            intent="primary"
            text="Deploy and task"
            endIcon="send-message"
            disabled={chosen.size === 0}
            onClick={() => {
              setStep("asset");
              onDeploy(selected);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="omega-tasking">
      <div className="omega-tasking-target">
        <Icon icon="area-of-interest" size={16} />
        <span className="omega-card-text">
          <strong>Route A, from Talon's last fix</strong>
          <span>
            {formatTime(NOW)} to {formatTime(NOW + 3)}
          </span>
        </span>
      </div>
      <SegmentedControl
        aria-label="Asset type"
        fill
        size="small"
        options={classOptions}
        value={assetClass}
        onValueChange={(value) => onAssetClass(value as AssetClass)}
      />
      {blocked && (
        <Callout compact intent="warning" icon="cloud" title="No imaging window">
          Cloud covers the strait until 14:00 Z, and no satellite passes before then.
          <div className="omega-callout-actions">
            <Button size="small" text="Use unmanned aircraft" onClick={() => onAssetClass("uav")} />
          </div>
        </Callout>
      )}
      <InputGroup
        leftIcon="search"
        size="small"
        placeholder={`Search ${classOptions.find((option) => option.value === assetClass)?.label.toLowerCase()} assets`}
        aria-label="Search assets"
        value={query}
        onValueChange={setQuery}
      />
      <RadioGroup
        name="omega-asset"
        aria-label="Assets"
        className="omega-asset-list"
        selectedValue={selected?.id ?? ""}
        onChange={(event) => setAssetId(event.currentTarget.value)}
      >
        {options.map((asset) => (
          <RadioCard
            key={asset.id}
            compact
            value={asset.id}
            disabled={asset.disabled || blocked}
            // RadioGroup does not pass its name to RadioCard inputs, so the group needs it here.
            inputProps={{ name: "omega-asset" }}
          >
            <span className="omega-card-row">
              <Icon icon={assetIcon[asset.assetClass]} size={14} className="omega-card-icon" />
              <span className="omega-card-text">
                <strong>{asset.name}</strong>
                <span>
                  {asset.base}, {asset.eta}
                </span>
              </span>
              <Tag minimal intent={asset.status.intent}>
                {asset.status.label}
              </Tag>
            </span>
          </RadioCard>
        ))}
      </RadioGroup>
      {options.length === 0 && <p className="omega-empty">No assets match.</p>}
      <div className="omega-tasking-footer">
        <span className="omega-tasking-hint">
          {selected?.recommended ? "Recommended for this area" : selected ? "" : "Choose an asset"}
        </span>
        <Button
          intent="primary"
          text="Choose models"
          endIcon="arrow-right"
          disabled={!selected || blocked}
          onClick={() => setStep("models")}
        />
      </div>
    </div>
  );
}
