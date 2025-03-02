const express = require("express");
const router = express.Router();
const Group = require("../models/Group");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const Friend = require("../models/friendModel"); // ✅ Friend model import kiya
console.log("Logged-in user:", User); // ✅ Debugging ke liye

// ✅ **Group Create Route**
router.post("/create", protect, async (req, res) => {
  try {
    const { name, members, imageUrl } = req.body;
    const userId = req.user.id; // ✅ Logged-in user

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Members list ko filter kar ke ensure karo ki logged-in user do baar na aaye
    let filteredMembers = members.filter(m => m.email !== user.email);

    // ✅ Group creator ko sirf ek baar add karo
    const groupMembers = [
      { userId: user._id, name: user.name, email: user.email, balance: 0, mbalance: 0 },
      ...filteredMembers.map((m) => ({
        name: m.name,
        email: m.email,
        balance: 0,
        mbalance: 0,
      })),
    ];

    const newGroup = new Group({
      name,
      members: groupMembers,
      imageUrl,
      totalMembers: groupMembers.length,
    });

    await newGroup.save();
     // ✅ Har ek member ko friends list mein add karo agar pehle nahi hai (ID se check)
     for (let member of groupMembers) {
      const friendExists = await Friend.findById(member.userId); // ✅ ID se check
      if (!friendExists) {
        const newFriend = new Friend({
          _id: member.userId, // ✅ Same ID se save karna
          name: member.name,
          email: member.email,
          imgUrl: "default.jpg",
          balance: 0,
          mbalance: 0,
        });
        await newFriend.save();
      }
    }
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ **Get all groups**
router.get("/", protect, async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/mygroups", protect, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Logged-in user ID

    // ✅ Sirf wahi groups laane hain jisme user included hai
    const groups = await Group.find({ "members.userId": userId }).lean(); // lean() se plain JSON milega

    // ✅ Convert `_id` to string
    const formattedGroups = groups.map(group => ({
      ...group,
      _id: group._id.toString(), // ✅ Convert group _id to string
      members: group.members.map(member => ({
        ...member,
        _id: member._id?.toString(), // ✅ Convert member _id to string (agar exist kare)
        userId: member.userId?.toString() // ✅ Convert userId to string (agar exist kare)
      }))
    }));

    res.json(formattedGroups);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});



module.exports = router;
