import React from "react";
import './InventoryDashboard.css';
import uploadIcon from '../../../images/upload.png';
import viewIcon from '../../../images/view.png';
import { useNavigate } from "react-router-dom";

const modules = [
    {
        title: "Storages",
        desc: "Here, you can upload your csv document for storage:",
        viewPath: "/inventory/storages"
    },
    {
        title: "Products",
        desc: "Here, you can upload your csv document for the products:",
        viewPath: "/inventory/products"
    },
    {
        title: "Managers",
        desc: "Here, you can upload your csv document for the manager:",
        viewPath: "/inventory/managers"
    },
    {
        title: "Providers",
        desc: "Here, you can upload your csv document for the providers:",
        viewPath: "/inventory/providers"
    },
    {
        title: "Stock Transaction",
        desc: "Here, you can upload your CSV document for stock transactions:",
        viewPath: "/inventory/stock-transactions"
    },
];

const InventoryDashboard = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole")?.toLowerCase();

    const allowedModulesByRole = {
        superadmin: ["Storages", "Products", "Managers", "Providers", "Stock Transaction"],
        manager: ["Storages", "Products", "Managers", "Providers", "Stock Transaction"],
        dispatcher: ["Products", "Stock Transaction"],
        delivery: [],
    };

    const filteredModules = modules.filter(mod =>
        allowedModulesByRole[userRole]?.includes(mod.title)
    );

    return (
        <div className="inventory-dashboard-container">
            <div className="inventory-dashboard-grid">
                {filteredModules.map((mod, idx) => (
                    <div className="inventory-card" key={mod.title}>
                        <h2 className="inventory-card-title">{mod.title}</h2>
                        <p className="inventory-card-desc">{mod.desc}</p>
                        <div className="inventory-card-actions">
                            {userRole !== "dispatcher" && (
                                <button className="inventory-btn upload-btn">
                                    <img src={uploadIcon} alt="Upload" className="icon-img" />
                                </button>
                            )}
                            <button className="inventory-btn view-btn"
                                onClick={() => navigate(`/${userRole}${mod.viewPath}`)}>
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