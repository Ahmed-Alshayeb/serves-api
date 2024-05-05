const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: [2, "Name can not be less than 2 characters"],
      maxlenght: [32, "Name can not be more than 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("SubCategory", SubCategorySchema)