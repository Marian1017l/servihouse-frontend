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
import DashBoard from "../components/dashboards/dashboard/DashBoard";
import ActivateAccountEmail from "../components/auth/verifyactivationE/ActivateAccountEmail";
import ActivateAccountPhone from "../components/auth/verifyactivationP/ActivateAccountPhone";


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
      <Route path={"/home-all"} element={<DashBoard />} />
      <Route path={"/auth/activate-account-email"} element={<ActivateAccountEmail />} />
      <Route path={"/auth/activate-account-phone"} element={<ActivateAccountPhone />} />
    </Routes>
  );
};

export default AppRoutes;