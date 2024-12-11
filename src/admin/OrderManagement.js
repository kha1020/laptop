import React, { useEffect, useState } from 'react';
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // Lưu trữ đơn hàng từ API
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu trữ đơn hàng đã chọn để xem chi tiết

  // Fetch đơn hàng khi component được mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/orders'); // Gọi API
        if (response.ok) {
          const data = await response.json();
          setOrders(data); // Cập nhật danh sách đơn hàng vào state
        } else {
          console.error('Lỗi khi lấy đơn hàng:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi kết nối:', error);
      }
    };

    fetchOrders();
  }, []); // Chạy chỉ một lần khi component mount

  // Hiển thị chi tiết đơn hàng khi chọn
  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Cập nhật đơn hàng đã chọn để xem chi tiết
  };

  // Thay đổi trạng thái của đơn hàng
  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }), // Gửi trạng thái mới
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error('Lỗi khi thay đổi trạng thái:', await response.text());
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
    }
  };

  // Xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } else {
          console.error('Lỗi khi xóa đơn hàng:', await response.text());
        }
      } catch (error) {
        console.error('Lỗi kết nối:', error);
      }
    }
  };

  return (
    <div className="order-management-page">
      <h1>Order Management</h1>

      <div className="order-list">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Status</th>  {/* Cột trạng thái */}
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.totalPrice} VND</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {/* Dropdown menu for changing status */}
                  <select
                    value={order.status}
                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>  
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>

                <div class="button-container">
                  <button className="action-button" onClick={() => handleViewDetails(order)}>View Details</button>
                 <button className="action-button" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                 </div>
               </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị chi tiết đơn hàng khi đơn hàng được chọn */}
      {selectedOrder && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>Total Price:</strong> {selectedOrder.totalPrice} VND</p>
          <p><strong>Shipping Info:</strong> {JSON.stringify(selectedOrder.shippingInfo)}</p>
          <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
          <h3>Cart Items</h3>
          <ul>
            {selectedOrder.cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x {item.price} VND
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedOrder(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
