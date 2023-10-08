const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  leadName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  list: {
    type: Array,
  },
  category: {
    type: String,
    default: "Software",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
