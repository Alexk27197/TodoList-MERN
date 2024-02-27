const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/ListController");
const { authenticateToken } = require("../midlleware/AuthMidlleware");
const router = express.Router();

router.post("/create-task", authenticateToken, createTask);
router.put("/update-task/:taskId", authenticateToken, updateTask);
router.delete("/delete-task/:taskId", authenticateToken, deleteTask);
// router.get("/get-task", logout);
router.get("/get-tasks", authenticateToken, getTasks);

module.exports = router;
