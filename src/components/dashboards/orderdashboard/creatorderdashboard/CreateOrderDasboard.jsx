import React from "react";
import "./CreateOrderDashboard.css";

const CreateOrderDashboard = () => {

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
                        <label>City:</label>
                        <select>
                            <option value="">Select city</option>
                        </select>
                    </div>
                    <div>
                        <label>Department:</label>
                        <select>
                            <option value="">Select department</option>
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