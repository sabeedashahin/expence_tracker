const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { inviteFriends } = require("../controller/sendEmailController");
const router = express.Router();

router.post("/send-mail", verifyToken, inviteFriends);

module.exports = router;
