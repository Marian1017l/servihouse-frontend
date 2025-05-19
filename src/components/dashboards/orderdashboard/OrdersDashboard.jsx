import React, { useState, useEffect } from 'react';
import './OrdersDashboard.css';
import viewIcon from '../../../images/view.png';
import { inven } from '../../../api/inventory';
import { useNavigate } from 'react-router-dom';

const OrdersDashboard = () => {
    const [storages, setStorages] = useState([]);
    const navigate = useNavigate();

    const fetchStorages = async () => {
        const token = localStorage.getItem("token");
        const response = await inven.getAllStorages(token);
        if (response.success) {
            setStorages(response.data);
        } else {
            setStorages([]);
        }
    };

    const handleViewProducts = (storageId) => {
        navigate(`products/${storageId}`);
    };

    useEffect(() => {
        fetchStorages();
    }, []);

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
                        <div className="orders-dashboard-card-address">
                            {storage.location?.address}, {storage.location?.city}, {storage.location?.department}
                        </div>
                        <button className="orders-dashboard-view-btn" onClick={() => handleViewProducts(storage.id)}>
                            <img src={viewIcon} alt="View" style={{ width: "18px", height: "18px" }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersDashboard;