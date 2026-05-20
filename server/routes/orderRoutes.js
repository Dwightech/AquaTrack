const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, orderController.getDashboardStats);
router.get("/", verifyToken, orderController.getAllOrders);
router.get("/:id", verifyToken, orderController.getOrderById);
router.post("/", verifyToken, orderController.createOrder);
router.put("/:id", verifyToken, orderController.updateOrderStatus);

module.exports = router;
