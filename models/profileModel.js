const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      require: [true, "first name is require"],
    },
    phone: {
      type: String,
      require: [true, "Phone is require"],
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "too short password"],
      require: [true, "password is require"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);