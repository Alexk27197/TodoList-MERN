const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(400).json({ msg: "User already exists", success: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username,
      password: hashPassword,
      email,
    });
    user.save();

    res.status(201).json({
      msg: "User already exists",
      success: true,
      userDetails: { username, password: hashPassword, email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Somthing went wrong with register", success: false });
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
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ msg: "Login Successfully", success: true, token: token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Something went wrong with login", success: false });
  }
};

module.exports = { register, login };
