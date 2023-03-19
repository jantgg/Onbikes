import React, { useState, useContext } from "react";
import "../../styles/sliderbueno.css";
import "../../styles/animatedcard.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Motocard = ({ bike, index }) => {
  const { store, actions } = useContext(Context);

  const deleteFavoriteBike = async () => {
    const response = await fetch(store.backendurl + "favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bike_id: bike.id,
        favorite_type: "bike",
      }),
    });
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("response not ok");
    }
  };

  return (
    <div className="colp bordecitoall redondeo newmotocard">
      {" "}
      <div className="bg-black bordecitob  sizehomet center-align spartan">
        {" "}
        {bike.model}
      </div>
      <div className="motocard text-white mx-auto">
        <div
          className="hovereffect"
          style={{
            backgroundImage: `url(${bike.bike_photo})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <img className="img-responsive" alt="" />
          <div className="overlay d-flex flex-column justify-content-between">
            <h2 className=" sizehomes">
              <div>{bike.ask_6_price}€</div>
              <div>Texto descripción</div>
            </h2>
            <p className="right-align pb-3 pe-4">
              {" "}
              <button className="botonaco p-3">
                <span> Hola </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motocard;
