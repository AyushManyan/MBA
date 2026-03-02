import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Manual Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Manual Registration
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Ensure role is valid, default to 'student' if not provided or invalid
    let userRole = ["student", "organizer"].includes(role) ? role : "student";
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Set Role
router.post("/set-role", protect, async (req, res) => {
  const { role } = req.body;

  if (!["student", "organizer"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { role },
    { new: true }
  );

  res.json(user);
});

// Get Profile
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

export default router;