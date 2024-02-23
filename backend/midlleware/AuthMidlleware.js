const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  if (!req.cookies && !req.headers["authorization"]) {
    return res
      .status(403)
      .json({ message: "No authentication token provided", success: false });
  }

  const token = req.cookies
    ? req.cookies.token
    : null || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "A token is required for authentication",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", success: false });
  }
};

module.exports = { authenticateToken };
