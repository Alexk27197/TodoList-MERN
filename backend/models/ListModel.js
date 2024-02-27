const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      color: { type: String, default: "white" },
      task: { type: String, required: true },
      completed: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
