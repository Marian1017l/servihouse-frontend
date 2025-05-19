import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../../../images/image.png';
import updateIcon from '../../../../images/actualizar (1).png';
import deleteIcon from '../../../../images/eliminar.png';
import './ProductsDashboard.css';
import { auth } from '../../../../api/auth';

const ProductsDashboard = () => {
    const navigate = useNavigate();

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Category',
            selector: row => row.category,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name:'Price',
            selector: row => row.price,
        },
        {
            name:'Fragile',
            selector: row => row.fragile.toString(),
        },
        {
            name:'Actions',
            cell: row => (
                <div className='btn-actions-user'>
                    <button className='btn-update-user'><img src={updateIcon} alt="Update" 
                        style={{ width: "25px", height: "25px" }} /></button>
                    <button className='btn-delete-user'><img src={deleteIcon} alt="Delete" 
                        style={{ width: "25px", height: "25px" }}/></button>
                </div>
            ),
        }
    ];
    const customStyles = {
        header: {
            style: {
                background: '#F6F6F6',
                padding: '12px 8px',
                fontWeight: '600',
                textAlign: 'left'
            },
        },
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
                color: '#202124',
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

    const [records, setRecords] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await auth.getAllProducts();    
        if (response.status === 200) {
            setRecords(response.data);
            setAllProducts(response.data);
        } else {
            setRecords([]);
            setAllProducts([]);
            }
        };
        fetchProducts();
    }, []);

    const handleFilter = (event) => {
        const newData = allProducts.filter(row => {
          return row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.price.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.category.toLowerCase().includes(event.target.value.toLowerCase()) 
    })
    setRecords(newData);
    }


    return (
        <div className="product-dashboard-content">
            <div className="product-dashboard-header">
                <div className="product-dashboard-header-left">
                    <h1 className="product-dashboard-title">Products</h1>
                    <div className="search-box">
                        <input type="text" placeholder="Search" onChange={handleFilter} />
                        <span className="icon"><img src={SearchIcon} alt="Search" 
                            style={{ width: "20px", height: "20px" }} /></span>
                    </div>
                </div>
                <div className="product-dashboard-btn-container">
                    <button className="product-dashboard-back-btn" onClick={() => navigate("/superadmin/inventory")}>BACK</button>
                    <button className="product-dashboard-create-btn"
                        onClick={() => navigate('/superadmin/inventory/products/create')}>CREATE</button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={records}
                pagination
                customStyles={customStyles}
            />
    
        </div>
    );
}

export default ProductsDashboard;