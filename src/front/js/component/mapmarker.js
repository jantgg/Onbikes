import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

const Map = ({ data }) => {
  Geocode.setApiKey("AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4");
  Geocode.setLanguage("es");
  Geocode.setRegion("es");
  const [markers, setMarkers] = useState([]);
  const [routesCities, setRoutesCities] = useState([]);

  useEffect(() => {
    geocodeCities(data);
    setCities();
  }, [data]);
  const setCities = () => {
    setRoutesCities(data);
  };
  const getRandomOffset = () => {
    const offset = Math.random() * 0.002;
    return Math.random() > 0.5 ? offset : -offset;
  };

  const geocodeCities = async (data) => {
    const results = [];
    try {
      for (const route of data) {
        const response = await Geocode.fromAddress(route.find_me_text);
        const { lat, lng } = response.results[0].geometry.location;
        const newMarker = {
          name: route.name,
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
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: 40.4168,
    lng: -3.7038,
  };

  const options = {
    streetViewControl: false,
  };
  return (
    <LoadScript googleMapsApiKey={"AIzaSyDDVjWyt1R7eDz4VFdY1tBUyylUzucI5z4"}>
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
                // Agrega aquí el código que deseas ejecutar cuando se haga clic en el marcador
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

<div className="">
  Estamos subiendo tus fotos a la nube
  <br />
  <div className="lds-spinner mt-5">
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
</div>;
