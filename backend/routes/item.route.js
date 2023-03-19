const express = require("express");
// const fs = require("fs");
// const path = require("path");

// Load auth middleware
const auth = require("../middleware/auth");

const router = express.Router();

// Set up multer
const multer = require("multer");
const { getAllItems, getItemsByVendor, addItem, editItem, deleteItem, updateRating } = require("../controllers/item");
const upload = multer({ dest: "./public/images/" }).single("image");

// Get all items
router.get("/", auth, getAllItems);

// Get all the items for a specific vendor
router.get("/vendor", auth, getItemsByVendor);

// Add an item to the database
router.post("/add", auth, upload, addItem);

router.patch("/edit", auth, upload, editItem);

// Remove an item from the database
router.delete("/delete", auth, deleteItem);

// Updating the rating of the item
router.patch("/update_rating", auth, updateRating);

module.exports = router;
