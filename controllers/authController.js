const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (await User.findOne({ email })) {
      throw new Error("User already exists with this email!");
    }

    const user = await User.create({ name, email, password, confirmPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: 1,
      message: "User registered successfully!",
      userData: { name: user.name },
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: 0,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error("Email or password is incorrect!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: 1,
        message: "Login successful!",
        token,
        userData: { name: user.name },
      });
  } catch (err) {
    res.status(400).json({
      success: 0,
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    if (!token) {
      throw new Error("You are logged out! Please log in again.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid Token Please Login Again!");
    }
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({
      success: 0,
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .status(200)
    .json({ success: 1, message: "Logged out successfully!" });
};
