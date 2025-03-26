const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  feature: String,
  timeSpent: Number,
  date: String,
  ageGroup: String,
  gender: String,
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
