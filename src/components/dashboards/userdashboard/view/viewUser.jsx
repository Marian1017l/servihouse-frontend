import React,  { useEffect, useState } from 'react';
import './ViewUser.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../api/auth';
import { setLoading } from '../../../../redux/authSlice'


const ViewUser = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        full_name: '',
        email: '',
        password: '',
        phone: '',
        rol_name: '',
        city: '',
        department: '',
      });
    const { isAuthenticated } = useSelector(state => state.auth);
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.user_name) {
        newErrors.user_name = 'Username is required';
        }

        if (!formData.full_name) {
        newErrors.full_name = 'Full Name is required';
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
        }

        if (!formData.password || formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.phone || !/^\d{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be at least 10 digits';
        }
        if (!formData.city) {
        newErrors.city = 'City is required';
        }
        if (!formData.department) {
        newErrors.department = 'Department is required';
        }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
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

    const fetchDepartments = async () => {
        try {
            const response = await auth.getDepartments();
            if (response.success) {
            setDepartments(response.data);
            } else {
            console.error('Error fetching departments:', response.message);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }
  
    const fetchCities = async (department) => {
      try {
        const response = await auth.getCitiesByDepartment(department);
        if (response.success) {
          setCities(response.data);
        } else {
          setCities([]);
          console.error('Error fetching cities:', response.message);
        }
      } catch (error) {
        setCities([]);
        console.error('Error fetching cities:', error);
      }
    };
  
    const handleDepartmentChange = (e) => {
      setSelectedDepartment(e.target.value);
      setFormData({ ...formData, department: e.target.value, city: '' });
      fetchCities(e.target.value);
    };
  
    const handleCityChange = (e) => {
      setFormData({ ...formData, city: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
    //   Swal.fire({
    //     title: 'Choose how to receive the verification code',
    //     icon: 'question',
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: 'Email',
    //     denyButtonText: 'SMS',
    //     cancelButtonText: 'Cancel',
    //   }).then(async (result) => {
    //     if (result.isConfirmed || result.isDenied) {
    //       const email_notification = result.isConfirmed; // true = email, false = SMS
  
    //       try {
    //         dispatch(setLoading(true));
    //         const response = await auth.signUp({ ...formData, email_notification });
  
  
    //         if (response.success) {
    //           localStorage.setItem('pendingUser', formData.user_name);
  
    //           Swal.fire({
    //             title: 'Registration Successful',
    //             text: 'Please check your email or phone for the verification code.',
    //             icon: 'success',
    //           });
    //         } else {
    //           setErrors({ general: response.message || 'Registration failed' });
    //           dispatch(setLoading(false));
    //           return;
    //         }
  
    //         if (email_notification) {
    //           navigate('/auth/activate-account-email');
    //         } else {
    //           navigate('/auth/verify-code-phone');
    //         }
  
    //       } catch (error) {
    //         console.error('Error during sign up:', error);
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
                <button className="view-user-create-btn">CREATE</button>
            </div>
            <div className='user-form'>
                <label>User Name:</label>
                <input
                    type="text"
                    className="user-form-input"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
                <label>Full Name:</label>
                <input
                    type="text"
                    className="user-form-input"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    className="user-form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className='password-container'>
                    <div className='password-group'>
                    <label>Password: </label>
                    <input
                        type="password"
                        className="user-form-input"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className='password-group'>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        className="user-form-input"
                        required
                    />
                    </div>
                </div>
                <label>Phone:</label>
                <input
                    type="number"
                    className="user-form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {/* <select
                    name="department"
                    value={formData.department}
                    onChange={handleDepartmentChange}
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                    ))}
                </select>
                <select
                    name="city"
                    value={formData.city}
                    onChange={handleCityChange}
                    required
                    disabled={!selectedDepartment}
                >
                    <option value="">Select City</option>
                    {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                    ))}
                </select> */}
            </div>
        </div>
    );
}
export default ViewUser;