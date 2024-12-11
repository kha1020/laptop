// AdminLayout.js
import React from 'react';
import Sidebar from '../admin/Sidebar';
import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet /> {/* Renders the nested route components */}
      </div>
    </div>
  );
}

export default AdminLayout;
