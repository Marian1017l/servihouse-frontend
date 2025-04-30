import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/login/Login";
import { ENV } from "../utils/constants";

export const AppRoutes = () => {
  return (
    <Routes>
        {/*<Route path="/" element={<Navigate to="/login" />} />*/}
        <Route path={`${ENV.ROUTE_AUTH}/login`} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;