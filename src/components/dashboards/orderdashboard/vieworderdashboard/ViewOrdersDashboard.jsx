import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { business } from '../../../../api/business'
import { auth } from '../../../../api/auth'
import './ViewOrdersDashboard.css'
import DataTable from 'react-data-table-component'



export const orderColumns = [
  {
    name: 'Order Number',
    selector: row => row.order_number, sortable: true
  },
  {
    name: 'State',
    selector: row => row.state, sortable: true
  },
  {
    name: 'Delivery ID',
    selector: row => row.delivery_id
  },
  {
    name: 'Delivery Name',
    selector: row => row.deliveryFullName || '', sortable: true
  },
  {
    name: 'Storage ID',
    selector: row => row.storageId || '', sortable: true
  },
  {
    name: 'Storage Name',
    selector: row => row.storageName || '', sortable: true
  },
  {
    name: 'Final Address ID',
    selector: row => row.final_address_id
  },
  {
    name: 'Created At',
    selector: row => new Date(row.createdAt).toLocaleString(), sortable: true
  },
  {
    name: 'Updated At',
    selector: row => new Date(row.updatedAt).toLocaleString(), sortable: true
  },
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

const ViewOrdersDashboard = () => {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem('token');
  const role = auth.getRoleFromToken(token);
  const id_user = auth.getUserIdFromToken(token);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    let response;
    if (role === 'SUPERADMIN') {
      response = await business.getAllOrders(token);
    } else if (role === 'MANAGER') {
      const managerResp = await business.getManagerByUserId(id_user);
      if (managerResp.success && managerResp.data) {
        const managerId = managerResp.data.id;
        const storageResponse = await business.getStorageByManagerId(managerId);
        if (storageResponse.success && storageResponse.data && storageResponse.data.length > 0) {
          const storageId = storageResponse.data[0].id;
          response = await business.getOrdersByStorageId(storageId);
        } else {
          console.error('No storage found for this manager');
          return;
        }
      } else {
        console.error('Manager not found for this user');
        return;
      }
    } else if (role === 'DISPATCHER') {
      response = await business.getOrdersByDispatcherId(id_user);
    }
    else if (role === 'DELIVERY') {
      response = await business.getOrdersByDeliveryId(id_user);
    }

    if (response && response.success) {
      // Para cada orden, trae delivery y storage y agrega los datos al objeto
      const ordersWithDetails = await Promise.all(
        response.orders.map(async (order) => {
          // Traer delivery
          let deliveryFullName = '';
          try {
            const deliveryResp = await business.getOrderWithDelivery(order.id);
            if (deliveryResp.success && deliveryResp.order && deliveryResp.order.delivery) {
              deliveryFullName = deliveryResp.order.delivery.full_name;
            }
          } catch (e) { }

          // Traer storage
          let storageId = '';
          let storageName = '';
          try {
            const storageResp = await business.getOrderStorage(order.id);
            if (
              storageResp.success &&
              storageResp.storages &&
              storageResp.storages.length > 0
            ) {
              storageId = storageResp.storages[0].id;
              storageName = storageResp.storages[0].name;
            }
          } catch (e) { }

          return {
            ...order,
            deliveryFullName,
            storageId,
            storageName,
          };
        })
      );
      setOrders(ordersWithDetails);
    } else if (response) {
      console.error(response.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);


  const handleCreateOrder = () => {
    if (role === "SUPERADMIN") {
      navigate("/superadmin/orders/create");
    } else if (role === "MANAGER") {
      navigate("/manager/orders/products");
    } else if (role === "DISPATCHER") {
      navigate("/dispatcher/orders/stock");
    }
  };

  return (
    <div className="orders-table-container">
      <div className="orders-table-header">
        <h2 className="orders-table-title">Orders </h2>
        {role.toLowerCase() !== "DELIVERY" && (
          <div className="orders-table-btn-container">
            <button
              className="orders-table-create-btn"
              onClick={handleCreateOrder}
            >
              CREATE
            </button>
          </div>
        )}
      </div>
      <DataTable
        columns={orderColumns}
        data={orders}
        pagination
        customStyles={customStyles}
        className="orders-table"
      />
    </div>
  );
}

export default ViewOrdersDashboard