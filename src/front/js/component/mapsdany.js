import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function MapsDany(props) {
  const [response, setResponse] = useState(null);
  const isDesktop = window.innerWidth >= 1000;
  const [directionsOptions, setDirectionsOptions] = useState({
    origin: props.origin,
    destination: props.destination,
    travelMode: "DRIVING",
  });

  const containerStyle = {
    height: isDesktop ? "20vw" : "40vw",
    width: "100%",
  };

  const center = {
    lat: 40.41584347263048,
    lng: -3.707348573835935,
  };

  const directionsCallback = (res) => {
    if (res != null) {
      setResponse(res);
    }
  };

  useEffect(() => {
    setResponse(null);
    setDirectionsOptions({
      origin: props.origin + ", Spain",
      destination: props.destination + ", Spain",
      travelMode: "DRIVING",
    });
  }, [props.origin, props.destination]);

  return (
    <LoadScript googleMapsApiKey={process.env.MAPS_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {directionsOptions.origin &&
          directionsOptions.destination &&
          response == null && (
            <DirectionsService
              options={directionsOptions}
              callback={directionsCallback}
            />
          )}
        {response !== null && (
          <DirectionsRenderer options={{ directions: response }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapsDany;
