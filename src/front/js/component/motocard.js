import React, { useState, useContext, useEffect } from "react";
import "../../styles/sliderbueno.css";
import "../../styles/animatedcard.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Motocard = ({ bike, index }) => {
  const { store, actions } = useContext(Context);
  const [currentFavorites, setCurrentFavorites] = useState([]);

  useEffect(() => {
    getFavs();
  }, []);

  const getFavs = async () => {
    const favoritesToSet = await actions.getFavorites();
    setCurrentFavorites(store.favorites);
  };

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
              {/* {localStorage.getItem("token") != null ? (
                <div>
                  {store.viewType == true ? (
                    <button
                      onClick={() => {
                        actions.deleteRoute(singleroute.id);
                      }}
                    >
                      <span>DELETE ROUTE</span>
                    </button>
                  ) : currentFavorites.some(
                      (obj) => obj.bike.model === bike.model
                    ) ? (
                    <div>
                      <button
                        onClick={async () => {
                          await actions.deleteFavorite(bike.id, null, null);
                          await getFavs();
                        }}
                      >
                        <span>DELETE FAVORITE</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        await actions.addToFavorites(bike, "bike");
                        await getFavs();
                      }}
                    >
                      <span>♥</span>
                    </button>
                  )}
                </div>
              ) : null} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Motocard;
