export const capitalizeWords = (value: string | undefined) => {
  if (!value) return "";

  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
}
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return hours
    ? `${hours}h${minutes ? ` ${minutes}min` : ""}`
    : minutes
      ? `${minutes}min`
      : `${secs}s`;
};
