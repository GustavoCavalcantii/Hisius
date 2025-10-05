import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;

  return age;
}

export function calculateScore(
  joinedAt: Date,
  age: number,
  classification?: ManchesterClassification
) {
  let score = 0;

  const classificationPriority: Record<ManchesterClassification, number> = {
    [ManchesterClassification.RED]: 1000,
    [ManchesterClassification.ORANGE]: 800,
    [ManchesterClassification.YELLOW]: 500,
    [ManchesterClassification.GREEN]: 200,
    [ManchesterClassification.BLUE]: 0,
  };

  score += classification ? classificationPriority[classification] : 0;

  if (age > 65 || age < 1) score += 200;

  const waitTime = Date.now() - joinedAt.getTime();
  score += waitTime / 1000;

  return score;
}
