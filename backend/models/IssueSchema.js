const mongoose = require("mongoose");
const IssueSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Issue", IssueSchema);
