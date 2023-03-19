const express = require("express");
const router = express.Router();

// Load models and auth middleware
const auth = require('../middleware/auth');
const { getDetails, register, login, edit, updateWallet, addFavourite, removeFavourite, deleteBuyer, getAll } = require("../controllers/buyer");

// Get all buyers
router.get("/", auth, getAll);

// Get a particular buyer
router.get("/details", auth, getDetails);

// Add a buyer to the database
router.post("/register", register);

// Verify buyer credentials
router.post("/login", login);

// Edit a buyer's information
router.patch("/edit", auth, edit);

// Update a buyer's wallet
router.patch("/update_wallet", auth, updateWallet);

// Add to a buyer's favourite list
router.patch("/add_favourite", auth, addFavourite);

// Remove from a buyer's favourite list
router.patch("/remove_favourite", auth, removeFavourite);

// Delete a buyer
router.delete("/delete", auth, deleteBuyer);

module.exports = router;
