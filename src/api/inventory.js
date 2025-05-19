import { ENV } from "../utils";
const { API_ROUTES_INVENTORY } = ENV;
import { jwtDecode } from "jwt-decode";

export class Inventory {
    async getAllStorages(token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_INVEN_STORAGE}${API_ROUTES_INVENTORY.GETALLSTORAGES}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error fetching storages",
                error: error.message,
            };
        }
    }

    async createStorage(token, data) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_INVEN_STORAGE}/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating storage",
                error: error.message,
            };
        }
    }

}

export const inven = new Inventory();