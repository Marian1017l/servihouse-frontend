import React, { useEffect, useState } from 'react';
import './viewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: ''
      });
    const [errors, setErrors] = useState({});
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
        setErrors({
        ...errors,
        [e.target.name]: '',
        });
    };

 const handleSubmit = async (e) => {
      e.preventDefault();
    //   if (!validateForm()) {
    //     const errorText = Object.values(errors).filter(value => value).join(', ');
    //     Swal.fire({
    //     title: 'Problem with the form',
    //     text: errorText,
    //     icon: 'error'
    //   })
    //     return;
    // };
    //   Swal.fire({
    //     title: 'Do you want to create this user?',
    //     text: "You will receive the password via email.",
    //     icon: 'question',
    //     showConfirmButton: true,
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
  
    //       try {
    //         dispatch(setLoading(true));
    //         const response = await auth.createUser({ ...formData});
  
  
    //         if (response.success) {
    //           Swal.fire({
    //             title: 'User created successfully',
    //             text: 'Please check your email for the password.',
    //             icon: 'success',
    //           });
    //         } else {
    //           setErrors({ general: response.message || 'Creation failed' });
    //           dispatch(setLoading(false));
    //           return;
    //         }
  
    //       } catch (error) {
    //         console.error('Error during creation:', error);
    //         setErrors({ general: 'An error occurred. Please try again.' });
    //       } finally {
    //         dispatch(setLoading(false));
    //       }
    //     }
    //   });
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
            </div>
            </form>
        </div>
    );
}

export default ViewProduct;