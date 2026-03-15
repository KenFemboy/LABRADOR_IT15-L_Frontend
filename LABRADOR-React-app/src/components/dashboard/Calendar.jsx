import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../App.css"
const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/school-days`)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((day) => ({
          id: day.id,
          title: day.title,
          date: day.date,
          className: getEventClass(day.type)
        }));

        setEvents(formattedEvents);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  const getEventClass = (type) => {
    if (type === "holiday") return "holiday-event";
    if (type === "event") return "special-event";
    return "school-day";
  };

  const getDayClass = (arg) => {
    const day = arg.date.getDay();

    if (day === 0 || day === 6) {
      return "weekend-day";
    }

    return "weekday-day";
  };

  return (
    <div className="p-6 bg-[var(--bg-cream)] rounded-2xl shadow">
      <h2 className="text-xl font-bold text-[var(--lyre-brown)] mb-4">
        School Calendar
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dayCellClassNames={getDayClass}
        height={800}
        aspectRatio={1.5} // Higher number makes the rows shorter
       
      />
    </div>
  );
};

export default Calendar;