import axios from "axios";
import { ENV } from "../utils";
const API_KEY =
  import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const geocodeAddress = async ({ address, language = "es" }) => {
  try {
    const response = await axios.get(
      `${corsProxy}https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          language,
          region: "co",
          key: API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw error;
  }
};
export const getPlacePredictions = async (input) => {
  try {
    // Nota: Para autocompletado, es mejor usar Places API en el frontend
    const response = await axios.get(
      `${corsProxy}https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input,
          language: "es",
          components: "country:co",
          key: API_KEY,
        },
      }
    );
    return response.data.predictions;
  } catch (error) {
    console.error("Error getting place predictions:", error);
    throw error;
  }
};

export const updateDeliveryLocation = async (user_id, lat, alt) => {
  const payload = {
    user_id: user_id,
    location:{
      latitude: lat,
      altitude: alt
    }
  }
  const response = await axios.put(
    `${ENV.BASE_API_MAPDELIVERIES}${ENV.API_ROUTES_GEOLOCALIZATION_MAPDELIVERIES.UPDATDELIVERYLOCATION}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const result = response.data;
  return result;
}

export const getDeliveryLocation = async (deliveryId) => {
  const response = await axios.get(
    `${ENV.BASE_API_MAPDELIVERIES}${ENV.API_ROUTES_GEOLOCALIZATION_MAPDELIVERIES.GETDELIVERYLOCATION}${deliveryId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const result = response.data;
  return result;
}