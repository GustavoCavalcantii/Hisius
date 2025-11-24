import { ManchesterClassification } from "../enums/Queue/ManchesterClassification";

export function calculateAge(date: Date): number {
  const birthDate = date instanceof Date ? date : new Date(date);
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

  const baseScores = {
    [ManchesterClassification.RED]: 400,
    [ManchesterClassification.ORANGE]: 300,
    [ManchesterClassification.YELLOW]: 200,
    [ManchesterClassification.GREEN]: 100,
    [ManchesterClassification.BLUE]: 50,
  };

  let score = classification ? baseScores[classification] : 50;

  if (age > 65 || age < 1) score += score * 0.15;

  const waitTimeHours = (Date.now() - joinedAt.getTime()) / (1000 * 60 * 60);
  const timeBonus = Math.min(score * 0.5, waitTimeHours * (score * 0.1));
  score += timeBonus;

  return Math.round(score);
}
