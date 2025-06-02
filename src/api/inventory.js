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

    async getStoragesByManager(managerId) {
        try {
            const url = `${ENV.BASE_PATH_BUSINESS_MANAGER}${ENV.API_ROUTES_BUSINESS.GETSTORAGEBYMANAGER}${managerId}`;
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
            console.error("Error fetching storages by manager:", error);
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
            const { id, name, category, description, price, picture = "", fragile = false } = data;
            const payload = { id, name, category, description, price, picture, fragile };

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

    async getProductsByStorage(storageId) {
        const token = localStorage.getItem("token");
        const url = `${ENV.BASE_PATH_INVEN_PRODUCT}${ENV.API_ROUTES_INVENTORY_PRODUCT.GETPRODUCTSBYSTORAGE}${storageId}`;
        console.log("Fetching products by storage ID:", url);


        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error fetching products by storage ID:", error);
                throw error;
            });
    }

    async getStoragesWithProducts() {
        const url = `${ENV.BASE_PATH_INVEN_STORAGE}${ENV.API_ROUTES_INVENTORY.GETSTORAGESWITHPRODUCTS}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error fetching storages with products:", error);
            throw error;
        }
    }

    async getStorageStockById(storageId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_MANAGER}${ENV.API_ROUTES_INVENTORY.GETSTOCKBYSTORAGE}${storageId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        //Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error fetching storage stock",
                error: error.message,
            };
        }
    }

    async verifyStock(productId, storageId, amount) {
        try {
            const url = `${ENV.BASE_PATH_INVEN_STOCK}${ENV.API_ROUTES_INVENTORY.VERIFYAMOUTNTOFPRODUCT}${productId}/${storageId}/${amount}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`, 
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error verifying stock",
                error: error.message,
            };
        }
    }
}

export const inven = new Inventory();