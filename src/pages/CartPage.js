import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Dùng useNavigate để chuyển hướng khi người dùng thanh toán

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

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from being less than 1
    const updatedCart = cart.map(product => 
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setCart(updatedCart);
    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Xử lý sự kiện khi nhấn nút thanh toán
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn hiện tại đang trống. Vui lòng thêm sản phẩm vào giỏ.");
      return;
    }
    // Chuyển hướng đến trang thanh toán
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h1>Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn hiện đang trống.</p>
      ) : (
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price} VND</td>
                  <td>
                    <div className="quantity-btns">
                      <button 
                        className="decrease-btn" 
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button 
                        className="increase-btn" 
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{product.price * product.quantity} VND</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="remove-btn"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <p>Tổng giá: {getTotalPrice()} VND</p>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
