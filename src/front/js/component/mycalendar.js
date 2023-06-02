import React from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const App = () => {
  // Ejemplo de datos de eventos
  const events = [
    {
      start: new Date(),
      end: new Date(),
      title: "Mi evento",
    },
  ];

  return (
    <div>
      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
      />
    </div>
  );
};

export default App;
