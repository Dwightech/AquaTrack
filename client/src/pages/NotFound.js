import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f0f4f8",
        gap: "16px",
      }}
    >
      <div style={{ fontSize: "64px" }}>💧</div>
      <h1 style={{ fontSize: "32px", color: "#1a73e8", margin: 0 }}>404</h1>
      <p style={{ fontSize: "16px", color: "#555", margin: 0 }}>
        Page not found
      </p>
      <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/login")}
        style={{
          marginTop: "8px",
          padding: "10px 24px",
          background: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
