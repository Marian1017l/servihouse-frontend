import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcseGiTYARcT2dzjpu2m8aRfA9nd1oYOww&s"
                        alt="Logo"
                        className="footer-logo-img"
                    />
                    <p>ServiHouse</p>
                </div>
                <nav className="footer-nav">
                    <h2>Information</h2>
                    <ul className="footer-links">
                        <li><a href="/contact">About us</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;