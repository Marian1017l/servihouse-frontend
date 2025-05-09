import React, { useState, useEffect } from "react";
import './Dashboard.css';
import {
    Layout,
    Menu,
    Avatar,
    Typography,

} from "antd";
import Header from "../homepage/Header";
import {
    HomeOutlined,
    BarChartOutlined,
    TeamOutlined,
    AppstoreOutlined,
    CheckSquareOutlined,
    CalendarOutlined,
    SettingOutlined,
} from "@ant-design/icons";

import profileIcon from '../../../images/profile.png';
import usersIcon from '../../../images/usuarios.png';
import permissionsIcon from '../../../images/permisos.png';
import rolesIcon from '../../../images/roles.png';
import inventoryIcon from '../../../images/inventario.png';
import ordersIcon from '../../../images/ordenes.png';
import reportsIcon from '../../../images/reportes.png';
import mapsIcon from '../../../images/mapa.png';


const { Sider, Content } = Layout;
const { Title } = Typography;

const DashBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const menuItems = [
        {
            key: "1",
            icon: <img src={profileIcon} alt="Profile" style={{ width: "20px", height: "20px" }} />,
            label: "Profile",
        },
        {
            key: "2",
            icon: <img src={usersIcon} alt="Users" style={{ width: "20px", height: "20px" }} />,
            label: "Users"
        },
        {
            key: "3",
            icon: <img src={permissionsIcon} alt="Permissions" style={{ width: "20px", height: "20px" }} />,
            label: "Permissions",
        },
        {
            key: "4",
            icon: <img src={rolesIcon} alt="Roles" style={{ width: "20px", height: "20px" }} />,
            label: "Roles",
        },
        {
            key: "5",
            icon: <img src={inventoryIcon} alt="Inventory" style={{ width: "20px", height: "20px" }} />,
            label: "Inventory",
        },
        {
            key: "6",
            icon: <img src={ordersIcon} alt="Orders" style={{ width: "20px", height: "20px" }} />,
            label: "Orders",
        },
        {
            key: "7",
            icon: <img src={reportsIcon} alt="Reports" style={{ width: "20px", height: "20px" }} />,
            label: "Reports",
        },
        {
            key: "8",
            icon: <img src={mapsIcon} alt="Maps" style={{ width: "20px", height: "20px" }} />,
            label: "Maps",
        },
    ];

    return (
        <Layout style={{ height: "100vh" }}>
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />

            <Layout>
                {/* Sidebar */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme={isDarkMode ? "dark" : "light"}
                    style={{
                        backgroundColor: "#208679",
                        overflow: "auto",
                        height: "100vh",
                        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
                        zIndex: 2,
                    }}
                    width={240}
                >
                    <Menu
                        theme={isDarkMode ? "dark" : "light"}
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={menuItems}
                        style={{
                            borderRight: 0,
                            backgroundColor: "#208679",
                        }}
                        className="custom-menu"
                    />
                </Sider>

                {/* Contenido principal */}
                <Content
                    style={{
                        padding: "16px",
                        backgroundColor: isDarkMode ? "#f0f2f5" : "#ffffff",
                        overflow: "auto",
                    }}
                >
                    <h1>Bienvenido al Panel de Administración</h1>
                    <p>Aquí puedes gestionar tus proyectos, usuarios y más.</p>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashBoard;