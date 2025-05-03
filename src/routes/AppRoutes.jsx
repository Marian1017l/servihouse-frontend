import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/register/Register";
import VerifyCodePhone from "../components/auth/verifycodeP/VerifyCodePhone";
import HomeDashboard from "../components/dashboard/homepage/HomeDashboard";
import VerifyCodeEmail from "../components/auth/verifycodeE/VerifyCodeEmail";
import ResetPassword from "../components/auth/resetpsw/ResetPassword";
import ChangePassword from "../components/auth/changepsw/ChangePasword";
import AdminDashBoard from "../components/dashboard/admin/AdminDashBoard";
import LogOut from "../components/auth/logout/LogOut";
import  ActivateAccountEmail from "../components/auth/verifyactivationE/ActivateAccountEmail";
import  ActivateAccountPhone from "../components/auth/verifyactivationP/ActivateAccountPhone";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path={"/home"} element={<HomeDashboard />} />
        <Route path={"/auth/login"} element={<Login />} />
        <Route path={"/auth/signup"} element={<SignUp />} />
        <Route path={"/auth/verify-code-phone"} element={<VerifyCodePhone />} />
        <Route path={"/auth/verify-code-email"} element={<VerifyCodeEmail />} />
        <Route path={"/auth/reset-password"} element={<ResetPassword />} />
        <Route path={"/auth/change-password"} element={<ChangePassword />} />
        <Route path={"/auth/log-out"} element={<LogOut />} />
        <Route path={"/admin"} element={<AdminDashBoard />} />
        <Route path={"/auth/activate-account-email"} element={<ActivateAccountEmail />} />
        <Route path={"/auth/activate-account-phone"} element={<ActivateAccountPhone />} />
    </Routes>
  );
};

export default AppRoutes;