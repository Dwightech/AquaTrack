const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, inventoryController.getAllInventory);
router.get("/logs", verifyToken, inventoryController.getInventoryLogs);
router.get("/low-stock", verifyToken, inventoryController.getLowStockItems);
router.get("/:id", verifyToken, inventoryController.getInventoryById);
router.put("/:id", verifyToken, inventoryController.updateStock);

module.exports = router;
