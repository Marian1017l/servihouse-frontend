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

    async getAllOrders(token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETALLORDERS}`,
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
                message: "Error fetching orders",
                error: error.message,
            };
        }
    }

    async getOrdersByDispatcherId(dispatcherId, token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERSBYDISPATCHER}/${dispatcherId}`,
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
                message: "Error fetching orders by dispatcher",
                error: error.message,
            };
        }
    }
    async getOrdersByStorageId(storageId, token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERSBYSTORAGE}/${storageId}`,
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
                message: "Error fetching orders by storage",
                error: error.message,
            };
        }
    }

    async getStorageByManagerId(managerId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_MANAGER}${API_ROUTES_BUSINESS.GETSTORAGEBYMANAGER}/${managerId}`,
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
                message: "Error fetching storages by manager",
                error: error.message,
            };
        }
    }

    async getOrderWithDelivery(orderId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERWITHDELIVERY}${orderId}`,
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
                message: "Error fetching order with delivery",
                error: error.message,
            };
        }
    }

    async getOrderStorage(orderId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETSTORAGEBYORDERID}${orderId}`,
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
                message: "Error fetching order storages",
                error: error.message,
            };
        }
    }

    async getAllStockTransactions() {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_STOCK_TRANSACTION}${API_ROUTES_BUSINESS.GETALLSTOCKTRANSACTIONS}`,
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
                message: "Error fetching stock transactions",
                error: error.message,
            };
        }
    }

    async getOrdersByDeliveryId(deliveryId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERSBYDELIVERY}${deliveryId}`,
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
                message: "Error fetching orders by delivery id",
                error: error.message,
            };
        }
    }

}

export const business = new Business();