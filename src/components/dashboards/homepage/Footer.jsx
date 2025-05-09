import React from 'react';
import './Footer.css';
import geoLogo from '../../../images/geolocalizacion.png'
import { useSelector } from 'react-redux';

const Footer = () => {
    const {isAuthenticated} = useSelector(state=> state.auth); 

    if (isAuthenticated) {
        return null;
    }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={geoLogo} alt="Geolocation Logo" className="geo-logo" />
                    <p>ServiHouse</p>
                </div>
                <nav className="footer-nav">
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