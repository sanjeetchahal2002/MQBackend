const csv = require("csvtojson");
const path = require("path");
const Analytics = require("../models/analyticsModel");
exports.loadData = async () => {
  try {
    const jsonData = await csv().fromFile(
      path.join(__dirname, "../data/data.csv")
    );
    const analyticsData = [];
    jsonData.forEach((row) => {
      ["A", "B", "C", "D", "E", "F"].forEach((feature) => {
        analyticsData.push({
          feature: feature,
          timeSpent: Number(row[feature]),
          date: row.Day,
          ageGroup: row.Age,
          gender: row.Gender,
        });
      });
    });
    await Analytics.insertMany(analyticsData);
  } catch (err) {
    console.error("Error loading CSV data:", err);
  }
};
