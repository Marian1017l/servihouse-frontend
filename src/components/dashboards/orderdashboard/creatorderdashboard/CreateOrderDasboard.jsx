import React, { useEffect, useRef, useState } from "react";
import "./CreateOrderDashboard.css";
import { auth } from "../../../../api/auth";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { business } from "../../../../api/business";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { GoogleMap, Marker } from "@react-google-maps/api";

const geocoder = window.google ? new window.google.maps.Geocoder() : null;

const CreateOrderDashboard = () => {
    const location = useLocation();
    const { products, storageId } = location.state || {};
    console.log('Products:', products);
    console.log('Storage ID:', storageId);

    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [latitude, setLatitude] = useState("");
    const [altitude, setAltitude] = useState("");

    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            fetchCities(selectedDepartment);
        } else {
            setCities([]);
            setSelectedCity("");
        }
    }, [selectedDepartment]);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"]
    });

    const autocompleteRef = useRef(null)

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.formatted_address) {
            setAddress(place.formatted_address);
            if (place.geometry && place.geometry.location) {
                setLatitude(place.geometry.location.lat());
                setAltitude(place.geometry.location.lng());
            }
        }
    };

    const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLatitude(lat);
    setAltitude(lng);

    if (window.google) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address);
            }
        });
    }
};

    const fetchDepartments = async () => {
        try {
            const response = await auth.getDepartments();
            if (response.success) {
                //console.log('Departments fetched successfully:', response.data);

                setDepartments(response.data);
            } else {
                console.error('Error fetching departments:', response.message);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

    const fetchCities = async (department) => {
        try {
            const response = await auth.getCitiesByDepartment(department);
            if (response.success) {
                setCities(response.data);
            } else {
                setCities([]);
                console.error('Error fetching cities:', response.message);
            }
        } catch (error) {
            setCities([]);
            console.error('Error fetching cities:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Armar el cuerpo del request
        const orderBody = {
            address,
            city: selectedCity,
            department: selectedDepartment,
            altitude,
            latitude,
            products: products.map(p => ({
                product_id: p.product_id || p.id || p._id,
                storage_id: p.storage_id || storageId,
                amount: p.quantity || p.amount || 1
            })),
            restock: false,
            phone,
            email,
        };

        // Llama a tu método de business.js
        const token = localStorage.getItem("token"); // o como manejes tu token
        const response = await business.createOrder(orderBody, token);

        if (response.success) {
            alert("Order created successfully! Order number: " + response.order_number);
            // Opcional: redirige o limpia el formulario
        } else {
            alert("Error creating order: " + (response.message || "Unknown error"));
        }
    };

    return (
        <div className="create-order-main-container">
            <div className="create-order-content">
                {/* Formulario */}
                <form className="create-order-form" onSubmit={handleSubmit}>
                    <h2>Create new Order:</h2>
                    <div>
                        <label>Address:</label>
                        {isLoaded ? (
                            <Autocomplete
                                onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
                                onPlaceChanged={handlePlaceChanged}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </Autocomplete>
                        ) : (
                            <input
                                type="text"
                                placeholder="Enter address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        )}
                    </div>
                    <div>
                        <label>Department:</label>
                        <select
                            value={selectedDepartment}
                            onChange={e => setSelectedDepartment(e.target.value)}
                        >
                            <option value="">Select department</option>
                            {departments.map(dep => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>City:</label>
                        <select
                            value={selectedCity}
                            onChange={e => setSelectedCity(e.target.value)}
                            disabled={!selectedDepartment}
                        >
                            <option value="">Select city</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            placeholder="Enter phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="create-order-btn">
                        CREATE
                    </button>
                </form>
                {/* Espacio para el mapa */}
                <div className="create-order-map-placeholder" style={{ height: 300, marginTop: 24 }}>
                    {isLoaded && latitude && altitude ? (
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={{ lat: Number(latitude), lng: Number(altitude) }}
                            zoom={16}
                            onClick={handleMapClick}
                        >
                            <Marker position={{ lat: Number(latitude), lng: Number(altitude) }} />
                        </GoogleMap>
                    ) : (
                        <div style={{ textAlign: "center", color: "#888", paddingTop: 100 }}>
                            Introduce an address to see it on the map
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateOrderDashboard;