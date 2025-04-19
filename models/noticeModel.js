const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  link: String
}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);
