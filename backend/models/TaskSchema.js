const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  projectId: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  assignedToId: {
    type: String,
    default: "",
  },
  assignedToName: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    default: "Medium",
  },
  tags: {
    type: Array,
  },
  createdById: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "todo",
  },
  number: {
    type: Number,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
