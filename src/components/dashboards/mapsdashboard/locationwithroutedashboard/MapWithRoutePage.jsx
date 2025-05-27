import { useLocation } from "react-router-dom";
import MapWithRoute from "./LocationWithRouteDashboard";

const MapWithRoutePage = () => {
  const location = useLocation();
  const { origin, destination, delivery, order, final_address } = location.state || {};

  if (!origin || !destination) {
    return (
      <div style={{padding: 32, textAlign: "center"}}>
        No hay datos de ruta disponibles.<br />
        Por favor, ingresa tu guía desde el Home.
      </div>
    );
  }

  return (
    <MapWithRoute
      origin={origin}
      destination={destination}
      delivery={delivery}
      order={order}
      final_address={final_address}
    />
  );
};

export default MapWithRoutePage;