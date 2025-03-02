const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 🟢 Signup User



const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔹 Ensure Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// 🔵 Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔹 Login attempt:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔹 Stored hashed password:", user.password);
    console.log("🔹 Entered password:", password);

    // Compare the entered password with the stored hashed password
    const isMatch = await user.matchPassword(password);
    console.log("🔹 Password Match:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { registerUser, loginUser };
