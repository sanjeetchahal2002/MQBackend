const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user cannot be created without a name"],
  },
  email: {
    type: String,
    required: [true, "A user cannot be created without an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user cannot be created without a password"],
    // minlength: [8, "Password should be a minimum of 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: [
      true,
      "A user cannot be created without confirming the password",
    ],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords do not match",
    },
    select: false,
  },
  filters: {
    type: Object,
    default: {},
  },
});
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.confimpassword = undefined;
  next();
});
UserSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", UserSchema);
