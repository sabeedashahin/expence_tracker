const Group = require("../model/Group");
const User = require("../model/User");

const createGroup = async (req, res) => {
  try {
    const { name, selectedMembers } = req.body;
    console.log("landed :", req.body);

    if (!name) {
      return res.status(400).json({ message: "please enter a group name!" });
    }

    if (!selectedMembers) {
      return res
        .status(400)
        .json({ message: "please Select atleast one member!" });
    }

    // const emails = members.map((m) => m.email.toLowerCase().trim());
    // const uniqueEmails = new Set(emails);

    // if (emails.length !== uniqueEmails.size) {
    //   return res
    //     .status(400)
    //     .json({ message: "Duplicate member emails found!" });
    // }

    // const membersWithIds = await Promise.all(
    //   members.map(async (member) => {
    //     // Find User by email if they exist, and get their ObjectId
    //     const user = await User.findOne({ email: member.email });

    //     if (user) {
    //       return {
    //         name: member.name,
    //         email: member.email,
    //         userId: user._id, // Store userId if you want to later reference the User model
    //       };
    //     } else {
    //       return {
    //         name: member.name,
    //         email: member.email,
    //         userId: null, // If the user doesn't exist, leave userId as null
    //       };
    //     }
    //   })
    // );

    // const membersExist = await user.find({ _id: { $in: selectedMembers } });
    // if (membersExist.length !== selectedMembers.length) {
    //   return res
    //     .status(400)
    //     .json({ message: "One or more members do not exist" });
    // }

    const createdGroup = await Group.create({
      name,
      members: selectedMembers,
      createdBy: req.userId,
    });

    console.log("group admin id:", req.userId);
    // console.log("membes ids", members);

    return res
      .status(201)
      .json({ message: "group create successfullyy", createdGroup });
    // console.log("selcted members:", selectedMembers);
    // console.log("groupname:", groupname);
  } catch (error) {
    console.log("failed to group  create group:", error);

    return res
      .status(500)
      .json({ message: "Failed to create group, try again!" });
  }
};

const fetchGroup = async (req, res) => {
  console.log("userId for fetchGroup:", req.userId);
  try {
    const group = await Group.find({
      $or: [{ createdBy: req.userId }, { "members.userId": req.userId }],
    });
    return res.status(200).json({ message: "group fetch succefully", group });
  } catch (error) {
    console.log("error occured fetch group:", error);
  }
};

module.exports = { createGroup, fetchGroup };
