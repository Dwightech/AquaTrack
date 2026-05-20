import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import StaffManagement from "./pages/StaffManagement";
import AdminManagement from "./pages/Adminmanagement"; // NEW
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="Administrator">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRole="Staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRole="Administrator">
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRole="Administrator">
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-management"
          element={
            <ProtectedRoute allowedRole="Administrator">
              <StaffManagement />
            </ProtectedRoute>
          }
        />

        {/* NEW */}
        <Route
          path="/admin-management"
          element={
            <ProtectedRoute allowedRole="Administrator">
              <AdminManagement />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
