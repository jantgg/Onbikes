import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PhotographerSlider } from "../component/photographerslider";
import SliderPhotos from "../component/sliderphotos.js";
import SliderPhotosM from "../component/sliderphotom.js";
import Map from "../component/mapmarker.js";
import "../../styles/forall.css";
import "../../styles/login.css";

export const Bestphotographers = () => {
  const { store, actions } = useContext(Context);
  const [photographers, setPhotographers] = useState([]);
  const [photographerPhotos, setPhotographerPhotos] = useState([]);
  const photos = photographerPhotos.map((obj) => obj.url);
  const [singlevision, setSinglevision] = useState(false);
  const [singlePhotographer, setSinglePhotographer] = useState({});
  const [visible1, setVisible1] = useState(false);
  const isDesktop = window.innerWidth >= 1000;

  useEffect(() => {
    getPhotographers();
  }, []);

  useEffect(() => {
    getPhotos(singlePhotographer.id);
  }, [singlePhotographer]);

  const getPhotos = async (pid) => {
    const selectedPhotographer = photographers.find(
      (Photographer) => Photographer.id === pid
    );
    if (selectedPhotographer) {
      setPhotographerPhotos(selectedPhotographer.photos);
    }
  };

  const getPhotographers = async () => {
    const response = await fetch(store.backendurl + "photographers");
    const data = await response.json();
    const photographersWithPhotos = data.body.map((photographer) => ({
      ...photographer,
      photos: photographer.photos.map((photo) => ({
        id: photo.id,
        url: photo.path,
      })),
    }));
    setPhotographers(photographersWithPhotos);
  };
  //-------------------------------------------------------------------------------------->

  const AddFavoritePhotographer = async () => {
    const response = await fetch(store.backendurl + "favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        favorite_id: singlePhotographer.id,
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
    location: obj.location_name + ", Spain",
    find_me_text: obj.find_me_text + ", Spain",
  }));

  //Codigo de Maps ------------------------------------------------------------------------------------------------------------------>
  Geocode.setApiKey("AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4");
  Geocode.setLanguage("es");
  Geocode.setRegion("es");
  const [markers, setMarkers] = useState([]);
  const [photographerCities, setphotographerCities] = useState([]);

  useEffect(() => {
    geocodeCities(photographers);
    setCities();
  }, [photographers]);
  const setCities = () => {
    setphotographerCities(photographers);
  };
  const getRandomOffset = () => {
    const offset = Math.random() * 0.002;
    return Math.random() > 0.5 ? offset : -offset;
  };

  const geocodeCities = async (photographers) => {
    const results = [];
    try {
      for (const photographermarker of photographers) {
        const response = await Geocode.fromAddress(
          photographermarker.find_me_text
        );
        const { lat, lng } = response.results[0].geometry.location;
        const newMarker = {
          name: photographermarker.name,
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
      console.error(`Error geocoding ${city}: ${error}`);
    }
  };

  const mapContainerStyle = {
    height: "25vw",
    width: "100%",
  };

  const center = {
    lat: 40.4168,
    lng: -3.7038,
  };

  const options = {
    streetViewControl: false,
  };
  //Codigo de Maps --------------------------------------------------------------------------------------------------------------->

  return (
    <div className="flex-column">
      <div className="bordecitol col-9 mx-auto  sizehomeq text-white py-3 ps-3 spartan">
        Los mejores Fotógrafos de nuestro pais
      </div>

      <div className="col-10 mx-auto bordecitoall imagenn center-align p-2  ">
        <LoadScript
          googleMapsApiKey={"AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4"}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={6}
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
                    setSinglevision(true);
                    setSinglePhotographer(photographers[index]);
                    setVisible1(true);
                  }}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className={`${visible1 ? "showdown" : "hided"}`}>
        {" "}
        <div className="bordecitor col-6 mx-auto right-align sizehome text-white py-2 pe-2 spartan">
          {singlePhotographer.user_name}
        </div>
        {isDesktop ? (
          <>
            <div className="col-9 mx-auto bordecitoall center-align pb-4 imagenn">
              <div className="center-align col-12 col-xxl-5 col-xl-6 col-lg-7 sizehomet mx-auto mb-3 text-white spartan">
                Fotos del Fotógrafo
              </div>{" "}
              <SliderPhotos data={photos} groupSize={3} />
            </div>
          </>
        ) : (
          // Versión movil ---------------------------------------------------------------------------------------->
          <>
            <div className="col-12 bordecitot bordecitob pb-4 center-align mx-auto imagenn">
              <div className="center-align col-11 sizehomemt mx-auto mt-4 mb-4 text-white spartan">
                Fotos del Fotógrafo
              </div>{" "}
              <SliderPhotosM data={photos} groupSize={1} />
            </div>
          </>
        )}
        <div className="bordecitol heightborders col-9 col-xxl-4 col-xl-4 col-lg-5  mx-auto  "></div>
        <div className="col-12 col-xxl-5 col-xl-6 col-lg-7 mx-auto bordecitoall p-5 center-align imagenn">
          <div
            className="center-align col-9 bordecitoall mx-auto my-3 p-3 text-white"
            style={{ backgroundColor: "black" }}
          >
            <div className="center-align  sizehomet mx-auto bordecitob text-white spartan">
              Información de {singlePhotographer.user_name}
            </div>
            <div className="center-align  sizehomes mx-auto mt-4 mb-4 text-white">
              Provincia: {singlePhotographer.location_name}
            </div>
            <div className="center-align sizehomes mx-auto mt-4 mb-4 text-white">
              Instagram: {singlePhotographer.instagram}
            </div>
            <div className="center-align sizehomes mx-auto mt-4 mb-4 text-white">
              Servicio: {singlePhotographer.services}
            </div>
            <div className="center-align  sizehomes mx-auto mt-4 mb-4 text-white">
              Lugar de trabajo: {singlePhotographer.find_me_text}
            </div>
          </div>
          {store.userType == "User" || store.userType == "Photographer" ? (
            <button onClick={() => AddFavoritePhotographer()}>
              <span>♥</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
