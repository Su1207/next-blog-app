import User from "../models/user.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = generateToken(user); // generate token here

    res.status(200).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await User.find().select("name email _id");
    if (!authors || authors.length === 0) {
      return res.status(404).json({ message: "Authors not found" });
    }
    res.status(200).json({
      message: "Authors retrieved successfully",
      authors,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
