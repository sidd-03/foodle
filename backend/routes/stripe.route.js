const express = require("express");
const {stripePayment} = require('../controllers/stripe');

const router = express.Router();

router.post("/pay", stripePayment);

module.exports = router;
