import React from 'react';
import './ChangePasword.css';

const ChangePassword = () => {

    return (
        <div className="change-password-container">
            <div className="change-password-box">
                <h2 className="change-password-title">CHANGE YOUR PASSWORD</h2>
                <p className="change-password-subtitle">
                    Enter you email address to continue
                </p>
                <input type="email" placeholder="Email" className="change-password-input" />
                <button className="change-password-button">SEND EMAIL</button>
                <div className='change-password-links'>
                    <a href="/auth/login">Log In</a>
                    <a href="/auth/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;