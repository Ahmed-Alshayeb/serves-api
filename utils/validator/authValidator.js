const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const userModel = require("../../models/userModel");

exports.signupValidator = [
  check("fullname")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short Name"),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers")
    .custom((val) =>
      userModel.findOne({ phone: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("phone number already in user"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validatorMiddleware,
];

