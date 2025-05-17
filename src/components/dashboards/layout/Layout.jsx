import React, { useState,useEffect } from 'react';
import "./Header.css";
import "./Footer.css";
import "./Sidebar.css"
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";
import geoLogo from '../../../images/geolocalizacion.png';
import menuIcon from '../../../images/menu.png';
import {
    Layout,
    Menu,
} from "antd";

import profileIcon from '../../../images/profile.png';
import usersIcon from '../../../images/usuarios.png';
import rolesIcon from '../../../images/roles.png';
import inventoryIcon from '../../../images/inventario.png';
import ordersIcon from '../../../images/ordenes.png';
import reportsIcon from '../../../images/reportes.png';
import mapsIcon from '../../../images/mapa.png';

const { Header, Sider, Content, Footer } = Layout;

const LayoutDashboard = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const userRole = localStorage.getItem("userRole") || "guest";
    const [collapsed, setCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    useEffect(() => {
        if (isAuthenticated && localStorage.getItem("userRole")) {
            const role = localStorage.getItem("userRole").toLowerCase();
            navigate(`/${role}/profile`);
        }
    }, [isAuthenticated]);


    const roleMenuKeys = {
        superadmin: [
            "superadmin/profile",
            "superadmin/users",
            "superadmin/roles/viewroles",
            "superadmin/inventory",
            "superadmin/orders",
            "superadmin/reports",
            "superadmin/maps",
        ],
        manager: [
            "manager/profile",
            "manager/users",
            "manager/inventory",
            "manager/orders",
            "manager/reports",
            "manager/maps",
        ],
        delivery: [
            "delivery/profile",
            "delivery/orders",
            "delivery/maps",
        ],
        dispacher: [
            "dispacher/profile",
            "dispacher/inventory",
            "dispacher/orders",
            "dispacher/reports",
            "dispacher/maps",
        ],
    };

    let menuItems = [];
    let filteredMenuItems = [];
    if (
        isAuthenticated &&
        userRole &&
        roleMenuKeys[userRole.toLowerCase()]
    ) {
        menuItems = [
            {
                key: `${userRole.toLowerCase()}/profile`,
                icon: <img src={profileIcon} alt="Profile" style={{ width: "20px", height: "20px" }} />,
                label: "Profile",
            },
            {
                key: `${userRole.toLowerCase()}/users`,
                icon: <img src={usersIcon} alt="Users" style={{ width: "20px", height: "20px" }} />,
                label: "Users",
            },
            {
                key: `${userRole.toLowerCase()}/roles/viewroles`,
                icon: <img src={rolesIcon} alt="Roles" style={{ width: "20px", height: "20px" }} />,
                label: "Roles",
            },
            {
                key: `${userRole.toLowerCase()}/inventory`,
                icon: <img src={inventoryIcon} alt="Inventory" style={{ width: "20px", height: "20px" }} />,
                label: "Inventory",
            },
            {
                key: `${userRole.toLowerCase()}/orders`,
                icon: <img src={ordersIcon} alt="Orders" style={{ width: "20px", height: "20px" }} />,
                label: "Orders",
            },
            {
                key: `${userRole.toLowerCase()}/reports`,
                icon: <img src={reportsIcon} alt="Reports" style={{ width: "20px", height: "20px" }} />,
                label: "Reports",
            },
            {
                key: `${userRole.toLowerCase()}/maps`,
                icon: <img src={mapsIcon} alt="Maps" style={{ width: "20px", height: "20px" }} />,
                label: "Maps",
            },
        ];
        const allowedMenuKeys = roleMenuKeys[userRole.toLowerCase()];
        filteredMenuItems = menuItems.filter(item => allowedMenuKeys.includes(item.key));
    }

    const handleMenuClick = ({ key }) => {
        navigate(`/${key}`);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* HEADER */}
            <Header style={{ backgroundColor: "#03A791", color: "white" }}>
                <div className="header-content">
                    <div className="logo">
                        {isAuthenticated && (
                            <button
                                className="toggle-sider"
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    marginRight: "16px",
                                }}
                            >
                                <img
                                    src={menuIcon}
                                    alt="Toggle menu"
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </button>
                        )}
                        <img src={geoLogo} alt="Geolocation Logo" className="geo-logo" />
                        <h1 style={{ display: "inline", marginLeft: "8px" }}>ServiHouse</h1>
                    </div>
                    <nav>
                        <ul className="nav-links">
                            {isAuthenticated ? (
                                <li>
                                    <button
                                        className="logout-button"
                                        onClick={handleLogOut}
                                    >
                                        Log out
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li><a href="/">Home</a></li>
                                    <li><a href={"/auth/login"}>Log in</a></li>
                                    <li><a href={"/auth/signup"} className="signup-btn">Sign up</a></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </Header>

            {/* SIDEBAR Y CONTENIDO */}
            <Layout>
                {isAuthenticated && filteredMenuItems.length > 0 && (
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        collapsedWidth={50}
                        theme={isDarkMode ? "dark" : "light"}
                        style={{
                            backgroundColor: "#208679",
                            overflow: "auto",
                            height: "100vh",
                            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
                            zIndex: 2,
                        }}
                        width={150}
                    >
                        <Menu
                            theme={isDarkMode ? "dark" : "light"}
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            items={filteredMenuItems}
                            onClick={handleMenuClick}
                            style={{
                                borderRight: 0,
                                backgroundColor: "#208679",
                            }}
                            className="custom-menu"
                        />
                    </Sider>
                )}

                <Content style={{ backgroundColor: "#f0f2f5", flex: 1 }}>
                    <Outlet />
                </Content>
            </Layout>

            {/* FOOTER */}
            <Footer style={{ textAlign: "center", backgroundColor: "#03A791", color: "white" }}>
                ServiHouse ©2025 - Todos los derechos reservados.
            </Footer>
        </Layout>
    );
};

export default LayoutDashboard;