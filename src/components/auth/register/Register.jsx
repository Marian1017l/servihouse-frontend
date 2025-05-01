import React from 'react';
import './Register.css';

const SignUp = () => {

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">CREATE A NEW ACCOUNT</h2>
        <form className="register-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="number" placeholder="Phone" required />
          <button type="submit">CONTINUE</button>
        </form>
        <div className="register-links">
          <a href="/auth/login">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;