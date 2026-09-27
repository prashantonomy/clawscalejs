"use client";

import { Button, Dialog, DialogBody, DialogFooter, HTMLTable } from "@clawscale/react";
import { useState } from "react";

const partitions = Array.from({ length: 90 }, (_, index) => ({
  day: new Date(Date.UTC(2026, 5, 30 + index)).toISOString().slice(0, 10),
  rows: (41_200 + index * 137).toLocaleString("en-US"),
}));

export default function DialogScrollable() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button icon="history" text="Review backfill" onClick={() => setIsOpen(true)} />
      <Dialog icon="history" isOpen={isOpen} onClose={close} title="Backfill orders_daily">
        <DialogBody>
          <HTMLTable compact striped style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Partition</th>
                <th>Rows</th>
              </tr>
            </thead>
            <tbody>
              {partitions.map((partition) => (
                <tr key={partition.day}>
                  <td>dt={partition.day}</td>
                  <td>{partition.rows}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </DialogBody>
        <DialogFooter actions={<Button intent="primary" text="Start backfill" onClick={close} />}>
          90 partitions, us-east-1
        </DialogFooter>
      </Dialog>
    </>
  );
}
