import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { business } from '../../../../api/business'
import { auth } from '../../../../api/auth'
import './ViewOrdersDashboard.css'
import PickedIcon from '../../../../images/recoger.png'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { setLoading } from '../../../../redux/authSlice'
import { report } from '../../../../api/report'



export const orderColumns = (role) => [
  {
    name: 'Order Number',
    selector: row => row.order.order_number,
    sortable: true
  },
  {
    name: 'State',
    selector: row => row.order.state,
    sortable: true
  },
  {
    name: 'Delivery Name',
    selector: row => row.order.delivery,
    sortable: true
  },
  {
    name: 'Storage Name',
    selector: row => row.order.storage,
    sortable: true
  },
  {
    name: 'Email Client',
    selector: row => row.order.email || 'Not assigned', sortable: true
  },
  {
    name: 'Phone Client',
    selector: row => row.order.phone || 'Not assigned', sortable: true
  },
  {
    name: 'Last Address',
    selector: row => row.location?.address || 'Not Localizated'
  },
  {
    name: 'Actions',
    cell: row => (
      role === 'DELIVERY' ? (
        <button className='btn-update-user' onClick={async () => {
          const orderId = row.order.id;
          const newState = row.order.state === 'PENDING' ? 'PICKED UP' : 'DELIVERED';
          setLoading(true);
          const response = await business.updateOrderState(orderId, newState);
          setLoading(false);
          if (response.success) {
            Swal.fire({
              title: 'Order Updated',
              text: `Order state changed to ${newState}`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              window.location.reload();
            });
          }
          else {
            Swal.fire({
              title: 'Error',
              text: response.error || 'Failed to update order state',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }}>
          <img src={PickedIcon} alt="Picked" className="icon-img" />
        </button>
      ) : null
    )
  }
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
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const role = auth.getRoleFromToken(token);
  const id_user = auth.getUserIdFromToken(token);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    let response;
    setLoading(true);
    if (role === 'SUPERADMIN') {
      response = await business.getAllOrders(token);
      console.log(response);

    } else if (role === 'MANAGER') {
      const managerResp = await business.getManagerByUserId(id_user);
      console.log('Manager Response:', managerResp);

      if (managerResp.success && managerResp.data) {
        const managerId = managerResp.data.id;
        const storageResponse = await business.getStorageByManagerId(id_user);
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
      const dispatcherResp = await business.getDispatcherByUserId(id_user);
      if (dispatcherResp.success && dispatcherResp.data) {
        const dispatcher_id = dispatcherResp.data.id
        response = await business.getOrdersByDispatcherId(dispatcher_id);
      }
    } else if (role === 'DELIVERY') {
      const deliveryResp = await business.getDeliveryByUserId(id_user);
      if (deliveryResp.success && deliveryResp.data) {
        const delivery_id = deliveryResp.data.id;
        response = await business.getOrdersByDeliveryId(delivery_id);
      }
    }
    if (response && response.success) {
      if (role === 'DELIVERY') {
        const filteredOrders = response.orders.filter(order => order.order.state === 'PENDING' || order.order.state === 'PICKED UP');
        setOrders(filteredOrders);
      } else {
        setOrders(response.orders);
      }
    } else if (response) {
      console.error(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const storageId = async () => {
    if (role === "DISPATCHER") {
      const dispatcher = await business.getDispatcherByUserId(id_user);
      if (dispatcher.success && dispatcher.data) {
        const dispt_id = dispatcher.data.id;
        const stock = await business.getStockByDispatcher(dispt_id);
        if (dispatcher.success && dispatcher.data) {
          return stock.data.storage_id;
        }
      }
    }
    return null;
  }

  const handleCreateOrder = () => {
    if (role === "SUPERADMIN") {
      navigate("/superadmin/orders/create");
    } else if (role === "MANAGER") {
      navigate(`/manager/orders/products`);
    } else if (role === "DISPATCHER") {
      navigate(`/dispatcher/orders/stock`);
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
    <div className="orders-table-container">
      <div className="orders-table-header">
        <h2 className="orders-table-title">Orders </h2>
        {role !== "DELIVERY" && (
          <div className="orders-table-btn-container">
            <button
              className="orders-table-create-btn"
              onClick={handleCreateOrder}
            >
              CREATE
            </button>
            <button
              className="orders-table-create-btn"
              title="Report"
              onClick={async () => {
                const result = await Swal.fire({
  title: 'You are about to download a report of all delivered orders',
  text: 'In which format would you like it?',
  icon: 'info',
  showCancelButton: true,
  confirmButtonText: 'PDF',
  cancelButtonText: 'Excel',
  showDenyButton: true,
  denyButtonText: 'Cancel',
  reverseButtons: true,
  customClass: {
    confirmButton: 'swal2-confirm-green',
    cancelButton: 'swal2-cancel-blue'
  }
});
                if (result.isConfirmed) {
                  setLoading(true);
                  const response = await report.getDeliveredOrdersReport('pdf');
                  setLoading(false);
                  if (response.success) {
                    Swal.fire({
                      title: 'Report Downloaded',
                      text: 'The report has been downloaded successfully.',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: response.error || 'Failed to download report',
                      icon: 'error',
                      confirmButtonText: 'OK'
                    });
                  }
} else if (result.dismiss === Swal.DismissReason.cancel) {
                  setLoading(true);
                  const response = await report.getDeliveredOrdersReport('excel');
                  setLoading(false);
                  if (response.success) {
                    Swal.fire({
                      title: 'Report Downloaded',
                      text: 'The report has been downloaded successfully.',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: response.error || 'Failed to download report',
                      icon: 'error',
                      confirmButtonText: 'OK'
                    });
                  }
                }
              }}
            >
              <span role="img" aria-label="report">📄</span>
            </button>
          </div>
        )}
      </div>
      <DataTable
        columns={orderColumns(role)}
        data={orders}
        pagination
        customStyles={customStyles}
        className="orders-table"
      />
    </div>
  );
}

export default ViewOrdersDashboard