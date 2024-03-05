const ListModel = require("../models/ListModel");
const mongoose = require("mongoose");
const createTask = async (req, res) => {
  try {
    const { task, completed, userId, color } = req.body;

    if (!task || completed === undefined || !userId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const existingList = await ListModel.findOne({ user: userId });

    if (existingList) {
      existingList.items.push({ task, completed, color });
      await existingList.save();
      res.status(201).json({ msg: "Task created successfully", success: true });
    } else {
      const newList = new ListModel({
        user: userId,
        items: [{ task, completed, color }],
      });
      await newList.save();
      res.status(201).json({ msg: "Task created successfully", success: true });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating task", error: error.message });
  }
};

const getTask = async (req, res) => {};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { task, completed, color } = req.body;

  try {
    const list = await ListModel.findOne({ "items._id": taskId });
    if (!list) {
      return res.status(404).send({ msg: "Task not found", success: false });
    }

    const itemIndex = list.items.findIndex(
      (item) => item._id.toString() === taskId
    );
    if (itemIndex !== -1) {
      if (task !== undefined) list.items[itemIndex].task = task;

      if (completed !== undefined) list.items[itemIndex].completed = completed;

      if (color !== undefined) list.items[itemIndex].color = color;

      await list.save();
      res.status(200).json({ msg: "Task updated successfully", success: true });
    } else {
      res.status(404).send({ msg: "Task not found in list", success: false });
    }
  } catch (error) {
    res.status(500).send({
      msg: "Error updating task",
      error: error.message,
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const list = await ListModel.findOne({ "items._id": taskId });
    if (!list) {
      return res.status(404).json({ msg: "Task not found", success: false });
    }

    const itemIndex = list.items.findIndex(
      (item) => item._id.toString() === taskId
    );
    if (itemIndex > -1) {
      list.items.splice(itemIndex, 1);
      await list.save();
      res.status(200).json({ msg: "Task deleted successfully", success: true });
    } else {
      res.status(404).json({ msg: "Task not found", success: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Something wrong with deleting task",
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const taskLists = await ListModel.find({ user: userId });
    if (!taskLists.length) {
      return res.status(404).json({ msg: "Tasks not found", success: false });
    }
    res.status(200).json({
      msg: "Getting task lists successfully",
      success: true,
      taskLists,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error in getting tasks", error: error.message });
  }
};

const filterTasks = async (req, res) => {
  const { userId, task, startDate, endDate } = req.query;

  try {
    let pipeline = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$items",
      },
    ];

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);
      pipeline.push({
        $match: {
          "items.createdAt": {
            $gte: start,
            $lte: end,
          },
        },
      });
    }

    if (task) {
      pipeline.push({
        $match: {
          "items.task": { $regex: new RegExp(task, "i") },
        },
      });
    }

    pipeline.push({
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        items: { $push: "$items" },
        createdAt: { $first: "$createdAt" },
      },
    });

    const results = await ListModel.aggregate(pipeline);

    if (!results.length) {
      return res
        .status(404)
        .json({ msg: "No tasks found matching criteria", success: false });
    }

    res.status(200).json({
      msg: "Filtered tasks fetched successfully",
      success: true,
      taskLists: results,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error in getting tasks", error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, filterTasks };
