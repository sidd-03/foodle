const express = require("express");

const router = express.Router();

// Load auth middleware
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const { getAllOrders, getOrdersByVendor, getOrdersByBuyer, addOrder, rejectOrder, updateState } = require("../controllers/order");

// Get all the orders
router.get("/", auth, getAllOrders);

// Get all the orders for a specific vendor
router.get("/vendor", auth, getOrdersByVendor);

// Get all the orders for a specific buyer
router.get("/buyer", auth, getOrdersByBuyer);

// Add a order to the database
router.post("/add", auth, addOrder);

// Reject an order
router.patch("/reject", auth, rejectOrder);

// Update order status
router.patch("/update_state", auth, updateState);

module.exports = router;
