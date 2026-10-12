/** Round tick values from zero: steps of 1, 2, 2.5 or 5 times a power of ten. */
export function niceScale(dataMax: number, tickCount = 4): { max: number; ticks: number[] } {
  const raw = Math.max(dataMax, 1e-9) / tickCount;
  const exponent = 10 ** Math.floor(Math.log10(raw));
  const fraction = raw / exponent;
  const step = (fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10) * exponent;
  const max = Math.ceil(dataMax / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  return { max, ticks };
}
