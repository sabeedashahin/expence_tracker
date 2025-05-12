const user = require("../model/User");

const fetchUsers = async (req, res) => {
  try {
    console.log("creater id:", req.userId);
    const users = await user.find({ _id: { $ne: req.userId } });
    return res.status(200).json({ message: "user fetch successfully", users });
  } catch (error) {
    console.log("error in fetch user:", error);
  }
};
module.exports = fetchUsers;
