
import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };

const MapWithRoute = ({ origin, destination }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const intervalRef = useRef();

  const fetchDirections = () => {
    if (!window.google) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setDistance(leg.distance.text);
        }
      }
    );
  };

  useEffect(() => {
    if (isLoaded) {
      fetchDirections();
      intervalRef.current = setInterval(fetchDirections, 30000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isLoaded, origin, destination]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <div style={{ marginTop: 10 }}>
        <strong>Distancia:</strong> {distance || "Calculando..."}
      </div>
    </div>
  );
};

export default MapWithRoute;