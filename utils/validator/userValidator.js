const bcrypt = require("bcryptjs");
const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/userModel");

exports.createUserValidator = [
  check("fullname")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 3 })
    .withMessage("Too short Name"),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  check("role").optional(),

  validatorMiddleware,
];

exports.getUserValidator = [
  check("userId").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("userId").isMongoId().withMessage("Invalid User id format"),
  body("fullname").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  check("role").optional(),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("userId").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("userid").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("You must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (val, { req }) => {
      // 1) Verify current password
      const user = await User.findById(req.params.userid);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }

      // 2) Verify password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  body("fullname")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  validatorMiddleware,
];
