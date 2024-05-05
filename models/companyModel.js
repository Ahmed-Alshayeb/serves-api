const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: [true, "Title is require"],
      minlingth: [3, "Too Short Company Title"],
      maxlingth: [50, "Too Long Company Title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    discrption: {
      type: String,
      require: [true, "Discription is require"],
      minlength: [15, "Too Short Discription"],
    },
    ratingAverage: {
      type: Number,
      minlength: [1, "Too Short Rating"],
      maxlength: [5, "Too Long Rating"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
