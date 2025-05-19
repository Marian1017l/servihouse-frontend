import { ENV } from "../utils";
const { API_ROUTES_INVENTORY } = ENV;
import { jwtDecode } from "jwt-decode";

export class Inventory {
    
    async getAllStorages() {
        try {
            // const token = localStorage.getItem("token");
            const url = `${ENV.BASE_PATH_INVEN_STORAGE}${API_ROUTES_INVENTORY.GETALLSTORAGES}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                    // "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error fetching all storages:", error);
            throw error;
        }
    }

    async getAllProducts() {
        try {
            // const token = localStorage.getItem("token");
            const url = `${ENV.BASE_PATH_INVEN_PRODUCT}${ENV.API_ROUTES_INVENTORY_PRODUCT.GETALLPRODUCTS}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                    // "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error fetching all storages:", error);
            throw error;
        }
    }

    async createProduct(data) {
        const token = localStorage.getItem("token");
        try {
            const { name, category, description, price, picture = "", fragile = false } = data;
            const payload = { name, category, description, price, picture, fragile };
            const token = localStorage.getItem("token");

            const response = await fetch(`${ENV.BASE_PATH_INVEN_PRODUCT}${ENV.API_ROUTES_INVENTORY_PRODUCT.CREATEPRODUCT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error in createProduct:", error);
            throw error;
        }
    }

}

export const inven = new Inventory();