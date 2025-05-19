import { ENV } from "../utils";
const { BASE_PATH, API_ROUTES, API_ROUTES_INVENTORY, BASE_PATH_INVEN_STORAGE } = ENV;
import { jwtDecode } from "jwt-decode";

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
            const { user_name, code } = data;
            const payload = { user_name, code };
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

    async resend2faCode(data) {
        try {
            const { user_name, email_notification } = data;
            const payload = { user_name, email_notification };
            const response = await fetch(`${ENV.BASE_API_AUTH_USERS}${API_ROUTES.RESEND2FACODE}`, {
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
            console.error("Error in resend2faCode:", error);
            throw error;
        }
    }

    async signUp(data) {
        try {
            const { user_name, full_name, email, password, phone, city, department, rol_name, email_notification } = data;
            const payload = { user_name, full_name, email, password, phone, city, department, rol_name, email_notification };
            const response = await fetch(`${ENV.BASE_API_AUTH_USERS}${API_ROUTES.SIGNUP}`, {
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
            console.error("Error in signUp:", error);
            throw error;
        }
    }

    async verifyActivationCode(data) {
        try {
            const { user_name, code } = data;
            const payload = { user_name, code };
            const response = await fetch(`${ENV.BASE_API_AUTH_USERS}${API_ROUTES.VERIFYCODE}`, {
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
            console.error("Error in verifyActivationCode:", error);
            throw error;
        }
    }

    getUserById = async (userId) => {
        try {
            const url = `${ENV.BASE_API_AUTH_USERS}/GetUserById/${userId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching user: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    };

    getAllUsers = async () => {
        try {
            const url = `${ENV.BASE_API_AUTH_USERS}${API_ROUTES.GETALLUSERS}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    };

    getRoleFromToken(token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.rol;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    getUserIdFromToken(token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.id;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    async getDepartments() {
        try {
            const url = `${ENV.BASE_API_UTILITIES}${API_ROUTES.GETALLDEPARTMENTS}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching departments: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error;
        }

    }

    getCitiesByDepartment = async (departmentId) => {
        try {
            const url = `${ENV.BASE_API_UTILITIES}/cities/${encodeURIComponent(departmentId)}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching cities: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching cities by department:", error);
            throw error;
        }
    }

    async createRole({ name, description, permissions }) {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${ENV.BASE_API_ROLES}${API_ROUTES.CREATEROL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description, permissions }),
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error creating rol:", error);
            throw error;
        }
    }

    async getAllRoles() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${ENV.BASE_API_ROLES}${API_ROUTES.GETALLROLES}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error fetching all roles:", error);
            throw error;
        }


    }
    async createUser(data) {
        try {
            const { user_name, full_name, email, phone, rol_name, department, city } = data;
            const payload = { user_name, full_name, email, phone, rol_name, department, city };
            const response = await fetch(`${ENV.BASE_API_AUTH_USERS}${API_ROUTES.CREATEUSER}`, {
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
            console.error("Error in signUp:", error);
            throw error;
        }
    }

    deleteUser = async (userId) => {
        try {
            const url = `${ENV.BASE_API_AUTH_USERS}${API_ROUTES.DELETEUSER}/${userId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error deleting user: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    async updateRole(roleId, { name, description, permissions }) {
        try {
            const token = localStorage.getItem("token");
            const url = `${ENV.BASE_API_ROLES}${API_ROUTES.UPDATEROL}/${roleId}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description, permissions }),
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error updating rol:", error);
            throw error;
        }
    }

    async deleteRole(roleId) {
        try {
            const token = localStorage.getItem("token");
            const url = `${ENV.BASE_API_ROLES}${API_ROUTES.DELETEROL}/${roleId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error deleting rol:", error);
            throw error;
        }
    }

}

export const auth = new Auth();