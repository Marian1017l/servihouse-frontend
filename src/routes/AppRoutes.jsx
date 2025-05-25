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
import ViewRoleDashboard from "../components/dashboards/roledashboard/viewroledashboard/viewRoleDashboard";
import LayoutDashboard from "../components/dashboards/layout/Layout";
import ViewUser from "../components/dashboards/userdashboard/view/viewUser"
import ProductsDashboard from "../components/dashboards/inventorydashboard/productdashboard/ProductsDashboard";
import ManagerDashboard from "../components/dashboards/inventorydashboard/managerdasboard/ManagerDashboard";
import StorageDashboard from "../components/dashboards/inventorydashboard/storagedashboard/StorageDashboard";
import ProviderDashboard from "../components/dashboards/inventorydashboard/providerdashboard/ProviderDashboard";
import StockTransactionDashboard from "../components/dashboards/inventorydashboard/stocktransactiondashboard/StockTransactionDashboard";
import ViewProduct from "../components/dashboards/inventorydashboard/productdashboard/view/viewProduct";
import ProductStorageDashboard from "../components/dashboards/orderdashboard/productstoragedashboard/ProductStorageDashboard";
import ViewOrdersDashboard from "../components/dashboards/orderdashboard/vieworderdashboard/ViewOrdersDashboard";
import OrderView from "../components/dashboards/homepage/orderView/orderView";
import { ROLES } from "../utils/constants";

export const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = auth.getRoleFromToken(token);
      // console.log(role);
      localStorage.setItem("userRole", role);
      setUserRole(role);

    }
    setChecking(false);
  }, [isAuthenticated]);

  const roleRoutes = {
    [ROLES.SUPERADMIN]: [
      //profile
      { path: "profile", element: <ProfileDashboard /> },
      //users
      { path: "users", element: <UserDashboard /> },
      { path: "users/create", element: <ViewUser /> },
      //roles
      { path: "roles/viewroles", element: <ViewRoleDashboard /> },
      { path: "createRole", element: <RolesDashboard /> },
      //inventory
      { path: "inventory", element: <InventoryDashboard /> },
      { path: "inventory/products", element: <ProductsDashboard /> },
      { path: "inventory/products/create", element: <ViewProduct /> },
      { path: "inventory/managers", element: <ManagerDashboard /> },
      { path: "inventory/storages", element: <StorageDashboard /> },
      { path: "inventory/providers", element: <ProviderDashboard /> },
      { path: "inventory/stock-transactions", element: <StockTransactionDashboard /> },
      //orders
      { path: "orders/create", element: <OrdersDashboard /> },
      { path: "orders/products/:storageId", element: <ProductStorageDashboard /> },
      { path: "orders/vieworders", element: <ViewOrdersDashboard /> },
      //reports
      { path: "reports", element: <ReportsDashboard /> },
      //maps      
      { path: "maps", element: <MapsDashboard /> },
    ],
    [ROLES.MANAGER]: [
      //profile
      { path: "profile", element: <ProfileDashboard /> },
      //users
      { path: "users", element: <UserDashboard /> },
      { path: "users/create", element: <ViewUser /> },
      //inventory
      { path: "inventory", element: <InventoryDashboard /> },
      { path: "inventory/products", element: <ProductsDashboard /> },
      { path: "inventory/managers", element: <ManagerDashboard /> },
      { path: "inventory/storages", element: <StorageDashboard /> },
      { path: "inventory/providers", element: <ProviderDashboard /> },
      { path: "inventory/stock-transactions", element: <StockTransactionDashboard /> },
      //orders
      { path: "orders/create", element: <OrdersDashboard /> },
      { path: "orders/products/:storageId", element: <ProductStorageDashboard /> },
      { path: "orders/vieworders", element: <ViewOrdersDashboard /> },
      //reports
      { path: "reports", element: <ReportsDashboard /> },
      //maps 
      { path: "maps", element: <MapsDashboard /> },
    ],
    [ROLES.DELIVERY]: [
      //profile
      { path: "profile", element: <ProfileDashboard /> },
      //orders itself
      { path: "orders/vieworders", element: <ViewOrdersDashboard /> },
      //maps 
      { path: "maps", element: <MapsDashboard /> },
    ],
    [ROLES.DISPATCHER]: [
      //profile
      { path: "profile", element: <ProfileDashboard /> },
      //inventory
      { path: "inventory", element: <InventoryDashboard /> },
      { path: "inventory/products", element: <ProductsDashboard /> },
      { path: "inventory/stock-transactions", element: <StockTransactionDashboard /> },
      //orders
      { path: "orders/create", element: <OrdersDashboard /> },
      { path: "orders/products/:storageId", element: <ProductStorageDashboard /> },
      { path: "orders/vieworders", element: <ViewOrdersDashboard /> },
      //reports
      { path: "reports", element: <ReportsDashboard /> },
      //maps 
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
        <Route path="home/order" element={<OrderView />} />
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