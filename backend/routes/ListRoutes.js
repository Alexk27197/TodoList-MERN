const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  filterTasks,
} = require("../controllers/ListController");
const { authenticateToken } = require("../midlleware/AuthMidlleware");
const router = express.Router();

router.post("/create-task", authenticateToken, createTask);
router.put("/update-task/:taskId", authenticateToken, updateTask);
router.delete("/delete-task/:taskId", authenticateToken, deleteTask);
// router.get("/get-task", logout);
router.get("/filter-task", filterTasks);
router.get("/get-tasks/:userId", authenticateToken, getTasks);

module.exports = router;
