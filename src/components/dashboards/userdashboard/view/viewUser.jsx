import React,  { useEffect, useState } from 'react';
import './viewUser.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../api/auth';
import { setLoading } from '../../../../redux/authSlice'
import Swal from 'sweetalert2';


const ViewUser = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        full_name: '',
        email: '',
        phone: '',
        rol_name: '',
        city: '',
        department: '',
      });
    const [errors, setErrors] = useState({});
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        fetchDepartments();
        fetchRoles();
    }, []);
    
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

        if (!formData.phone || !/^\d{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be at least 10 digits';
        }
        if (!formData.city) {
        newErrors.city = 'City is required';
        }
        if (!formData.department) {
        newErrors.department = 'Department is required';
        }
        if (!formData.rol_name) {
        newErrors.rol_name = 'Role is required';    
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

    const fetchRoles = async () => {
        try {
            const res = await auth.getAllRoles();
            if (res.success) {
                setRoles(res.data);
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
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
      if (!validateForm()) {
        const errorText = Object.values(errors).filter(value => value).join(', ');
        Swal.fire({
        title: 'Problem with the form',
        text: errorText,
        icon: 'error'
      })
        return;
    };
      Swal.fire({
        title: 'Do you want to create this user?',
        text: "You will receive the password via email.",
        icon: 'question',
        showConfirmButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
  
          try {
            dispatch(setLoading(true));
            const response = await auth.createUser({ ...formData});
  
  
            if (response.success) {
              Swal.fire({
                title: 'User created successfully',
                text: 'Please check your email for the password.',
                icon: 'success',
              });
            } else {
              setErrors({ general: response.message || 'Creation failed' });
              dispatch(setLoading(false));
              return;
            }
  
          } catch (error) {
            console.error('Error during creation:', error);
            setErrors({ general: 'An error occurred. Please try again.' });
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
                        onClick={() => navigate('/superadmin/users')}>VIEW</button>
                    <button className="view-user-create-btn" onClick={handleSubmit}>CREATE</button>
                </div>
                
            </div>
            <form className='view-user-form' onSubmit={handleSubmit}>
                <div className='user-form'>
                <label>User Name:</label>
                <input
                    type="text"
                    name='user_name'
                    className="user-form-input"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
                <label>Full Name:</label>
                <input
                    type="text"
                    name='full_name'
                    className="user-form-input"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    name='email'
                    className="user-form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Phone:</label>
                <input
                    type="text"
                    name='phone'
                    className="user-form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <label>Role:</label>
                <select
                    name="rol_name"
                    className="user-form-input"
                    value={formData.role_name}
                    onChange={handleChange}
                    required
                >
                <option value=""></option>
                {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
                ))}
                </select>
                <div className='selector-container'>
                    <div className='selector-group'>
                        <label>Department:</label>
                        <select
                            name="department"
                            className="user-form-input"
                            value={formData.department}
                            onChange={handleDepartmentChange}
                            required
                        >
                            <option value=""></option>
                            {departments.map(dep => (
                            <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>
                    </div>
                    <div className='selector-group'>
                        <label>City:</label>
                        <select
                            name="city"
                            className="user-form-input"
                            value={formData.city}
                            onChange={handleCityChange}
                            required
                            disabled={!selectedDepartment}
                        >
                            <option value=""></option>
                            {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
}
export default ViewUser;