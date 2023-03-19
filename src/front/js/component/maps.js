import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Maps(data) {
  const [response, setResponse] = useState(null);
  const route = data.route;
  const [directionsOptions, setDirectionsOptions] = useState({
    origin: route.start_location_name,
    destination: route.end_location_name,
    travelMode: "DRIVING",
  });
  console.log(route);

  const isDesktop = window.innerWidth >= 1000;
  const containerStyle = {
    height: "100%",
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
  console.log(route);

  useEffect(() => {
    setResponse(null);
    setDirectionsOptions({
      origin: route.start_location_name + ", Spain",
      destination: route.end_location_name + ", Spain",
      travelMode: "DRIVING",
    });
  }, [route]);

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

export default Maps;
