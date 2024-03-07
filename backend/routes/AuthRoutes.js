const express = require("express");
const {
  register,
  login,
  logout,
  profileUpdate,
  getUserProfile,
} = require("../controllers/AuthController");
const { authenticateToken } = require("../midlleware/AuthMidlleware");
const passport = require("passport");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-user/:userId", authenticateToken, getUserProfile);
router.put("/update-profile/:userId", authenticateToken, profileUpdate);
router.get("/login-success", (req, res) => {
  if (req.user) {
    const { username, _id, googleUser, email } = req.user;
    res.status(200).json({
      msg: "login with google success",
      userDetails: { username, _id, googleUser, email },
      success: true,
    });
  }
});

// google routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),

  (req, res) => {
    const { token } = req.user;

    res.cookie("googleToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3600000 * 48,
    });

    res.redirect(`https://todolistbyalex.netlify.app`);
  }
);

module.exports = router;
