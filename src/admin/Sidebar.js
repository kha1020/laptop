import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [showConfirm, setShowConfirm] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Navigation handlers
  const handleDashboardClick = () => navigate('/admin/dashboard');
  const handleUsersClick = () => navigate('/admin/users');
  const handleProductManagementClick = () => navigate('/admin/product');
  const handleOrderManagementClick = () => navigate('/admin/orders'); // New navigation handler
  const handleLogoutClick = () => setShowConfirm(true);

  // Modal actions
  const handleConfirmLogout = () => {
    setShowConfirm(false);
    navigate('/login'); // Redirect to login page
  };

  const handleCancelLogout = () => setShowConfirm(false);

  return (
    <div className="sidebar">
      {/* Sidebar menu */}
      <ul>
        <li className="sidebar-item" onClick={handleDashboardClick}>Dashboard</li>
        <li className="sidebar-item" onClick={handleUsersClick}>Users</li>
        <li className="sidebar-item" onClick={handleProductManagementClick}>Product Management</li>
        <li className="sidebar-item" onClick={handleOrderManagementClick}>Order Management</li> {/* New menu item */}
        <li className="sidebar-item" onClick={handleLogoutClick}>Logout</li>
      </ul>

      {/* Logout confirmation modal */}
      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmLogout}>Có</button>
              <button onClick={handleCancelLogout}>Không</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
