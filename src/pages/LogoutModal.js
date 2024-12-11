import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logoutModal.css'; 
import logo from '../images/logo.png'; // Đảm bảo đường dẫn đến ảnh chính xác

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate(); // Khai báo useNavigate

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    onLogout(); // Gọi hàm onLogout từ props (nếu có)
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  // Nếu modal không mở thì không hiển thị gì
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={logo} alt="Logo" className="modal-image" />
        <h2>Đăng xuất</h2>
        <p>Bạn sẽ không nhận được đặc quyền riêng dành cho thành viên.</p>
        <div className="modal-actions">
          <button onClick={handleLogout}>Đăng xuất</button> {/* Gọi hàm handleLogout */}
          <button onClick={onClose}>Hủy</button> {/* Gọi hàm onClose để đóng modal */}
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
