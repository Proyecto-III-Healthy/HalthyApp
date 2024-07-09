//import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useContext, useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import dayjs from "dayjs";
import "dayjs/locale/es";
import "./../../src/index.css";
import { createDayPlan, getDayPlans } from "../services/ChatService";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

registerLocale("es", es);

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    title: "Hora de entrenar",
    start: dayjs("2024-07-09T12:00:00").toDate(),
    end: dayjs("2024-07-09T13:00:00").toDate(),
  },
];

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  //const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [allEvents, setAllEvents] = useState(events);

  const fetchDailyMealPlan = () => {
    const startDate = new Date().toISOString();
    const userPreferences = {
      objetive: user.objetive,
      ability: user.ability,
      typeDiet: user.typeDiet,
      alergic: user.alergic,
    };
    const currentUserId = user._id;
    createDayPlan({ startDate, userPreferences, currentUserId })
      .then((response) => {
        console.log(response);
        const { dailyMealPlan } = response;
        console.log(dailyMealPlan);
        if (!dailyMealPlan.date) {
          console.error("Error: 'date' is undefined in the response");
          return;
        }
        const eventsFromPlan = dailyMealPlan.meals.map((meal) => ({
          recipeId: meal.meal.recipe._id,
          title: meal.meal.name,
          start: dayjs(dailyMealPlan.date)
            .hour(dayjs(meal.time).hour())
            .minute(dayjs(meal.time).minute())
            .toDate(),
          end: dayjs(dailyMealPlan.date)
            .hour(dayjs(meal.time).hour())
            .minute(dayjs(meal.time).minute() + 30)
            .toDate(), // Supongamos que cada comida dura 30 minutos
        }));

        setAllEvents((prevEvents) => [...prevEvents, ...eventsFromPlan]);
      })
      .catch((error) => {
        console.error("Error fetching meal plan:", error);
      });
  };

  useEffect(() => {
    getDayPlans()
      .then((dayPlansDB) => {
        const plainMails = dayPlansDB
          .reduce((acc, plan) => {
            console.log(plan);
            return [
              ...acc,
              ...plan.meals.map((meal) => ({ ...meal, date: plan.date })),
            ];
          }, [])
          .map((meal) => ({
            recipeId: meal.meal.recipe._id,
            title: meal.meal.name,
            start: dayjs(dayPlansDB.date)
              .hour(dayjs(meal.time).hour())
              .minute(dayjs(meal.time).minute())
              .toDate(),
            end: dayjs(dayPlansDB.date)
              .hour(dayjs(meal.time).hour())
              .minute(dayjs(meal.time).minute() + 60)
              .toDate(), // Supongamos que cada comida dura 30 minutos
          }));

        setAllEvents(plainMails);

        console.log(plainMails);
        // dayPlansDB.map((plan) => {

        //   const eventsFromPlan = plan.meals.map((meal) => ({

        //   }));
        //   console.log("eventsFromPlan",eventsFromPlan)
        //   setAllEvents(eventsFromPlan);

        // })
        // console.log("allEvents",allEvents)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCreateDailyPlan = () => {
    fetchDailyMealPlan();
  };

  //funcion para añadir nuevos eventos
  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const Event = ({ event }) => (
    <span>
      {event.title}
      {event.recipeId && (
        <Link to={`/recipes/${event.recipeId}`} className="btn btn-light">
          <span> Ver receta</span>
        </Link>
      )}
    </span>
  );
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
      <button className="btn btn-primary mt-3" onClick={handleCreateDailyPlan}>
        Crea un plan semanal
      </button>
      <Calendar
        localizer={localizer}
        events={allEvents.filter(
          (event) => event.title && event.start && event.end
        )}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        culture="es"
        views={["week", "day"]} // Only show week and day views
        messages={{
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        defaultView="day"
        //onSelectEvent={handleSelectEvent} // Agrega el manejador de eventos
        components={{
          event: Event,
        }}
      />
    </div>
  );
};

export default CalendarPage;
