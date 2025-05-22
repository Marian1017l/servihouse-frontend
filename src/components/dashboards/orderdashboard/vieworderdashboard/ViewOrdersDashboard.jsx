import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { business } from '../../../../api/business'
import { auth } from '../../../../api/auth'
import './ViewOrdersDashboard.css'


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

const ViewOrdersDashboard = () => {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem('token');
  const role = auth.getRoleFromToken(token);
  const id_user = auth.getUserIdFromToken(token);

  const fetchOrders = async () => {
    let response;
    if (role === 'SUPERADMIN') {
      response = await business.getAllOrders(token);
    } else if (role === 'MANAGER') {
      const storageResponse = await business.getStorageByManagerId(id_user, token);
      if (storageResponse.success && storageResponse.data && storageResponse.data.length > 0) {
        const storageId = storageResponse.data[0].id;
        response = await business.getOrdersByStorageId(storageId, token);
      } else {
        console.error('No storage found for this manager');
        return;
      }
    } else if (role === 'DISPATCHER') {
      response = await business.getOrdersByDispatcherId(id_user, token);
    }
    if (response && response.success) {
      // Para cada orden, trae delivery y storage y agrega los datos al objeto
      const ordersWithDetails = await Promise.all(
        response.orders.map(async (order) => {
          // Traer delivery
          let deliveryFullName = '';
          try {
            const deliveryResp = await business.getOrderWithDelivery(order.id, token);
            if (deliveryResp.success && deliveryResp.order && deliveryResp.order.delivery) {
              deliveryFullName = deliveryResp.order.delivery.full_name;
            }
          } catch (e) { }

          // Traer storage
          let storageId = '';
          let storageName = '';
          try {
            const storageResp = await business.getOrderStorage(order.id, token);
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



  return (
    <div className="orders-table-container">
      <h2 className="orders-table-title">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              {orderColumns.map(col => (
                <th key={col.name}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                {orderColumns.map(col => (
                  <td key={col.name}>
                    {typeof col.selector(order) === 'string' || typeof col.selector(order) === 'number'
                      ? col.selector(order)
                      : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewOrdersDashboard