
const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// Protected route: requires a valid JWT
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You accessed a protected route",
    user: req.user,
  });
});


module.exports = router;