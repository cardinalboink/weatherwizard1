export function validateInput(city: string, days: number): string | null {
  const trimmed = city.trim();
  if (!trimmed) return "City is required.";
  if (trimmed.length < 2) return "City name is too short.";
  if (!Number.isInteger(days)) return "Days must be a whole number.";
  if (days <= 0) return "Days must be greater than 0.";
  if (days > 30) return "Days cannot exceed 30.";
  return null;
}
