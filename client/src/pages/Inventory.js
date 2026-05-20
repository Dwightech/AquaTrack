import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Inventory.css";

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

const IconClipboard = ({ size = 16, color = "currentColor" }) => (
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

const IconBox = ({ size = 22, color = "currentColor" }) => (
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

const IconAlert = ({ size = 16, color = "currentColor" }) => (
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

const IconScroll = ({ size = 18, color = "currentColor" }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
    <line x1="9" y1="9" x2="10" y2="9" />
  </svg>
);

const IconChevronUp = ({ size = 14, color = "currentColor" }) => (
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
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const IconChevronDown = ({ size = 14, color = "currentColor" }) => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────────────── */

const Inventory = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [restockItem, setRestockItem] = useState(null);
  const [restockAmount, setRestockAmount] = useState("");
  const [restocking, setRestocking] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logFilter, setLogFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchInventory();
    fetchLowStockItems();
    fetchLogs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await API.get("/inventory");
      setInventory(response.data);
    } catch (err) {
      setError("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStockItems = async () => {
    try {
      const response = await API.get("/inventory/low-stock");
      setLowStockItems(response.data);
    } catch (err) {
      console.error("Failed to load low stock items");
    }
  };

  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const response = await API.get("/inventory/logs");
      setLogs(response.data);
    } catch (err) {
      console.error("Failed to load logs");
    } finally {
      setLogsLoading(false);
    }
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    if (!restockAmount || parseInt(restockAmount) <= 0) {
      setError("Please enter a valid restock amount.");
      return;
    }

    setRestocking(true);
    setError("");

    const currentStock = restockItem.stock_quantity;
    const addAmount = parseInt(restockAmount);
    const newStock = currentStock + addAmount;

    try {
      await API.put(`/inventory/${restockItem.item_id}`, {
        stock_quantity: newStock,
        change_type: "Restock",
        updated_by: user.id,
      });
      setSuccess(
        `Successfully restocked ${restockItem.item_name} by ${addAmount} units!`,
      );
      setRestockItem(null);
      setRestockAmount("");
      fetchInventory();
      fetchLowStockItems();
      fetchLogs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to restock item.");
    } finally {
      setRestocking(false);
    }
  };

  const isLowStock = (item) => item.stock_quantity <= item.low_stock_threshold;

  // ── FIXED: dynamic max so bar never overflows ──
  const getStockMax = (item) =>
    Math.max(item.stock_quantity, item.low_stock_threshold * 5);

  const getStockPercent = (item) =>
    Math.min((item.stock_quantity / getStockMax(item)) * 100, 100);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalStock = inventory.reduce(
    (sum, item) => sum + item.stock_quantity,
    0,
  );

  const filteredLogs =
    logFilter === "All"
      ? logs
      : logs.filter((log) => log.change_type === logFilter);

  return (
    <div className="inventory-page-wrapper">
      {/* Top Navigation Bar */}
      <div className="inventory-nav">
        <div className="inventory-nav-left">
          <button
            className="btn-back-dashboard"
            onClick={() => navigate("/admin/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconArrowLeft size={14} color="currentColor" />
            Dashboard
          </button>
          <div className="inventory-nav-title">
            <h1 style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <IconWater size={20} color="#1a73e8" />
              AquaTrack
            </h1>
            <span className="inventory-nav-subtitle">Inventory Management</span>
          </div>
        </div>
        <div className="inventory-nav-right">
          <span
            className="inventory-nav-user"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <IconUser size={15} color="currentColor" />
            {user?.fullName}
          </span>
          <button
            className="btn-nav-orders"
            onClick={() => navigate("/orders")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconClipboard size={15} color="currentColor" />
            Orders
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="inventory-wrapper">
        {/* Header */}
        <div className="inventory-header">
          <h2 style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <IconBox size={22} color="currentColor" />
            Inventory Management
          </h2>
        </div>

        {/* Summary Cards */}
        <div className="inventory-summary">
          <div className="inv-summary-card">
            <span className="inv-summary-number">{inventory.length}</span>
            <span className="inv-summary-label">Total Items</span>
          </div>
          <div className="inv-summary-card">
            <span className="inv-summary-number">{totalStock}</span>
            <span className="inv-summary-label">Total Stock</span>
          </div>
          <div
            className={`inv-summary-card ${lowStockItems.length > 0 ? "low-stock-card" : ""}`}
          >
            <span className="inv-summary-number">{lowStockItems.length}</span>
            <span className="inv-summary-label">Low Stock Items</span>
          </div>
          <div className="inv-summary-card">
            <span className="inv-summary-number">{logs.length}</span>
            <span className="inv-summary-label">Stock Changes</span>
          </div>
        </div>

        {/* Low Stock Alert Banner */}
        {lowStockItems.length > 0 && (
          <div className="low-stock-alert">
            <div className="low-stock-alert-content">
              <span className="low-stock-icon">
                <IconAlert size={18} color="#e65100" />
              </span>
              <div>
                <strong>Low Stock Alert!</strong>
                <p>
                  {lowStockItems.length} item(s) need restocking:&nbsp;
                  {lowStockItems.map((item, index) => (
                    <span key={item.item_id}>
                      <strong>{item.item_name}</strong> ({item.stock_quantity}{" "}
                      left)
                      {index < lowStockItems.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <button
              className="btn-alert-restock"
              onClick={() => {
                setRestockItem(lowStockItems[0]);
                setRestockAmount("");
                setError("");
              }}
            >
              Restock Now
            </button>
          </div>
        )}

        {/* Alerts */}
        {success && <div className="inv-alert-success">{success}</div>}
        {error && !restockItem && (
          <div className="inv-alert-error">{error}</div>
        )}

        {/* Restock Modal */}
        {restockItem && (
          <div className="restock-modal-overlay">
            <div className="restock-modal">
              <div className="restock-modal-header">
                <h3 style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <IconPlus size={16} color="currentColor" />
                  Restock — {restockItem.item_name}
                </h3>
                <button
                  className="btn-modal-close"
                  onClick={() => {
                    setRestockItem(null);
                    setRestockAmount("");
                    setError("");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconX size={14} color="currentColor" />
                </button>
              </div>

              <div className="restock-modal-info">
                <div className="restock-info-row">
                  <span>Current Stock:</span>
                  <span
                    className={
                      isLowStock(restockItem) ? "text-danger" : "text-success"
                    }
                  >
                    {restockItem.stock_quantity} units
                  </span>
                </div>
                <div className="restock-info-row">
                  <span>Low Stock Threshold:</span>
                  <span>{restockItem.low_stock_threshold} units</span>
                </div>
                {isLowStock(restockItem) && (
                  <div className="restock-info-row">
                    <span>Status:</span>
                    <span
                      className="text-danger"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <IconAlert size={13} color="#c62828" />
                      Below threshold
                    </span>
                  </div>
                )}
              </div>

              {error && <div className="inv-alert-error">{error}</div>}

              <form onSubmit={handleRestock} className="restock-form">
                <div className="restock-form-group">
                  <label>Amount to Add</label>
                  <input
                    type="number"
                    placeholder="Enter amount to add"
                    value={restockAmount}
                    onChange={(e) => {
                      setRestockAmount(e.target.value);
                      setError("");
                    }}
                    min="1"
                    required
                    autoFocus
                  />
                  {restockAmount && parseInt(restockAmount) > 0 && (
                    <p className="restock-preview">
                      New stock will be:{" "}
                      <strong>
                        {restockItem.stock_quantity + parseInt(restockAmount)}{" "}
                        units
                      </strong>
                      {restockItem.stock_quantity + parseInt(restockAmount) >
                        restockItem.low_stock_threshold && (
                        <span
                          className="restock-preview-ok"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <IconCheckCircle size={13} color="#2e7d32" />
                          Above threshold
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="restock-form-actions">
                  <button
                    type="submit"
                    className="btn-confirm-restock"
                    disabled={restocking}
                  >
                    {restocking ? "Restocking..." : "Confirm Restock"}
                  </button>
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={() => {
                      setRestockItem(null);
                      setRestockAmount("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inventory Cards */}
        {loading ? (
          <div className="inv-loading">Loading inventory...</div>
        ) : inventory.length === 0 ? (
          <div className="inv-empty">No inventory items found.</div>
        ) : (
          <div className="inventory-grid">
            {inventory.map((item) => (
              <div
                key={item.item_id}
                className={`inventory-card ${isLowStock(item) ? "inventory-card-low" : ""}`}
              >
                {isLowStock(item) && (
                  <div
                    className="low-stock-badge"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <IconAlert size={12} color="currentColor" />
                    Low Stock
                  </div>
                )}

                <div className="inventory-card-header">
                  <h3>{item.item_name}</h3>
                  <span className="item-id">#{item.item_id}</span>
                </div>

                {/* ── FIXED STOCK BAR ── */}
                <div className="stock-bar-wrapper">
                  <div className="stock-bar-labels">
                    <span>Stock Level</span>
                    <span>
                      {item.stock_quantity} / {getStockMax(item)} units
                    </span>
                  </div>
                  <div className="stock-bar-bg">
                    <div
                      className={`stock-bar-fill ${
                        isLowStock(item) ? "stock-bar-low" : "stock-bar-ok"
                      }`}
                      style={{ width: `${getStockPercent(item)}%` }}
                    />
                  </div>
                </div>

                <div className="inventory-card-details">
                  <div className="inv-detail-row">
                    <span className="inv-detail-label">Current Stock:</span>
                    <span
                      className={`inv-detail-value ${isLowStock(item) ? "text-danger" : "text-success"}`}
                    >
                      {item.stock_quantity} units
                    </span>
                  </div>
                  <div className="inv-detail-row">
                    <span className="inv-detail-label">Low Stock Alert:</span>
                    <span className="inv-detail-value">
                      Below {item.low_stock_threshold} units
                    </span>
                  </div>
                  <div className="inv-detail-row">
                    <span className="inv-detail-label">Last Updated:</span>
                    <span className="inv-detail-value">
                      {formatDate(item.last_updated)}
                    </span>
                  </div>
                </div>

                <button
                  className="btn-restock"
                  onClick={() => {
                    setRestockItem(item);
                    setRestockAmount("");
                    setError("");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <IconPlus size={13} color="currentColor" />
                  Restock
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Inventory Logs */}
        <div className="inventory-logs-card">
          <div
            className="logs-header"
            onClick={() => setShowLogs(!showLogs)}
            style={{ cursor: "pointer" }}
          >
            <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconScroll size={18} color="currentColor" />
              Stock Change History
            </h3>
            <span
              className="logs-toggle"
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              {showLogs ? (
                <>
                  <IconChevronUp size={14} color="currentColor" /> Hide
                </>
              ) : (
                <>
                  <IconChevronDown size={14} color="currentColor" /> Show
                </>
              )}
            </span>
          </div>

          {showLogs && (
            <div className="logs-content">
              <div className="logs-filter">
                <span className="logs-filter-label">Filter:</span>
                <button
                  className={`log-filter-btn ${logFilter === "All" ? "active" : ""}`}
                  onClick={() => setLogFilter("All")}
                >
                  All ({logs.length})
                </button>
                <button
                  className={`log-filter-btn log-restock-btn ${logFilter === "Restock" ? "active" : ""}`}
                  onClick={() => setLogFilter("Restock")}
                >
                  Restock (
                  {logs.filter((l) => l.change_type === "Restock").length})
                </button>
                <button
                  className={`log-filter-btn log-deduction-btn ${logFilter === "Order Deduction" ? "active" : ""}`}
                  onClick={() => setLogFilter("Order Deduction")}
                >
                  Order Deduction (
                  {
                    logs.filter((l) => l.change_type === "Order Deduction")
                      .length
                  }
                  )
                </button>
              </div>

              <div className="logs-table-wrapper">
                {logsLoading ? (
                  <div className="inv-loading">Loading logs...</div>
                ) : filteredLogs.length === 0 ? (
                  <div className="inv-empty">
                    No stock changes recorded yet.
                  </div>
                ) : (
                  <table className="logs-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Before</th>
                        <th>After</th>
                        <th>Changed</th>
                        <th>Updated By</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log) => (
                        <tr key={log.log_id}>
                          <td>{log.log_id}</td>
                          <td>{log.item_name}</td>
                          <td>
                            <span
                              className={`log-type-badge ${log.change_type === "Restock" ? "log-restock" : "log-deduction"}`}
                            >
                              {log.change_type}
                            </span>
                          </td>
                          <td>{log.quantity_before}</td>
                          <td>{log.quantity_after}</td>
                          <td
                            className={
                              log.change_type === "Restock"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {log.change_type === "Restock" ? "+" : "-"}
                            {log.quantity_changed}
                          </td>
                          <td>{log.updated_by_name || "System"}</td>
                          <td>{formatDate(log.changed_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
