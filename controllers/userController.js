const User = require("../models/userModel");

exports.updateFilter = async (req, res) => {
  try {
    const { ageGroup, gender, date } = req.body;
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { filters: { gender, ageGroup, date } }
    );
    res.status(200).json({ message: "Filters are updated", success: 1 });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, success: 0 });
  }
};

exports.resetFilter = async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.user._id }, { filters: {} });
    res.status(200).json({ message: "Filters are deleted", success: 1 });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, success: 0 });
  }
};
