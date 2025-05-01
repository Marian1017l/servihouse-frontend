import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/register/Register";


export const AppRoutes = () => {
  return (
    <Routes>
        {/*<Route path="/" element={<Navigate to="/login" />} />*/}
        <Route path={"/auth/login"} element={<Login />} />
        <Route path={"/auth/signup"} element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;