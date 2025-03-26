const Analytics = require("../models/analyticsModel");
const User = require("../models/userModel");

exports.getAnalytics = async (req, res) => {
  try {
    const { age, gender, date } = req.query;
    const { filters: userFilter } = req.user;
    let filters = {};
    if (age) filters.age = age;
    if (gender) filters.gender = gender;
    if (date) filters.date = date;
    const analyticsData = await Analytics.find(filters);
    res.status(200).json({
      success: 1,
      data: {
        analyticsData,
        filters: userFilter,
        length: analyticsData.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching analytics data", err });
  }
};
