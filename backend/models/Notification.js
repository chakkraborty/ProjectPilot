const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  fromName: {
    type: String,
    required: true,
  },
  fromEmail: {
    type: String,
    required: true,
  },
  toId: {
    type: "String",
    required: true,
  },
  projectName: {
    type: "String",
    required: true,
  },
});
module.exports = mongoose.model("Notification", NotificationSchema);
