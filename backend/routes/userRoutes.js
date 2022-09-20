const express = require("express");
const router = express.Router();
const {
  registerUser, //create
  loginUser, //provides a token (create) for the session
  getUserInfo, //gets the logged in user's info.
} = require("../controllers/userController"); //get exports from userController.js
const { protect } = require("../middleware/authMiddleware"); //protects user info by using unique token

// Sample Requests
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getUserInfo); //applies protection from protect function

module.exports = router;
