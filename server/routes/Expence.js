const express = require("express");
const {
  addExpence,
  fetchGroupMembers,
  fetchexpenses,
} = require("../controller/ExpenceController");
const verifyToken = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/addexpense/:groupId", verifyToken, addExpence);
route.get("/fetchgroupmembers/:groupId", verifyToken, fetchGroupMembers);
route.get("/fetchexpence/:groupId", verifyToken, fetchexpenses);
module.exports = route;
