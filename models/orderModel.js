const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    period: {
      type: String,
      enum: ["morning", "night"],
      required: [true, "period required"],
    },
    numberOfHours: {
      type: Number,
      required: [true, "number of Hours required"],
      min: [1, "number of Hours can't be less than 1"],
    },
    nationality: {
      type: String,
      required: [true, "nationality required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "city required"],
    },
    numberOfVisits: {
      type: Number,
      min: [1, "number of visits can't be less than 1"],
      required: [true, "number of visits required"],
    },
    date: {
      type: String,
      default: Date.now(),
      min: [new Date(), "Date can't be less than today"],

    },
    time: {
      type: String,
      trim: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
