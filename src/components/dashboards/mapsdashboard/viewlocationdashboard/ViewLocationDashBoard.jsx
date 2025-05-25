import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useParams, useLocation } from "react-router-dom";
import "./ViewLocationDashBoard.css";

const defaultCenter = {
  lat: 4.6097,
  lng: -74.0817,
};


const API_KEY =
  import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ViewLocationDashBoard = ({ 
  zoom = 7,
  children,
  onLoad,

}) => {
  const location = useLocation();
  const { lat, lng, label, title, obj} = location.state || {};
   const isStorage = location.pathname.includes("storages");
    const isOrder = location.pathname.includes("orders");
  const center = lat && lng ? { lat: Number(lat), lng: Number(lng) } : defaultCenter;
   const markers = [
    {
      id: 1,
      position: center,
      title,
      label,
    },
  ];
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
          <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>      
      {isStorage && (
        <>
          <h2>Storage: {title}</h2>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
          <p>Address: {obj.location.address}</p>
          <p>City: {obj.location.city}</p>
          <p>Department: {obj.location.department}</p>
          <p>Manager: {obj.manager.full_name}</p>
          <p>Capacity: {obj.capacity}</p>
        </>
      )}
      {isOrder && (
        <>
          <h2>Order Information</h2>
          {/* Aquí puedes poner info de la orden */}
        </>
      )}
    </div>
    <div className="map-container">
      <GoogleMap
        mapContainerClassName="map"
        center={center}
        zoom={zoom}
        onLoad={onLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            label={marker.label}
          />
        ))}
        {children}
      </GoogleMap>
    </div>
    
  </div>
);
};

export default React.memo(ViewLocationDashBoard);
