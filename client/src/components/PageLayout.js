import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PageLayout.css";

const PageLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="page-layout">
      <nav className="page-nav">
        <div className="page-nav-left">
          <button
            className="btn-back"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Dashboard
          </button>
          <div className="page-nav-title">
            <h1>💧 AquaTrack</h1>
            <span>{subtitle}</span>
          </div>
        </div>
        <div className="page-nav-right">
          <button className="page-nav-btn" onClick={() => navigate("/orders")}>
            📋 Orders
          </button>
          <button
            className="page-nav-btn"
            onClick={() => navigate("/inventory")}
          >
            📦 Inventory
          </button>
          <span className="page-nav-user">👤 {user?.fullName}</span>
          <button
            className="page-nav-btn page-nav-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="page-content">{children}</div>
    </div>
  );
};

export default PageLayout;
