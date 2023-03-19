import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Context } from "../store/appContext";
import NewSlider from "../component/newslider.js";
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
  const [showDivs, setShowDivs] = useState(false);

  useEffect(() => {
    getPhotographers();
    setTimeout(() => {
      setShowDivs(true);
    }, 150);
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

  // const photographersData = photographers.map((obj) => ({
  //   user_name: obj.user_name,
  //   location: obj.location_name + ", Spain",
  //   find_me_text: obj.find_me_text + ", Spain",
  // }));

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
  //Codigo de Maps --------------------------------------------------------------------------------------------------------------->

  return (
    <div className="d-flex flex-column minheight">
      <div
        className={`col-8 col-xxl-5 col-xl-6 col-lg-7 mx-auto bordecitoall mt-10 imagenn center-align  ${
          showDivs ? "slide-in" : "hidden"
        }`}
      >
        <div className="col-12 mx-auto bordecitob sizehomet text-white py-3 ps-3 spartan imagenmalla">
          Los mejores Fotógrafos de nuestro pais
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
                      setTimeout(() => {
                        setSinglevision(true);
                        setSinglePhotographer(photographers[index]);
                        setVisible1(true);
                      }, 0);
                    }}
                  />
                );
              })}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <div className={`${visible1 ? "slide-in-elliptic-top-fwd" : "hidden"}`}>
        {isDesktop ? (
          <>
            <div className="freehome"></div>
            <div className="col-10 col-xxl-6 col-xl-7 col-lg-8 row mx-auto imagenn tarjeta">
              <div
                className="col-6 px-0 center-align"
                style={{ backgroundColor: "black" }}
              >
                <NewSlider data={photos} groupSize={1} />
              </div>
              <div className=" col-6 bordecitoe bordecitot bordecitob mx-auto px-4 text-white">
                <div className="float-right sizehomeq text-white spartan ps-3 py-2">
                  {singlePhotographer.user_name}
                </div>
                <div className="sizehomes mx-auto mb-4 text-white">
                  Descripción: {singlePhotographer.services}
                </div>

                <div className="sizehomes mx-auto mb-2 text-white">
                  <i class="fa-brands fa-instagram"></i>&nbsp;{" "}
                  {singlePhotographer.instagram}
                </div>

                <div className="sizehomes mx-auto text-white">
                  <i class="fa-solid fa-location-dot"></i> &nbsp;
                  {singlePhotographer.find_me_text},&nbsp;{" "}
                  {singlePhotographer.location_name}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Versión movil ---------------------------------------------------------------------------------------->
          <>
            <div className="freehome"></div>
            <div className="col-11 row mx-auto imagenn ">
              <div
                className="col-12 px-0 center-align"
                style={{ backgroundColor: "black" }}
              >
                <NewSlider data={photos} groupSize={1} />
              </div>
              <div className=" col-12 bordecitoe bordecitol bordecitob mx-auto px-4 text-white">
                <div className="float-right sizehomeq text-white spartan ps-3 py-2">
                  {singlePhotographer.user_name}
                </div>
                <div className="sizehomes mx-auto mb-4 text-white">
                  Descripción: {singlePhotographer.services}
                </div>

                <div className="sizehomes mx-auto mb-2 text-white">
                  <i class="fa-brands fa-instagram"></i>&nbsp;{" "}
                  {singlePhotographer.instagram}
                </div>

                <div className="sizehomes mx-auto text-white">
                  <i class="fa-solid fa-location-dot"></i> &nbsp;
                  {singlePhotographer.find_me_text},&nbsp;{" "}
                  {singlePhotographer.location_name}
                </div>
              </div>
              {store.userType == "User" || store.userType == "Photographer" ? (
                <button onClick={() => AddFavoritePhotographer()}>
                  <span>♥</span>
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
