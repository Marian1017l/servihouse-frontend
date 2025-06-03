import { ENV } from "../utils";
const { API_ROUTES_REPORTS } = ENV;

export class Report {
    async getOrdersDeliveredByDelivery(deliveryId, type) {
        try {   
            const response = await fetch(
                `${ENV.BASE_PATH_REPORTS}${ENV.API_ROUTES_REPORTS.GETDELIVEREDORDERSBYDELIVERY}${deliveryId}/${type}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Error downloading report");
            }
            const blob = await response.blob();
            const extension = type === "pdf" ? "pdf" : "xlsx";
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `report_delivery_${deliveryId}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: "Error downloading report",
                error: error.message,
            };
        }
    }

    async getDeliveredOrdersReport(type) {
        try {
            const response = await fetch(
                `${ENV.BASE_PATH_REPORTS}${ENV.API_ROUTES_REPORTS.GETDELIVEREDORDERS}${type}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Error downloading report");
            }
            const blob = await response.blob();
            const extension = type === "pdf" ? "pdf" : "xlsx";
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `report_delivered_orders.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: "Error downloading report",
                error: error.message,
            };
        }
    }
}

export const report = new Report();