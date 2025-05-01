import React from 'react';
import './Login.css'

const Login = () => {
    return (
      <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">LOG IN</h2>
        <p className="login-subtitle">WELCOME TO SERVIHOUSE</p>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
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