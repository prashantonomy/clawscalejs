"use client";

import { Button, ButtonGroup, Dialog, DialogBody, DialogFooter, Icon, Spinner, TextArea } from "@clawscale/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type FriendlyCoa, formatTime, NOW, reviewStages } from "./data";

/** Feasibility re-runs each time the dialog opens or the review restarts. */
const FEASIBILITY_MS = 1600;

export interface TaskOrderDialogProps {
  coa: FriendlyCoa | null;
  onClose: () => void;
  onSubmit: (coa: FriendlyCoa) => void;
}

export function TaskOrderDialog({ coa, onClose, onSubmit }: TaskOrderDialogProps) {
  const [checked, setChecked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const startReview = useCallback(() => {
    setChecked(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setChecked(true), FEASIBILITY_MS);
  }, []);

  useEffect(() => {
    if (!coa) return;
    setDescription(`Requesting ${coa.title.toLowerCase()}, tasking ${coa.tasking.label}.`);
    setEditing(false);
    startReview();
    return () => window.clearTimeout(timer.current);
  }, [coa, startReview]);

  return (
    <Dialog
      isOpen={coa !== null}
      onClose={onClose}
      title={coa ? `Task order: ${coa.title}` : "Task order"}
      icon="take-action"
      className="omega-dialog"
    >
      <DialogBody>
        <div className="omega-order-grid">
          <div className="omega-order-description">
            <h3 className="omega-panel-title">Description</h3>
            {editing ? (
              <TextArea
                aria-label="Description"
                fill
                autoResize
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
            ) : (
              <p>{description}</p>
            )}
            <Button
              variant="minimal"
              size="small"
              icon={editing ? "tick" : "edit"}
              text={editing ? "Done" : "Edit description"}
              onClick={() => setEditing(!editing)}
            />
          </div>
          <div>
            <h3 className="omega-panel-title">Required review</h3>
            <p className="omega-review-summary" data-complete={checked || undefined}>
              {checked ? "All review stages are complete." : "Waiting for one review stage."}
            </p>
            <ul className="omega-review">
              {reviewStages.map((stage) => {
                const pending = stage.id === "feasibility" && !checked;
                return (
                  <li key={stage.id}>
                    {pending ? (
                      <Spinner size={16} aria-label="Feasibility check in progress" />
                    ) : (
                      <Icon icon="tick-circle" intent="success" size={16} />
                    )}
                    <strong>{stage.label}</strong>
                    <span className="omega-review-time">{pending ? "Updating" : stage.done}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </DialogBody>
      <DialogFooter
        actions={
          <>
            <Button text="Restart review" icon="refresh" onClick={startReview} />
            <Button
              intent="primary"
              text="Submit task order"
              icon="send-message"
              disabled={!checked}
              onClick={() => coa && onSubmit(coa)}
            />
          </>
        }
      >
        <Button text="Cancel" variant="minimal" onClick={onClose} />
      </DialogFooter>
    </Dialog>
  );
}

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A schematic satellite frame: scattered vessels, and boxes around the clusters a model found. */
function ImageryFrame({ seed, scattered, clusters }: { seed: number; scattered: number; clusters: number }) {
  const { vessels, boxes } = useMemo(() => {
    const random = seeded(seed);
    const vessels: { x: number; y: number; angle: number }[] = [];
    for (let i = 0; i < scattered; i++) {
      vessels.push({ x: 12 + random() * 256, y: 12 + random() * 146, angle: random() * 180 });
    }
    const boxes: { x: number; y: number; width: number; height: number }[] = [];
    for (let c = 0; c < clusters; c++) {
      const cx = 40 + random() * 200;
      const cy = 30 + random() * 110;
      const angle = random() * 180;
      for (let k = 0; k < 6; k++) {
        vessels.push({ x: cx + (k % 3) * 9 - 9, y: cy + Math.floor(k / 3) * 6 - 3, angle });
      }
      boxes.push({ x: cx - 18, y: cy - 12, width: 36, height: 24 });
    }
    return { vessels, boxes };
  }, [seed, scattered, clusters]);

  return (
    <svg className="omega-imagery-frame" viewBox="0 0 280 170" aria-hidden="true">
      <rect className="omega-sensor-water" width="280" height="170" />
      {vessels.map((vessel) => (
        <rect
          key={`${vessel.x.toFixed(1)}-${vessel.y.toFixed(1)}`}
          className="omega-imagery-vessel"
          x={vessel.x - 3.5}
          y={vessel.y - 1.25}
          width={7}
          height={2.5}
          rx={1}
          transform={`rotate(${vessel.angle.toFixed(0)} ${vessel.x.toFixed(1)} ${vessel.y.toFixed(1)})`}
        />
      ))}
      {boxes.map((box) => (
        <rect
          key={`${box.x.toFixed(1)}-${box.y.toFixed(1)}`}
          className="omega-sensor-box"
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
        />
      ))}
    </svg>
  );
}

export interface ImageryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan: () => void;
}

export function ImageryDialog({ isOpen, onClose, onCreatePlan }: ImageryDialogProps) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Satellite observation" icon="satellite" className="omega-dialog">
      <DialogBody>
        <p className="omega-dialog-kicker">Collection area: Halden Strait. Time: {formatTime(NOW - 1.5)}.</p>
        <p className="omega-dialog-lead">
          Fishing vessels near Port Halden passed the 30 day average three days running, and now gather in tight groups.
        </p>
        <div className="omega-imagery">
          <figure>
            <ImageryFrame seed={7} scattered={16} clusters={0} />
            <figcaption>15 Apr, 16 vessels, no groups</figcaption>
          </figure>
          <figure>
            <ImageryFrame seed={11} scattered={12} clusters={5} />
            <figcaption>17 Apr, 42 vessels, 5 groups</figcaption>
          </figure>
        </div>
        <div className="omega-attribution">
          <Icon icon="predictive-analysis" size={14} />
          <span className="omega-attribution-text">
            <strong>Vessel density</strong> model by Northwind Labs
          </span>
          <ButtonGroup variant="minimal">
            <Button
              icon="thumbs-up"
              size="small"
              aria-label="Useful"
              aria-pressed={rating === "up"}
              active={rating === "up"}
              onClick={() => setRating(rating === "up" ? null : "up")}
            />
            <Button
              icon="thumbs-down"
              size="small"
              aria-label="Not useful"
              aria-pressed={rating === "down"}
              active={rating === "down"}
              onClick={() => setRating(rating === "down" ? null : "down")}
            />
          </ButtonGroup>
        </div>
      </DialogBody>
      <DialogFooter
        actions={
          <>
            <Button text="View history" icon="history" onClick={onClose} />
            <Button intent="primary" text="Create plan" icon="flow-linear" onClick={onCreatePlan} />
          </>
        }
      />
    </Dialog>
  );
}
