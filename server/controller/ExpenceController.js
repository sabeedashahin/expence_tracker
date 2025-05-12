const Expense = require("../model/Expense");
const Group = require("../model/Group");
const mongoose = require("mongoose");
// const User = require("../model/User");

const fetchGroupMembers = async (req, res) => {
  const { groupId } = req.params;
  try {
    if (!groupId) {
      return res.status(404).json({ message: "Group not found" });
    }

    const groupmembers = await Group.findOne({ _id: groupId })
      .populate("members", "username email")
      .populate("createdBy", "username email");
    return res
      .status(200)
      .json({ message: "fetch group members successfully", groupmembers });
  } catch (error) {
    console.log("error in occured in fetch group members:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addExpence = async (req, res) => {
  const { groupId } = req.params;

  const { expenceName, amount, upiId, selectedMembers } = req.body;

  if (!expenceName || !amount || !selectedMembers) {
    return res.status(404).json({
      expenceError: "expence name is required!",
      amountError: "amount is required",
      membersError: "members are required",
    });
  }
  try {
    const splitAmount = (amount / selectedMembers.length).toFixed(2);

    // const membersWithSplit = selectedMembers.map((memberId) => ({
    //   member: memberId, // Store ObjectId properly
    //   splitAmount: splitAmount,
    // }));

    // const membersWithSplit = selectedMembers.map((member) => ({
    //   name: member.name,
    //   email: member.email,
    //   splitAmount, // Store split amount for each member
    // }));

    console.log("spliting amount:", splitAmount);
    const validMemberIds = selectedMembers.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    const expense = await Expense.create({
      groupId,
      expenceName,
      amount,
      UPIid: upiId,
      members: validMemberIds.map((id) => new mongoose.Types.ObjectId(id)),
      splitAmount,
    });

    console.log("expence details:", expense);
    return res
      .status(200)
      .json({ message: "add expence create successfully ", expense });
  } catch (error) {
    console.log("error occured in adding expense:", error);
    return res
      .status(500)
      .json({ message: "failed to adding expence, try again" });
  }
};

const fetchexpenses = async (req, res) => {
  const { groupId } = req.params;

  try {
    const expence = await Expense.find({groupId})
      .populate( 'members','username email', // Specify the fields to retrieve from the User model
      );

    // const expence = await Expense.aggregate([
    //   { $unwind: '$members' },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'members',
    //       foreignField: '_id',
    //       as: 'memberDetails',
    //     },
    //   },
    //   { $unwind: '$memberDetails' },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       members: { $push: '$memberDetails' },
    //       // Include other fields as necessary
    //     },
    //   },
    // ]);
    

    console.log("fetch expence", expence);

    return res
      .status(200)
      .json({ message: "expence fetch successfully", expence });
  } catch (error) {
    console.log("error accured in fetch expence", error);
    return res
      .status(400)
      .json({ message: "server error in fetch expence,try again" });
  }
};

// const fetchexpenses = async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     const expence = await Expense.find({ groupId }).populate(
//       "members",
//       "name email"
//     );
//     return res.status(200).json({
//       message: "expence fetch successfully",

//       expence,
//     });
//   } catch (error) {
//     console.log("error occured in fecthexpence:", error);
//     return res
//       .status(500)
//       .json({ message: "failed in fetching expence details ,try again" });
//   }
// };

module.exports = { addExpence, fetchGroupMembers, fetchexpenses };
