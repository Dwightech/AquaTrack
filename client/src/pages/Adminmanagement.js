import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/StaffManagement.css";

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

const IconClipboard = ({ size = 18, color = "currentColor" }) => (
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

const IconBox = ({ size = 18, color = "currentColor" }) => (
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

const IconUsers = ({ size = 18, color = "currentColor" }) => (
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

const IconArrowLeft = ({ size = 16, color = "currentColor" }) => (
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

const IconPlus = ({ size = 15, color = "currentColor" }) => (
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

/* ─── Component ───────────────────────────────────────────────────────────── */

const AdminManagement = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [adminList, setAdminList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admins");
      setAdminList(response.data);
    } catch (err) {
      setError("Failed to load admins.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");

    if (name === "full_name") {
      setFullNameError(
        value && !isValidFullName(value)
          ? "Full Name cannot contain numbers."
          : "",
      );
    }
  };

  const isValidFullName = (name) => !/\d/.test(name.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.username || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidFullName(formData.full_name)) {
      setError("Full Name cannot contain numbers.");
      return;
    }
    setSubmitting(true);
    try {
      await API.post("/admins", formData);
      setSuccess("Admin account created successfully!");
      setFormData({ full_name: "", username: "", password: "" });
      setShowForm(false);
      fetchAdmins();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create admin.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (adminId, currentStatus) => {
    try {
      await API.put(`/admins/${adminId}`, { is_active: !currentStatus });
      setSuccess(
        `Admin account ${!currentStatus ? "activated" : "deactivated"} successfully!`,
      );
      fetchAdmins();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update admin status.");
    }
  };

  return (
    <div className="staff-page-wrapper">
      {/* Nav Bar */}
      <nav className="staff-nav">
        <div className="staff-nav-left">
          <button
            className="btn-back-staff"
            onClick={() => navigate("/admin/dashboard")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconArrowLeft size={15} color="currentColor" />
            Dashboard
          </button>
          <div className="staff-nav-title">
            <h1 style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <IconWater size={20} color="#1a73e8" />
              AquaTrack
            </h1>
            <span>Admin Management</span>
          </div>
        </div>
        <div className="staff-nav-right">
          <button
            className="page-nav-btn"
            onClick={() => navigate("/orders")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconClipboard size={15} color="currentColor" />
            Orders
          </button>
          <button
            className="page-nav-btn"
            onClick={() => navigate("/inventory")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconBox size={15} color="currentColor" />
            Inventory
          </button>
          <button
            className="page-nav-btn"
            onClick={() => navigate("/staff-management")}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <IconUsers size={15} color="currentColor" />
            Staff
          </button>
          <span
            className="staff-nav-user"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <IconUser size={15} color="currentColor" />
            {user?.fullName}
          </span>
          <button
            className="page-nav-btn page-nav-logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="staff-wrapper">
        <div className="staff-header">
          <h2 style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <IconShield size={22} color="currentColor" />
            Admin Management
          </h2>
          <button
            className="btn-add-staff"
            onClick={() => {
              setShowForm(!showForm);
              setError("");
            }}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {showForm ? (
              <>
                <IconX size={13} color="currentColor" />
                Cancel
              </>
            ) : (
              <>
                <IconPlus size={14} color="currentColor" />
                Add Admin
              </>
            )}
          </button>
        </div>

        {success && <div className="staff-alert-success">{success}</div>}
        {error && !showForm && <div className="staff-alert-error">{error}</div>}

        {showForm && (
          <div className="staff-form-card">
            <h3>New Admin Account</h3>
            {error && <div className="staff-alert-error">{error}</div>}
            <form onSubmit={handleSubmit} className="staff-form">
              <div className="staff-form-row">
                <div className="staff-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                  {fullNameError && (
                    <div
                      style={{
                        color: "#d32f2f",
                        fontSize: "0.9rem",
                        marginTop: 6,
                      }}
                    >
                      {fullNameError}
                    </div>
                  )}
                </div>
                <div className="staff-form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="staff-form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="staff-form-actions">
                <button
                  type="submit"
                  className="btn-staff-submit"
                  disabled={submitting || !!fullNameError}
                >
                  {submitting ? "Creating..." : "Create Account"}
                </button>
                <button
                  type="button"
                  className="btn-staff-cancel"
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

        <div className="staff-table-card">
          <h3>Admin Accounts</h3>
          {loading ? (
            <div className="staff-loading">Loading admins...</div>
          ) : adminList.length === 0 ? (
            <div className="staff-empty">No admin accounts found.</div>
          ) : (
            <table className="staff-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((admin) => (
                  <tr key={admin.admin_id}>
                    <td>{admin.admin_id}</td>
                    <td>{admin.full_name}</td>
                    <td>{admin.username}</td>
                    <td>
                      <span
                        className={`staff-status ${admin.is_active ? "active" : "inactive"}`}
                      >
                        {admin.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {new Date(admin.created_at).toLocaleDateString("en-PH")}
                    </td>
                    <td>
                      <button
                        className={`btn-toggle ${admin.is_active ? "btn-deactivate" : "btn-activate"}`}
                        onClick={() =>
                          handleToggleActive(admin.admin_id, admin.is_active)
                        }
                      >
                        {admin.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
