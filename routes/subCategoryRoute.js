const express = require("express");

const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validator/SubCategoryValidator");

const {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../servers/subCategoryService");

const router = express.Router();

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

router
  .route("/:subCategoryId")
  .get(getSubCategoryValidator, getSubCategory)
  .patch(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
