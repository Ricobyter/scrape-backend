const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  link: String
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
