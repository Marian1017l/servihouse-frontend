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

    async getStockByDispatcher(dispatcherId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DISPATCHER}${API_ROUTES_BUSINESS.GETSTOCKBYDISPATCHER}${dispatcherId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                        //Authorization: `Bearer ${token}`,
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

    async getOrderByNumber(orderNumber) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERBYNUMBER}${orderNumber}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error fetching order by number",
                error: error.message,
            };
        }
    }

    async getOrdersByDispatcherId(dispatcherId, token) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERSBYDISPATCHER}${dispatcherId}`,
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
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${API_ROUTES_BUSINESS.GETORDERSBYSTORAGE}${storageId}`,
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
                `${ENV.BASE_PATH_BUSINESS_MANAGER}${API_ROUTES_BUSINESS.GETSTORAGEBYMANAGER}${managerId}`,
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

    async getManagerByUserId(userId) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_MANAGER}${ENV.API_ROUTES_BUSINESS.GETMANAGERBYUSERID}${userId}`,
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
                message: "Error fetching manager by user id",
                error: error.message,
            };
        }
    }

    async createOrder(orderBody) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${ENV.API_ROUTES_BUSINESS.CREATEAORDER}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //..(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify(orderBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        }
    }

    async getAllDelivery(){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DELIVERY}${API_ROUTES_BUSINESS.GETDELIVERIES}`,
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

    async createDelivery(deliveryBody){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DELIVERY}${ENV.API_ROUTES_BUSINESS.CREATEAORDER}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deliveryBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        }
    }

    async createManager(managerBody){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_MANAGER}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(managerBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        }
    }

    async createDispatcher(dispatcherBody){
       try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DISPATCHER}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dispatcherBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        } 
    }

    async deleteDelivery(deliveryBody){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DELIVERY}${ENV.API_ROUTES_BUSINESS.DELETEDELIVERY}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(deliveryBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        } 
    }

    async deleteManager(managerBody){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_MANAGER}${ENV.API_ROUTES_BUSINESS.DELETEMANAGER}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(managerBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        } 
    }

    async deleteDispatcher(dispatcherBody){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DISPATCHER}${ENV.API_ROUTES_BUSINESS.DELETEDISPATCHER}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dispatcherBody),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error creating order",
                error: error.message,
            };
        } 
    }

    async getDeliveryByUserId(userId){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DELIVERY}${ENV.API_ROUTES_BUSINESS.GETDELIVERYBYUSERID}${userId}`,
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
                message: "Error fetching manager by user id",
                error: error.message,
            };
        }
    }

    async getDispatcherByUserId(userId){
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_DISPATCHER}${ENV.API_ROUTES_BUSINESS.GETDISPATCHERBYUSERID}${userId}`,
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
                message: "Error fetching manager by user id",
                error: error.message,
            };
        }
    }

    async updateOrderState(orderId, state) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_BUSINESS_ORDERS}${ENV.API_ROUTES_BUSINESS.UPDATEORDERSTATE}${orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        //Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ state }),
                },
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return {
                success: false,
                message: "Error updating order state",
                error: error.message,
            };
        }
    }
}

export const business = new Business();