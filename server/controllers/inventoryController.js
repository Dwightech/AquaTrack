const db = require("../config/db");

const inventoryController = {
  getAllInventory: (req, res) => {
    const query = `SELECT * FROM inventory ORDER BY item_name ASC`;
    db.query(query, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      res.json(results);
    });
  },

  getInventoryById: (req, res) => {
    const { id } = req.params;
    db.query(
      "SELECT * FROM inventory WHERE item_id = ?",
      [id],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        if (results.length === 0)
          return res.status(404).json({ message: "Item not found" });
        res.json(results[0]);
      },
    );
  },

  getLowStockItems: (req, res) => {
    const query = `
      SELECT * FROM inventory
      WHERE stock_quantity <= low_stock_threshold
      ORDER BY stock_quantity ASC
    `;
    db.query(query, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      res.json(results);
    });
  },

  getInventoryLogs: (req, res) => {
    const query = `
      SELECT
        il.*,
        i.item_name,
        a.full_name AS updated_by_name
      FROM inventory_logs il
      LEFT JOIN inventory i ON il.item_id = i.item_id
      LEFT JOIN administrators a ON il.updated_by = a.admin_id
      ORDER BY il.changed_at DESC
      LIMIT 50
    `;
    db.query(query, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      res.json(results);
    });
  },

  updateStock: (req, res) => {
    const { id } = req.params;
    const { stock_quantity, change_type, updated_by } = req.body;

    if (stock_quantity === undefined || !change_type || !updated_by) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuantity = parseInt(stock_quantity);

    if (isNaN(newQuantity) || newQuantity < 0) {
      return res.status(400).json({
        message: "Stock quantity must be a valid non-negative number",
      });
    }

    db.query(
      "SELECT stock_quantity FROM inventory WHERE item_id = ?",
      [id],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        if (results.length === 0)
          return res.status(404).json({ message: "Item not found" });

        const quantity_before = results[0].stock_quantity;
        const quantity_after = newQuantity;
        const quantity_changed = Math.abs(quantity_after - quantity_before);

        db.query(
          "UPDATE inventory SET stock_quantity = ? WHERE item_id = ?",
          [quantity_after, id],
          (err2) => {
            if (err2)
              return res
                .status(500)
                .json({ message: "Server error", error: err2.message });

            const logQuery = `
              INSERT INTO inventory_logs
                (item_id, updated_by, change_type, quantity_before, quantity_after, quantity_changed)
              VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(
              logQuery,
              [
                id,
                updated_by,
                change_type,
                quantity_before,
                quantity_after,
                quantity_changed,
              ],
              (err3) => {
                if (err3)
                  return res
                    .status(500)
                    .json({ message: "Log failed", error: err3.message });
                res.json({
                  message: "Stock updated successfully",
                  quantity_before,
                  quantity_after,
                  quantity_changed,
                });
              },
            );
          },
        );
      },
    );
  },
};

module.exports = inventoryController;
