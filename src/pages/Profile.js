// src/pages/Profile.js
import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <h1>Hồ Sơ Của Tôi</h1>
      <div className="profile-info">
        <p><strong>Tên:</strong> Nguyễn Văn A</p>
        <p><strong>Email:</strong> example@example.com</p>
        <p><strong>Số điện thoại:</strong> 0901234567</p>
        {/* Bạn có thể thêm nhiều thông tin khác tùy theo yêu cầu */}
      </div>
    </div>
  );
};

export default Profile;
