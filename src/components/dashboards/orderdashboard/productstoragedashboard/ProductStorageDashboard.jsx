import React, { useEffect, useState } from "react";
import "./ProductStorageDashboard.css";
import { useParams, useNavigate } from "react-router-dom";
import { inven } from "../../../../api/inventory";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ProductStorageDashboard = () => {
    const { storageid } = useParams();
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);


    useEffect(() => {
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

    const handleProductSelect = (product) => {
        const amount = product.stock[0]?.amount;
        console.log(amount);
        
        MySwal.fire({
            title: "Select Product",
            text: "Do you want to select this product?",
            html:
                `<input id="swal-input1" class="number" placeholder="Number of this product you want:">`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, select it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                if(document.getElementById("swal-input1").value <= 0){
                    MySwal.fire({
                        title: "Invalid Amount",
                        text: "The amount must be greater than or equal to 0.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }else if(document.getElementById("swal-input1").value >= amount){
                    MySwal.fire({
                        title: "Invalid Amount",
                        text: "The amount must be less than or equal to the available amount.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }else{
                    const newData = { product_id: product.id, amount: document.getElementById("swal-input1").value, storage_id: storageid };
                    setSelectedProducts(prev => [...prev, newData]);
                    MySwal.fire({
                        title: "Product Selected",
                        text: "You have selected this product.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                }
            }
        })
    }
    return (
        <div className="orders-dashboard-container">
            <div className="orders-dashboard-header">
                <h2 className="orders-dashboard-title">Select the products you want to order</h2>
                {selectedProducts.length > 0 && <button className="order-create-btn"
                        onClick={() => navigate("create")} >ORDER</button>}
            </div>
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
                        <button className="orders-dashboard-view-btn" onClick={() => handleProductSelect(product)}>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductStorageDashboard;