import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Login.css";

/* ─── Icons ─────────────────────────────────────────────────────────────── */

const UserIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ─── Shared label style ─────────────────────────────────────────────────── */
const labelStyle = {
  color: "#ffffff",
  fontWeight: 800,
  fontSize: "13px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  opacity: 1,
  display: "block",
  marginBottom: "2px",
  textShadow: "0 1px 8px rgba(0,0,0,0.6)",
};

/* ─── Component ──────────────────────────────────────────────────────────── */

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      if (existingUser.role === "Administrator") {
        navigate("/admin/dashboard");
      } else {
        navigate("/staff/dashboard");
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Administrator",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const errorTimeoutRef = useRef(null);

  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setError(null), 5000);
    }
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.username || !formData.password) {
      setError({ message: "Please fill in all fields.", id: Date.now() });
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/auth/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "Administrator") {
        navigate("/admin/dashboard");
      } else {
        navigate("/staff/dashboard");
      }
    } catch (err) {
      setError({
        message:
          err.response?.data?.message || "Login failed. Please try again.",
        id: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* ── LEFT: Branding ── */}
        <div className="login-header">
          <div className="login-logo">
            <svg
              width={64}
              height={64}
              viewBox="0 0 24 24"
              fill="#1a73e8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C12 2 4 10.5 4 15.5C4 19.6 7.6 23 12 23C16.4 23 20 19.6 20 15.5C20 10.5 12 2 12 2ZM12 21C8.7 21 6 18.5 6 15.5C6 12.2 9.5 6.9 12 4C14.5 6.9 18 12.2 18 15.5C18 18.5 15.3 21 12 21Z" />
            </svg>
          </div>
          <h1>AquaTrack</h1>
          <p>Water Refilling Station Management System</p>
        </div>

        {/* ── Divider ── */}
        <div className="login-divider">
          <div className="login-divider-line"></div>
          <span className="login-divider-text">Sign in to your account</span>
          <div className="login-divider-line"></div>
        </div>

        {/* ── Error ── */}
        {error && <div className="login-error">{error.message}</div>}

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="role" style={labelStyle}>
              Login As
            </label>
            <div className="select-wrapper">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Administrator">Administrator</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" style={labelStyle}>
              Username
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <UserIcon />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ── Footer ── */}
        <p className="login-footer">AquaTrack v1.0 &copy; 2026</p>
      </div>
    </div>
  );
};

export default Login;
