import { useNavigate } from "react-router-dom";
import { languages, dateOptions, timeString, durationStrings } from "../../utils/dateFormatter";

function MonthView({ currentDate, date, visibleDays, visibleWeeks, events, categoryColors, categories }) {
  const navigate = useNavigate()
  return (
    <div
      className={`flex flex-row flex-wrap h-full [&>div]:w-1/7 ${
        visibleWeeks == 4
          ? "[&>div]:h-1/4"
          : visibleWeeks == 5
          ? "[&>div]:h-1/5"
          : "[&>div]:h-1/6"
      } [&>div]:text-center [&>div]:border-l [&>div:nth-child(7n+1)]:border-l-0 [&>div]:border-t [&>div:nth-child(-n+7)]:border-t-0 [&>div:nth-child(-n+7)]:pt-0 [&>div]:border-gray-300`}
    >
      {visibleDays.map((month) => (
        <>
          {month.days.map((day) => (
            <div
              key={`${String(month.year).padStart(4, "0")}-${String(
                month.month
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
              className="py-2 px-1 md:px-2 h-full"
            >
              <div
                className={`${
                  month.month - 1 == date.getMonth() ? "" : "opacity-30"
                } h-full flex flex-col`}
              >
                <span
                  className={`whitespace-nowrap overflow-hidden text-xs md:text-sm rounded-full py-1 px-2 mb-1 self-center ${
                    month.year == currentDate.getFullYear() &&
                    month.month == currentDate.getMonth() + 1 &&
                    day == currentDate.getDate()
                      ? "bg-indigo-300 font-bold"
                      : ""
                  }`}
                >
                  {
                    new Date(
                      month.year,
                      month.month - 1,
                      day
                    ).toLocaleDateString(
                      languages,
                      day == month.days[0]
                        ? dateOptions.newMonth
                        : dateOptions.sameMonth
                    ) /* To show the name of the month only once per month */
                  }
                </span>
                <ul className="flex flex-col gap-1 md:gap-2 overflow-y-auto no-scrollbar">
                  {events[month.year] &&
                    events[month.year][month.month] &&
                    events[month.year][month.month][day] &&
                    events[month.year][month.month][day].filter((event) => (categories.indexOf(event.category) > -1)).map((event) => (
                      <li
                        className={`flex flex-col gap-1 rounded-md h-min text-start ${
                          categoryColors[event.category].background || "bg-gray-300"
                        } [&:hover]:bg-opacity-80 [&:hover]:cursor-pointer`}
                        key={event.id}
                        title={`${durationStrings((new Date(event.startTime)), (new Date(event.endTime)), false).join(" - ")}\n${event.title}\n${event.description}`}
                        onClick={() => {navigate(`/edit_event/${event.id}`)}}
                      >
                        <p
                          className={`my-1 ml-1 md:m-2 whitespace-nowrap overflow-x-hidden md:whitespace-normal line-clamp-2 hyphens-auto text-xs`}
                        >
                          <span className="font-medium hidden md:inline">
                            {timeString(event.startTime)} ·
                          </span>{" "}
                          <span className="font-medium">
                            {event.title}
                          </span>{" "}
                          <span className="font-medium hidden md:inline">
                            ·
                          </span>{" "}
                          <span className="hidden md:inline">{event.description}</span>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  );
}

export default MonthView;
