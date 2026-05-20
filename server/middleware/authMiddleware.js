const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Remove "Bearer " if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure consistent structure
    req.user = {
      id: decoded.id || decoded.userId || decoded.staff_id || null,
      role: decoded.role || decoded.staff_role || null,
    };

    // Optional: validate required fields
    if (!req.user.id || !req.user.role) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
