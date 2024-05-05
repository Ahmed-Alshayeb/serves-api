const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// @desc    Get Order Validator
exports.getOrderValidator = [
  check("orderId").isMongoId().withMessage("Invalid Order id format"),
  validatorMiddleware,
];

// @desc    Create Order Validator
exports.createOrderValidator = [
  check("period").notEmpty().withMessage("Order period is required"),
  check("numberOfHours")
    .notEmpty()
    .withMessage("Order number Of Hours is required")
    .isInt()
    .withMessage("Order number Of Hours should be intager"),
  check("nationality")
    .isLength({ min: 2 })
    .withMessage("Too short Order nationality")
    .isLength({ max: 32 })
    .withMessage("Too Long Order nationality"),
  check("city")
    .notEmpty()
    .withMessage("Order city is required")
    .isLength({ min: 2 })
    .withMessage("Too short Order city")
    .isLength({ max: 32 })
    .withMessage("Too Long Order city"),
  check("numberOfVisits")
    .notEmpty()
    .withMessage("Order number Of Visits is required")
    .isInt()
    .withMessage("Order number Of Visits should be intager"),
  check("date")
    .notEmpty()
    .withMessage("Order date is required"),
  check("time")
    .notEmpty()
    .withMessage("Order time is required"),
  validatorMiddleware,
];

// @desc    Update Order Validator
exports.updateOrderValidator = [
  check("orderId").isMongoId().withMessage("Invalid Order id format"),
  check("numberOfHours")
    .isInt()
    .withMessage("Order number Of Hours should be intager"),
  check("nationality")
    .isLength({ min: 2 })
    .withMessage("Too short Order nationality")
    .isLength({ max: 32 })
    .withMessage("Too Long Order nationality"),
  check("city")
    .isLength({ min: 2 })
    .withMessage("Too short Order city")
    .isLength({ max: 32 })
    .withMessage("Too Long Order city"),
  check("numberOfVisits")
    .isInt()
    .withMessage("Order number Of Visits should be intager"),
  validatorMiddleware,
];

// @desc    Delete Order Validator
exports.deleteOrderValidator = [
  check("orderId").isMongoId().withMessage("Invalid Order id format"),
  validatorMiddleware,
];
