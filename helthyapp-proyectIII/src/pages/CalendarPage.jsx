//import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import dayjs from "dayjs";
import "dayjs/locale/es";
import "./../../src/index.css";

registerLocale("es", es);
const locales = {
  es,
};

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: "Hora de entrenar",
    start: dayjs("2024-06-28T12:00:00").toDate(),
    end: dayjs("2024-06-28T13:00:00").toDate(),
  },
];

const CalendarPage = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [allEvents, setAllEvents] = useState(events);

  //funcion para añadir nuevos eventos
  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };
  return (
    <div>
      <h2>Añade una actividad</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Título
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Nueva actividad"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
      </div>
      <DatePicker
        locale="es"
        placeholderText="Inicio"
        style={{ marginRight: "10px" }}
        selected={newEvent.start}
        onChange={(start) => setNewEvent({ ...newEvent, start })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Hora"
        dateFormat="MMMM d, yyyy h:mm aa"
        portalId="root-portal"
      />

      <DatePicker
        locale="es"
        placeholderText="Fin"
        selected={newEvent.end}
        onChange={(end) => setNewEvent({ ...newEvent, end })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Hora"
        dateFormat="MMMM d, yyyy h:mm aa"
        portalId="root-portal"
      />
      <button className="btn btn-primary mt-3" onClick={handleAddEvent}>
        Añadir actividad
      </button>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        culture="es"
        
      />
    </div>
  );
};

export default CalendarPage;
