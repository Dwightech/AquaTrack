const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// GET all staff
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT staff_id, full_name, username, is_active, created_at FROM staff ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json(results);
    },
  );
});

// POST create staff
router.post("/", verifyToken, (req, res) => {
  const { full_name, username, password } = req.body;
  if (!full_name || !username || !password)
    return res.status(400).json({ message: "All fields are required" });

  if (/\d/.test(full_name.trim()))
    return res
      .status(400)
      .json({ message: "Full Name cannot contain numbers" });

  db.query(
    "SELECT * FROM staff WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length > 0)
        return res.status(400).json({ message: "Username already exists" });

      const hash = bcrypt.hashSync(password, 10);
      db.query(
        "INSERT INTO staff (full_name, username, password_hash) VALUES (?, ?, ?)",
        [full_name, username, hash],
        (err2) => {
          if (err2) return res.status(500).json({ message: "Server error" });
          res.status(201).json({ message: "Staff created successfully" });
        },
      );
    },
  );
});

// PUT update staff status
router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;
  db.query(
    "UPDATE staff SET is_active = ? WHERE staff_id = ?",
    [is_active ? 1 : 0, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ message: "Staff updated successfully" });
    },
  );
});

module.exports = router;
