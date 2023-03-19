import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Context } from "../store/appContext";
import NewSlider from "../component/newslider.js";
import SliderPhotos from "../component/sliderphotos.js";
import "../../styles/forall.css";
import "../../styles/login.css";
import Maps from "../component/maps";
import MapsDany from "../component/mapsdany.js";

export const Bestroutes = () => {
  const { store, actions } = useContext(Context);
  const [routes, setRoutes] = useState([]);
  const [singlevision, setSinglevision] = useState(false);
  const [singleroute, setSingleRoute] = useState({});
  const [selectedRouteImages, setSelectedRouteImages] = useState([]);
  const photos = selectedRouteImages.map((obj) => obj.url);
  const [routesNewPhotos, setRoutesNewPhotos] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const isDesktop = window.innerWidth >= 1000;
  const [showDivs, setShowDivs] = useState(false);
  const [mapProps, setMapProps] = useState({
    origin: "",
    destination: "",
  });

  useEffect(() => {
    getRoutes();
    setTimeout(() => {
      setShowDivs(true);
    }, 150);
  }, []);

  useEffect(() => {
    getPhotos(singleroute.id);
  }, [singleroute]);

  useEffect(() => {
    setMapProps({
      origin: singleroute.start_location_name,
      destination: singleroute.end_location_name,
    });
  }, [singleroute.start_location_name, singleroute.end_location_name]);

  const getPhotos = async (routeId) => {
    const selectedRoute = routes.find((route) => route.id === routeId);
    if (selectedRoute) {
      setSelectedRouteImages(selectedRoute.photos);
    }
  };

  const getRoutes = async () => {
    const response = await fetch(store.backendurl + "routes");
    const data = await response.json();
    const routesWithPhotos = data.body.map((route) => ({
      ...route,
      photos: route.photos.map((photo) => ({
        id: photo.id,
        url: photo.path,
      })),
    }));
    setRoutes(routesWithPhotos);
  };

  const addFavoriteRoute = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        favorite_id: singleroute.id,
        favorite_type: "route",
      }),
    });
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("response not ok");
    }
  };

  const uploadSinglePhotos = async () => {
    const formData = new FormData();
    for (let i = 0; i < routesNewPhotos.length; i++) {
      formData.append("files", routesNewPhotos[i]);
    }
    formData.append("upload_type", "single_photo");
    formData.append("photo_type", "route");
    formData.append("route_id", singleroute.id);
    const response = await fetch(store.backendurl + "photos", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      getPhotos(singleroute.id);
    } else {
      console.log(response);
    }
  };

  //Codigo de Maps ------------------------------------------------------------------------------------------------------------------>
  Geocode.setApiKey("AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4");
  Geocode.setLanguage("es");
  Geocode.setRegion("es");
  const [markers, setMarkers] = useState([]);
  const [routeCities, setrouteCities] = useState([]);

  useEffect(() => {
    geocodeCities(routes);
    setCities();
  }, [routes]);
  const setCities = () => {
    setrouteCities(routes);
  };
  const getRandomOffset = () => {
    const offset = Math.random() * 0.002;
    return Math.random() > 0.5 ? offset : -offset;
  };

  const geocodeCities = async (routes) => {
    const results = [];
    try {
      for (const routemarker of routes) {
        const response = await Geocode.fromAddress(
          routemarker.start_location_name
        );
        const { lat, lng } = response.results[0].geometry.location;
        const newMarker = {
          name: routemarker.name,
          position: {
            lat: lat + getRandomOffset(),
            lng: lng + getRandomOffset(),
          },
          offset: {
            lat: getRandomOffset(),
            lng: getRandomOffset(),
          },
        };
        results.push(newMarker);
      }
      console.log(results);
      setMarkers(results);
      return results;
    } catch (error) {
      console.error(`Error geocoding ${routemarker}: ${error}`);
    }
  };

  const mapContainerStyle = {
    height: isDesktop ? "12vw" : "40vw",
    width: "100%",
  };

  const center = {
    lat: 40.0168,
    lng: -3.7038,
  };

  const options = {
    streetViewControl: false,
  };
  //Codigo de Maps ---------------------------------------------------------------------------------------------------------------->

  return (
    <div className="d-flex flex-column minheight">
      <div
        className={`col-11 col-xxl-5 col-xl-6 col-lg-7 mx-auto bordecitoall mt-10 imagenn center-align  ${
          showDivs ? "slide-in" : "hidden"
        }`}
      >
        {singlevision ? (
          <>
            <div className="col-11 mx-auto bordecitob sizehomet text-white py-3 ps-3 spartan imagenmalla">
              {singleroute.name}
            </div>
            <div className="col-12 mx-auto ">
              <MapsDany
                origin={mapProps.origin}
                destination={mapProps.destination}
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-12 mx-auto bordecitob sizehomet text-white py-3 ps-3 spartan imagenmalla">
              Las mejores Rutas de nuestro país
            </div>
            <div className="col-12 mx-auto ">
              {" "}
              <LoadScript
                googleMapsApiKey={"AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4"}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={5.3}
                  options={options}
                >
                  {markers.map((marker, index) => {
                    return (
                      <Marker
                        key={index}
                        position={{
                          lat: marker.position.lat + marker.offset.lat,
                          lng: marker.position.lng + marker.offset.lng,
                        }}
                        title={marker.name}
                        onClick={() => {
                          setSinglevision(false);
                          setVisible1(false);
                          setShowDivs(false);
                          setTimeout(() => {
                            setSinglevision(true);
                            setSingleRoute(routes[index]);
                            setShowDivs(true);
                            setTimeout(() => {
                              setVisible1(true);
                            }, 450);
                          }, 150);
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              </LoadScript>
            </div>
          </>
        )}
      </div>
      <div className={`${visible1 ? "swing-in-top-fwd" : "hidden"}`}>
        {isDesktop ? (
          <>
            <div className="col-8 col-xxl-5 col-xl-6 col-lg-7 row mx-auto imagenasfalto">
              <div
                className="col-6 px-0 center-align"
                style={{ backgroundColor: "black" }}
              >
                <NewSlider data={photos} groupSize={1} />
              </div>
              <div className=" col-6 bordecitoe bordecitot bordecitob mx-auto movidas text-white">
                <div className=" ">
                  <div className="sizehomed mx-auto center-align mb-4 mt-3 text-white">
                    {singleroute.start_location_name}&nbsp;
                    <i className="fa-solid fa-angles-right"></i> &nbsp;
                    {singleroute.end_location_name}
                  </div>
                  <div className="sizehomes mx-auto mb-2 px-4 text-white">
                    <i className="fa-solid fa-road"></i>&nbsp;{" "}
                    {singleroute.description_text}
                  </div>
                  <div className="sizehomeb mx-auto ms-1 mb-2 px-4 text-white">
                    <i class="fa-solid fa-hand-peace"></i>&nbsp;{" "}
                    {singleroute.interest_text}
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    className="botonaco sizehomet px-3 py-2"
                    onClick={() => {
                      setSinglevision(false);
                      setVisible1(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa-solid fa-rotate-left"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Versión movil ---------------------------------------------------------------------------------------->
          <>
            <div className="freehome"></div>
            <div className="col-11 row mx-auto imagenasfalto ">
              <div
                className="col-12 px-0 center-align"
                style={{ backgroundColor: "black" }}
              >
                <NewSlider data={photos} groupSize={1} />
              </div>
              <div className=" col-12 bordecitoe bordecitol bordecitob mx-auto movidas text-white">
                <div className="mb-5 ">
                  <div className="sizehomed mx-auto center-align mb-4 mt-3 text-white">
                    {singleroute.start_location_name}&nbsp;
                    <i className="fa-solid fa-angles-right"></i> &nbsp;
                    {singleroute.end_location_name}
                  </div>
                  <div className="sizehomeb mx-auto mb-2 px-4 text-white">
                    <i className="fa-solid fa-road"></i>&nbsp;{" "}
                    {singleroute.description_text}
                  </div>
                  <div className="sizehomeb mx-auto mb-2 px-4 text-white">
                    <i class="fa-solid fa-hand-peace"></i>&nbsp;{" "}
                    {singleroute.interest_text}
                  </div>
                </div>
                <div className="mb-3 mt-5">
                  <button
                    className="botonaco sizehomet px-3 py-2"
                    onClick={() => {
                      setSinglevision(false);
                      setVisible1(false);
                    }}
                  >
                    <span>
                      {" "}
                      <i class="fa-solid fa-rotate-left"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    // <div className="container">
    //   <h1 className="text-success">//Las mejores rutas</h1>
    //   {routes.map((route) => {
    //     return (
    //       <div key={route.id}>
    //         <h4 className="text-white">Nombre ruta: {route.name}</h4>
    //         <button
    //           onClick={() => {
    //             setSinglevision(true);
    //             setSingleRoute(route);
    //             if (singlevision == true) {
    //               setSinglevision(false);
    //             }
    //           }}
    //         >
    //           <span>Ver detalles</span>
    //         </button>
    //         {store.userType != "User" && store.userType != "Photographer" ? (
    //           <div className="col-4 mx-auto text-center mb-5  fs-3 text-wrap lh-sm border border-danger rounded pb-2">
    //             No vas a poder guardar los resultados en favoritos ya que no te
    //             has registrado
    //           </div>
    //         ) : null}
    //       </div>
    //     );
    //   })}
    //   {singlevision == true ? (
    //     <>
    //       <div className="text-white">
    //         <div>
    //           <ul>
    //             <li>Punto de partida: {singleroute.start_location_name}</li>
    //             <li>Fin de la ruta: {singleroute.end_location_name}</li>
    //             <li>Descripción: {singleroute.description_text}</li>
    //             <li>Puntos de interes: {singleroute.interest_text}</li>
    //           </ul>
    //           {store.userType == "User" || store.userType == "Photographer" ? (
    //             <div>
    //               <div className="text-white">
    //                 Quieres añadir mas fotos a esta ruta ?
    //               </div>
    //               <input
    //                 onChange={(e) => {
    //                   setRoutesNewPhotos(e.target.files);
    //                 }}
    //                 type="file"
    //                 accept="image/jpeg, image/png"
    //                 multiple
    //               />
    //               <button
    //                 onClick={() => {
    //                   uploadSinglePhotos();
    //                 }}
    //               >
    //                 Publicar
    //               </button>
    //             </div>
    //           ) : null}
    //           <Maps
    //             origin={mapProps.origin}
    //             destination={mapProps.destination}
    //           />
    //           <SliderPhotos data={routeImages} groupSize={3} />
    //         </div>
    //         <div>
    //           {store.userType == "User" || store.userType == "Photographer" ? (
    //             <button onClick={() => addFavoriteRoute()}>
    //               <span>♥</span>
    //             </button>
    //           ) : null}
    //         </div>
    //       </div>
    //     </>
    //   ) : null}
    // </div>
  );
};
