const db = require("../config/db");

const orderController = {
  getDashboardStats: (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const ordersToday = `SELECT COUNT(*) AS count FROM orders WHERE DATE(order_date) = ?`;
    const pendingDeliveries = `SELECT COUNT(*) AS count FROM orders WHERE status IN ('Pending', 'Preparing', 'Out for Delivery')`;
    const deliveredToday = `SELECT COUNT(*) AS count FROM orders WHERE status = 'Delivered' AND DATE(updated_at) = ?`;
    const totalOrders = `SELECT COUNT(*) AS count FROM orders`;
    const inventorySummary = `SELECT item_name, stock_quantity, low_stock_threshold FROM inventory ORDER BY item_name ASC`;

    const recentOrders = `
      SELECT o.order_id, o.customer_name, o.gallons,
             o.status, o.order_date, i.item_name,
             CASE 
               WHEN o.creator_role = 'Administrator' THEN a.full_name
               ELSE s.full_name
             END AS created_by_name
      FROM orders o
      LEFT JOIN inventory i        ON o.item_id    = i.item_id
      LEFT JOIN staff s            ON o.created_by = s.staff_id AND o.creator_role = 'Staff'
      LEFT JOIN administrators a   ON o.created_by = a.admin_id AND o.creator_role = 'Administrator'
      ORDER BY o.order_date DESC
      LIMIT 5
    `;

    db.query(ordersToday, [today], (err, r1) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      db.query(pendingDeliveries, (err, r2) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        db.query(deliveredToday, [today], (err, r3) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Server error", error: err.message });
          db.query(totalOrders, (err, r4) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Server error", error: err.message });
            db.query(inventorySummary, (err, r5) => {
              if (err)
                return res
                  .status(500)
                  .json({ message: "Server error", error: err.message });
              db.query(recentOrders, (err, r6) => {
                if (err)
                  return res
                    .status(500)
                    .json({ message: "Server error", error: err.message });
                res.json({
                  orders_today: r1[0].count,
                  pending_deliveries: r2[0].count,
                  delivered_today: r3[0].count,
                  total_orders: r4[0].count,
                  inventory: r5,
                  recent_orders: r6,
                });
              });
            });
          });
        });
      });
    });
  },

  getAllOrders: (req, res) => {
    const { role, id } = req.user;
    const isStaff = role === "Staff";

    const query = `
      SELECT o.*,
             i.item_name,
             CASE 
               WHEN o.creator_role = 'Administrator' THEN a.full_name
               ELSE s1.full_name
             END AS created_by_name,
             s2.full_name AS assigned_to_name
      FROM orders o
      LEFT JOIN inventory i        ON o.item_id     = i.item_id
      LEFT JOIN staff s1           ON o.created_by  = s1.staff_id AND o.creator_role = 'Staff'
      LEFT JOIN administrators a   ON o.created_by  = a.admin_id  AND o.creator_role = 'Administrator'
      LEFT JOIN staff s2           ON o.assigned_to = s2.staff_id
      ${isStaff ? "WHERE o.assigned_to = ?" : ""}
      ORDER BY o.order_date DESC
    `;

    const params = isStaff ? [id] : [];
    db.query(query, params, (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      res.json(results);
    });
  },

  getOrderById: (req, res) => {
    const { id } = req.params;

    const query = `
      SELECT o.*,
             i.item_name,
             CASE 
               WHEN o.creator_role = 'Administrator' THEN a.full_name
               ELSE s1.full_name
             END AS created_by_name,
             s2.full_name AS assigned_to_name
      FROM orders o
      LEFT JOIN inventory i        ON o.item_id     = i.item_id
      LEFT JOIN staff s1           ON o.created_by  = s1.staff_id AND o.creator_role = 'Staff'
      LEFT JOIN administrators a   ON o.created_by  = a.admin_id  AND o.creator_role = 'Administrator'
      LEFT JOIN staff s2           ON o.assigned_to = s2.staff_id
      WHERE o.order_id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Order not found" });
      res.json(results[0]);
    });
  },

  createOrder: (req, res) => {
    const { customer_name, address, gallons, item_id, assigned_to } = req.body;

    // Always derive created_by and role from the verified JWT token
    const { role, id: created_by } = req.user;

    if (!customer_name || !address || !gallons || !item_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (/\d/.test(customer_name.trim())) {
      return res
        .status(400)
        .json({ message: "Customer Name cannot contain numbers" });
    }

    const gallonsInt = parseInt(gallons);
    const itemIdInt = parseInt(item_id);
    const assignedToVal = assigned_to ? parseInt(assigned_to) : null;

    if (isNaN(gallonsInt) || gallonsInt <= 0) {
      return res
        .status(400)
        .json({ message: "Gallons must be a valid number greater than 0" });
    }

    db.query(
      "SELECT stock_quantity FROM inventory WHERE item_id = ?",
      [itemIdInt],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        if (results.length === 0)
          return res.status(404).json({ message: "Inventory item not found" });

        const availableStock = results[0].stock_quantity;

        if (gallonsInt > availableStock) {
          return res.status(400).json({
            message: `Not enough stock. Available: ${availableStock}, Requested: ${gallonsInt}`,
          });
        }

        // Store creator_role so SELECT queries know which table to join
        const insertQuery = `
          INSERT INTO orders (customer_name, address, gallons, item_id, status, created_by, creator_role, assigned_to)
          VALUES (?, ?, ?, ?, 'Pending', ?, ?, ?)
        `;

        db.query(
          insertQuery,
          [
            customer_name,
            address,
            gallonsInt,
            itemIdInt,
            created_by,
            role,
            assignedToVal,
          ],
          (err2, result) => {
            if (err2)
              return res
                .status(500)
                .json({ message: "Server error", error: err2.message });

            const newStock = availableStock - gallonsInt;

            db.query(
              "UPDATE inventory SET stock_quantity = ? WHERE item_id = ?",
              [newStock, itemIdInt],
              (err3) => {
                if (err3)
                  return res.status(500).json({
                    message: "Inventory deduction failed",
                    error: err3.message,
                  });

                const logUpdatedBy =
                  role === "Administrator" ? created_by : null;

                const logQuery = `
                  INSERT INTO inventory_logs
                    (item_id, updated_by, change_type, quantity_before, quantity_after, quantity_changed)
                  VALUES (?, ?, 'Order Deduction', ?, ?, ?)
                `;

                db.query(
                  logQuery,
                  [
                    itemIdInt,
                    logUpdatedBy,
                    availableStock,
                    newStock,
                    gallonsInt,
                  ],
                  (err4) => {
                    if (err4)
                      return res.status(500).json({
                        message: "Inventory log failed",
                        error: err4.message,
                      });

                    res.status(201).json({
                      message: "Order created successfully",
                      order_id: result.insertId,
                      stock_before: availableStock,
                      stock_after: newStock,
                      deducted: gallonsInt,
                    });
                  },
                );
              },
            );
          },
        );
      },
    );
  },

  updateOrderStatus: (req, res) => {
    const { id } = req.params;
    const { status, assigned_to } = req.body;

    const validStatuses = [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    db.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [id],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        if (results.length === 0)
          return res.status(404).json({ message: "Order not found" });

        const order = results[0];

        if (order.status === "Delivered" || order.status === "Cancelled") {
          return res.status(400).json({
            message: `Order is already ${order.status} and cannot be updated`,
          });
        }

        // FIX: only update assigned_to if it was explicitly sent in the request
        // This prevents wiping out the assignment when only updating status
        const hasAssignment = assigned_to !== undefined;
        const assignedToVal = hasAssignment
          ? assigned_to
            ? parseInt(assigned_to)
            : null
          : undefined;

        const query = hasAssignment
          ? `UPDATE orders SET status = ?, assigned_to = ?, updated_at = NOW() WHERE order_id = ?`
          : `UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?`;

        const params = hasAssignment
          ? [status, assignedToVal, id]
          : [status, id];

        db.query(query, params, (err2, result) => {
          if (err2)
            return res
              .status(500)
              .json({ message: "Server error", error: err2.message });
          if (result.affectedRows === 0)
            return res.status(404).json({ message: "Order not found" });
          res.json({ message: "Order status updated successfully" });
        });
      },
    );
  },
};

module.exports = orderController;
