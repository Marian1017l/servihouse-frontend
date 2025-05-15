const SERVER_IP = import.meta.env.VITE_DEV_API_URL;
const AUTH_ROUTE = import.meta.env.VITE_AUTH_ROUTE;
const ROUTE_USERS = import.meta.env.VITE_USERS_ROUTE;

export const ENV ={
    BASE_PATH: SERVER_IP,
    BASE_API_AUTH_USERS: `${SERVER_IP}${AUTH_ROUTE}${ROUTE_USERS}`,
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
        GETUSERBYID:  '/GetUserById/:id'
    }
}

export const ROLES = { 
    SUPERADMIN: 'SUPERADMIN',
    MANAGER: 'MANAGER',
    DISPACHER: 'DISPATCHER',    
    DELIVERY: 'DELIVERY',
    GUEST: 'GUEST'
}