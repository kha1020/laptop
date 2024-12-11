import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' for Cash on Delivery
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the cart from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitOrder = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng.');
      return;
    }

    // Lưu thông tin đơn hàng vào localStorage hoặc gửi đến API
    const orderData = {
      cart,
      shippingInfo,
      paymentMethod,
      totalPrice: getTotalPrice(),
    };

    console.log('Đơn hàng đã đặt:', orderData);

    // Lưu đơn hàng vào localStorage (hoặc bạn có thể gọi API gửi dữ liệu)
    localStorage.setItem('order', JSON.stringify(orderData));

    // Điều hướng đến trang xác nhận đơn hàng
    navigate('/order-confirmation');
  };

  return (
    <div className="checkout-page">
      <h1>Thanh toán</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng để thanh toán.</p>
      ) : (
        <div className="checkout-details">
          <div className="cart-summary">
            <h2>Thông tin giỏ hàng</h2>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price} VND</td>
                    <td>{product.quantity}</td>
                    <td>{product.price * product.quantity} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Tổng giá: {getTotalPrice()} VND</p>
          </div>

          <div className="shipping-info">
            <h2>Thông tin giao hàng</h2>
            <label>
              Họ tên:
              <input 
                type="text" 
                name="name" 
                value={shippingInfo.name} 
                onChange={handleInputChange} 
              />
            </label>
            <label>
              Địa chỉ:
              <input 
                type="text" 
                name="address" 
                value={shippingInfo.address} 
                onChange={handleInputChange} 
              />
            </label>
            <label>
              Số điện thoại:
              <input 
                type="text" 
                name="phone" 
                value={shippingInfo.phone} 
                onChange={handleInputChange} 
              />
            </label>
          </div>

          <div className="payment-method">
            <h2>Phương thức thanh toán</h2>
            <label>
              <input 
                type="radio" 
                name="payment" 
                value="cod" 
                checked={paymentMethod === 'cod'} 
                onChange={handlePaymentChange} 
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label>
              <input 
                type="radio" 
                name="payment" 
                value="credit" 
                checked={paymentMethod === 'credit'} 
                onChange={handlePaymentChange} 
              />
              Thanh toán bằng thẻ tín dụng
            </label>
          </div>

          <button className="submit-order" onClick={handleSubmitOrder}>
            Xác nhận đơn hàng
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
