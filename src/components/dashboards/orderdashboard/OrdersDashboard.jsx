import React from 'react';
import './OrdersDashboard.css';
import viewIcon from '../../../images/view.png'; // Ajusta la ruta según tu estructura


const storages = [
    {
        name: "Centro de Distribución Principal",
        address: "Av. Industrial 123, Manizales, Caldas, Colombia"
    },
    {
        name: "Almacen Norte",
        address: "Calle 65 #45-23, Bogotá, Cundinamarca, Colombia"
    },
    {
        name: "Depósito Occidental",
        address: "Carrera 100 #16-20, Cali, Valle del Cauca, Colombia"
    },
    {
        name: "Almacén Caribe",
        address: "Calle 72 #38-10, Barranquilla, Atlántico, Colombia"
    },
    {
        name: "Centro Logístico Sur",
        address: "Carrera 27 #29-145, Pasto, Nariño, Colombia"
    },
    {
        name: "Bodega Metropolitana",
        address: "Calle 50 #43-50, Medellín, Antioquia, Colombia"
    }
];

const OrdersDashboard = () => {
    return (
        <div className="orders-dashboard-container">
            <h2 className="orders-dashboard-title">Select the storage you want to make a order:</h2>
            <div className="orders-dashboard-search">
                <input type="text" placeholder="Search..." />

            </div>
            <div className="orders-dashboard-cards">
                {storages.map((storage, idx) => (
                    <div className="orders-dashboard-card" key={idx}>
                        <div className="orders-dashboard-card-title">{storage.name}</div>
                        <div className="orders-dashboard-card-address">{storage.address}</div>
                        <button className="orders-dashboard-view-btn">
                            <img src={viewIcon} alt="View" style={{ width: "28px", height: "28px" }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersDashboard;