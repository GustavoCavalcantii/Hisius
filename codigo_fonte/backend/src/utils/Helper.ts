import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";

export function parseClassification(
  value?: string
): ManchesterClassification | undefined {
  if (!value) return undefined;

  const normalized = value.trim().toLowerCase();
  return Object.values(ManchesterClassification).find(
    (c) => c.toLowerCase() === normalized
  );
}
