const express =require("express");
const mongoose = require("mongoose");
const  Expense =require("../models/Expense");
const Friend = require("../models/friendModel");
const Group = require("../models/Group");

const router = express.Router();

// ✅ Add a new expense
router.post("/add-expense", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.expId)) {
      return res.status(400).json({ success: false, message: "Invalid expId" });
    }
    
    console.log("Request Body:", req.body);
    
    const expense = new Expense(req.body);
    console.log("laggayai",expense);

   
    await expense.save();
    // ✅ Update balances for friends or group members
    if (req.body.expType === "friends") {
      // Update individual friend's balance
      await Friend.findOneAndUpdate(
        { _id: req.body.expId },
        { $inc: { balance: req.body.expCost } }, // Increase balance for the individual
        { new: true }
      );
    } else {const group = await Group.findById(req.body.expId);
      
    if (group) {
      const memberShare = req.body.expCost / group.members.length; // Assuming equal share
      await Promise.all(
        group.members.map(async (member) => {
           // Exclude the payer from balance update
           await Group.updateOne(
            { _id: req.body.expId, "members.userId": member.userId },
            { $inc: { "members.$.balance": memberShare, "members.$.mbalance": memberShare } }
          );
          
          
        })
      
      );
      console.log("check karaha hu",group);
    } else {
      return res.status(404).json({ success: false, message: "Group not found" });
    }
  }
  
  
    res.status(201).json({ success: true, message: "Expense added", expense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});




router.get("/:id", async (req, res) => {
  try {
    const expId = req.params.id;
    

    // ✅ Validate and convert expId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(expId)) {
     return res.status(400).json({ message: "Invalid Expense ID" });

    }
   
 
    

    // ✅ Query MongoDB using ObjectId
    const expense = await Expense.find({ expId: new mongoose.Types.ObjectId(expId) }); // Use findById to retrieve the document by its ID
    console.log("Requested Expense ID:",expense);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense); // Return the single expense object
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Fetch all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.status(200).json(expenses); // Send expenses as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
module.exports=router;
