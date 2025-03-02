const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imgUrl: {
    type: String,
    default: "default.jpg",
  },
  balance: {
    type: Number,
    default: 0,
  },
  mbalance: {
    type: Number,
    default: 0,
  },
});

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
