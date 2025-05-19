import { ENV } from "../utils";
const { API_ROUTES_BUSINESS } = ENV;
import { jwtDecode } from "jwt-decode";

export class Business {
    async getAllLocations(token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_LOCATION}${API_ROUTES_BUSINESS.GETALLLOCATIONS}`,
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
                message: "Error fetching locations",
                error: error.message,
            };
        }
    }

    async getAllManagers(token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_MANAGER}${API_ROUTES_BUSINESS.GETMANAGERS}`,
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
                message: "Error fetching managers",
                error: error.message,
            };
        }
    }

    async getStockByDispatcher(dispatcherId, token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_STOCK}${API_ROUTES_BUSINESS.GETSTOCKBYDISPATCHER}${dispatcherId}`,
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
                message: "Error fetching stock",
                error: error.message,
            };
        }
    }
}

export const business = new Business();