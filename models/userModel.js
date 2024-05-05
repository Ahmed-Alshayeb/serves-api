const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: { String },
  },
  { timestamps: true }
);

// hashing user password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
