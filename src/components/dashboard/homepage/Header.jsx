import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>ServiHouse</h1>
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href={"/auth/login"}>Log in</a></li>
                        <li><a href={"/auth/signup"} className="signup-btn">Sign up</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;