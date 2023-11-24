import { useEffect, useState } from "react";
import {
  languages,
  dateOptions,
  durationStrings,
} from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

export const heightPerHour = 40;
export const hours = Array.from({ length: 25 }, (_, i) => i);

function DayView({
  singleDay,
  showMonth,
  currentDate,
  date,
  events,
  categoryColors,
}) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(currentDate);
  const [currentTimeOffset, setCurrentTimeOffset] = useState(null);

  const updateOffset = () => {
    const current = new Date();
    setCurrent(current);

    if (
      date.getFullYear() == current.getFullYear() &&
      date.getMonth() == current.getMonth() &&
      date.getDate() == current.getDate()
    ) {
      setCurrentTimeOffset(
        heightPerHour * current.getHours() +
          (heightPerHour * current.getMinutes()) / 60
      );
      setTimeout(() => {
        updateOffset();
      }, 1000 * 60 - (current.getTime() % (1000 * 60))); // Update every minute
    }
  };

  useEffect(() => {
    updateOffset();
  }, [currentDate]);

  return (
    <div
      className={`${
        singleDay ? "w-full" : "w-1/7"
      } h-full pb-2 px-1 md:px-2 text-center`}
      style={{ minHeight: `${heightPerHour * (hours.length - 1)}px` }}
    >
      <span
        className={`whitespace-nowrap overflow-hidden text-sm md:text-sm rounded-full py-1 px-2 mb-1 self-center ${
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
      <div className="h-full w-full relative mt-2">
        {
          // Add lines for every hour, except midnight
          hours.map((hour) => (
            <hr
              key={hour}
              className="absolute w-full border-gray-200 z-1"
              style={{ top: `${heightPerHour * hour}px` }}
            />
          ))
        }
        {
          // Add a line for the current time if it's today
          currentTimeOffset !== null && (
            <>
              <span
                className="absolute h-2 w-2 rounded-lg bg-red-500 z-[3] left-0 -translate-y-1/2"
                style={{ top: `${currentTimeOffset}px` }}
              ></span>
              <hr
                className="absolute w-full border-red-500 z-[3]"
                style={{ top: `${currentTimeOffset}px` }}
              />
            </>
          )
        }
        {events.map((event) => {
          const startTime = new Date(
            event.startTime.endsWith("Z")
              ? event.startTime
              : event.startTime + "Z"
          );
          const endTime = new Date(
            event.endTime.endsWith("Z") ? event.endTime : event.endTime + "Z"
          );
          const times = durationStrings(startTime, endTime);
          const duration = (endTime.getTime() - startTime.getTime()) / 3600000;
          if (startTime.getDate() != endTime.getDate()) {
            // If the event is longer than a day, we need to set the end time to the end of the day
            endTime.setHours(0, 0, 0, -1);
          }
          const trimmedDuration =
            (endTime.getTime() - startTime.getTime()) / 3600000;
          const hoursFromMidnight =
            startTime.getHours() + startTime.getMinutes() / 60;
          return (
            <article
              key={event.id}
              className={`${
                categoryColors[event.category].background || "bg-gray-300"
              } rounded-md absolute w-full py-1 px-1 md:p-2 overflow-auto no-scrollbar hyphens-auto text-start [&:hover]:bg-opacity-80 [&:hover]:cursor-pointer z-[2]`}
              style={{
                height: `${heightPerHour * trimmedDuration}px`,
                top: `${heightPerHour * hoursFromMidnight}px`,
              }}
              onClick={() => navigate(`/edit_event/${event.id}`)}
            >
              <p className="font-medium text-xs">
                {times[0]} - {times[1]}
                <span className="float-right opacity-60 max-2xl:hidden">
                  {Math.floor(duration)}&nbsp;h
                  {Math.round((duration % 1) * 60) ? (
                    <>&nbsp;{Math.round((duration % 1) * 60)}&nbsp;m</>
                  ) : (
                    ""
                  )}
                </span>
              </p>
              <p className={`font-medium`}>{event.title}</p>
              <p className={`text-xs hyphens-auto`}>{event.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default DayView;
