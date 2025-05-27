import React, { useEffect, useState } from "react";
import "./CreateOrderDashboard.css";
import { auth } from "../../../../api/auth";

const CreateOrderDashboard = () => {
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

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
    return (
        <div className="create-order-main-container">
            <div className="create-order-content">
                {/* Formulario */}
                <form className="create-order-form">
                    <h2>Create new Order:</h2>
                    <div>
                        <label>Address:</label>
                        <input type="text" placeholder="Enter address" />
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
                        <input type="text" placeholder="Enter name" />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" placeholder="Enter phone" />
                    </div>
                    <button type="submit" className="create-order-btn">
                        CREATE
                    </button>
                </form>
                {/* Espacio para el mapa */}
                <div className="create-order-map-placeholder">
                    Map here
                </div>
            </div>
        </div>
    );
}

export default CreateOrderDashboard;