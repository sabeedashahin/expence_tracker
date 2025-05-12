const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // membersName:[{type:String,required:true}],
  // membersEmail:[{type:String,required:true}],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

const group = mongoose.model("Group", groupSchema);
module.exports = group;
