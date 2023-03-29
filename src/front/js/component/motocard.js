import React, { useState, useContext, useEffect } from "react";
import "../../styles/sliderbueno.css";
import "../../styles/animatedcard.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Motocard = ({ bike, index }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="colp bordecitoall redondeo newmotocard text-white">
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
              {localStorage.getItem("token") != null ? (
                <div>
                  {store.viewType == true ? (
                    <button
                      onClick={() => {
                        actions.deleteRoute(singleroute.id);
                      }}
                    >
                      <span>DELETE ROUTE</span>
                    </button>
                  ) : store.favorites
                      .map((obj) => {
                        if (obj.bike) {
                          return obj.bike.id;
                        }
                      })
                      .includes(bike.id) ? (
                    <div>
                      <button
                        onClick={async () => {
                          await actions.deleteFavorite(bike.id, null, null);
                        }}
                      >
                        <span>DELETE FAVORITE</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        await actions.addToFavorites(bike, "bike");
                      }}
                    >
                      <span>♥</span>
                    </button>
                  )}
                </div>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motocard;
