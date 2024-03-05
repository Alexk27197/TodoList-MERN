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
router.get("/protected-route", authenticateToken);
// google routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),

  (req, res) => {
    const { token, user } = req.user;
    const { _id, username, googleUser } = user;
    const userData = JSON.stringify({ token, _id, username, googleUser });

    res.cookie("userData", userData, {
      httpOnly: false,
      maxAge: 3600000 * 48,
    });

    res.redirect(`http://localhost:3000`);
    // הוספת הטוקן כפרמטר ל-URL
  }
);

module.exports = router;
