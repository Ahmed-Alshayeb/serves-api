const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
// const bcrypt = require("bcryptjs");
// const slugify = require("slugify");
// const Profile = require("../../models/ProfileModel");

exports.createProfileValidator = [
  check("fullname")
    .notEmpty()
    .withMessage("Profile Name required")
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

  validatorMiddleware,
];

exports.getProfileValidator = [
  check("profileId").isMongoId().withMessage("Invalid Profile id format"),
  validatorMiddleware,
];

exports.updateProfileValidator = [
  check("profileId").isMongoId().withMessage("Invalid Profile id format"),

  body("fullname").optional(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

  validatorMiddleware,
];

exports.deleteProfileValidator = [
  check("profileId").isMongoId().withMessage("Invalid Profile id format"),
  validatorMiddleware,
];

// exports.changeProfilePasswordValidator = [
//   check("Profileid").isMongoId().withMessage("Invalid Profile id format"),
//   body("currentPassword")
//     .notEmpty()
//     .withMessage("You must enter your current password"),
//   body("passwordConfirm")
//     .notEmpty()
//     .withMessage("You must enter the password confirm"),
//   body("password")
//     .notEmpty()
//     .withMessage("You must enter new password")
//     .custom(async (val, { req }) => {
//       // 1) Verify current password
//       const Profile = await Profile.findById(req.params.Profileid);
//       if (!Profile) {
//         throw new Error("There is no Profile for this id");
//       }
//       const isCorrectPassword = await bcrypt.compare(
//         req.body.currentPassword,
//         Profile.password
//       );
//       if (!isCorrectPassword) {
//         throw new Error("Incorrect current password");
//       }

//       // 2) Verify password confirm
//       if (val !== req.body.passwordConfirm) {
//         throw new Error("Password Confirmation incorrect");
//       }
//       return true;
//     }),
//   validatorMiddleware,
// ];

// exports.updateLoggedProfileValidator = [
//   body("fullname")
//     .optional()
//     .custom((val, { req }) => {
//       req.body.slug = slugify(val);
//       return true;
//     }),
//   check("phone")
//     .optional()
//     .isMobilePhone(["ar-EG", "ar-SA"])
//     .withMessage("Invalid phone number only accepted Egy and SA Phone numbers"),

//   validatorMiddleware,
// ];
