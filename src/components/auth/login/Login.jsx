import React, { useEffect, useState } from 'react';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAutheticated, setLoading } from '../../../redux/authSlice';
import Swal from 'sweetalert2';
import { auth } from '../../../api/auth'; // Adjust the import path as necessary

const Login = () => {
  const [formData, setFormData] = React.useState({
    user_name: '',
    password: '',
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

    if (!formData.user_name) {
      newErrors.user_name = "Username is required!";
    }

    if (!formData.password) {
      newErrors.password = "Password is required!";
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

    if (!validateForm()) return;

    Swal.fire({
      title: "Choose how to receive the code",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Email",
      denyButtonText: "SMS",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed || result.isDenied) {
        const email_notification = result.isConfirmed; // true = email, false = sms
        dispatch(setLoading(true));

        try {
          const response = await auth.signIn({ ...formData, email_notification });
          if (email_notification) {
            navigate("/auth/verify-code-email");
          } else {
            navigate("/auth/verify-code-phone");
          }
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
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">LOG IN</h2>
        <p className="login-subtitle">WELCOME TO SERVIHOUSE</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="text" name="user_name" id="user_name" value={formData.user_name}
            onChange={handleChange} placeholder="Username" required />
          <input type="password" name="password" id="password" value={formData.password}
            onChange={handleChange} placeholder="Password" required />
          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="loading-text">
                <span className="loading-spinner"></span>
                Signing in...
              </span>
            ) : (
              "CONTINUE"
            )}</button>
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