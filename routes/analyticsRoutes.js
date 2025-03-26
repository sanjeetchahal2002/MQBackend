const express = require("express");
const { getAnalytics } = require("../controllers/analyticsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, getAnalytics);

module.exports = router;
