import React from "react";
import './InventoryDashboard.css';
import uploadIcon from '../../../images/upload.png';
import viewIcon from '../../../images/view.png';

const modules = [
    {
        title: "Storages",
        desc: "Here, you can upload your csv document for storage:",
    },
    {
        title: "Products",
        desc: "Here, you can upload your csv document for the products:",
    },
    {
        title: "Managers",
        desc: "Here, you can upload your csv document for the manager:",
    },
    {
        title: "Providers",
        desc: "Here, you can upload your csv document for the providers:",
    },
    {
        title: "Stock Transaction",
        desc: "Here, you can upload your CSV document for stock transactions:",
    },
];

const InventoryDashboard = () => {

    return (
        <div className="inventory-dashboard-container">
            <div className="inventory-dashboard-grid">
                {modules.map((mod, idx) => (
                    <div className="inventory-card" key={mod.title}>
                        <h2 className="inventory-card-title">{mod.title}</h2>
                        <p className="inventory-card-desc">{mod.desc}</p>
                        <div className="inventory-card-actions">
                            <button className="inventory-btn upload-btn">
                                <img src={uploadIcon} alt="Upload" className="icon-img" />
                            </button>
                            <button className="inventory-btn view-btn">
                                <img src={viewIcon} alt="View" className="icon-img" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default InventoryDashboard;