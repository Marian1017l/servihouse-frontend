import { ENV } from "../utils";
const { BASE_PATH, API_ROUTES } = ENV;

export class Auth {
    async signIn(data) {
        try {

            const { userName, password, emailNotification } = data;
            const payload = { userName, password, emailNotification };
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
                localStorage.setItem("pendingUser", data.userName);
            }

            return result;
        } catch (error) {
            console.error("Error in signIn:", error);
            throw error;
        }
    }

    async verifyCode(data) {
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
            
            console.log(payload);
            console.log(response);
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error in verifyCode:", error);
            throw error;
        }
    }
}

export const auth = new Auth();