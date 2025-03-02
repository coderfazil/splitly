const express = require("express");
const { addFriend, getFriends, updateFriend, deleteFriend } = require("../controllers/friendController");

const router = express.Router();

// Friend Routes
router.post("/add", addFriend);      // ✅ Add a new friend
router.get("/all", getFriends);      // ✅ Get all friends
router.put("/update/:id", updateFriend);  // ✅ Update friend
router.delete("/delete/:id", deleteFriend);  // ✅ Delete friend

module.exports = router;
