const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Group ID",
  },
  expenceName: { type: String, required: true },
  amount: { type: Number, required: true },
  UPIid: { type: String },
  // members: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // }],

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  splitAmount: { type: Number },
});

const expense = mongoose.model("Expense", expenceSchema);
module.exports = expense;
