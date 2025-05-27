import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader, Marker } from "@react-google-maps/api";
import deliveryImage from "../../../../assets/delivery.png";
import houseImage from "../../../../assets/house.png";
import "./locationwithroutedashboard.css";
import { business } from "../../../../api/business";

const containerStyle = { width: "100%", height: "79.5vh" };

const MapWithRoute = ({ origin: initialOrigin, destination: initialDestination, delivery, order, final_address }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });
    const [origin, setOrigin] = useState(initialOrigin);
    const [destination, setDestination] = useState(initialDestination);
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState("");
    const intervalRef = useRef();


    const handleRefresh = async () => {
        try {
            const response = await business.getOrderByNumber(order.order_number);
            if (response) {
                setOrigin({
                    lat: Number(response.order.delivery.location.latitude),
                    lng: Number(response.order.delivery.location.altitude),
                });
                setDestination({
                    lat: Number(response.order.final_address.latitude),
                    lng: Number(response.order.final_address.altitude),
                });
            }
        } catch (error) {
            console.error("Error updating location:", error);
            alert("No se pudo actualizar la ubicación.");
        }
    };


    useEffect(() => {
        if (isLoaded && origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin,
                    destination,
                    provideRouteAlternatives: false,
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
        }
    }, [isLoaded, origin, destination]);

    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div className="location-dashboard-flex">
            <div className="info-panel">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button className="back-btn" onClick={() => window.history.back()} title="Go Back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        className="back-btn"
                        title="Refresh Route"
                        onClick={handleRefresh}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4v5h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 20v-5h-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 19A9 9 0 1 1 19 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                {/* Order Info Section */}
                <div className="order-section beautiful-section">
                    <h3>Order Info</h3>
                    <div className="order-detail">
                        <span className="label">Order N°:</span>
                        <span className="value">{order?.order_number || "N/A"}</span>
                    </div>
                    <div className="order-detail">
                        <span className="label">Destination:</span>
                        <span className="value">{order?.final_address?.address || final_address || "N/A"}</span>
                    </div>
                    <div className="order-detail">
                        <span className="label">State:</span>
                        <span className="value">{order?.state || "N/A"}</span>
                    </div>
                    <div className="order-detail">
                        <span className="label">Distance:</span>
                        <span className="value">{distance || "Calculando..."}</span>
                    </div>
                </div>
                {/* Delivery Info Section */}
                <div className="delivery-section beautiful-section">
                    <h3>Delivery</h3>
                    <div className="delivery-detail">
                        <span className="label">Name:</span>
                        <span className="value">{delivery?.full_name || "N/A"}</span>
                    </div>
                    <div className="delivery-detail">
                        <span className="label">around:</span>
                        <span className="value">{delivery?.location.address || "N/A"}</span>
                    </div>
                    <div className="delivery-detail">
                        <span className="label">Email:</span>
                        <span className="value">{delivery?.email || "N/A"}</span>
                    </div>
                </div>
            </div>
            <div className="map-container">
                <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={13}>
                    {origin && (
                        <Marker
                            position={origin}
                            label={delivery ? `${delivery.full_name} (Delivery)` : "Repartidor"}
                            title={delivery ? delivery.full_name : "Repartidor"}
                            icon={{
                                url: deliveryImage,
                                scaledSize: { width: 40, height: 40 },
                            }}
                        />
                    )}
                    {destination && (
                        <Marker
                            position={destination}
                            label={order ? `${order.final_address.address} (Your Destination)` : "Your Destination"}
                            title={order ? `Order: ${order.order_number}` : "Destino"}
                            icon={{
                                url: houseImage,
                                scaledSize: { width: 40, height: 40 },
                            }}
                        />
                    )}
                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{ suppressMarkers: true }}
                        />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default MapWithRoute;