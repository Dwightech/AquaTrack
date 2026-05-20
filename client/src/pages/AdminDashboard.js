import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Dashboard.css";

/* ─── SVG Icon Components ─────────────────────────────────────────────────── */

const IconWater = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C12 2 4 10.5 4 15.5C4 19.6 7.6 23 12 23C16.4 23 20 19.6 20 15.5C20 10.5 12 2 12 2ZM12 21C8.7 21 6 18.5 6 15.5C6 12.2 9.5 6.9 12 4C14.5 6.9 18 12.2 18 15.5C18 18.5 15.3 21 12 21Z" />
  </svg>
);

const IconUser = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconClipboard = ({ size = 32, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const IconTruck = ({ size = 32, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 4v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconCheckCircle = ({ size = 32, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconBarChart = ({ size = 32, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const IconBox = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconUsers = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconShield = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconRefresh = ({ size = 16, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const IconWave = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 12s2-4 5-4 5 8 8 8 5-4 5-4" />
  </svg>
);

const IconAlert = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────────────── */

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await API.get("/orders/dashboard");
      setStats(response.data);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToOrdersWithFilter = (status) => {
    navigate("/orders", { state: { filterStatus: status } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Preparing":
        return "status-preparing";
      case "Out for Delivery":
        return "status-out";
      case "Delivered":
        return "status-delivered";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isLowStock = (item) => item.stock_quantity <= item.low_stock_threshold;

  return (
    <div className="dashboard-wrapper">
      {/* Top Navigation */}
      <div className="dashboard-nav">
        <div className="dashboard-nav-left">
          <h1 style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconWater size={22} color="#1a73e8" />
            AquaTrack
          </h1>
          <span className="nav-subtitle">Admin Dashboard</span>
        </div>
        <div className="dashboard-nav-right">
          <span
            className="nav-user"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <IconUser size={16} color="#555" />
            {user?.fullName}
          </span>
          <button
            className="nav-btn"
            onClick={() => navigate("/orders")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconClipboard size={15} color="#333" />
            Orders
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate("/inventory")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconBox size={15} color="#333" />
            Inventory
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate("/staff-management")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconUsers size={15} color="#333" />
            Staff
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate("/admin-management")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconShield size={15} color="#333" />
            Admins
          </button>
          <button className="nav-btn nav-btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div>
            <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Good {getTimeOfDay()}, {user?.fullName}!
              <IconWave size={22} color="rgba(255,255,255,0.9)" />
            </h2>
            <p>
              Here is your overview for{" "}
              {new Date().toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            className="btn-refresh"
            onClick={fetchDashboardStats}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <IconRefresh size={15} color="white" />
            Refresh
          </button>
        </div>

        {error && <div className="dashboard-error">{error}</div>}

        {loading ? (
          <div className="dashboard-loading">Loading dashboard...</div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div
                className="stat-card stat-blue"
                onClick={() => navigate("/orders")}
                style={{ cursor: "pointer" }}
              >
                <div className="stat-icon">
                  <IconClipboard size={32} color="#1a73e8" />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.orders_today}</span>
                  <span className="stat-label">Orders Today</span>
                </div>
              </div>

              <div
                className="stat-card stat-orange"
                onClick={() => goToOrdersWithFilter("Pending")}
                style={{ cursor: "pointer" }}
              >
                <div className="stat-icon">
                  <IconTruck size={32} color="#f57c00" />
                </div>
                <div className="stat-info">
                  <span className="stat-number">
                    {stats.pending_deliveries}
                  </span>
                  <span className="stat-label">Pending Deliveries</span>
                </div>
              </div>

              <div
                className="stat-card stat-green"
                onClick={() => goToOrdersWithFilter("Delivered")}
                style={{ cursor: "pointer" }}
              >
                <div className="stat-icon">
                  <IconCheckCircle size={32} color="#2e7d32" />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.delivered_today}</span>
                  <span className="stat-label">Delivered Today</span>
                </div>
              </div>

              <div
                className="stat-card stat-purple"
                onClick={() => navigate("/orders")}
                style={{ cursor: "pointer" }}
              >
                <div className="stat-icon">
                  <IconBarChart size={32} color="#6a1b9a" />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.total_orders}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
              </div>
            </div>

            {/* Low Stock Warning */}
            {stats.inventory.some(isLowStock) && (
              <div className="dashboard-low-stock-alert">
                <IconAlert size={18} color="#e65100" />
                <strong>Low Stock Alert!</strong>{" "}
                {stats.inventory.filter(isLowStock).map((item, i) => (
                  <span key={item.item_id}>
                    <strong>{item.item_name}</strong> ({item.stock_quantity}{" "}
                    left)
                    {i < stats.inventory.filter(isLowStock).length - 1
                      ? ", "
                      : ""}
                  </span>
                ))}
                <button
                  className="btn-go-inventory"
                  onClick={() => navigate("/inventory")}
                >
                  Manage Inventory →
                </button>
              </div>
            )}

            {/* Bottom Grid */}
            <div className="dashboard-bottom-grid">
              {/* Recent Orders */}
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <IconClipboard size={18} color="#1a1a2e" />
                    Recent Orders
                  </h3>
                  <button
                    className="btn-view-all"
                    onClick={() => navigate("/orders")}
                  >
                    View All →
                  </button>
                </div>

                {stats.recent_orders.length === 0 ? (
                  <div className="dashboard-empty">No orders yet.</div>
                ) : (
                  <div className="recent-orders-list">
                    {stats.recent_orders.map((order) => (
                      <div key={order.order_id} className="recent-order-item">
                        <div className="recent-order-left">
                          <span className="recent-order-id">
                            #{order.order_id}
                          </span>
                          <div className="recent-order-info">
                            <span className="recent-order-name">
                              {order.customer_name}
                            </span>
                            <span className="recent-order-detail">
                              {order.gallons} × {order.item_name}
                            </span>
                          </div>
                        </div>
                        <div className="recent-order-right">
                          <span
                            className={`status-badge ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                          <span className="recent-order-date">
                            {formatDate(order.order_date)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Inventory Summary */}
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <IconBox size={18} color="#1a1a2e" />
                    Inventory Summary
                  </h3>
                  <button
                    className="btn-view-all"
                    onClick={() => navigate("/inventory")}
                  >
                    Manage →
                  </button>
                </div>

                <div className="inventory-summary-list">
                  {stats.inventory.map((item) => (
                    <div key={item.item_id} className="inventory-summary-item">
                      <div className="inv-summary-item-header">
                        <span className="inv-item-name">{item.item_name}</span>
                        {isLowStock(item) && (
                          <span
                            className="inv-low-badge"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <IconAlert size={11} color="#c62828" />
                            Low
                          </span>
                        )}
                      </div>
                      <div className="inv-stock-bar-wrapper">
                        <div className="inv-stock-bar-bg">
                          <div
                            className={`inv-stock-bar-fill ${
                              isLowStock(item) ? "inv-bar-low" : "inv-bar-ok"
                            }`}
                            style={{
                              width: `${Math.min(
                                (item.stock_quantity /
                                  (item.low_stock_threshold * 5)) *
                                  100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`inv-stock-count ${
                            isLowStock(item) ? "text-danger" : "text-success"
                          }`}
                        >
                          {item.stock_quantity} units
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

export default AdminDashboard;
