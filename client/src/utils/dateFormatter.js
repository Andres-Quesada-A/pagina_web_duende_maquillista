const languages = ["es-UY", "es-CR", "es"];

export const dateOptions = {
  newMonth: { day: "numeric", month: "short" },
  sameMonth: { day: "numeric" },
  monthName: { month: "long", year: "numeric" },
};

const timeOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

export const getWeekCount = (year, month) => {
  // Returns the number of rows needed to display the month
  // Assuming 0-based months (0-11 for January-December)
  const firstDay = new Date(year, month, 1).getDay();

  // Calculate the number of days before the first of the month
  const beforeFirst = firstDay == 0 ? 6 : firstDay - 1;

  // Calculate the number of rows needed to display the month
  const rowCount = Math.ceil(
    (beforeFirst + new Date(year, month + 1, 0).getDate()) / 7
  );

  return rowCount;
};

export const timeString = (date) => {
  // Some browsers mistakenly return 00:00 a. m. for 12:00 a. m., so we replace it with 12:00 a. m.
  return new Date(date.endsWith("Z") ? date : date + "Z")
    .toLocaleTimeString(languages, timeOptions)
    .replace(/^0(0)?:/, "12:");
};

export const monthName = (date) => {
  const currentOptions = {... dateOptions.monthName};
  if (date.getFullYear() === new Date().getFullYear()) {
    delete currentOptions.year;
  }
  return date.toLocaleString(
    languages,
    currentOptions
  ).toLowerCase();
};