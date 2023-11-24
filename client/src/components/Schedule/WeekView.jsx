import { dateOptions, timeString } from "../../utils/dateFormatter";
import { useState, useEffect } from "react";
import DayView from "./DayView";

function WeekView({
  currentDate,
  date,
  days,
  weekNumber,
  events,
  categoryColors,
  categories,
}) {
  const [visibleWeek, setVisibleWeek] = useState([]);

  useEffect(() => {
    // Filters the days that are in the week
    let visibleDays = [],
      i = 0,
      dayCount = 0;

    for (let j = 0; j < days.length && i < 7; j++) {
      let currentMonth = { year: days[j].year, month: days[j].month, days: [] };
      for (let k = 0; k < days[j].days.length && i < 7; k++) {
        if (dayCount >= weekNumber * 7 && dayCount < (weekNumber + 1) * 7) {
          currentMonth.days.push(days[j].days[k]);
          i++;
        }
        dayCount++;
      }
      if (currentMonth.days.length > 0) {
        visibleDays.push(currentMonth);
      }
    }
    setVisibleWeek(visibleDays);
  }, []);

  return (
    <div
      className={`flex flex-row flex-wrap h-full w-full [&>div]:w-1/7 [&>div]:border-l [&>div:nth-child(7n+1)]:border-l-0 [&>div]:border-gray-300`}
    >
      {visibleWeek.map((month) => (
        month.days.map((day, index) => (
          <DayView
            key={`${String(month.year).padStart(4, "0")}-${String(
              month.month
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
            singleDay={false}
            showMonth={index == 0}
            currentDate={currentDate}
            date={new Date(month.year, month.month - 1, day)}
            events={events[month.year] &&
              events[month.year][month.month] &&
              events[month.year][month.month][day] &&
              events[month.year][month.month][day].filter((event) => (categories.indexOf(event.category) > -1)) || []}
            categoryColors={categoryColors}
          />
        ))
      ))}
    </div>
  );
}

export default WeekView;
