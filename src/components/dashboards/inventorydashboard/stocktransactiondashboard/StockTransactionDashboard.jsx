import React, { useEffect, useState } from "react";
import "./StockTransactionDashboard.css";
import { business } from "../../../../api/business";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { setLoading } from "../../../../redux/authSlice";


const stockTransactionColumns = [
    { name: "ID", selector: row => row.id },
    { name: "Amount", selector: row => row.amount },
    { name: "Restock", selector: row => row.restock ? "Yes" : "No" },
    { name: "Order Number", selector: row => row.Order?.order_number || "" },
    { name: "Order State", selector: row => row.Order?.state || "" },
    { name: "Stock ID", selector: row => row.Stock?.id || "" },
    { name: "Product ID", selector: row => row.Stock?.product_id || "" },
    { name: "Storage ID", selector: row => row.Stock?.storage_id || "" },
    { name: "Created At", selector: row => new Date(row.createdAt).toLocaleString() },
];

const customStyles = {
    headRow: {
        style: {
            background: '#F6F6F6',
            padding: '12px 8px',
            fontWeight: '600',
            textAlign: 'left'
        },
    },
    headCells: {
        style: {
            color: '#03a791',
        },
    },
    rows: {
        style: {
            backgroundColor: '#E8E7E7',
            padding: '12px 8px',
            minHeight: '48px',
            '&:not(:last-of-type)': {
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: '#e0e0e0',
            },
        },
    },
    pagination: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: '#e0e0e0',
            padding: '10px',
        },
    },
};


const StockTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const userRole = localStorage.getItem("userRole");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        const response = await business.getAllStockTransactions();
        setLoading(false);
        if (response.success) {
            setTransactions(response.data);
        }
    };

    if (loading) {
        return (
            <div className="orders-loading-overlay">
                <div className="orders-spinner">
                    <div className="orders-spinner-circle"></div>
                    <div className="orders-spinner-text">Loading</div>
                </div>
            </div>
        );
    }

    return (
        <div className="stock-transaction-dashboard-container">
            <div className="stock-transaction-dashboard-header">
                <h1>Stock Transactions</h1>
                <button
                    className="stock-dashboard-back-btn"
                    onClick={() => navigate(`/${userRole.toLowerCase()}/inventory`)}
                >
                    BACK
                </button>
            </div>
            <DataTable
                columns={stockTransactionColumns}
                data={transactions}
                pagination
                customStyles={customStyles}
                className="orders-table"
                noDataComponent={<p>No stock transactions to display.</p>}
            />
        </div>
    );
}

export default StockTransaction;