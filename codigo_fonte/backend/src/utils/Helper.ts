import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";

export function parseClassification(
  value?: string
): ManchesterClassification | undefined {
  if (!value) return undefined;
  return Object.values(ManchesterClassification).includes(
    value as ManchesterClassification
  )
    ? (value as ManchesterClassification)
    : undefined;
}
