import React, { useEffect, useState } from "react";
import { business } from "../../../../api/business";
import { inven } from "../../../../api/inventory";
import { auth } from "../../../../api/auth";


const ProductManagerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        const token = localStorage.getItem("token");
        const userId = auth.getUserIdFromToken(token);

        const managerResp = await business.getManagerByUserId(userId);
        if (!managerResp.success || !managerResp.data) {
            setLoading(false);
            return;
        }
        const managerId = managerResp.data.id;

        const storageResp = await business.getStorageByManagerId(managerId);
        if (!storageResp.success || !storageResp.data || storageResp.data.length === 0) {
            setLoading(false);
            return;
        }
        const storageId = storageResp.data[0].id;

        const productsResp = await inven.getProductsByStorage(storageId);
        if (productsResp.success && productsResp.data) {
            setProducts(productsResp.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="product-manager-dashboard">
            <h1>Product Manager Dashboard</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );

}

export default ProductManagerDashboard;