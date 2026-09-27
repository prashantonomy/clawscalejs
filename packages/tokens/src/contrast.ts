/** WCAG 2 contrast helpers. Translucent colors are composited over the background first. */

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Parses `#RGB`, `#RRGGBB`, `#RRGGBBAA`, `rgb()` and `rgba()` strings. */
export function parseColor(input: string): Rgba {
  const value = input.trim();
  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join("");
    if (hex.length !== 6 && hex.length !== 8) throw new Error(`Unsupported color: ${input}`);
    const n = (i: number) => Number.parseInt(hex.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: hex.length === 8 ? n(6) / 255 : 1 };
  }
  const match = /^rgba?\(([^)]+)\)$/.exec(value);
  if (!match?.[1]) throw new Error(`Unsupported color: ${input}`);
  const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
  const [r = 0, g = 0, b = 0, a = 1] = parts;
  return { r, g, b, a };
}

/** Composites `top` over an opaque `bottom` color. */
export function composite(top: Rgba, bottom: Rgba): Rgba {
  const mix = (t: number, b: number) => Math.round(t * top.a + b * (1 - top.a));
  return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a: 1 };
}

/** WCAG relative luminance of an opaque color. */
export function luminance({ r, g, b }: Rgba): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * Contrast ratio between two colors, from 1 to 21.
 * `background` must be opaque or sit on `base`, which defaults to white.
 */
export function contrastRatio(foreground: string, background: string, base = "#FFFFFF"): number {
  const baseColor = parseColor(base);
  const bg = composite(parseColor(background), baseColor);
  const fg = composite(parseColor(foreground), bg);
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
