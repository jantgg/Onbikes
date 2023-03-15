import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/forall.css";

export const BestPhotographerUpload = () => {
  const { store, actions } = useContext(Context);
  const [photos, setPhotos] = useState([]);
  const [photographerphotos, setPhotographerPhotos] = useState([]);
  const [photographerData, setPhotographerData] = useState([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [newFindMeText, setNewFindMeText] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newServices, setNewServices] = useState("");
  const [updated, setUpdated] = useState(false);

  const getPhotographer = async () => {
    await actions.getPhotographers();
    await actions.getPhotos();
    const photographers = store.photographers;
    const email = localStorage.getItem("email");
    const currentPhotographer = photographers.find(
      (photographer) => photographer.email === email
    );
    setPhotographerData(currentPhotographer);
    const filterPhotos = (photographerId) => {
      return store.photos.filter(
        (photo) =>
          photo.photographer_id === photographerId &&
          photo.photo_type === "photographer"
      );
    };

    const currentPictures = filterPhotos(photographerData.id);
    setPhotographerPhotos(currentPictures);
  };

  useEffect(() => {
    getPhotographer();
  }, []);

  const uploadPhoto = async () => {
    const formData = new FormData();
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append("files", photos[i]);
      }
    }
    formData.append("photo_type", "photographer");
    formData.append("upload_type", "photographer");
    formData.append("photographer_id", photographerData.id);
    const response = await fetch(store.backendurl + "photos", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });
    if (response.ok) setUploadedPhoto(true);
  };

  const updatePhotographer = async () => {
    const response = await fetch(store.backendurl + "photographer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        location_name: newLocationName,
        find_me_text: newFindMeText,
        instagram: newInstagram,
        services: newServices,
      }),
    });
    if (response.ok) {
      setUpdated(true);
    }
  };

  return (
    <>
      {uploadedPhoto == false ? (
        <div className="mx-auto">
          <div>
            <h1 className="text-white">Perfil FOTOGRAFO</h1>
          </div>
          <div className="text-white">
            <div>
              <h4>Nombre de usuario: {photographerData.user_name}</h4>
              <ul>
                <li>Ubicacion: {photographerData.location_name}</li>
                <li>
                  Lugar de trabajo, ubicacion exacta:
                  {photographerData.find_me_text}
                </li>
                <li>Instagram: {photographerData.instagram}</li>
                <li>Servicios: {photographerData.services}</li>
              </ul>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="password"
              className="col-md-4 col-form-label text-md-end"
            >
              Provincia / Ciudad de trabajo
            </label>
            <div className="col-md-6">
              <input
                className="form-control form-control-lg"
                placeholder="Localización"
                type="text"
                value={newLocationName}
                onChange={(e) => {
                  setNewLocationName(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="password"
              className="col-md-4 col-form-label text-md-end"
            >
              Instagram
            </label>
            <div className="col-md-6">
              <input
                className="form-control form-control-lg"
                placeholder="@Instagram"
                type="text"
                value={newInstagram}
                onChange={(e) => {
                  setNewInstagram(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="password"
              className="col-md-4 col-form-label text-md-end"
            >
              Servicios
            </label>
            <div className="col-md-6">
              <input
                className="form-control form-control-lg"
                placeholder="Servicios"
                type="text"
                value={newServices}
                onChange={(e) => {
                  setNewServices(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="password"
              className="col-md-4 col-form-label text-md-end"
            >
              Ubicación exacta
            </label>
            <div className="col-md-6">
              <input
                className="form-control form-control-lg"
                placeholder="Lugar Favorito"
                type="text"
                value={newFindMeText}
                onChange={(e) => {
                  setNewFindMeText(e.target.value);
                }}
                required
              />
              <button
                onClick={() => {
                  updatePhotographer();
                  setUpdated(true);
                }}
              >
                Agregar nueva informacion
              </button>
            </div>
          </div>
          <div className="text-white mt-5">Subir fotos a tu perfil</div>
          <input
            onChange={(e) => {
              setPhotos(e.target.files);
            }}
            type="file"
            accept="image/jpeg, image/png"
            multiple
          />
          <button
            onClick={() => {
              uploadPhoto();
            }}
          >
            Publicar
          </button>
        </div>
      ) : (
        <div>
          <div className="text-white">Photo send succesfully!</div>
          <button
            onClick={() => {
              setUploadedPhoto(false);
            }}
          >
            Click Here to upgrade another 1
          </button>
        </div>
      )}
      <div>
        {photographerphotos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.path} />
          </div>
        ))}
      </div>
    </>
  );
};
