import React, { use, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./ViewLocationDashBoard.css";
import { useLocation } from "react-router-dom";

const defaultCenter = {
  lat: 4.6097,
  lng: -74.0817,
};

const API_KEY =
  import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ViewLocationDashBoard = ({
  props,
  onLoad = null,
  zoom = 12,
  children = null,

}) => {
  const location = useLocation();
  const objs = location.state?.objs || [];
  const [selectedObj, setSelectedObj] = useState(objs[0] || null);

  const center =
    objs.length > 0
      ? {
          lat: Number(objs[0].location.latitude),
          lng: Number(objs[0].location.altitude),
        }
      : defaultCenter;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  if (loadError) {
    return <div>Error al cargar Google Maps</div>;
  }
  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

   return (
    <div className="location-dashboard-flex">
      <div className="info-panel">
        <button className="back-btn" onClick={() => window.history.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h2>Show All Locations For Manager</h2>
          <p>
            In this map, you can see all the locations of the warehouses
            registered in the system. Click on a marker to see more details about
          </p>
          <p>
            Total Locations: {objs.length}
          </p>
        </div>
      </div>
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map"
          center={center}
          zoom={zoom}
          onLoad={onLoad}
        >
          {objs.map((obj, index) => (
            <Marker
              key={obj.id || index}
              position={{
                lat: Number(obj.location.latitude),
                lng: Number(obj.location.altitude),
              }}
              title={obj.title || obj.location.address}
              label={obj.name}
              onClick={() => setSelectedObj(obj)}
            />
          ))}
          {children}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(ViewLocationDashBoard);