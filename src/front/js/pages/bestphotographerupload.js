import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import SliderPhotos from "../component/sliderphotos.js";
import SliderPhotosM from "../component/sliderphotom.js";
import "../../styles/forall.css";
import "../../styles/login.css";
import "../../styles/inputcustom.css";
import "../../styles/rolls.css";

export const BestPhotographerUpload = () => {
  const { store, actions } = useContext(Context);
  const [photos, setPhotos] = useState([]);
  const [photographerphotos, setPhotographerPhotos] = useState([]);
  const uploadedPhotos = photographerphotos.map((obj) => obj.path);
  const [photographerData, setPhotographerData] = useState([]);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");
  const [newFindMeText, setNewFindMeText] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newServices, setNewServices] = useState("");
  const [updated, setUpdated] = useState(false);
  const [previewPhotos, setPreviewPhotos] = useState(null);
  const [wantAddPhotos, setWantAddPhotos] = useState(false);
  const [wantAddService, setWantAddService] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const isDesktop = window.innerWidth >= 1000;

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
    if (response.ok) location.reload();
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

  const inputPhotos = (event) => {
    const selectedFiles = event.target.files;
    const urls = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const url = URL.createObjectURL(selectedFiles[i]);
      urls.push(url);
    }
    setPhotos(selectedFiles);
    setPreviewPhotos(urls);
    setVisible1(true);
  };

  return (
    <>
      <div className="row flex-column">
        <div className="bordecitor col-8 mx-auto right-align sizehome text-white py-2 pe-2 spartan">
          {photographerData.user_name}
        </div>
        {isDesktop ? (
          <>
            <div className="col-10 mx-auto bordecitoall center-align pb-4 imagenn">
              <div className="center-align col-12 col-xxl-5 col-xl-6 col-lg-7 sizehomet bordecitob mx-auto mb-4 text-white spartan">
                Mis Fotos subidas
              </div>{" "}
              <SliderPhotos data={uploadedPhotos} groupSize={3} />
              <button
                className="botonaco px-3 py-1 sizehomes mt-4"
                onClick={() => {
                  setWantAddPhotos(!wantAddPhotos);
                }}
              >
                <span style={{ "--i": 1 }}>A</span>
                <span style={{ "--i": 2 }}>ñ</span>
                <span style={{ "--i": 3 }}>a</span>
                <span style={{ "--i": 4 }}>d</span>
                <span style={{ "--i": 5 }}>i</span>
                <span style={{ "--i": 6 }}>r</span>
                <span style={{ "--i": 7 }}>&nbsp;</span>
                <span style={{ "--i": 8 }}>f</span>
                <span style={{ "--i": 9 }}>o</span>
                <span style={{ "--i": 10 }}>t</span>
                <span style={{ "--i": 11 }}>o</span>
                <span style={{ "--i": 12 }}>s</span>
              </button>
              <div className={` ${wantAddPhotos ? "showdown" : "hided"}`}>
                <div className="bordecitoc mx-auto "></div>
                <div className=" col-8 mx-auto bordecitoall py-3">
                  {" "}
                  <div className="mx-auto col-12 col-xxl-4 col-xl-4 col-lg-4 sizehomet text-white mb-3">
                    Nuevas fotos
                  </div>
                  <div className="col-12 text-white center-align">
                    <input
                      onChange={inputPhotos}
                      type="file"
                      accept="image/jpeg, image/png"
                      multiple
                      className="custom-file-input sizehomes"
                    ></input>
                  </div>
                </div>
                {previewPhotos != null ? (
                  <>
                    {" "}
                    <div
                      key="sliderupload"
                      className={` ${visible1 ? "showdown" : "hided"}`}
                    >
                      <div className="bordecitoc mx-auto"></div>
                      <SliderPhotos data={previewPhotos} groupSize={3} />
                    </div>
                    <button
                      className="botonaco px-3 py-1 sizehomet mt-4"
                      onClick={() => {
                        uploadPhoto();
                      }}
                    >
                      <span style={{ "--i": 1 }}>S</span>
                      <span style={{ "--i": 2 }}>u</span>
                      <span style={{ "--i": 3 }}>b</span>
                      <span style={{ "--i": 4 }}>i</span>
                      <span style={{ "--i": 5 }}>r</span>
                      <span style={{ "--i": 6 }}>&nbsp;</span>
                      <span style={{ "--i": 7 }}>f</span>
                      <span style={{ "--i": 8 }}>o</span>
                      <span style={{ "--i": 9 }}>t</span>
                      <span style={{ "--i": 10 }}>o</span>
                      <span style={{ "--i": 11 }}>s</span>
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-12 bordecitot bordecitob pb-4 center-align mx-auto imagenn">
              <div className="center-align col-11 sizehomemt mx-auto mt-4 mb-4 text-white spartan">
                Mis Fotos subidas
              </div>{" "}
              <SliderPhotosM data={uploadedPhotos} groupSize={1} />
              <button
                className="botonaco px-3 py-1 sizehomes mt-4"
                onClick={() => {
                  setWantAddPhotos(!wantAddPhotos);
                }}
              >
                <span style={{ "--i": 1 }}>A</span>
                <span style={{ "--i": 2 }}>ñ</span>
                <span style={{ "--i": 3 }}>a</span>
                <span style={{ "--i": 4 }}>d</span>
                <span style={{ "--i": 5 }}>i</span>
                <span style={{ "--i": 6 }}>r</span>
                <span style={{ "--i": 7 }}>&nbsp;</span>
                <span style={{ "--i": 8 }}>f</span>
                <span style={{ "--i": 9 }}>o</span>
                <span style={{ "--i": 10 }}>t</span>
                <span style={{ "--i": 11 }}>o</span>
                <span style={{ "--i": 12 }}>s</span>
              </button>
            </div>
          </>
        )}
        <div className="bordecitol heightborder col-9 col-xxl-4 col-xl-4 col-lg-5  mx-auto  "></div>
        <div className="col-12 col-xxl-5 col-xl-6 col-lg-7 mx-auto bordecitoall p-5 center-align imagenn">
          <div
            className="center-align col-9 bordecitoall mx-auto my-3 p-3 text-white"
            style={{ backgroundColor: "black" }}
          >
            <div className="center-align  sizehomet mx-auto bordecitob text-white spartan">
              Información de mi perfil
            </div>
            <div className="center-align  sizehomes mx-auto mt-4 mb-4 text-white">
              Provincia: {photographerData.location_name}
            </div>
            <div className="center-align sizehomes mx-auto mt-4 mb-4 text-white">
              Instagram: {photographerData.instagram}
            </div>
            <div className="center-align sizehomes mx-auto mt-4 mb-4 text-white">
              Servicio: {photographerData.services}
            </div>
            <div className="center-align  sizehomes mx-auto mt-4 mb-4 text-white">
              Lugar de trabajo: {photographerData.find_me_text}
            </div>
          </div>
          <button
            className="botonaco px-3 py-1 sizehomes mt-2"
            onClick={() => {
              setWantAddService(!wantAddService);
            }}
          >
            <span style={{ "--i": 1 }}>A</span>
            <span style={{ "--i": 2 }}>c</span>
            <span style={{ "--i": 3 }}>t</span>
            <span style={{ "--i": 4 }}>u</span>
            <span style={{ "--i": 5 }}>a</span>
            <span style={{ "--i": 6 }}>l</span>
            <span style={{ "--i": 7 }}>i</span>
            <span style={{ "--i": 8 }}>z</span>
            <span style={{ "--i": 9 }}>a</span>
            <span style={{ "--i": 10 }}>r</span>
            <span style={{ "--i": 11 }}>&nbsp;</span>
            <span style={{ "--i": 13 }}>p</span>
            <span style={{ "--i": 14 }}>e</span>
            <span style={{ "--i": 15 }}>r</span>
            <span style={{ "--i": 16 }}>f</span>
            <span style={{ "--i": 17 }}>i</span>
            <span style={{ "--i": 18 }}>l</span>
          </button>
          <div
            className={` ${wantAddService ? "showdown active" : "showdown"}`}
          >
            <div className="bordecitoc mx-auto "></div>
            <div className="bordecitoc mx-auto "></div>
            <div
              className="login-box col-12 text-white mx-auto center-align sizehomes bordecitoall px-5 py-4"
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
                    value={newLocationName}
                    onChange={(e) => {
                      setNewLocationName(e.target.value);
                    }}
                  ></input>
                  <label htmlFor="name">Provincia</label>
                </div>
                <div className="user-box mt-2">
                  <input
                    type="name"
                    name="name"
                    required
                    autoFocus
                    value={newInstagram}
                    onChange={(e) => {
                      setNewInstagram(e.target.value);
                    }}
                  ></input>
                  <label htmlFor="name">Instagram</label>
                </div>
                <div className="user-box mt-2">
                  <input
                    type="name"
                    name="name"
                    required
                    autoFocus
                    value={newServices}
                    onChange={(e) => {
                      setNewServices(e.target.value);
                    }}
                  ></input>
                  <label htmlFor="name">Servicio</label>
                </div>
                <div className="user-box mt-2">
                  <input
                    type="name"
                    name="name"
                    required
                    autoFocus
                    value={newFindMeText}
                    onChange={(e) => {
                      setNewFindMeText(e.target.value);
                    }}
                  ></input>
                  <label htmlFor="name">Lugar de trabajo</label>
                </div>
              </form>
              <button
                className="botonaco px-3 py-1 sizehomet"
                onClick={() => {
                  updatePhotographer();
                }}
              >
                <span style={{ "--i": 1 }}>S</span>
                <span style={{ "--i": 2 }}>u</span>
                <span style={{ "--i": 3 }}>b</span>
                <span style={{ "--i": 4 }}>i</span>
                <span style={{ "--i": 5 }}>r</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
