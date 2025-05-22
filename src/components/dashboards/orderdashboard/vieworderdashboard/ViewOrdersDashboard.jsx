import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { business } from '../../../../api/business'
import { auth } from '../../../../api/auth'

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
      const storageResponse = await business.getStorageByManagerId(id_uer, token);
      if (storageResponse.success && storageResponse.data && storageResponse.data.length > 0) {
        const storageId = storageResponse.data.id;
        response = await business.getOrdersByStorageId(storageId, token);
      } else {
        console.error('No storage found for this manager');
        return;
      }
    } else if (role === 'DISPATCHER') {
      response = await business.getOrdersByDispatcherId(id_user, token);
    }
    if (response && response.success) {
      setOrders(response.orders);
      console.log(response.orders);
    } else if (response) {
      console.error(response.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Órdenes</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes para mostrar.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              {/* Agrega más columnas según tu modelo */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</td>
                <td>{order.status}</td>
                {/* Agrega más celdas según tu modelo */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ViewOrdersDashboard