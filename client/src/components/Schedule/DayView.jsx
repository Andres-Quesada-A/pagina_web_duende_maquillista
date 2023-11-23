import { languages, dateOptions, durationStrings } from "../../utils/dateFormatter";

const heightPerHour = 40;
const minDuration = 1.5;

function DayView({
  singleDay,
  showMonth,
  currentDate,
  date,
  events,
  categoryColors,
  selectedMonth,
}) {
  return (
    <div
      className={`${singleDay ? "w-full" : "w-1/7"} h-full py-2 px-1 md:px-2`}
      style={{ minHeight: `${heightPerHour * 24}px` }}
    >
      <div
        className={`h-full w-full ${
          date.getMonth() + 1 == selectedMonth ? "" : "opacity-30"
        }`}
      >
        <span
          className={`whitespace-nowrap overflow-hidden md:text-sm rounded-full py-1 px-2 mb-1 self-center ${
            date.getFullYear() == currentDate.getFullYear() &&
            date.getMonth() == currentDate.getMonth() &&
            date.getDate() == currentDate.getDate()
              ? "bg-indigo-300 font-bold"
              : ""
          }`}
        >
          {
            date.toLocaleDateString(
              languages,
              showMonth ? dateOptions.newMonth : dateOptions.sameMonth
            ) /* To show the name of the month only once per month */
          }
        </span>
        <div className="h-full w-full relative">
          {events.map((event) => {
            const startTime = new Date(event.startTime + "Z");
            const endTime = new Date(event.endTime + "Z");
            const times = durationStrings(startTime, endTime);
            if (startTime.getDate() != endTime.getDate()) {
              // If the event is longer than a day, we need to set the end time to the end of the day
              endTime.setHours(0, 0, 0, -1);
            }
            const duration =
              (endTime.getTime() - startTime.getTime()) / 3600000;
            const hoursFromMidnight =
              startTime.getHours() + startTime.getMinutes() / 60;
            return (
              <article
                key={event.id}
                className={`${
                  categoryColors[event.category].background || "bg-gray-300"
                } rounded-md absolute w-full py-1 pl-1 md:p-2 overflow-hidden hyphens-auto text-start [&:hover]:bg-opacity-80 [&:hover]:cursor-pointer`}
                style={{
                  height: `${heightPerHour * duration}px`,
                  top: `${heightPerHour * hoursFromMidnight}px`,
                  minHeight: `${heightPerHour * minDuration}px`,
                }}
              >
                <p className="font-medium text-xs">
                  {times[0]} - {times[1]}
                  <span className="float-right opacity-60 max-2xl:hidden">{Math.floor(duration)}&nbsp;h{duration % 1 ? <>&nbsp;{Math.round(duration % 1 * 60)}&nbsp;m</> : ""}</span>
                </p>
                <p className="font-medium">{event.title}</p>
                <p className="text-xs hyphens-auto">{event.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DayView;
