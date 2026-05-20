import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/StaffDashboard.css";

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

const IconUser = ({ size = 16, color = "currentColor" }) => (
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

const IconRefresh = ({ size = 15, color = "currentColor" }) => (
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

const IconWave = ({ size = 20, color = "currentColor" }) => (
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

const IconClipboard = ({ size = 28, color = "currentColor" }) => (
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

const IconZap = ({ size = 28, color = "currentColor" }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconTruck = ({ size = 28, color = "currentColor" }) => (
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

const IconCheckCircle = ({ size = 28, color = "currentColor" }) => (
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

const IconMapPin = ({ size = 13, color = "currentColor" }) => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconDroplet = ({ size = 13, color = "currentColor" }) => (
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
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const IconInbox = ({ size = 40, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const IconX = ({ size = 12, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconArrowRight = ({ size = 13, color = "currentColor" }) => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconBox = ({ size = 20, color = "currentColor" }) => (
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
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────────────── */

const StaffDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("total");

  useEffect(() => {
    fetchMyOrders();
    fetchInventory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const response = await API.get("/orders");
      const myOrders = response.data.filter((o) => o.assigned_to === user?.id);
      setOrders(myOrders);
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await API.get("/inventory");
      setInventory(response.data);
    } catch (err) {
      // silently fail for inventory
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await API.put(`/orders/${orderId}`, {
        status: newStatus,
        assigned_to: user?.id,
      });
      fetchMyOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getNextStatus = (current) => {
    const flow = {
      Pending: "Preparing",
      Preparing: "Out for Delivery",
      "Out for Delivery": "Delivered",
    };
    return flow[current] || null;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "badge-pending";
      case "Preparing":
        return "badge-preparing";
      case "Out for Delivery":
        return "badge-out";
      case "Delivered":
        return "badge-delivered";
      case "Cancelled":
        return "badge-cancelled";
      default:
        return "";
    }
  };

  const getCardClass = (status) => {
    switch (status) {
      case "Pending":
        return "order-pending";
      case "Preparing":
        return "order-preparing";
      case "Out for Delivery":
        return "order-out";
      case "Delivered":
        return "order-delivered";
      default:
        return "";
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const getStockBarColor = (item) => {
    const ratio = item.stock_quantity / (item.low_stock_threshold * 5);
    if (item.stock_quantity <= item.low_stock_threshold) return "#e53935";
    if (ratio < 0.5) return "#f57c00";
    return "#43a047";
  };

  const getStockBarWidth = (item) => {
    const max = Math.max(item.stock_quantity, item.low_stock_threshold * 5);
    return Math.min((item.stock_quantity / max) * 100, 100);
  };

  const countByStatus = (status) =>
    orders.filter((o) => o.status === status).length;
  const countActive = () =>
    orders.filter((o) => o.status === "Pending" || o.status === "Preparing")
      .length;

  const getFilteredOrders = () => {
    switch (activeFilter) {
      case "total":
        return orders;
      case "active":
        return orders.filter(
          (o) => o.status === "Pending" || o.status === "Preparing",
        );
      case "out":
        return orders.filter((o) => o.status === "Out for Delivery");
      case "delivered":
        return orders.filter((o) => o.status === "Delivered");
      default:
        return orders;
    }
  };

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "total":
        return {
          icon: <IconClipboard size={18} color="currentColor" />,
          text: "All Assigned Orders",
        };
      case "active":
        return {
          icon: <IconZap size={18} color="currentColor" />,
          text: "Active Orders",
        };
      case "out":
        return {
          icon: <IconTruck size={18} color="currentColor" />,
          text: "Out for Delivery",
        };
      case "delivered":
        return {
          icon: <IconCheckCircle size={18} color="currentColor" />,
          text: "Delivered Orders",
        };
      default:
        return {
          icon: <IconClipboard size={18} color="currentColor" />,
          text: "All Assigned Orders",
        };
    }
  };

  const filteredOrders = getFilteredOrders();
  const filterLabel = getFilterLabel();

  return (
    <div className="staff-dashboard-wrapper">
      {/* Nav Bar */}
      <nav className="staff-dashboard-nav">
        <div className="staff-nav-left">
          <h1 style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <IconWater size={20} color="#1a73e8" />
            AquaTrack
          </h1>
          <span className="staff-nav-subtitle">Staff Dashboard</span>
        </div>
        <div className="staff-nav-right">
          <span
            className="staff-nav-user"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <IconUser size={15} color="currentColor" />
            {user?.fullName}
          </span>
          <button className="staff-btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="staff-dashboard-content">
        {/* Welcome Banner */}
        <div className="staff-welcome-banner">
          <div>
            <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Good {getTimeOfDay()}, {user?.fullName}!
              <IconWave size={20} color="rgba(255,255,255,0.9)" />
            </h2>
            <p>
              {new Date().toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            className="staff-btn-refresh"
            onClick={() => {
              fetchMyOrders();
              fetchInventory();
            }}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <IconRefresh size={14} color="currentColor" />
            Refresh
          </button>
        </div>

        {/* Main Grid: Orders + Inventory side by side */}
        <div className="staff-main-grid">
          {/* Left Column: Summary Cards + Orders */}
          <div className="staff-left-column">
            {/* Summary Cards */}
            <div className="staff-summary-cards">
              <div
                className={`staff-summary-card gray ${activeFilter === "total" ? "card-active" : ""}`}
                onClick={() => setActiveFilter("total")}
              >
                <span className="staff-card-icon">
                  <IconClipboard size={28} color="currentColor" />
                </span>
                <div className="staff-card-info">
                  <span className="staff-card-number">{orders.length}</span>
                  <span className="staff-card-label">Total Assigned</span>
                </div>
              </div>

              <div
                className={`staff-summary-card orange ${activeFilter === "active" ? "card-active" : ""}`}
                onClick={() => setActiveFilter("active")}
              >
                <span className="staff-card-icon">
                  <IconZap size={28} color="currentColor" />
                </span>
                <div className="staff-card-info">
                  <span className="staff-card-number">{countActive()}</span>
                  <span className="staff-card-label">Active</span>
                </div>
              </div>

              <div
                className={`staff-summary-card purple ${activeFilter === "out" ? "card-active" : ""}`}
                onClick={() => setActiveFilter("out")}
              >
                <span className="staff-card-icon">
                  <IconTruck size={28} color="currentColor" />
                </span>
                <div className="staff-card-info">
                  <span className="staff-card-number">
                    {countByStatus("Out for Delivery")}
                  </span>
                  <span className="staff-card-label">Out for Delivery</span>
                </div>
              </div>

              <div
                className={`staff-summary-card green ${activeFilter === "delivered" ? "card-active" : ""}`}
                onClick={() => setActiveFilter("delivered")}
              >
                <span className="staff-card-icon">
                  <IconCheckCircle size={28} color="currentColor" />
                </span>
                <div className="staff-card-info">
                  <span className="staff-card-number">
                    {countByStatus("Delivered")}
                  </span>
                  <span className="staff-card-label">Delivered</span>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && <div className="staff-error">{error}</div>}

            {/* Orders Section Header */}
            <div className="staff-section-header">
              <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {filterLabel.icon}
                {filterLabel.text}
              </h3>
              <div className="staff-section-header-right">
                <span className="staff-filter-count">
                  {filteredOrders.length} order
                  {filteredOrders.length !== 1 ? "s" : ""}
                </span>
                {activeFilter !== "total" && (
                  <button
                    className="staff-btn-clear-filter"
                    onClick={() => setActiveFilter("total")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <IconX size={11} color="currentColor" />
                    Show All
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="staff-loading">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="staff-empty">
                <div className="staff-empty-icon">
                  <IconInbox size={40} color="#ccc" />
                </div>
                <p>No orders in this category.</p>
              </div>
            ) : (
              <div className="staff-orders-list">
                {filteredOrders.map((order) => (
                  <div
                    key={order.order_id}
                    className={`staff-order-card ${getCardClass(order.status)}`}
                  >
                    <div className="staff-order-left">
                      <span className="staff-order-id">#{order.order_id}</span>
                      <div className="staff-order-details">
                        <span className="staff-order-name">
                          {order.customer_name}
                        </span>
                        <span
                          className="staff-order-address"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <IconMapPin size={12} color="currentColor" />
                          {order.address}
                        </span>
                        <span
                          className="staff-order-item"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <IconDroplet size={12} color="currentColor" />
                          {order.gallons} gallons × {order.item_name}
                        </span>
                      </div>
                    </div>
                    <div className="staff-order-right">
                      <span
                        className={`staff-status-badge ${getStatusBadgeClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                      {getNextStatus(order.status) && (
                        <button
                          className="staff-btn-update"
                          disabled={updatingId === order.order_id}
                          onClick={() =>
                            handleStatusUpdate(
                              order.order_id,
                              getNextStatus(order.status),
                            )
                          }
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {updatingId === order.order_id ? (
                            "Updating..."
                          ) : (
                            <>
                              <IconArrowRight size={12} color="currentColor" />
                              {getNextStatus(order.status)}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Inventory Summary */}
          <div className="staff-right-column">
            <div className="staff-inventory-card">
              <div className="staff-inventory-header">
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <IconBox size={20} color="currentColor" />
                  Inventory Summary
                </h3>
                <span className="staff-inventory-badge">View Only</span>
              </div>

              {inventory.length === 0 ? (
                <div className="staff-inventory-empty">No inventory data.</div>
              ) : (
                <div className="staff-inventory-list">
                  {inventory.map((item) => (
                    <div key={item.item_id} className="staff-inventory-item">
                      <div className="staff-inventory-item-header">
                        <span className="staff-inventory-name">
                          {item.item_name}
                        </span>
                        <span
                          className="staff-inventory-units"
                          style={{ color: getStockBarColor(item) }}
                        >
                          {item.stock_quantity} units
                        </span>
                      </div>
                      <div className="staff-inventory-bar-bg">
                        <div
                          className="staff-inventory-bar-fill"
                          style={{
                            width: `${getStockBarWidth(item)}%`,
                            backgroundColor: getStockBarColor(item),
                          }}
                        />
                      </div>
                      {item.stock_quantity <= item.low_stock_threshold && (
                        <span className="staff-inventory-low-warning">
                          ⚠ Low stock
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
