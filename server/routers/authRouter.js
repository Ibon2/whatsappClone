const express = require("express");
const validateForm = require("../controlers/validateForm");
const router = express.Router();
const { handleLogin, attemptLogin, attemptRegister } = require("../controlers/authController");

router.route("/login").get(handleLogin).post(validateForm, attemptLogin);
router.post("/register", validateForm, attemptRegister);

module.exports = router;
