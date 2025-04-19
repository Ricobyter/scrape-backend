const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: String,
  link: String
}, { timestamps: true });

module.exports = mongoose.model("Achievement", achievementSchema);
