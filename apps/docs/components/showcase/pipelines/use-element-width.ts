"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

/** Tracks an element's width. Renders with `fallback` on the server and first client pass. */
export function useElementWidth<T extends HTMLElement>(fallback: number): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setWidth(Math.round(element.getBoundingClientRect().width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}
