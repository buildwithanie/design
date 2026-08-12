const monthYearFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonthYear(value: string) {
  return monthYearFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function formatFullDate(value: string) {
  return fullDateFormatter.format(new Date(`${value}T00:00:00Z`));
}
