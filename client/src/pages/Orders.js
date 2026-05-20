import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import "../styles/Orders.css";

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

const IconBox = ({ size = 16, color = "currentColor" }) => (
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

const IconClipboard = ({ size = 22, color = "currentColor" }) => (
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
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const IconArrowLeft = ({ size = 15, color = "currentColor" }) => (
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
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconPlus = ({ size = 14, color = "currentColor" }) => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconX = ({ size = 14, color = "currentColor" }) => (
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

const IconSearch = ({ size = 16, color = "currentColor" }) => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconCheckCircle = ({ size = 15, color = "currentColor" }) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
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

/* ─── Shared label style — guarantees visibility regardless of global CSS ─── */
const labelStyle = {
  color: "#1f2a44",
  fontWeight: 700,
  fontSize: "13.5px",
  letterSpacing: "0.3px",
  opacity: 1,
  display: "block",
  marginBottom: "8px",
};

/* ─── Component ───────────────────────────────────────────────────────────── */

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    gallons: "",
    item_id: "",
    assigned_to: "",
  });
  const [filters, setFilters] = useState({
    search: "",
    status: location.state?.filterStatus || "All",
    sort: "newest",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?.admin_id || user?.id;

  useEffect(() => {
    fetchOrders();
    fetchInventory();
    fetchStaff();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.state?.filterStatus) {
      setFilters((prev) => ({ ...prev, status: location.state.filterStatus }));
    }
  }, [location.state]);

  useEffect(() => {
    let result = [...orders];
    if (filters.status !== "All") {
      result = result.filter((o) => o.status === filters.status);
    }
    if (filters.search.trim() !== "") {
      const keyword = filters.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.customer_name.toLowerCase().includes(keyword) ||
          o.address.toLowerCase().includes(keyword),
      );
    }
    if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
    } else {
      result.sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
    }
    setFilteredOrders(result);
  }, [orders, filters]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await API.get("/orders");
      setOrders(response.data);
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
      if (response.data.length > 0) {
        setFormData((prev) => ({ ...prev, item_id: response.data[0].item_id }));
      }
    } catch (err) {
      console.error("Failed to load inventory");
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await API.get("/staff");
      setStaffList(response.data.filter((s) => s.is_active === 1));
    } catch (err) {
      console.error("Failed to load staff");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({ search: "", status: "All", sort: "newest" });
  };

  const isValidCustomerName = (name) => !/\d/.test(name.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");

    if (name === "customer_name") {
      setCustomerNameError(
        value && !isValidCustomerName(value)
          ? "Customer Name cannot contain numbers."
          : "",
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.customer_name ||
      !formData.address ||
      !formData.gallons ||
      !formData.item_id
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidCustomerName(formData.customer_name)) {
      setError("Customer Name cannot contain numbers.");
      return;
    }
    if (parseInt(formData.gallons) <= 0) {
      setError("Gallons must be greater than 0.");
      return;
    }
    if (!currentUserId) {
      setError(
        "Session error: could not identify current user. Please log in again.",
      );
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await API.post("/orders", {
        customer_name: formData.customer_name,
        address: formData.address,
        gallons: parseInt(formData.gallons),
        item_id: parseInt(formData.item_id),
        assigned_to: formData.assigned_to
          ? parseInt(formData.assigned_to)
          : null,
      });
      setSuccess("Order created successfully!");
      setFormData({
        customer_name: "",
        address: "",
        gallons: "",
        item_id: inventory[0]?.item_id || "",
        assigned_to: "",
      });
      setShowForm(false);
      await fetchOrders();
      fetchInventory();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order.");
    } finally {
      setSubmitting(false);
    }
  };

  const getNextStatuses = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
        return ["Preparing", "Cancelled"];
      case "Preparing":
        return ["Out for Delivery", "Cancelled"];
      case "Out for Delivery":
        return ["Delivered", "Cancelled"];
      default:
        return [];
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(true);
    setError("");
    try {
      await API.put(`/orders/${orderId}`, {
        status: newStatus,
        assigned_to: selectedOrder.assigned_to ?? undefined,
      });
      setSuccess(`Order #${orderId} updated to ${newStatus}`);
      setSelectedOrder(null);
      fetchOrders();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order.");
    } finally {
      setUpdating(false);
    }
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
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const countByStatus = (status) =>
    orders.filter((o) => o.status === status).length;

  return (
    <div className="orders-page-wrapper">
      {/* ── Top Navigation Bar ── */}
      <div className="orders-nav">
        <div className="orders-nav-left">
          <button
            className="btn-back-dashboard"
            onClick={() => navigate("/admin/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconArrowLeft size={14} color="currentColor" />
            Dashboard
          </button>
          <div className="orders-nav-title">
            <h1 style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <IconWater size={20} color="#1a73e8" />
              AquaTrack
            </h1>
            <span className="orders-nav-subtitle">Order Management</span>
          </div>
        </div>
        <div className="orders-nav-right">
          <span
            className="orders-nav-user"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <IconUser size={15} color="currentColor" />
            {user?.fullName}
          </span>
          <button
            className="btn-nav-inventory"
            onClick={() => navigate("/inventory")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconBox size={15} color="currentColor" />
            Inventory
          </button>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="orders-wrapper">
        {/* Header */}
        <div className="orders-header">
          <h2 style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <IconClipboard size={22} color="currentColor" />
            Order Management
          </h2>
          <button
            className="btn-add"
            onClick={() => {
              setShowForm(!showForm);
              setSelectedOrder(null);
              setError("");
            }}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {showForm ? (
              <>
                <IconX size={13} color="currentColor" /> Cancel
              </>
            ) : (
              <>
                <IconPlus size={13} color="currentColor" /> New Order
              </>
            )}
          </button>
        </div>

        {/* Status Summary Cards */}
        <div className="status-summary">
          <div
            className="summary-card"
            onClick={() => setFilters({ ...filters, status: "All" })}
          >
            <span className="summary-number">{orders.length}</span>
            <span className="summary-label">All Orders</span>
          </div>
          <div
            className="summary-card pending"
            onClick={() => setFilters({ ...filters, status: "Pending" })}
          >
            <span className="summary-number">{countByStatus("Pending")}</span>
            <span className="summary-label">Pending</span>
          </div>
          <div
            className="summary-card preparing"
            onClick={() => setFilters({ ...filters, status: "Preparing" })}
          >
            <span className="summary-number">{countByStatus("Preparing")}</span>
            <span className="summary-label">Preparing</span>
          </div>
          <div
            className="summary-card out"
            onClick={() =>
              setFilters({ ...filters, status: "Out for Delivery" })
            }
          >
            <span className="summary-number">
              {countByStatus("Out for Delivery")}
            </span>
            <span className="summary-label">Out for Delivery</span>
          </div>
          <div
            className="summary-card delivered"
            onClick={() => setFilters({ ...filters, status: "Delivered" })}
          >
            <span className="summary-number">{countByStatus("Delivered")}</span>
            <span className="summary-label">Delivered</span>
          </div>
          <div
            className="summary-card cancelled"
            onClick={() => setFilters({ ...filters, status: "Cancelled" })}
          >
            <span className="summary-number">{countByStatus("Cancelled")}</span>
            <span className="summary-label">Cancelled</span>
          </div>
        </div>

        {/* Success Message */}
        {success && <div className="alert-success">{success}</div>}

        {/* ── Order Form ── */}
        {showForm && (
          <div className="order-form-card">
            <h3>New Customer Order</h3>
            {error && <div className="alert-error">{error}</div>}
            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-row">
                <div className="form-group">
                  <label style={labelStyle}>Customer Name</label>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="Enter customer name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                  {customerNameError && (
                    <div
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.9rem",
                        marginTop: 6,
                      }}
                    >
                      {customerNameError}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Item Type</label>
                  <select
                    name="item_id"
                    value={formData.item_id}
                    onChange={handleChange}
                  >
                    {inventory.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item_name} (Stock: {item.stock_quantity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label style={labelStyle}>Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter delivery address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Gallons</label>
                  <input
                    type="number"
                    name="gallons"
                    placeholder="Enter quantity"
                    value={formData.gallons}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label style={labelStyle}>
                    Assign to Staff{" "}
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "#546e7a",
                        marginLeft: 6,
                      }}
                    >
                      (Optional)
                    </span>
                  </label>
                  <select
                    name="assigned_to"
                    value={formData.assigned_to}
                    onChange={handleChange}
                  >
                    <option value="">— Unassigned —</option>
                    {staffList.map((s) => (
                      <option key={s.staff_id} value={s.staff_id}>
                        {s.full_name} (@{s.username})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">{/* spacer */}</div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={submitting || !!customerNameError}
                >
                  {submitting ? "Submitting..." : "Submit Order"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Order Detail Panel ── */}
        {selectedOrder && (
          <div className="order-detail-card">
            <div className="order-detail-header">
              <h3>
                Order #{selectedOrder.order_id} — {selectedOrder.customer_name}
              </h3>
              <button
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconX size={14} color="currentColor" />
              </button>
            </div>

            <div className="order-detail-info">
              <div className="detail-row">
                <span className="detail-label">Address:</span>
                <span>{selectedOrder.address}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Item:</span>
                <span>{selectedOrder.item_name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gallons:</span>
                <span>{selectedOrder.gallons}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Status:</span>
                <span
                  className={`status-badge ${getStatusColor(selectedOrder.status)}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Recorded By:</span>
                <span>{selectedOrder.created_by_name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Assigned To:</span>
                <span>{selectedOrder.assigned_to_name || "—"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span>{formatDate(selectedOrder.order_date)}</span>
              </div>
            </div>

            {getNextStatuses(selectedOrder.status).length > 0 ? (
              <div className="status-update-section">
                <div className="assign-section">
                  <label style={labelStyle}>Assign to Staff:</label>
                  <select
                    className="assign-select"
                    defaultValue={selectedOrder.assigned_to || ""}
                    onChange={async (e) => {
                      try {
                        await API.put(`/orders/${selectedOrder.order_id}`, {
                          status: selectedOrder.status,
                          assigned_to: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        });
                        setSuccess(
                          `Order #${selectedOrder.order_id} assigned successfully`,
                        );
                        await fetchOrders();
                        setTimeout(() => setSuccess(""), 3000);
                      } catch (err) {
                        setError("Failed to assign order.");
                      }
                    }}
                  >
                    <option value="">— Unassigned —</option>
                    {staffList.map((s) => (
                      <option key={s.staff_id} value={s.staff_id}>
                        {s.full_name} (@{s.username})
                      </option>
                    ))}
                  </select>
                </div>

                <p style={{ ...labelStyle, marginBottom: 12 }}>
                  Update Status:
                </p>
                <div className="status-buttons">
                  {getNextStatuses(selectedOrder.status).map((nextStatus) => (
                    <button
                      key={nextStatus}
                      className={`btn-status ${nextStatus === "Cancelled" ? "btn-status-cancel" : "btn-status-next"}`}
                      onClick={() =>
                        handleStatusUpdate(selectedOrder.order_id, nextStatus)
                      }
                      disabled={updating}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {updating ? (
                        "Updating..."
                      ) : (
                        <>
                          <IconArrowRight size={12} color="currentColor" />
                          {nextStatus}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="status-update-section">
                <p
                  className="status-final"
                  style={{ display: "flex", alignItems: "center", gap: 7 }}
                >
                  <IconCheckCircle size={15} color="#2e7d32" />
                  This order is <strong>{selectedOrder.status}</strong> and
                  cannot be updated further.
                </p>
              </div>
            )}

            {error && (
              <div className="alert-error" style={{ marginTop: "12px" }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* ── Filter Bar ── */}
        <div className="filter-bar">
          <div className="filter-search">
            <span className="filter-icon">
              <IconSearch size={15} color="#aaa" />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Search by customer name or address..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-controls">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            {(filters.search !== "" || filters.status !== "All") && (
              <button
                className="btn-clear"
                onClick={handleClearFilters}
                style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
              >
                <IconX size={12} color="currentColor" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Order List ── */}
        <div className="orders-table-card">
          <div className="orders-table-header">
            <h3>Order List</h3>
            <span className="orders-count">
              {filteredOrders.length} of {orders.length} orders
            </span>
          </div>

          {loading ? (
            <div className="loading-text">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-text">
              {orders.length === 0
                ? "No orders found."
                : "No orders match your filters."}
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Item</th>
                    <th>Gallons</th>
                    <th>Status</th>
                    <th>Recorded By</th>
                    <th>Assigned To</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.address}</td>
                      <td>{order.item_name}</td>
                      <td>{order.gallons}</td>
                      <td>
                        <span
                          className={`status-badge ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.created_by_name}</td>
                      <td>{order.assigned_to_name || "—"}</td>
                      <td>{formatDate(order.order_date)}</td>
                      <td>
                        <button
                          className="btn-view"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowForm(false);
                            setError("");
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
