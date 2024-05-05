const asyncHandler = require("express-async-handler");

const Profile = require("../models/profileModel");
const AppError = require("../utils/AppErorr");

// @desc    Get all Profile
// @route   GET /api/v1/profiles
// @access  private
exports.getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  res.status(200).json({ Count: profiles.length, Data: profiles });
});

// @desc    Get spacific Profile
// @route   GET /api/v1/profiles
// @access  private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);
  if (!profile) {
    return next(new AppError("Profile not found", 404));
  }
  res.status(200).json({ status: "success", Data: profile });
});

// @desc    Create Profile
// @route   POST /api/v1/Profiles
// @access  Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const { fullname, phone, password } = req.body;
  const profile = await Profile.create({
    fullname,
    phone,
    password,
  });
  res.status(201).json({ Data: profile });
});

// @desc    Update Profile
// @route   PATCH /api/v1/Profiles
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { fullname, phone } = req.body;
  const profile = await Profile.findByIdAndUpdate(
    req.params.profileId,
    { fullname, phone },
    { new: true }
  );
  if (!profile) {
    return next(new AppError("Profile not found", 404));
  }
  res.status(200).json({ status: "success", Data: profile });
});

// @desc    Delete Profile
// @route   DELETE /api/v1/Profiles
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const { profileId } = req.params;
  const profile = await Profile.findByIdAndDelete(profileId);
  if (!profile) {
    return next(new AppError("Profile not found", 404));
  }
  res.status(200).json({ status: "success" });
});

// exports.changeProfilePassword = asyncHandler(async (req, res, next) => {
//   const document = await Profile.findByIdAndUpdate(
//     req.params.Profileid,
//     {
//       password: await bcrypt.hash(req.body.password, 12),
//     },
//     { new: true }
//   );
//   if (!document) {
//     return next(new AppError("Profile not found", 404));
//   }
//   res.status(200).json({ status: "success", Data: document });
// });
