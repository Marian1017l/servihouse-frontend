import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/register/Register";
import VerifyCodePhone from "../components/auth/verifycodeP/VerifyCodePhone";
import VerifyCodeEmail from "../components/auth/verifycodeE/VerifyCodeEmail";
import ResetPassword from "../components/auth/resetpsw/ResetPassword";
import ChangePassword from "../components/auth/changepsw/ChangePasword";

export const AppRoutes = () => {
  return (
    <Routes>
        {/*<Route path="/" element={<Navigate to="/login" />} />*/}
        <Route path={"/auth/login"} element={<Login />} />
        <Route path={"/auth/signup"} element={<SignUp />} />
        <Route path={"/auth/verify-code-phone"} element={<VerifyCodePhone />} />
        <Route path={"/auth/verify-code-email"} element={<VerifyCodeEmail />} />
        <Route path={"/auth/reset-password"} element={<ResetPassword />} />
        <Route path={"/auth/change-password"} element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRoutes;