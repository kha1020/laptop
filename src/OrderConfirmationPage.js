import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false); // State to manage order placement status
  const [showForm, setShowForm] = useState(false); // State to control showing the success form
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy đơn hàng từ localStorage
    const storedOrder = JSON.parse(localStorage.getItem('order'));
    if (storedOrder) {
      setOrder(storedOrder);
    } else {
      navigate('/checkout'); // Điều hướng nếu không có đơn hàng
    }
  }, [navigate]);

  const handlePlaceOrder = async () => {
    try {
      // Gửi yêu cầu API để tạo đơn hàng
      const response = await fetch('http://localhost:5000/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order), // Gửi thông tin đơn hàng
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Đơn hàng đã được lưu:', result);

        // Cập nhật trạng thái đặt hàng
        setOrderPlaced(true); // Đặt trạng thái là đã đặt hàng
        localStorage.removeItem('order'); // Xóa đơn hàng khỏi localStorage
        setShowForm(true); // Hiển thị form với các nút sau khi đơn hàng được đặt
      } else {
        console.error('Lỗi khi đặt hàng:', await response.text());
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/'); // Quay lại trang chủ
  };

  return (
    <div className="order-confirmation-page">
      <h1>Xác nhận đơn hàng</h1>
      {order ? (
        <div className="order-details">
          <h2>Thông tin đơn hàng</h2>
          <p><strong>Tổng giá:</strong> {order.totalPrice} VND</p>
          <h3>Thông tin giao hàng</h3>
          <p><strong>Họ tên:</strong> {order.shippingInfo.name}</p>
          <p><strong>Địa chỉ:</strong> {order.shippingInfo.address}</p>
          <p><strong>Số điện thoại:</strong> {order.shippingInfo.phone}</p>

          <h3>Phương thức thanh toán</h3>
          <p>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Thanh toán bằng thẻ tín dụng'}</p>

          <h3>Sản phẩm trong đơn hàng</h3>
          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price} VND</td>
                  <td>{product.quantity}</td>
                  <td>{product.price * product.quantity} VND</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Place Order Button */}
          <button onClick={handlePlaceOrder} className="place-order-button">
            Đặt hàng
          </button>

          {/* Success Message */}
          {orderPlaced && <p className="success-message">Đơn hàng của bạn đã được đặt thành công!</p>}

          {/* Form with button after order is placed */}
          {showForm && (
            <div className="success-form">
              <p>Đơn hàng đã được đặt thành công!</p>
              <button onClick={handleGoHome} className="go-home-button">Quay lại trang chủ</button>
            </div>
          )}
        </div>
      ) : (
        <p>Đang tải thông tin đơn hàng...</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
