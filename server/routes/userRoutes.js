const express = require("express");
const router = express.Router();

// User controller
const {
  register,
  login,
} = require("../controllers/userController");

// Register route
router.post("/register", register);

// Login user
router.post("/login", login);

module.exports = router;