const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// @desc    Get category Validator
exports.getSubCategoryValidator = [
  check("subCategoryId").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

// @desc    Create category Validator
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too Long category name"),
  check("category")
    .isMongoId()
    .withMessage("Invalid category id format")
    .notEmpty()
    .withMessage("Category is required"),
  validatorMiddleware,
];

// @desc    Update category Validator
exports.updateSubCategoryValidator = [
  check("subCategoryId").isMongoId().withMessage("Invalid category id format"),
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too Long category name"),
  validatorMiddleware,
];

// @desc    Delete category Validator
exports.deleteSubCategoryValidator = [
  check("subCategoryId").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
