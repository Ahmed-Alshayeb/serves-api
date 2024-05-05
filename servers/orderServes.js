const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const AppError = require("../utils/AppErorr");

// @desc    Get all Order
// @route   GET /api/v1/Orders
// @access  Public
exports.getOrders = asyncHandler(async (req, res) => {
  const Orders = await Order.find({});
  res.status(200).json({ Count: Orders.length, Data: Orders });
});

// @desc    Get spacific Order
// @route   GET /api/v1/orders/orderId
// @access  Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    return next(new AppError("Order not found", 404));
  }
  res.status(200).json({ status: "success", Data: order });
});

// @desc    Create Order
// @route   POST /api/v1/Orders
// @access  Public
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    period,
    numberOfHours,
    nationality,
    city,
    numberOfVisits,
    date,
    time,
  } = req.body;
  const order = await Order.create({
    period,
    numberOfHours,
    nationality,
    city,
    numberOfVisits,
    date,
    time,
  });
  res.status(201).json({ Data: order });
});

// @desc    Update Order
// @route   PATCH /api/v1/Orders/orderId
// @access  public
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const {
    period,
    numberOfHours,
    nationality,
    city,
    numberOfVisits,
    date,
    time,
  } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    {
      period,
      numberOfHours,
      nationality,
      city,
      numberOfVisits,
      date,
      time,
    },
    { new: true }
  );
  if (!order) {
    return next(new AppError("Order not found", 404));
  }
  res.status(200).json({ status: "success", Data: order });
});

// @desc    Delete Order
// @route   DELETE /api/v1/orders/orderId
// @access  Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findByIdAndDelete(orderId);
  if (!order) {
    return next(new AppError("Order not found", 404));
  }
  res.status(200).json({ status: "success" });
});
