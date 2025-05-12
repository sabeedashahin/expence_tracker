const express = require("express");
const { createGroup, fetchGroup } = require("../controller/GroupController");
const verifyToken = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/creategroup", verifyToken, createGroup);
route.get("/fetchgroup", verifyToken, fetchGroup);
module.exports = route;
