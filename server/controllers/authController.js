const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  login: (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ message: "Username, password, and role are required" });
    }

    const table = role === "Administrator" ? "administrators" : "staff";
    const idField = role === "Administrator" ? "admin_id" : "staff_id";

    const query = `SELECT * FROM ${table} WHERE username = ? AND is_active = 1`;

    db.query(query, [username], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (!isMatch) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
          { id: user[idField], username: user.username, role },
          process.env.JWT_SECRET || "aquatrack_secret_key_2025",
          { expiresIn: "7d" },
        );

        res.json({
          message: "Login successful",
          token,
          user: {
            id: user[idField],
            username: user.username,
            fullName: user.full_name,
            role,
          },
        });
      });
    });
  },

  logout: (req, res) => {
    res.json({ message: "Logged out successfully" });
  },
};

module.exports = authController;
