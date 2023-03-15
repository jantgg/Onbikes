import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 40.41584347263048,
  lng: -3.707348573835935,
};

function Map({ photographersData }) {
  const [locations, setLocations] = useState([]);


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
      });
      const resolvedLocations = await Promise.all(promises);
      setLocations(resolvedLocations);
    };
    getLocations();
  }, [photographersData]);

  return (
    <LoadScript googleMapsApiKey={process.env.MAPS_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={location.position}
            title={location.title}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
