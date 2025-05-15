import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../api/auth";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/register/Register";
import VerifyCodePhone from "../components/auth/verifycodeP/VerifyCodePhone";
import HomeDashboard from "../components/dashboards/homepage/HomeDashboard";
import VerifyCodeEmail from "../components/auth/verifycodeE/VerifyCodeEmail";
import ResetPassword from "../components/auth/resetpsw/ResetPassword";
import ChangePassword from "../components/auth/changepsw/ChangePasword";
import ActivateAccountEmail from "../components/auth/verifyactivationE/ActivateAccountEmail";
import ActivateAccountPhone from "../components/auth/verifyactivationP/ActivateAccountPhone";
import ProfileDashboard from "../components/dashboards/profiledashboard/ProfileDashboard";
import UserDashboard from "../components/dashboards/userdashboard/UserDashboard";
import RolesDashboard from "../components/dashboards/roledashboard/RoleDashboard";
import InventoryDashboard from "../components/dashboards/inventorydashboard/InventoryDashboard";
import OrdersDashboard from "../components/dashboards/orderdashboard/OrdersDashboard";
import ReportsDashboard from "../components/dashboards/reportdashboard/ReportsDashboard";
import MapsDashboard from "../components/dashboards/mapsdashboard/MapsDashboard";
import LayoutDashboard from "../components/dashboards/layout/Layout";
import { ROLES } from "../utils/constants";

export const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = auth.getRoleFromToken(token);
      console.log(role);
      localStorage.setItem("userRole", role);
      setUserRole(role);
      
    }
    setChecking(false);
  }, [isAuthenticated]);

  const roleRoutes = {
    [ROLES.SUPERADMIN]: [
      { path: "profile", element: <ProfileDashboard /> },
      { path: "users", element: <UserDashboard /> },
      { path: "roles", element: <RolesDashboard /> },
      { path: "inventory", element: <InventoryDashboard /> },
      { path: "orders", element: <OrdersDashboard /> },
      { path: "reports", element: <ReportsDashboard /> },
      { path: "maps", element: <MapsDashboard /> },
    ],
    [ROLES.MANAGER]: [
      { path: "profile", element: <ProfileDashboard /> },
      { path: "users", element: <UserDashboard /> },
      { path: "inventory", element: <InventoryDashboard /> },
      { path: "orders", element: <OrdersDashboard /> },
      { path: "reports", element: <ReportsDashboard /> },
      { path: "maps", element: <MapsDashboard /> },
    ],
    [ROLES.DELIVERY]: [
      { path: "profile", element: <ProfileDashboard /> },
      { path: "orders", element: <OrdersDashboard /> },
      { path: "maps", element: <MapsDashboard /> },
    ],
    [ROLES.DISPACHER]: [
      { path: "profile", element: <ProfileDashboard /> },
      { path: "inventory", element: <InventoryDashboard /> },
      { path: "orders", element: <OrdersDashboard /> },
      { path: "reports", element: <ReportsDashboard /> },
      { path: "maps", element: <MapsDashboard /> },
    ],
  };

  // Componente para proteger rutas privadas
  const PrivateRoute = ({ children, role }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
    if (role && role !== userRole) {
      return <Navigate to="/home" />;
    }
    return children;
  };


  const renderRoleRoutes = (routes) =>
    routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LayoutDashboard />}>
        <Route path="home" element={<HomeDashboard />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<SignUp />} />
        <Route path="auth/verify-code-phone" element={<VerifyCodePhone />} />
        <Route path="auth/verify-code-email" element={<VerifyCodeEmail />} />
        <Route path="auth/reset-password" element={<ResetPassword />} />
        <Route path="auth/change-password" element={<ChangePassword />} />
        <Route path="auth/activate-account-email" element={<ActivateAccountEmail />} />
        <Route path="auth/activate-account-phone" element={<ActivateAccountPhone />} />
      </Route>

      {/* Rutas privadas */}
      {isAuthenticated && userRole && (
        <Route
          path={`/${userRole.toLowerCase()}/*`}
          element={
            <PrivateRoute role={userRole}>
              <LayoutDashboard />
            </PrivateRoute>
          }
        >
          {renderRoleRoutes(roleRoutes[userRole] || [])}
        </Route>
      )}

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;