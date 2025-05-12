const express = require("express");
const fetchUsers = require("../controller/fetchUserController");
const verifyToken = require("../middleware/authMiddleware");
const route = express.Router();

route.get("/fetchusers", verifyToken, fetchUsers);

module.exports = route;
