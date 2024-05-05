const express = require("express");

const router = express.Router();

const {
  getOrderValidator,
  createOrderValidator,
  updateOrderValidator,
  deleteOrderValidator,
} = require("../utils/validator/orderValidator");

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../servers/orderServes");

router.route("/").get(getOrders).post(createOrderValidator, createOrder);

router
  .route("/:orderId")
  .get(getOrderValidator, getOrder)
  .patch(updateOrderValidator, updateOrder)
  .delete(deleteOrderValidator, deleteOrder);

module.exports = router;
