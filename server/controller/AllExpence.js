const Expense = require("../model/Expense");
const mongoose = require("mongoose");

const getTotalExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    const objectIdGroupId = new mongoose.Types.ObjectId(groupId);

    // console.log("recieved groupId in totalExpence:", groupId);
    const total = await Expense.aggregate([
      { $match: { groupId: objectIdGroupId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    res.json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (error) {
    console.log("Error occured in getTotal expence:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getTotalExpenses };
