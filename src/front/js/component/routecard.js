import React, { useState, useContext, useEffect } from "react";
import "../../styles/sliderbueno.css";
import "../../styles/animatedcard.css";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Routecard = ({ route, index }) => {
  const { store, actions } = useContext(Context);

  const [currentFavorites, setCurrentFavorites] = useState([]);

  useEffect(() => {
    getFavs();
  }, []);

  const getFavs = async () => {
    const favoritesToSet = await actions.getFavorites();
    setCurrentFavorites(store.favorites);
  };

  const deleteFavoriteRoute = async () => {
    const response = await fetch(store.backendurl + "favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bike_id: route.id,
        favorite_type: "route",
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
        {route.name}
      </div>
      <div className="motocard text-white mx-auto">
        <div
          className="hovereffect"
          style={{
            backgroundImage: `url(${route.photos[0].path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <img className="img-responsive" alt="" />
          <div className="overlay d-flex flex-column justify-content-between">
            <h2 className=" sizehomes">
              <div>{route.interest_text}</div>
            </h2>
            <p className="justify-content-between d-flex">
              {" "}
              <div className="ms-4">
                {" "}
                {store.singleViewRoute == null ? (
                  <button
                    className="botonaco px-2 py-1"
                    onClick={() => {
                      actions.setSingleViewRoute(route);
                      setTimeout(() => {
                        actions.setVisibleRoute(true);
                      }, 50);
                    }}
                  >
                    <span>Ver detalles</span>
                  </button>
                ) : null}
              </div>
              <div className="right-align pb-3 pe-4">
                {" "}
                {localStorage.getItem("token") != null ? (
                  <div>
                    {store.viewType == true ? (
                      <button
                        className="botonaco"
                        onClick={() => {
                          actions.deleteRoute(route.id);
                        }}
                      >
                        <span>Borrar</span>
                      </button>
                    ) : store.favorites
                        .map((obj) => {
                          if (obj.route) {
                            return obj.route.id;
                          }
                        })
                        .includes(route.id) ? (
                      <div>
                        <button
                          className="botonaco"
                          onClick={async () => {
                            await actions.deleteFavorite(null, route.id, null);
                          }}
                        >
                          <span>Borrar</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="botonaco"
                        onClick={async () => {
                          await actions.addToFavorites(route, "route");
                        }}
                      >
                        <span>Añadir a favoritos</span>
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   key={index}
    //   className=" motocard colp text-white bordecitoall mx-auto"
    //   style={{
    //     backgroundImage: `url(${route.photos[0].path})`,
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center",
    //   }}
    // >
    //   <div className="imagen">
    //     <div className="freeroute">
    //       <div className="headcontent bordecitoall bg-black">
    //         <div className="sizehomet spartan text-center"></div>
    //       </div>
    //     </div>

    //     <div className="contentroute bordecitot col-12 container d-flex flex-column justify-content-between">
    //       <div className="ms-3 sizehomes center-align">
    //         {route.interest_text}
    //       </div>
    //       <div className="right-align mb-3 w100">
    //         <button
    //           key="button"
    //           className="botonaco zup px-2 sizehomes center-align"
    //           onClick={() => deleteFavoriteRoute()}
    //         >
    //           <span className="mx-auto center-align" style={{ "--i": 1 }}>
    //             <i className="fa-solid fa-heart"></i>
    //           </span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Routecard;
