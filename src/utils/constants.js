const SERVER_IP = import.meta.env.VITE_DEV_API_URL;
const AUTH_ROUTE = import.meta.env.VITE_AUTH_ROUTE;
const ROUTE_USERS = import.meta.env.VITE_USERS_ROUTE;
const ROUTE_UTILITIES = import.meta.env.VITE_UTILITIES_ROUTE;
export const ENV ={
    BASE_PATH: SERVER_IP,
    BASE_API_AUTH_USERS: `${SERVER_IP}${AUTH_ROUTE}${ROUTE_USERS}`,
    BASE_API_UTILITIES: `${SERVER_IP}${AUTH_ROUTE}${ROUTE_UTILITIES}`,
    API_ROUTES:{
        SIGNIN: '/SignIn',
        SIGNUP: '/SignUp',
        RESENDCODE: '/resendVerifyCode',
        RESEND2FACODE: '/resend2FACode',
        VERIFYCODE: '/VerifyCode',
        VERIFY2FACODE: '/Verify2FACode',
        SENDFORGOTPASSWORD: '/SendForgotPassword',
        SENDRESETPASSWORD: '/SendResetPassword',
        RESTOREPASSWORD: '/ResetPassword',
        FORGOTPASSWORD: '/ForgotPassword',
        GETUSERBYID:  '/GetUserById/:id',
        GETALLUSERS: '/GetAllUsers',
        GETALLDEPARTMENTS: '/departments/getAll',
        GETCITIESBYDEPARTMENT: '/cities/:department',
    }
}

export const ROLES = { 
    SUPERADMIN: 'SUPERADMIN',
    MANAGER: 'MANAGER',
    DISPACHER: 'DISPATCHER',    
    DELIVERY: 'DELIVERY',
    GUEST: 'GUEST'
}