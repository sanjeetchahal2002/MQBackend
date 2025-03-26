const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);
router.route("/logout").get(authController.logout);
router
  .route("/update-filter")
  .post(authController.protect, userController.updateFilter);
router
  .route("/reset-filter")
  .delete(authController.protect, userController.resetFilter);

module.exports = router;
