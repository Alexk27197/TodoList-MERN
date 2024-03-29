const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3600000 * 48,
    });

    res.status(201).json({
      msg: "User registered successfully",
      success: true,
      userDetails: {
        username,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Something went wrong with registration", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      return res
        .status(400)
        .json({ msg: "The email does not exist", success: false });
    }

    const comparePass = await bcrypt.compare(password, findUser.password);
    if (!comparePass) {
      return res
        .status(400)
        .json({ msg: "The email or password is not correct", success: false });
    }

    const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3600000 * 48,
    });

    res.status(200).json({
      msg: "Login Successfully",
      success: true,
      userDetails: {
        username: findUser.username,
        email: findUser.email,
        userId: findUser._id,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Something went wrong with login", success: false });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("googleToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    msg: "Logged out successfully",
    success: true,
  });
};

const profileUpdate = async (req, res) => {
  const { userId } = req.params;
  const { email, username } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    res.json({
      msg: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res
      .status(500)
      .json({ msg: "Error updating profile", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    res.json({
      msg: "User details fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res
      .status(500)
      .json({ msg: "Error fetching user details", error: error.message });
  }
};

module.exports = { register, login, logout, profileUpdate, getUserProfile };
