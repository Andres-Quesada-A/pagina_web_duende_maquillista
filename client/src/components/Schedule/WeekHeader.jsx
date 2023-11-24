const days = [
  { day: "Lunes", short: "Lun" },
  { day: "Martes", short: "Mar" },
  { day: "Miércoles", short: "Mié" },
  { day: "Jueves", short: "Jue" },
  { day: "Viernes", short: "Vie" },
  { day: "Sábado", short: "Sáb" },
  { day: "Domingo", short: "Dom" },
];

function WeekHeader({ dayToShow }) {
  return (
    <div
      className={`flex flex-row flex-wrap mt-3 h-fit w-full ${
        dayToShow === undefined ? "[&>div]:w-1/7" : "[&>div]:w-full"
      } font-bold [&>div]:text-center uppercase text-sm [&>div]:border-l [&>div:first-child]:border-l-0 [&>div]:border-gray-300`}
    >
      {dayToShow === undefined ? (
        days.map((day) => (
          <div key={day.day}>
            <p className="md:hidden">{day.short}</p>
            <p className="hidden md:block">{day.day}</p>
          </div>
        ))
      ) : (
        <div>
          <p>{days[dayToShow].day}</p>
        </div>
      )}
    </div>
  );
}

export default WeekHeader;
