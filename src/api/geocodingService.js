import axios from "axios";
const API_KEY =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  process.env.VITE_GOOGLE_MAPS_API_KEY;

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
