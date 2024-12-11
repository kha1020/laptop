import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to the Admin Dashboard</p>

      {/* Section: Thống kê nhanh */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>532</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>789</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>$12,345</p>
        </div>
      </div>

    

      {/* Section: Hoạt động gần đây */}
      <div className="recent-activity">
        <h2>Recent Activities</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-10-23</td>
              <td>John Doe</td>
              <td>Registered</td>
            </tr>
            <tr>
              <td>2024-10-22</td>
              <td>Jane Smith</td>
              <td>Ordered a product</td>
            </tr>
            <tr>
              <td>2024-10-21</td>
              <td>Mark Johnson</td>
              <td>Added a new product</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
