export function formatTimeRangeJST(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const toJSTTime = (date: Date): string => {
    const jstHours = (date.getUTCHours() + 9) % 24;
    const minutes = date.getUTCMinutes();
    return (
      jstHours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0")
    );
  };

  return `${toJSTTime(startDate)}~${toJSTTime(endDate)}`;
}
