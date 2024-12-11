import React, { useState } from 'react';  // Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages for the user
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderConfirmation from './OrderConfirmationPage';
import Profile from './pages/Profile';
// Correct import for the OrderHistory component
import OrderHistory from './pages/OrderHistory';


// Admin pages
import Dashboard from './admin/Dashboard';
import Users from './admin/Users';
import Product from './admin/Product';
import OrderManagement from './admin/OrderManagement';

// Admin layout
import AdminLayout from './components/AdminLayout';

function App() {
  const [cart, setCart] = useState([]);  // Trạng thái giỏ hàng

  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} /> 
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />


        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default Admin Route */}
          <Route index element={<Dashboard />} />  {/* This will render the dashboard when /admin is accessed */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="product" element={<Product />} />
          <Route path="orders" element={<OrderManagement />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
