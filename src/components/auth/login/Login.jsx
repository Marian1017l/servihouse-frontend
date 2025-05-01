import React, { useEffect, useState } from 'react';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAutheticated, setLoading } from '../../../redux/authSlice';
const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    current_password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@servihouse\.com$/.test(formData.email)) {
      newErrors.email = "Email must be a valid @servihouse.com address";
    }
    
    if (!formData.current_password) {
      newErrors.current_password = "Password is required!";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(setLoading(true));
    try {
      const response = await auth.signIn(formData);
      console.log(response);
      
      if (response.token) {
        dispatch(setAutheticated(true));
      } else {
        setLoginError(response.message || "Login failed");
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid email or password");
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">LOG IN</h2>
        <p className="login-subtitle">WELCOME TO SERVIHOUSE</p>
        <form className="login-form">
          <input type="email" name="email" id="email" placeholder="Email" required />
          <input type="password" name="current_password" id="current_password" placeholder="Password" required />
          <button type="submit">CONTINUE</button>
        </form>
        <div className="login-links">
          <a href="/auth/signup">Sign Up</a>
          <a href="/auth/forgot-password">Did you forget your password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;