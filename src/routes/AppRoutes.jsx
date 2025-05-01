import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/register/Register";
import VerifyCodePhone from "../components/auth/verifycodeP/VerifyCodePhone";


export const AppRoutes = () => {
  return (
    <Routes>
        {/*<Route path="/" element={<Navigate to="/login" />} />*/}
        <Route path={"/auth/login"} element={<Login />} />
        <Route path={"/auth/signup"} element={<SignUp />} />
        <Route path={"/auth/verify-code-phone"} element={<VerifyCodePhone />} />
    </Routes>
  );
};

export default AppRoutes;