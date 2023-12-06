import React, { useState } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.MAPS_KEY);

function Geocoding({ location, children }) {
  const [coords, setCoords] = useState(null);

  Geocode.fromAddress(location).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setCoords({ lat, lng });
    },
    (error) => {
      console.error(error);
    }
  );

  return children(coords);
}

export default Geocoding;
