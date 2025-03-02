const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import the user routes
const groupRoutes = require("./routes/groupRoutes");
const friendRoutes = require("./routes/friendRoutes");
const expenseRoutes =require("./routes/expenseRoutes.js");




dotenv.config();
const app = express();

app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Enable JSON body parsing

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/users", userRoutes); 
app.use("/api/groups", groupRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
