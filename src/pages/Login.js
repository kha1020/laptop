import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Import axios
import './Login.css';
import logo from '../images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Simulated admin data (for frontend-only logic)
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin123';

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Frontend-only logic for simulating admin login
    if (email === adminEmail && password === adminPassword) {
      navigate('/admin'); // Redirect to admin page
      return; // Skip the backend request
    }

    try {
      // Real backend login request
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      // Check role from backend response
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      // Backend error handling
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Đã xảy ra lỗi, vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <img src={logo} alt="Logo" />
        </div>
        <div className="form-section">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập email"
                aria-label="Nhập email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Nhập mật khẩu"
                  aria-label="Nhập mật khẩu"
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                  role="button"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="forgot-password">
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
          <div className="register">
            <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
