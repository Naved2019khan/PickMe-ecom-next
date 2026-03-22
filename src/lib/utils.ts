/** Format a number as Indian currency  ₹1,23,456 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style:    "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Calculate savings amount */
export function calcSaving(price: number, mrp: number): number {
  return mrp - price;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Merge class strings (tiny cn helper — no clsx/cn dep needed) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
