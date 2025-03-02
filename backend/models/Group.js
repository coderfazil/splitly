const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl:{type:String},
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      balance: { type: Number, default: 0 }, // Balance tracking ke liye
      mbalance: { type: Number, default: 0 },
    },
  ],
  totalMembers: { type: Number, default: 1 }, // Initially ek member hoga
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
