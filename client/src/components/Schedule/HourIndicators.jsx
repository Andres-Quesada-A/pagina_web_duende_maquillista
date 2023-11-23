import { heightPerHour, hours } from "./DayView";

function HourIndicators() {
    return (
        <div
        className="relative"
        >
        {hours.map((hour) => (
            <p key={hour} style={{ top: `${heightPerHour * hour + 28}px` }} className="absolute text-sm text-gray-300 -translate-y-2/4 bg-white -ml-5 text-right w-5">{`${hour % 12 || "12"}${hour % 24 >= 12 ? "p" : "a"}`}</p>
        ))}
        </div>
    );
}

export default HourIndicators;