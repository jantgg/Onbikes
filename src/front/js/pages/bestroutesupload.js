import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";
import "../../styles/login.css";
import "../../styles/loadingmodal.css";
import "../../styles/spiner.css";
import "../../styles/animations.css";
import SliderRoute from "../component/sliderroute.js";
import SliderRouteM from "../component/sliderroutem.js";
import SliderPhotos from "../component/sliderphotos.js";
import SliderPhotosM from "../component/sliderphotom.js";
import SliderBike from "../component/sliderbike.js";
import SliderBikeM from "../component/sliderbikem.js";
import SliderPhotog from "../component/sliderpp.js";
import NewSlider from "../component/newslider.js";
import Maps from "../component/maps";

export const Bestroutesupload = () => {
  const { store, actions } = useContext(Context);
  const [userRoutes, setUserRoutes] = useState([]);
  const [routeName, setRouteName] = useState([]);
  const [startName, setStartName] = useState([]);
  const [interest, setInterest] = useState([]);
  const [description, setDescription] = useState([]);
  const [endName, setEndName] = useState([]);
  const [photos, setRoutePhoto] = useState([]);
  const [routeSend, setRouteSend] = useState(false);
  const [previewPhotos, setPreviewPhotos] = useState(null);
  const isDesktop = window.innerWidth >= 1000;
  const [routeOut, setRouteOut] = useState(false);
  const [photogOut, setPhotogOut] = useState(false);
  const [showDivs, setShowDivs] = useState(false);
  const [showDivs2, setShowDivs2] = useState(false);
  const [showDivs3, setShowDivs3] = useState(false);
  const [moveOut, setMoveOut] = useState(false);

  useEffect(() => {
    actions.setViewType();
    getFavorites();
    getUserRoutes();
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

  const getFavorites = async () => {
    await actions.getFavorites();
    // setUserFavoriteRoutes(store.favorites.filter((obj) => obj.route != null));
  };

  const uploadPhoto = async () => {
    const formData = new FormData();
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("files", photos[i]);
      }
    }
    formData.append("photo_type", "route");
    formData.append("upload_type", "route");
    formData.append(
      "route_data",
      JSON.stringify({
        name: routeName,
        start_location_name: startName,
        end_location_name: endName,
        description_text: description,
        interest_text: interest,
      })
    );
    const response = await fetch(store.backendurl + "photos", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      console.log(response.data);
      8;
      setRouteSend(true);
      location.reload();
    } else {
      console.log(response);
    }
  };

  const inputRoutePhotos = (event) => {
    const selectedFiles = event.target.files;
    const urls = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const url = URL.createObjectURL(selectedFiles[i]);
      urls.push(url);
    }
    setRoutePhoto(selectedFiles);
    setPreviewPhotos(urls);
  };

  const getUserRoutes = async () => {
    const response = await fetch(store.backendurl + "userroutes", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUserRoutes(data.body);
    } else {
      console.log("response not ok");
    }
  };
  // MODAL LOADING --------------------------------------------------------------------------------------------------------->
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="d-flex flex-column text-white minheight">
      {isDesktop ? (
        <>
          <div
            className={`col-10  pb-4 row mx-auto  mt-10 gradient-text ${
              moveOut ? "slide-right " : ""
            } ${showDivs ? "slide-in " : "hidden"}`}
          >
            <div className="center-align mb-5 row col-12 sizehomet mx-auto  py-3 spartan imagenmalla bordecitoallg">
              <div className="col-10 center-align sizehomet mx-auto">
                Mis rutas subidas
              </div>
            </div>{" "}
            <SliderRoute data={userRoutes} groupSize={3} />
          </div>
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
        <>
          <div className="col-12 bordecitot bordecitob pb-4 row mx-auto imagenn">
            <div className="center-align col-11 sizehomemb mx-auto mt-4 mb-4 text-white">
              Mis rutas subidas
            </div>
            <SliderRouteM data={userRoutes} groupSize={1} />
          </div>
        </>
      )}
      <div className="freehome"></div>
      {routeSend == false ? (
        <div
          className={`mx-auto col-12 ${isDesktop ? " col-11" : " col-12"} ${
            moveOut ? "slide-left " : ""
          } ${showDivs2 ? "slide-in " : "hidden"}`}
        >
          <div className={`col-8 mt-5 gradient-text mx-auto`}>
            <div className="center-align col-12 sizehomet mx-auto mb-4 py-3 spartan imagenmalla bordecitoallg">
              Datos de la ruta
            </div>
            <div className="d-flex px-0 col-12">
              {" "}
              <div
                className={` col-6 uploadposition ${
                  previewPhotos != null ? " slide-upload" : ""
                }`}
              >
                {" "}
                <div
                  className={`login-box col-12 text-white mx-auto center-align sizehomes bordecitoall px-5 p-3`}
                  style={{ backgroundColor: "black" }}
                >
                  <form
                    onSubmit={() => {
                      e.prevent.default();
                    }}
                  >
                    <div className="user-box mt-2">
                      <input
                        type="name"
                        name="name"
                        required
                        autoFocus
                        onChange={(e) => {
                          setRouteName(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="name">Nombre de la ruta</label>
                    </div>

                    <div className="user-box">
                      <input
                        type="start"
                        name="start"
                        required
                        autoFocus
                        onChange={(e) => {
                          setStartName(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="start">Sitio de salida</label>
                    </div>
                    <div className="user-box">
                      <input
                        type="interest"
                        name="interest"
                        required
                        autoFocus
                        onChange={(e) => {
                          setInterest(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="interest">Lugares de interés</label>
                    </div>
                    <div className="user-box">
                      <input
                        type="description"
                        name="description"
                        required
                        autoFocus
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="description">Descripción</label>
                    </div>
                    <div className="user-box">
                      <input
                        type="end"
                        name="end"
                        required
                        autoFocus
                        onChange={(e) => {
                          setEndName(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="end">Fin de la ruta</label>
                    </div>
                    <div className="user-box mt-3">
                      <input
                        onChange={inputRoutePhotos}
                        type="file"
                        accept="image/jpeg, image/png"
                        multiple
                      />
                      <label htmlFor="photo">Fotos de la ruta</label>
                    </div>
                  </form>
                  <button
                    className="botonaco mb-5 sizehomes px-3"
                    onClick={() => {
                      uploadPhoto();
                      setMostrarModal(true);
                    }}
                  >
                    <span style={{ "--i": 1 }}>P</span>
                    <span style={{ "--i": 2 }}>u</span>
                    <span style={{ "--i": 3 }}>b</span>
                    <span style={{ "--i": 4 }}>l</span>
                    <span style={{ "--i": 5 }}>i</span>
                    <span style={{ "--i": 6 }}>c</span>
                    <span style={{ "--i": 7 }}>a</span>
                    <span style={{ "--i": 8 }}>r</span>
                    <span style={{ "--i": 9 }}>&nbsp;</span>
                    <span style={{ "--i": 10 }}>r</span>
                    <span style={{ "--i": 11 }}>u</span>
                    <span style={{ "--i": 12 }}>t</span>
                    <span style={{ "--i": 13 }}>a</span>
                  </button>
                </div>
              </div>
              {mostrarModal && (
                <div className="modal">
                  <div className="modal-contenido">
                    <div className="spartan sizehomet text-white center-align ">
                      Estamos subiendo tu Ruta a la nube
                      <br />
                      <div className="lds-spinner mt-4">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`image-upload col-6 mt-5 center-align bg-black ${
                  previewPhotos != null ? " slide-img-upload" : " before-img"
                }`}
              >
                {" "}
                {previewPhotos != null ? (
                  <>
                    <NewSlider data={previewPhotos} groupSize={1} />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-white"> Route send succesfully!</div>
          <button
            onClick={() => {
              setRouteSend(false);
            }}
          >
            Click Here to upgrade another 1
          </button>
        </div>
      )}
    </div>
  );
};
