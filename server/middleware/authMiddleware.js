const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers.authorization || req.headers.Authorization || req.body.token;
    console.log("received token :", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    // console.log(decoded);
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    return res.status(403).json({ message: "Invalid or expirred token" });
  }
};

module.exports = verifyToken;
