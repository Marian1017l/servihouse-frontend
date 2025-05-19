import React, { useEffect, useState } from "react";
import "./ProductStorageDashboard.css";
import { useParams } from "react-router-dom";
import { inven } from "../../../../api/inventory";

const ProductStorageDashboard = () => {
    const { storageid } = useParams();
    
    
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        console.log(storageid);
        const fetchProducts = async () => {
            const response = await inven.getProductsByStorage(storageid);
            if (response.success) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
        };
        fetchProducts();
    }, [storageid]);

    return (
        <div className="orders-dashboard-container">
            <h2 className="orders-dashboard-title">Select the products you want to order</h2>
            <div className="orders-dashboard-search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="orders-dashboard-cards">
                {products.map((product, idx) => (
                    <div className="orders-dashboard-card" key={idx}>
                        <div className="orders-dashboard-card-title">{product.name}</div>
                        <div className="orders-dashboard-card-address">
                            {product.category}, {product.description}
                        </div>
                        <button className="orders-dashboard-view-btn">
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductStorageDashboard;