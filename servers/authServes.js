const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const ApiError = require("../utils/AppErorr");

// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await User.create({
    fullname: req.body.fullname,
    phone: req.body.phone,
    password: req.body.password,
  });

  // 2- Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.status(201).json({ data: user, token });
});

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ phone: req.body.phone });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect Pone Number or password", 401));
  }
  // 3) generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});

// @desc   make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new ApiError(
        'You are not login, Please login to get access this route',
        401
      )
    );
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        'The user that belong to this token does no longer exist',
        401
      )
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
});
