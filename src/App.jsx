import { useEffect, useState } from 'react'
import './App.css'
import { updateDeliveryLocation } from './api/geocodingService'
import { AppRoutes } from './routes/AppRoutes'
import { jwtDecode } from 'jwt-decode';

function App() {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const oldLat = localStorage.getItem("lat");
          const oldLon = localStorage.getItem("lon");
          if (oldLat === lat.toString() && oldLon === lon.toString()) {
            console.log("Location has not changed.");
            return;
          }
          localStorage.setItem("lat", lat);
          localStorage.setItem("lon", lon);
          const token = localStorage.getItem("token");
          const user_id = jwtDecode(token).id;
          console.log("user_id: ", user_id);
          if (user_id) {
            updateDeliveryLocation(user_id, lat.toString(), lon.toString())
              .then((response) => {
                console.log("Location updated successfully: ", response);
              })
              .catch((error) => {
                console.error("Error updating location: ", error);
              });
          } else {
            console.warn("No user name found in localStorage.");
          }
        }, (error) => {
          console.error("Error getting location: ", error);
        });
      }
    };

    getLocation();
    const intervalId = setInterval(getLocation, 30000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="app-container">
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;