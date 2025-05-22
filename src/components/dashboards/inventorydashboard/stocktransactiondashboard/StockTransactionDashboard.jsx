import React, { useEffect, useState } from "react";
import "./StockTransactionDashboard.css";
import { business } from "../../../../api/business";

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


const StockTransaction = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const response = await business.getAllStockTransactions();
        if (response.success) {
            setTransactions(response.data);
        }
    };

    return (
        <div className="stock-transaction-dashboard-container">
            <h1>Stock Transactions</h1>
            {transactions.length === 0 ? (
                <p>No stock transactions to display.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            {stockTransactionColumns.map(col => (
                                <th key={col.name}>{col.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id}>
                                {stockTransactionColumns.map(col => (
                                    <td key={col.name}>{col.selector(tx)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StockTransaction;