// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit',
  });

  // Sample orderDetails (lấy từ giỏ hàng hoặc API)
  const [orderDetails] = useState({
    items: [
      { id: 1, name: 'Sản phẩm 1', price: 200000, quantity: 2 },
      { id: 2, name: 'Sản phẩm 2', price: 150000, quantity: 1 },
    ],
  });

  const totalAmount = orderDetails.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đặt hàng thành công!');
    // Gọi API để lưu đơn hàng vào cơ sở dữ liệu
    submitOrder();
  };

  const submitOrder = async () => {
    // Gửi dữ liệu đến server (MySQL) qua API (sử dụng fetch hoặc axios)
    const orderData = {
      customer: formData,
      items: orderDetails.items,
      totalAmount: totalAmount,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Đơn hàng đã được lưu thành công');
      } else {
        alert('Lỗi khi đặt hàng');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Thanh Toán</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <label htmlFor="name">Họ và Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="address">Địa Chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section">
          <label>Phương Thức Thanh Toán:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="credit">Thẻ tín dụng</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Tiền mặt khi nhận hàng</option>
          </select>
        </div>

        <div className="order-summary">
          <h3>Thông Tin Đơn Hàng</h3>
          {orderDetails.items.map((item) => (
            <div key={item.id} className="order-item">
              <span>{item.name}</span>
              <span>x {item.quantity}</span>
              <span>₫{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Tổng Tiền:</span>
            <span>₫{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" className="submit-button">Xác Nhận Đơn Hàng</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
