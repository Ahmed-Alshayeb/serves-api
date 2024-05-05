const express = require("express");

const router = express.Router();

const authServes = require("../servers/authServes");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../servers/categoryServes");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");

router
  .route("/")
  .get(getCategories)
  .post(authServes.protect, createCategoryValidator, createCategory);

router
  .route("/:categoryId")
  .get(authServes.protect, getCategoryValidator, getCategory)
  .patch(authServes.protect, updateCategoryValidator, updateCategory)
  .delete(authServes.protect, deleteCategoryValidator, deleteCategory);

module.exports = router;
