import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // import useNavigate để điều hướng
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';
import logo from '../images/logo.png';
import LogoutModal from '../pages/LogoutModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();  // Khai báo useNavigate

  // Hàm mở/đóng menu
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Đóng menu khi click ngoài
  useEffect(() => {
    const closeMenu = (e) => {
      if (e.target.closest('.account-icon') === null) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  // Hàm mở modal đăng xuất
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Hàm đóng modal đăng xuất
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    // Xử lý đăng xuất (ví dụ: xóa token hoặc session)
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  // Hàm điều hướng đến trang profile
  const goToProfile = () => {
    navigate('/profile');  // Điều hướng tới trang profile
  };

  // Hàm điều hướng đến trang lịch sử đơn hàng
  const goToOrderHistory = () => {
    navigate('/order-history');  // Điều hướng tới trang order-history
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Shop Logo" className="logo-image" />
      </div>

      {/* Icon tài khoản và giỏ hàng */}
      <div className="header-icons">
        <div className="account-icon" onClick={toggleMenu}>
          <FaUser />
          <div className={`account-menu ${isMenuOpen ? 'isOpen' : ''}`}>
            <ul>
              {/* Các mục trong menu */}
              <li onClick={goToProfile}>
                <FaUser /> Hồ sơ
              </li>  
              <li onClick={goToOrderHistory}>
                <FaShoppingCart /> Lịch sử đơn hàng
              </li> 
              <li onClick={openLogoutModal}>
                <FaSignOutAlt /> Đăng xuất
              </li>
            </ul>
          </div>
        </div>
        <div className="cart-icon" onClick={() => navigate('/cart')}>
          <FaShoppingCart />
        </div>
      </div>

      {/* Modal xác nhận đăng xuất */}
      {isLogoutModalOpen && (
        <LogoutModal 
          isOpen={isLogoutModalOpen} 
          onLogout={handleLogout} 
          onClose={closeLogoutModal} 
        />
      )}
    </header>
  );
};

export default Header;
