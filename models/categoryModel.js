const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: [2, "Name can not be less than 2 characters"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    image: {String},
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

