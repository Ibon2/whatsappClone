const express = require("express");
const validateForm = require("../controlers/validateForm");
const router = express.Router();
const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controlers/authController");
const { rateLimiter } = require("../controlers/rateLimiter");

router.route("/login").get(handleLogin).post(validateForm,rateLimiter(60,10), attemptLogin);
router.post("/register", validateForm, rateLimiter(30,4), attemptRegister);

module.exports = router;
