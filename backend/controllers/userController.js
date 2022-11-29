const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //hashes password
const asyncHandler = require("express-async-handler"); //To not use the try-catch, we can use this library
const Users = require("../models/userModel"); // imports goalModel.js which represents the Collection from mongoDB

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; //from api request (postman)

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user already exists with email
  const userExists = await Users.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create the user

  const user = await Users.create({
    // function that saves to users collection
    name,
    email,
    password: hashedPassword, //assigned the password to the hashedPassword earlier
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //generates token for authentication
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //requests email and password from api (postman)

  //Check for user account
  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //if the program finds the email from users and matches the decoded hashed password, then it will respond the following:
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //generates token for authentication
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc get user data
// @route GET /api/users/me
// @access Private
const getUserInfo = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
}; // exports the functions created
