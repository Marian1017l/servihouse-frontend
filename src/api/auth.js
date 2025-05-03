import { ENV } from "../utils";
const { BASE_PATH, API_ROUTES } = ENV;

export class Auth {
    async signIn(data) {
        try {

            const { user_name, password, email_notification } = data;
            const payload = { user_name, password, email_notification };
            const response = await fetch(`${ENV.BASE_API_AUTH_USERS}${API_ROUTES.SIGNIN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log(payload);
            console.log(response);


            const result = await response.json();

            if (response.ok && result.success) {
                localStorage.setItem("pendingUser", data.user_name);
            }

            return result;
        } catch (error) {
            console.error("Error in signIn:", error);
            throw error;
        }
    }

    async verifyCode2fa(data) {
        try {
            const { userName, code } = data;
            const payload = { userName, code };
            const response = await fetch(`${ENV.BASE_API_AUTH_USERS}${API_ROUTES.VERIFY2FACODE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Payload sent:", payload);
            console.log("Response object:", response);

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error in verifyCode:", error);
            throw error;
        }
    }
}

export const auth = new Auth();