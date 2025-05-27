import React, { useEffect, useState } from "react";
import { business } from "../../../../api/business";
import { inven } from "../../../../api/inventory";
import { auth } from "../../../../api/auth";
import "../productstoragedashboard/ProductStorageDashboard.css";
import Swal from "sweetalert2";


const ProductManagerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const [cart, setCart] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

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

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Math.max(1, value) });
    };

    const handleAddToCart = async (product) => {
        setErrorMsg("");
        const quantity = quantities[product.id] || 1;
        // Verifica stock en el backend usando el nuevo método
        const verifyResp = await inven.verifyStock(product.id, product.storage_id, quantity);
        if (verifyResp.success) {
            // Agrega al carrito
            setCart(prev => {
                const exists = prev.find(item => item.id === product.id);
                if (exists) {
                    return prev.map(item =>
                        item.id === product.id ? { ...item, quantity } : item
                    );
                }
                return [...prev, { ...product, quantity }];
            });
        } else {
            setErrorMsg(verifyResp.message || `Not enough stock for ${product.name}.`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="orders-dashboard-container">
            <div className="orders-dashboard-header">
                <h2 className="orders-dashboard-title">Products in your storage</h2>
            </div>
            <div className="orders-dashboard-search">
                <input type="text" placeholder="Search..." />
            </div>
            {errorMsg && <div style={{ color: "red", margin: "10px 0" }}>{errorMsg}</div>}
            <div className="orders-dashboard-cards">
                {products.map((product, idx) => (
                    <div className="orders-dashboard-card" key={idx}>
                        <div className="orders-dashboard-card-title">{product.name}</div>
                        <div className="orders-dashboard-card-address">
                            {product.category}, {product.description}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                            <button
                                onClick={() =>
                                    handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)
                                }
                                style={{ width: 32, height: 32 }}
                                disabled={(quantities[product.id] || 1) <= 1}
                            >-</button>
                            <input
                                type="number"
                                min="1"
                                value={quantities[product.id] || 1}
                                onChange={e =>
                                    handleQuantityChange(product.id, parseInt(e.target.value) || 1)
                                }
                                style={{ width: 40, textAlign: "center", margin: "0 4px" }}
                            />
                            <button
                                onClick={() =>
                                    handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)
                                }
                                style={{ width: 32, height: 32 }}
                            >+</button>
                            <button
                                style={{ marginLeft: 12 }}
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 24 }}>
                <h3>Cart</h3>
                {cart.length === 0 ? (
                    <div>No products in cart.</div>
                ) : (
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} - Qty: {item.quantity}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};


export default ProductManagerDashboard;