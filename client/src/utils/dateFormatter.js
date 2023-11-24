export const languages = ["es-UY", "es-CR", "es"];

const dateOptions2 = {
    month : { year: "numeric", month: "long" },
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric" },
    full: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
};
const timeOptions2 = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
};

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

export const timeString = (date, short = false) => {
  // Some browsers mistakenly return 00:00 a. m. for 12:00 a. m., so we replace it with 12:00 a. m.
  let result = new Date(date.endsWith("Z") ? date : date + "Z")
    .toLocaleTimeString(languages, timeOptions)
    .replace(/^0(0)?:/, "12:");
  if (short) {
    result = result.replace(/:00 /, " ");
  }
  return result;
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

export const durationStrings = (startTime, endTime) => {
  let start = timeString(startTime.toISOString(), true).replace(/\s?([ap])\.\s?m\.$/, "$1");
  let end = timeString(endTime.toISOString(), true).replace(/\s?([ap])\.\s?m\.$/, "$1");

  return [start, end]
}

export const localHtmlAttribute = (apiDateString) => {
  const apiDate = new Date(
    apiDateString + (apiDateString.endsWith("Z") ? "" : "Z")
  );
  return new Date(
    Date.UTC(
      apiDate.getFullYear(),
      apiDate.getMonth(),
      apiDate.getDate(),
      apiDate.getHours(),
      apiDate.getMinutes(),
      apiDate.getSeconds()
    )
  )
    .toISOString()
    .split(".")[0];
};

export const localDate = (apiDateString, dateType, capitalizeFirstLetter = false) => {
  try {
      const apiDate = new Date(apiDateString + (apiDateString.endsWith("Z") ? "" : "Z"));
      const seletedOptions = { ...dateOptions2[dateType] } || { ...dateOptions2["short"] };

      if (apiDate.getFullYear() === (new Date()).getFullYear()) {
          delete seletedOptions.year;
      }

      const result = apiDate.toLocaleDateString(
          languages,
          seletedOptions
      );

      if (capitalizeFirstLetter) {
          return result.charAt(0).toUpperCase() + result.slice(1);
      } else {
          return result;
      }
  } catch (error) {
      return "";
  }
};

export const localTime = (apiDateString, timeType = "short") => {
  try {
      const apiDate = new Date(apiDateString + (apiDateString.endsWith("Z") ? "" : "Z"));
      const currentTimeOptions = timeOptions2;

      if (timeType === "short") {
          delete currentTimeOptions.second;
      }

      // Some browsers mistakenly return 00:00 a. m. for 12:00 a. m., so we replace it with 12:00 a. m.
      return apiDate
          .toLocaleTimeString(languages, currentTimeOptions)
          .replace(/^00/, "12");
  } catch (error) {
      return "";
  }
};

export const localDateTime = (apiDateString, dateType, timeType) => {
  return `${localTime(apiDateString, timeType)}${dateType === "full" ? " el " : ", "}${localDate(
      apiDateString,
      dateType
  )}`.trim();
};