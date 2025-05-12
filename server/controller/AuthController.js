const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("email:", email, password);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {};
  if (!username) errors.usernameError = "username is required!";
  if (!email) errors.emailError = "email is required!";
  else if (!emailRegex.test(email)) {
    errors.emailError = "Invalid email format";
  }
  if (!password) errors.passError = "password is required!";
  else if (password.length !== 8) {
    errors.passError = "Password must be exactly 8 characters long!";
  }

  // if there are any errorrs,send them all
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const isExit = await User.findOne({ email: email });
    if (isExit) {
      return res.status(409).json({ error: "user already existed" });
    }
    // if (password.length !== 8) {
    //   return res.status(400).json({
    //     passwordChecking: "Password must be exactly 8 characters long",
    //   });
    // }

    const saltround = 10;
    const hashPassword = await bcrypt.hash(password, saltround);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    console.log(newUser);
    return res
      .status(200)
      .json({ message: "Registration successfully completed", newUser });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      emptyEmailError: "email is required!",
      emptyPassError: "password is required!",
    });
  }

  try {
    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log(token);
    return res.status(200).json({ message: "login successfull", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
