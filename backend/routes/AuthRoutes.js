const express = require("express");
const { register, login } = require("../controllers/AuthController");
const { authenticateToken } = require("../midlleware/AuthMidlleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ msg: "protected route" });
});

module.exports = router;