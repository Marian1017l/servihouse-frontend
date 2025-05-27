import React, { useEffect, useState } from "react";
import "./ProductStorageDashboard.css";
import { useParams, useNavigate } from "react-router-dom";
import { inven } from "../../../../api/inventory";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import trashIcon from "../../../../images/contenedor-de-basura.png";

const itemsPerPage = 8;

const ProductStorageDashboard = () => {
    const { storageId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await inven.getProductsByStorage(storageId);
            if (response.success) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [storageId]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Math.max(1, value) });
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        const exists = selectedProducts.find(item => item.id === product.id);
        if (exists) {
            setSelectedProducts(selectedProducts.map(item =>
                item.id === product.id ? { ...item, quantity } : item
            ));
        } else {
            setSelectedProducts([...selectedProducts, { ...product, quantity }]);
        }
    };

    const handleShowCart = () => {
        if (selectedProducts.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Cart is empty",
                text: "No products in cart.",
            });
            return;
        }

        let currentCart = [...selectedProducts];
        const calcTotal = (products) =>
            products.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);
        let total = calcTotal(currentCart);

        const getTableHtml = (products, total) => `
        <style>
            .swal2-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 16px;
            }
            .swal2-table th, .swal2-table td {
                border: 1px solid #e0e0e0;
                padding: 8px 12px;
                text-align: left;
            }
            .swal2-table th {
                background: #03a791;
                color: #fff;
            }
            .swal2-table td input[type="number"] {
                width: 60px;
                padding: 4px;
                border-radius: 4px;
                border: 1px solid #ccc;
                text-align: center;
            }
            .swal2-total-row td {
                font-weight: bold;
                background: #f6f6f6;
                color: #03a791;
            }
            .swal2-delete-btn {
                background: #ff4d4f;
                color: #fff;
                border: none;
                border-radius: 4px;
                padding: 4px 8px;
                cursor: pointer;
                font-size: 16px;
            }
        </style>
        <table class="swal2-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                ${products.map((item, idx) => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.category}</td>
                        <td>$${Number(item.price).toLocaleString()}</td>
                        <td>
                            <input 
                                type="number" 
                                min="1" 
                                value="${item.quantity}" 
                                data-idx="${idx}" 
                                style="width:60px"
                                class="swal-cart-qty"
                            />
                        </td>
                        <td>
                        <button class="swal2-delete-btn" data-del-idx="${idx}" title="Remove">
                            Delete                      
                        </button>                        
                        </td>
                    </tr>
                `).join("")}
                <tr class="swal2-total-row">
                    <td colspan="4" style="text-align:right;">Total:</td>
                    <td id="swal-cart-total">$${total.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    `;

        Swal.fire({
            title: "Your Cart",
            html: getTableHtml(currentCart, total, trashIcon),
            showCancelButton: true,
            confirmButtonText: "Continue",
            cancelButtonText: "Close",
            width: 650,
            didOpen: () => {
                // Listener para cambiar cantidad
                const qtyInputs = Swal.getHtmlContainer().querySelectorAll('.swal-cart-qty');
                qtyInputs.forEach(input => {
                    input.addEventListener('input', (e) => {
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        const newQty = Math.max(1, parseInt(e.target.value) || 1);
                        currentCart[idx].quantity = newQty;
                        const newTotal = calcTotal(currentCart);
                        const totalElem = Swal.getHtmlContainer().querySelector('#swal-cart-total');
                        if (totalElem) totalElem.textContent = `$${newTotal.toLocaleString()}`;
                        setSelectedProducts(prev =>
                            prev.map((item, i) =>
                                i === idx ? { ...item, quantity: newQty } : item
                            )
                        );
                    });
                });

                // Listener para eliminar producto
                const delBtns = Swal.getHtmlContainer().querySelectorAll('.swal2-delete-btn');
                delBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(e.target.getAttribute('data-del-idx'));
                        const newProducts = currentCart.filter((_, i) => i !== idx);
                        setSelectedProducts(newProducts);
                        Swal.close();
                        setTimeout(handleShowCart, 0);
                    });
                });
            },
            preConfirm: () => {
                // Aquí puedes poner la navegación o lógica para continuar con el pedido
                // Por ejemplo:
                // navigate("/ruta/para/crear/orden", { state: { products: selectedProducts, storageId } });
            }
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="orders-dashboard-container">
            <div className="orders-dashboard-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 className="orders-dashboard-title" style={{ margin: 0 }}>Select the products you want to order</h2>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <button
                        className="storage-dashboard-create-btn"
                        onClick={() => navigate(`/superadmin/orders/create`)}
                    >
                        BACK
                    </button>
                    <button
                        className="cart-btn"
                        style={{
                            background: "#03a791",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 16px",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                        onClick={handleShowCart}
                    >
                        <FaShoppingCart style={{ marginRight: 8 }} />
                        Cart
                        {selectedProducts.length > 0 && (
                            <span style={{
                                background: "#fff",
                                color: "#03a791",
                                borderRadius: "50%",
                                padding: "2px 8px",
                                marginLeft: 8,
                                fontWeight: "bold"
                            }}>{selectedProducts.length}</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="orders-dashboard-search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="orders-dashboard-cards">
                {currentProducts.map((product, idx) => (
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
            <div className="orders-dashboard-pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductStorageDashboard;