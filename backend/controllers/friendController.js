const Friend = require("../models/friendModel");

// ✅ Add a new friend
const addFriend = async (req, res) => {
  try {
    const { name, email, imgUrl, balance, mbalance } = req.body;

    const friendExists = await Friend.findOne({ email });
    if (friendExists) {
      return res.status(400).json({ message: "Friend already exists!" });
    }

    const newFriend = new Friend({ name, email, imgUrl, balance, mbalance });
    await newFriend.save();
    
    res.status(201).json(newFriend);
  } catch (error) {
    res.status(500).json({ message: "Error adding friend", error });
  }
};

// ✅ Get all friends
const getFriends = async (req, res) => {
  try {
    console.log("Fetching friends..."); // ✅ Debugging
    const friends = await Friend.find();
    console.log("Fetched friends:", friends); // ✅ Debugging
    res.status(200).json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error); // ✅ Debugging
    res.status(500).json({ message: "Error fetching friends", error });
  }
};


// ✅ Update a friend's details
const updateFriend = async (req, res) => {
  try {
    const friendId = req.params.id;
    const updatedData = req.body;

    const updatedFriend = await Friend.findByIdAndUpdate(friendId, updatedData, { new: true });

    if (!updatedFriend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    res.status(200).json(updatedFriend);
  } catch (error) {
    res.status(500).json({ message: "Error updating friend", error });
  }
};

// ✅ Delete a friend
const deleteFriend = async (req, res) => {
  try {
    const friendId = req.params.id;

    const deletedFriend = await Friend.findByIdAndDelete(friendId);

    if (!deletedFriend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    res.status(200).json({ message: "Friend deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting friend", error });
  }
};

module.exports = { addFriend, getFriends, updateFriend, deleteFriend };
