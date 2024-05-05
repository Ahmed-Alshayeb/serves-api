const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");
// const sharp = require("sharp");

const User = require("../models/userModel");
const AppError = require("../utils/AppErorr");

// const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");

// // Upload single image
// exports.uploadUserImage = uploadSingleImage("profileImg");

// // Image processing
// exports.resizeImage = asyncHandler(async (req, res, next) => {
//   const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

//   if (req.file) {
//     await sharp(req.file.buffer)
//       .resize(600, 600)
//       .toFormat("jpeg")
//       .jpeg({ quality: 95 })
//       .toFile(`images/category/${filename}`);

//     // Save image into our db
//     req.body.image = filename;
//   }

//   next();
// });

// @desc    Get all User
// @route   GET /api/v1/Users
// @access  private
exports.getUsers = asyncHandler(async (req, res) => {
  const Users = await User.find({});
  res.status(200).json({ Count: Users.length, Data: Users });
});

// @desc    Get spacific User
// @route   GET /api/v1/Users
// @access  private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", Data: user });
});

// @desc    Create User
// @route   POST /api/v1/Users
// @access  Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const { fullname, phone, password } = req.body;
  const user = await User.create({
    fullname,
    phone,
    password,
  });
  res.status(201).json({ Data: user });
});

// @desc    Update User
// @route   PATCH /api/v1/Users
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { fullname, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { fullname, phone },
    { new: true }
  );
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", Data: user });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.userid,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    { new: true }
  );
  if (!document) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", Data: document });
});

// @desc    Delete User
// @route   DELETE /api/v1/Users
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ status: "success" });
});
