import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import "../../styles/login.css";
import "../../styles/animations.css";
import "../../styles/events.css";
import { useNavigate } from "react-router-dom";
import Calendar from "../component/mycalendar.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export const Events = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const isDesktop = window.innerWidth >= 1000;
  const [date, setDate] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateObject, setDateObject] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1 para obtener el número de mes correcto
    const year = date.getFullYear();

    const obj = {
      day: day,
      month: month,
      year: year,
    };

    setDateObject(obj);
    console.log(obj);
  };
  useEffect(() => {
    setSelectedDate(new Date()); // Establece la fecha actual al cargar el componente por primera vez
  }, []);

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className="custom-input" // Clase CSS para personalizar el input
      value={value}
      onClick={onClick}
      readOnly
    />
  );

  return (
    <div className="d-flex flex-column minheight">
      {" "}
      <div className="mt-10">
        {" "}
        Hello
        <DatePicker
          classname=""
          locale="es"
          selected={selectedDate} // Asigna el valor del estado a la prop "selected"
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};
