import React, { useEffect, useState } from 'react';
import './viewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../../../../redux/authSlice';
import { inven } from "../../../../../api/inventory";
import Swal from "sweetalert2";

const ViewProduct = () => {
    const userRole = localStorage.getItem("userRole");
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        category: '',
        description: '',
        price: '',
        fragile: false
    });
    const [errors, setErrors] = useState({});
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.id || formData.id.trim() === "") {
            setErrors({ id: "ID is required" });
            Swal.fire('Error', 'ID is required', 'error');
            return;
        }

        console.log(formData);


        Swal.fire({
            title: 'Do you want to create this product?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, create it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch(setLoading(true));
                    const payload = {
                        ...formData,
                        id: String(formData.id),
                        price: Number(formData.price),
                        picture: "images/uploadimage.jpg",
                    };
                    const response = await inven.createProduct(payload);

                    if (response.success) {
                        Swal.fire({
                            title: 'Product created successfully',
                            icon: 'success',
                        });
                        navigate(`/${userRole.toLowerCase()}/inventory/products`)
                    } else {
                        setErrors({ general: response.message || 'Creation failed' });
                        Swal.fire(
                            'Error',
                            typeof response.message === "string"
                                ? response.message
                                : JSON.stringify(response.message) || 'Creation failed',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error during creation:', error);
                    setErrors({ general: 'An error occurred. Please try again.' });
                    Swal.fire('Error', 'An error occurred. Please try again.', 'error');
                } finally {
                    dispatch(setLoading(false));
                }
            }
        });
    };
    return (
        <div className='view-user-content'>
            <div className='view-user-header'>
                <h1>View Dashboard</h1>
                <div className='view-user-btn-container'>
                    <button className="view-user-back-btn"
                        onClick={() => navigate('/superadmin/inventory/products')}>VIEW</button>
                    <button className="view-user-create-btn" onClick={handleSubmit}>CREATE</button>
                </div>

            </div>
            <form className='view-user-form' onSubmit={handleSubmit}>
                <div className='user-form'>
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        className="user-form-input"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                    <label>Name:</label>
                    <input
                        type="text"
                        name='name'
                        className="user-form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Category:</label>
                    <input
                        type="text"
                        name='category'
                        className="user-form-input"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        name='description'
                        className="user-form-input"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <label>Price:</label>
                    <input
                        type="number"
                        name='price'
                        className="user-form-input"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        Fragile:
                        <input
                            type="checkbox"
                            name="fragile"
                            checked={formData.fragile}
                            onChange={handleChange}
                            style={{ marginLeft: "16px", transform: "scale(1.5)" }}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default ViewProduct;