export function px(s: any) {
  return `${s}px`;
}

export function translate(x: number | string, y: number | string) {
  return `translate(${x}, ${y})`;
}

export function round(n: number, nDecimals = 0) {
  const target = Math.pow(10, nDecimals);
  return Math.round(n * target) / target;
}
