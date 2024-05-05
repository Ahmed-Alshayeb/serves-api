const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// @desc    Get category Validator
exports.getCategoryValidator = [
  check("categoryId").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

// @desc    Create category Validator
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 50 })
    .withMessage("Too Long category name"),
  validatorMiddleware,
];

// @desc    Update category Validator
exports.updateCategoryValidator = [
  check("categoryId").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

// @desc    Delete category Validator
exports.deleteCategoryValidator = [
  check("categoryId").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
