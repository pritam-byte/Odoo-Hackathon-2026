// Approximates a vehicle's cargo/passenger capacity in kg from its maxLoad string.
// "7,500 kg" -> 7500 (exact). "53 Seats" / "85 Passengers" -> count * 75kg avg (approximate).
export function parseCapacityKg(maxLoad) {
  if (!maxLoad) return 0;
  const str = maxLoad.toLowerCase();
  const match = str.match(/[\d,]+(\.\d+)?/);
  const num = match ? parseFloat(match[0].replace(/,/g, "")) : 0;

  if (str.includes("kg")) return num;
  if (str.includes("seat") || str.includes("passenger")) return num * 75; // avg person weight estimate
  return num;
}