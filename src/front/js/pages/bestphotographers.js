import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PhotographerSlider } from "../component/photographerslider";
import Map from "../component/mapmarker";
import "../../styles/forall.css";

export const Bestphotographers = () => {
  const { store, actions } = useContext(Context);
  const [photographers, setPhotographers] = useState([]);
  //const photographersLocation = photographers.map((obj) => obj.location_name);
  const [photos, setPhotos] = useState([]);
  const [singlevision, setSinglevision] = useState(false);
  const [singlePhotographer, setSinglePhotographer] = useState({});

  useEffect(() => {
    getPhotographers();
  }, []);

  useEffect(() => {
    getPhotos();
  }, [singlePhotographer]);

  const getPhotographers = async () => {
    await actions.getPhotographers();
    setPhotographers(store.photographers);
  };

  const getPhotos = async () => {
    await actions.getPhotos();
    setPhotos(
      store.photos.filter((obj) => obj.name == singlePhotographer.email)
    );
  };

  const AddFavoritePhotographer = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        favorite_id: singlephotographer.id,
        favorite_type: "photographer",
      }),
    });
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("response not ok");
    }
  };

  const photographersData = photographers.map((obj) => ({
    user_name: obj.user_name,
    location: obj.location_name,
    find_me_text: obj.find_me_text + ", Spain",
  }));

  return (
    <div className="container">
      <h1 className="text-success">//Los mejores fotografos</h1>
      <Map photographersData={photographersData} />
      {photographers.map((photographer) => {
        return (
          <div key={photographer.id}>
            <h4 className="text-white">Fotografo: {photographer.user_name}</h4>
            <button
              onClick={() => {
                setSinglevision(true);
                setSinglePhotographer(photographer);
              }}
            >
              <span>Ver detalles</span>
            </button>
          </div>
        );
      })}
      {singlevision == true ? (
        <>
          <div className="text-white">
            <div>
              <h5>Detalles fotografo: </h5>
              <ul>
                <li>Nombre de usuario {singlePhotographer.user_name}</li>
                <li>Localizacion: {singlePhotographer.location_name}</li>
                <li>Instagram {singlePhotographer.instagram}</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Servicios: {singlePhotographer.services}</li>
                <li>
                  Me puedes encontrar en: {singlePhotographer.find_me_text}
                </li>
              </ul>
              {store.userType == "User" || store.userType == "Photographer" ? (
                <button onClick={() => AddFavoritePhotographer()}>
                  <span>♥</span>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      <PhotographerSlider images={photos} />
    </div>
  );
};
