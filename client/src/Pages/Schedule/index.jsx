import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import MonthView from "../../components/Schedule/MonthView";
import WeekView from "../../components/Schedule/WeekView";
import WeekHeader from "../../components/Schedule/WeekHeader";
import DayView from "../../components/Schedule/DayView";
import HourIndicators from "../../components/Schedule/HourIndicators";
import { getWeekCount, monthName } from "../../utils/dateFormatter";
import { Arrow, Search } from "../../components/Icons";
import axios from "axios";
import { toast } from 'react-toastify';
import { messageSettings } from '../../utils/messageSettings';
import { useNavigate } from "react-router-dom";

const views = ["día", "semana", "mes"];

const categoryColors = {
  Otro: { background: "bg-sky-300", accent: "accent-sky-300", badge: "bg-sky-500" },
  Servicio: { background: "bg-red-300", accent: "accent-red-300", badge: "bg-red-500" },
  Entrega: { background: "bg-emerald-300", accent: "accent-emerald-300", badge: "bg-emerald-500" },
};
const allCategories = Object.keys(categoryColors);

function Schedule() {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [categories, setCategories] = useState(allCategories);
  const [view, setView] = useState("mes");
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({}); // Structure: { 2023: 10: 3: []}
  const [visibleDays, setVisibleDays] = useState([]); // Structure: [ { year: 2023, month: 10, days: [] }]
  const [visibleWeeks, setVisibleWeeks] = useState(0); // Ranges between 4 and 6, for the month view
  const [toggleSearch, setToggleSearch] = useState(false);
  const [weekNumber, setWeekNumber] = useState();
  const [currentMonth, setCurrentMonth] = useState();

  const handleViewChange = (e) => {
    setView(e.target.id);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.id.split("_")[0];
    if (categories.indexOf(category) > -1) {
      setCategories(categories.filter((item) => item != category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const changeDate = (months, days) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth() + (months || 0),
      date.getDate() + (days || 0)
    );
    if ((date.getMonth() + months + 12) % 12 < newDate.getMonth()) {
      // If the date is set to 31 in a month with 30 days, newDate
      // will contain a date of the next month, so we set it to the
      // last day of the previous month
      newDate.setDate(0);
    }
    setDate(newDate);
  };

  useEffect(() => {
    // Creates an array with the days to be displayed
    let numberOfDays = 7 * getWeekCount(date.getFullYear(), date.getMonth());
    let days = [], firstDay, dayCount = 0, weekNumber = null;
    setVisibleWeeks(numberOfDays / 7);

    // Sets firstDay to the first day displayed in the calendar
    firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay.setDate(firstDay.getDate() - ((firstDay.getDay() + 7 - 1) % 7));

    // If days from the previous month are displayed, they are added to the array
    if (firstDay.getMonth() != date.getMonth()) {
      const totalDaysPreviousMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
      ).getDate();
      const previousMonth = {
        year: firstDay.getFullYear(),
        month: firstDay.getMonth() + 1,
        days: [],
      };
      for (let i = firstDay.getDate(); i <= totalDaysPreviousMonth; i++) {
        previousMonth.days.push(i);
        numberOfDays--;
        if (weekNumber === null && previousMonth.month - 1 == date.getMonth() && i == date.getDate()) {
          weekNumber = Math.floor(dayCount / 7);
        } else {
          dayCount++;
        }
      }
      days.push(previousMonth);
      firstDay.setDate(totalDaysPreviousMonth + 1); // Sets firstDay to the first day of the current month
    }

    // Adds the days of the current month to the array
    const totalDaysCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const currentMonth = {
      year: firstDay.getFullYear(),
      month: firstDay.getMonth() + 1,
      days: [],
    };
    for (
      let i = firstDay.getDate();
      numberOfDays > 0 && i <= totalDaysCurrentMonth;
      i++
    ) {
      currentMonth.days.push(i);
      numberOfDays--;
      if (weekNumber === null && currentMonth.month - 1 == date.getMonth() && i == date.getDate()) {
        weekNumber = Math.floor(dayCount / 7);
      } else {
        dayCount++;
      }
    }
    days.push(currentMonth);
    firstDay.setDate(totalDaysCurrentMonth + 1); // Sets firstDay to the first day of the next month

    // If visible, adds the days of the next month to the array
    if (numberOfDays > 0) {
      const nextMonth = {
        year: firstDay.getFullYear(),
        month: firstDay.getMonth() + 1,
        days: [],
      };
      for (let i = 1; i <= numberOfDays; i++) {
        nextMonth.days.push(i);
        if (weekNumber === null && nextMonth.month - 1 == date.getMonth() && i == date.getDate()) {
          weekNumber = Math.floor(dayCount / 7);
        } else {
          dayCount++;
        }
      }
      days.push(nextMonth);
    }

    setCurrentMonth(currentMonth.month);
    setWeekNumber(weekNumber);
    setVisibleDays(days);
  }, [date]);

  // Retrieve events after visibleDays is updated
  useEffect(() => {
    if (visibleDays.length == 0) return;

    // Here would go the API call to retrieve the events
    const startDate = new Date(
      visibleDays[0].year,
      visibleDays[0].month - 1,
      visibleDays[0].days[0]
    ).toISOString();

    const endDate = new Date(
      visibleDays.at(-1).year,
      visibleDays.at(-1).month - 1,
      visibleDays.at(-1).days.at(-1) + 1 // To get the events of the very last day
    ).toISOString();

    axios.get(`/api/get_event_list/${startDate}/${endDate}`).then((response) => { 
      const result = response.data;
      const events = {};
      result.forEach((event) => {
        const date = new Date(
          event.startTime.endsWith("Z") ? event.startTime : event.startTime + "Z"
        );
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        if (!events[year]) events[year] = {};
        if (!events[year][month]) events[year][month] = {};
        if (!events[year][month][day]) events[year][month][day] = [];
        events[year][month][day].push(event);
      });

      // Sorts the events by start time
      Object.keys(events).forEach((year) => {
        Object.keys(events[year]).forEach((month) => {
          Object.keys(events[year][month]).forEach((day) => {
            events[year][month][day].sort(
              (a, b) => new Date(a.startTime) - new Date(b.startTime)
            );
          });
        });
      });

      setEvents(events);
    }).catch((error) => {
      toast.error("Ocurrió un error al cargar los eventos.", messageSettings);
    });
  }, [visibleDays]);

  const currentDateFullYear = currentDate.getFullYear()
  const currentDateMonth = currentDate.getMonth()
  const currentDateInfo = currentDate.getDate()
  const dateFullYearSelected = date.getFullYear()
  const dateMonthSelected = date.getMonth()
  const dateSelected = date.getDate()
  return (
    <>
      <Helmet>
        <title>Agenda de Duende</title>
        <link rel="canonical" href="/schedule" />
      </Helmet>
      <section className="flex flex-col justify-center mt-16 mb-2 px-1 sm:px-3 md:px-6 lg:px-10 grow">
        <header className="flex flex-col md:flex-row w-full justify-between items-center gap-4 my-8 max-md:mb-4">
          <h1 className="max-w-4x1 text-4xl font-semibold text-indigo-500 text-left">
            Agenda
          </h1>
          <div className="text-lg flex flex-row gap-2 items-center">
            <Search className="h-5 w-5 text-indigo-500 lg:hidden" onClick={() => setToggleSearch(!toggleSearch)} />
            <div className="grid grid-cols-1 xs:grid-cols-3 border border-indigo-500 rounded-lg [&>div:first-child]:border-t-0 xs:[&>div:first-child]:border-l-0 overflow-hidden bg-indigo-100">
              {views.map((item) => (
                <div
                  key={item}
                  className={`transition-colors duration-500 w-[6rem] flex flex-row justify-center items-center text-center border-t xs:border-t-0 xs:border-l border-indigo-500 ${
                    view == item ? "font-medium bg-indigo-500 text-white" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="viewRange"
                    id={item}
                    className="hidden"
                    onChange={handleViewChange}
                  />
                  <label htmlFor={item} className="grow px-2">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </header>
        <div className="flex flex-row h-full gap-1">
          <div className={`h-screen w-screen lg:h-full lg:w-[20rem] top-0 bottom-0 ${toggleSearch ? "right-0" : "right-full"} fixed lg:static lg:opacity-100 transition-all bg-white lg:block flex flex-col items-center max-lg:justify-center max-lg:pt-16 lg:mt-0 max-lg:z-[49] gap-10 lg:gap-0`}>
            <search className="rounded-2xl bg-slate-200 p-3 w-[20rem] lg:w-full">
              <div className="flex flex-row w-full justify-between mb-2">
                <p>{monthName(date)}</p>
                <ul className="flex flex-row gap-1">
                  <li
                    className="rounded-full [&:hover]:bg-gray-100 [&:hover]:shadow-md cursor-pointer transition-all"
                    onClick={() => {
                      changeDate(-1);
                    }}
                  >
                    <Arrow className="h-6" />
                  </li>
                  <li
                    className="rounded-full [&:hover]:bg-gray-100 [&:hover]:shadow-md cursor-pointer transition-all"
                    onClick={() => {
                      changeDate(1);
                    }}
                  >
                    <Arrow className="h-6 transform rotate-180" />
                  </li>
                </ul>
              </div>
              <div className="flex flex-col h-full">
                <ul className={`items-center flex flex-row flex-wrap w-full [&>li]:w-1/7 font-bold text-center h-8`}>
                  <li>L</li>
                  <li>M</li>
                  <li>M</li>
                  <li>J</li>
                  <li>V</li>
                  <li>S</li>
                  <li>D</li>
                </ul>
                <ul className={`flex flex-row flex-wrap w-full text-sm h-[14rem]`}>
                  {visibleDays.map((month) =>
                    month.days.map((day) => (
                      <li
                        key={month + "/" + day}
                        className={`w-1/7 flex justify-center items-center ${visibleWeeks == 6 ? "h-1/6" : visibleWeeks == 5 ? "h-1/5" : "h-1/4"} relative`}
                        onClick={() => {
                          setDate(new Date(month.year, month.month - 1, day));
                        }}
                      >
                        <div className={`absolute ${visibleWeeks == 6 ? "top-1" : visibleWeeks == 5 ? "top-2" : "top-4"} flex flex-row gap-1`}>
                          {categories.filter((category) => (events[month.year] &&
                              events[month.year][month.month] &&
                              events[month.year][month.month][day] &&
                              events[month.year][month.month][day].find((event) => (event.category == category)))).map((category) => (
                            <span key={category} className={`w-1 h-1 ${categoryColors[category].badge} rounded-lg`}></span>
                          ))}
                        </div>
                        <p className={`rounded-full flex justify-center items-center cursor-pointer transition-colors ${
                          month.year == dateFullYearSelected &&
                          month.month == dateMonthSelected + 1 &&
                          day == dateSelected
                            ? "bg-indigo-500 text-white font-medium"
                            : "hover:bg-gray-100 hover:shadow-md"
                        } ${
                          month.year == dateFullYearSelected &&
                          month.month == dateMonthSelected + 1
                            ? ""
                            : "opacity-30"
                        } ${
                          month.year == currentDateFullYear &&
                          month.month == currentDateMonth + 1 &&
                          day == currentDateInfo
                            ? "border border-indigo-500"
                            : ""
                        } w-8 h-8 text-center`}>{day}</p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </search>
            <search className="flex flex-col items-start">
              <h4 className="text-gray-600 font-semibold text-2xl lg:mt-5 mb-2">
                Categorías
              </h4>
              <div className="flex flex-col gap-2">
                {allCategories.map((category) => (
                  <div
                    key={category}
                    className="flex flex-row gap-1 items-center"
                  >
                    <input
                      type="checkbox"
                      id={`${category}_checkbox`}
                      name={`${category}_checkbox`}
                      checked={categories.indexOf(category) > -1}
                      className={`w-4 h-4 ${categoryColors[category].accent}`}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={`${category}_checkbox`}>{category}</label>
                  </div>
                ))}
              </div>
            </search>
            <div className="flex flex-row gap-2 w-full justify-center lg:mt-3">
              <button className="bg-emerald-500 text-white font-medium py-2 px-6 rounded-xl" onClick={() => {navigate("/add_event")}}>
                Crear evento
              </button>
              <button className="bg-indigo-500 text-white font-medium py-2 px-6 rounded-xl lg:hidden" onClick={() => {setToggleSearch(false)}}>
                Aceptar
              </button>
            </div>
          </div>
          <article className={`w-full h-full pb-10 ${view == "mes" ? "" : "ml-6"}`}>
            {view == "mes" || view == "semana" ? (
              <>
                <WeekHeader />
                {
                  view == "mes" ? (
                    <MonthView
                      currentDate={currentDate}
                      date={date}
                      visibleDays={visibleDays}
                      visibleWeeks={visibleWeeks}
                      events={events}
                      categoryColors={categoryColors}
                      categories={categories}
                    />
                  ) :
                  <>
                    <HourIndicators />
                    <WeekView
                      key={`${currentMonth}_${weekNumber}`}
                      currentDate={currentDate}
                      date={date}
                      days={visibleDays}
                      weekNumber={weekNumber}
                      events={events}
                      categoryColors={categoryColors}
                      categories={categories} />
                  </>
                }
              </>
              ) : (
                <>
                  <WeekHeader
                    dayToShow={(date.getDay() + 6) % 7} />
                  <HourIndicators />
                  <DayView
                    key={date + String(events)}
                    singleDay={true}
                    showMonth={true}
                    currentDate={currentDate}
                    date={date}
                    events={[date.getFullYear()] && events[date.getFullYear()][date.getMonth() + 1] && events[date.getFullYear()][date.getMonth() + 1][date.getDate()] && events[date.getFullYear()][date.getMonth() + 1][date.getDate()].filter((event) => (categories.indexOf(event.category) > -1)) || []}
                    categories={categories}
                    categoryColors={categoryColors}
                  />
                </>
              )}
            
          </article>
          
        </div>
      </section>
    </>
  );
}

export default Schedule;
