export const formatDateString = (isoString: string): string => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    const formatter = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formatter.format(date);
  } catch {
    return isoString;
  }
};
