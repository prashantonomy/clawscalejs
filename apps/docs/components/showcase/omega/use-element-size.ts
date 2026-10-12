"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

/** Tracks an element's size. Renders with `fallback` on the server and the first client pass. */
export function useElementSize<T extends HTMLElement>(fallback: Size): [RefObject<T | null>, Size] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState(fallback);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      const box = element.getBoundingClientRect();
      const width = Math.round(box.width);
      const height = Math.round(box.height);
      setSize((current) => (current.width === width && current.height === height ? current : { width, height }));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, size];
}
