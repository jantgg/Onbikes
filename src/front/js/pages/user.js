import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/result.css";
import "../../styles/forall.css";
import "../../styles/animations.css";
import SliderBike from "../component/sliderbike.js";
import SliderBikeM from "../component/sliderbikem.js";
import SliderRoute from "../component/sliderroute.js";
import SliderPhotog from "../component/sliderpp.js";
import SliderRouteM from "../component/sliderroutem.js";
import NewSlider from "../component/newslider.js";
import Maps from "../component/maps";

export const User = () => {
  const Navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [userFavBikes, setUserFavBikes] = useState([]);
  const bikes = userFavBikes.map((obj) => obj.bike);
  const [userFavRoutes, setUserFavRoutes] = useState([]);
  const routes = userFavRoutes.map((obj) => obj.route);
  const [userFavPhotographers, setUserFavPhotographers] = useState([]);
  const photographers = userFavPhotographers.map((obj) => obj.photographer);
  const [routeOut, setRouteOut] = useState(false);
  const [photogOut, setPhotogOut] = useState(false);
  const isDesktop = window.innerWidth >= 1000;
  const [showDivs, setShowDivs] = useState(false);
  const [showDivs2, setShowDivs2] = useState(false);
  const [showDivs3, setShowDivs3] = useState(false);
  const [moveOut, setMoveOut] = useState(false);

  useEffect(() => {
    getFavorites();
    actions.resetViewType();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowDivs(true);
      setTimeout(() => {
        setShowDivs2(true);
        setTimeout(() => {
          setShowDivs3(true);
        }, 400);
      }, 500);
    }, 150);
  }, []);

  const userName = localStorage.getItem("user_name");

  const getFavorites = async () => {
    await actions.getFavorites();
    console.log(store.favorites);
    setUserFavBikes(store.favorites.filter((obj) => obj.bike != null));
    setUserFavRoutes(store.favorites.filter((obj) => obj.route != null));
    setUserFavPhotographers(
      store.favorites.filter((obj) => obj.photographer != null)
    );
  };

  return (
    <div className="d-flex flex-column text-white minheight">
      {store.userType == "User" ? (
        <>
          {isDesktop ? (
            <>
              <div
                className={`col-10  pb-4 row mx-auto  mt-10 gradient-text ${
                  moveOut ? "slide-left " : ""
                } ${showDivs3 ? "slide-in " : "hidden"}`}
              >
                <div className="center-align col-12 sizehomet mx-auto mb-4 py-3 spartan imagenmalla bordecitoallg">
                  Mis motos favoritas
                </div>{" "}
                <SliderBike data={bikes} groupSize={3} />
              </div>
            </>
          ) : (
            <>
              <div className="col-12 bordecitot bordecitob mt-10 pb-4 row mx-auto imagenn">
                <div className="center-align col-11 sizehomemb mx-auto mt-4 mb-4">
                  Mis motos favoritas
                </div>{" "}
                <SliderBikeM data={bikes} groupSize={1} />
              </div>
            </>
          )}
          <div className="freehome "></div>
          {isDesktop ? (
            <>
              <div
                className={`col-10  pb-4 row mx-auto  mt-10 gradient-text ${
                  moveOut ? "slide-right " : ""
                } ${showDivs2 ? "slide-in " : "hidden"}`}
              >
                <div className="center-align mb-5 row col-12 sizehomet mx-auto  py-3 spartan imagenmalla bordecitoallg">
                  <div className="col-4"></div>
                  <div className="col-4 center-align sizehomet">
                    Mis rutas favoritas
                  </div>
                  <div className="col-4 center-align sizehomet scale11">
                    {" "}
                    <button
                      className="botonaco mx-auto px-4"
                      onClick={() => {
                        setMoveOut(true);
                        setTimeout(() => {
                          Navigate("/bestroutesupload");
                        }, 500);
                      }}
                    >
                      <span style={{ "--i": 1 }}>S</span>
                      <span style={{ "--i": 2 }}>u</span>
                      <span style={{ "--i": 3 }}>b</span>
                      <span style={{ "--i": 4 }}>i</span>
                      <span style={{ "--i": 5 }}>r</span>
                      <span style={{ "--i": 6 }}>/</span>
                      <span style={{ "--i": 7 }}>V</span>
                      <span style={{ "--i": 8 }}>e</span>
                      <span style={{ "--i": 9 }}>r</span>
                      <span style={{ "--i": 10 }}>&nbsp;</span>
                      <span style={{ "--i": 11 }}>m</span>
                      <span style={{ "--i": 12 }}>i</span>
                      <span style={{ "--i": 13 }}>s</span>
                      <span style={{ "--i": 14 }}>&nbsp;</span>
                      <span style={{ "--i": 15 }}>r</span>
                      <span style={{ "--i": 16 }}>u</span>
                      <span style={{ "--i": 17 }}>t</span>
                      <span style={{ "--i": 18 }}>a</span>
                      <span style={{ "--i": 19 }}>s</span>
                    </button>
                  </div>
                </div>{" "}
                <SliderRoute data={routes} groupSize={3} />
              </div>
              {/* VISTA SINGLE ROUTE -------------------------------------------------------------------------------------------------------------------- */}
              {store.singleViewRoute != null ? (
                <div
                  className={`col-10 mt-5 gradient-text mx-auto ${
                    routeOut ? "slide-right" : ""
                  } ${store.visibleRoute ? " slide-in" : " hidden "}`}
                >
                  <div className="center-align row col-12 sizehomet mx-auto mb-4 py-3 spartan imagenmalla bordecitoallg">
                    <div className="col-3"></div>
                    <div className="col-6 center-align sizehomet">
                      {store.singleViewRoute.name}
                    </div>
                    <div className="col-3 center-align sizehomet scale11">
                      {" "}
                      <button
                        className="botonaco"
                        onClick={() => {
                          setRouteOut(true);
                          setTimeout(() => {
                            setRouteOut(false);
                            setTimeout(() => {
                              actions.setSingleViewRoute(null);
                              actions.setVisibleRoute(false);
                              setRouteOut(false);
                            }, 0);
                          }, 250);
                        }}
                      >
                        <span>Cerrar</span>
                      </button>
                    </div>
                  </div>{" "}
                  <div className="mt-5 row">
                    {" "}
                    <div className="col-4 ">
                      <Maps route={store.singleViewRoute} />
                    </div>
                    <div className="col-8 row px-0 imagenasfalto">
                      <div
                        className="col-6 px-0 center-align"
                        style={{ backgroundColor: "black" }}
                      >
                        <NewSlider
                          data={store.singleViewRoutePhotos}
                          groupSize={1}
                        />
                      </div>
                      <div className=" col-6 bordecitoe bordecitot bordecitob mx-auto movidas text-white">
                        <div className=" ">
                          <div className="sizehomed mx-auto center-align mb-4 mt-3 text-white">
                            {store.singleViewRoute.start_location_name}&nbsp;
                            <i className="fa-solid fa-angles-right"></i> &nbsp;
                            {store.singleViewRoute.end_location_name}
                          </div>
                          <div className="sizehomes mx-auto mb-2 px-4 text-white">
                            <i className="fa-solid fa-road"></i>&nbsp;{" "}
                            {store.singleViewRoute.description_text}
                          </div>
                          <div className="sizehomeb mx-auto ms-1 mb-2 px-4 text-white">
                            <i class="fa-solid fa-hand-peace"></i>&nbsp;{" "}
                            {store.singleViewRoute.interest_text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <></>
          )}
          <div className="freehome "></div>
          {isDesktop ? (
            <div
              className={`${moveOut ? "slide-left " : ""} ${
                showDivs ? "slide-in " : "hidden"
              }`}
            >
              <div className="col-10  pb-4 row mx-auto  mt-10 gradient-text">
                <div className="center-align mb-5 row col-12 sizehomet mx-auto  py-3 spartan imagenmalla bordecitoallg">
                  <div className="col-10 center-align sizehomet mx-auto">
                    Mis Fotógrafos favoritos
                  </div>
                </div>{" "}
                <SliderPhotog data={photographers} groupSize={3} />
              </div>
              {/* VISTA SINGLE PHOTOGRAPHER -------------------------------------------------------------------------------------------------------------------- */}
              {store.singleViewPhotog != null ? (
                <div
                  className={`col-8 mt-5 gradient-text mx-auto ${
                    photogOut ? "slide-right" : ""
                  } ${store.visiblePhotog ? " slide-in" : " hidden "}`}
                >
                  <div className="center-align row col-12 sizehomet mx-auto mb-4 py-3 spartan imagenmalla bordecitoallg">
                    <div className="col-3"></div>
                    <div className="col-6 center-align sizehomet">
                      {store.singleViewPhotog.user_name}
                    </div>
                    <div className="col-3 center-align sizehomet scale11">
                      {" "}
                      <button
                        className="botonaco"
                        onClick={() => {
                          setPhotogOut(true);
                          setTimeout(() => {
                            setPhotogOut(false);
                            setTimeout(() => {
                              actions.setSingleViewPhotog(null);
                              actions.setVisiblePhotog(false);
                              setPhotogOut(false);
                            }, 0);
                          }, 250);
                        }}
                      >
                        <span>Cerrar</span>
                      </button>
                    </div>
                  </div>{" "}
                  <div className="col-12 row mx-auto imagenn">
                    <div
                      className="col-6 px-0 center-align"
                      style={{ backgroundColor: "black" }}
                    >
                      <NewSlider
                        data={store.singleViewPhotogPhotos}
                        groupSize={1}
                      />
                    </div>
                    <div className=" col-6 bordecitoe bordecitot bordecitob mx-auto px-4 text-white">
                      <div className="sizehomes mx-auto mb-4 mt-5 text-white">
                        Descripción: {store.singleViewPhotog.services}
                      </div>

                      <div className="sizehomes mx-auto mb-2 text-white">
                        <i class="fa-brands fa-instagram"></i>&nbsp;{" "}
                        {store.singleViewPhotog.instagram}
                      </div>

                      <div className="sizehomes mx-auto text-white">
                        <i class="fa-solid fa-location-dot"></i> &nbsp;
                        {store.singleViewPhotog.find_me_text},&nbsp;{" "}
                        {store.singleViewPhotog.location_name}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : null}
    </div>
  );
};
