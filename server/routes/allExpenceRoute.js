const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { getTotalExpenses } = require("../controller/AllExpence");
const route = express.Router();

route.get("/total/:groupId", verifyToken, getTotalExpenses);

module.exports = route;
