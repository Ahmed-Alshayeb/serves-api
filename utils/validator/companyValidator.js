const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// @desc    Get Company Validator
exports.getCompanyValidator = [
  check("companyId").isMongoId().withMessage("Invalid Company id format"),
  validatorMiddleware,
];

// @desc    Create Company Validator
exports.createCompanyValidator = [
  check("title")
    .notEmpty()
    .withMessage("Company Title is required")
    .isLength({ min: 2 })
    .withMessage("Too short Company Title")
    .isLength({ max: 50 })
    .withMessage("Too Long Company Title"),
  check("discrption")
    .notEmpty()
    .withMessage("Company Discrption is required")
    .isLength({ min: 15 })
    .withMessage("Too short Company Title"),
  check("ratingAverage")
    .isLength({ max: 5, min: 1 })
    .withMessage("Comapny average rating must be between 1 and 5"),

  validatorMiddleware,
];

// @desc    Update Company Validator
exports.updateCompanyValidator = [
  check("companyId").isMongoId().withMessage("Invalid Company id format"),
  check("title")
    .notEmpty()
    .withMessage("Company title is required")
    .isLength({ min: 2 })
    .withMessage("Too short Company title")
    .isLength({ max: 32 })
    .withMessage("Too Long Company title"),
  validatorMiddleware,
];

// @desc    Delete Company Validator
exports.deleteCompanyValidator = [
  check("companyId").isMongoId().withMessage("Invalid Company id format"),
  validatorMiddleware,
];
