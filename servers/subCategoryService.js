const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const SubCategory = require("../models/subCategoryModel");

const AppErorr = require("../utils/AppErorr");

// desc    Get All Sub Categories
// route   GET /api/v1/subCategories
// access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find({}).populate({
    path: "category",
    select: "name-_id",
  });
  res.status(200).json({ Count: subCategories.length, Data: subCategories });
});

// desc    Get Specific Sub Category
// route   GET /api/v1/subCategories/:subCategoryId
// access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategories = await SubCategory.findById(
    req.params.subCategoryId
  ).populate({ path: "category", select: "name-_id" });
  if (!subCategories) {
    return next(new AppErorr("Sub Category not found", 404));
  }
  res.status(200).json({ status: "success", Data: subCategories });
});

// desc    Create Sub Category
// route   POST /api/v1/subCategories
// access  Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subCategories = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ status: "success", Data: subCategories });
});

// desc    Update Sub Category
// route   PUT /api/v1/subCategories
// access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const { name, category } = req.body;
  const subCategories = await SubCategory.findOneAndUpdate(
    { _id: subCategoryId },
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true }
  );
  if (!subCategories) {
    return next(new AppErorr("Sub Category not found", 404));
  }
  res.status(200).json({ status: "success", Data: subCategories });
});

// desc    Delete Sub Category
// route   DELETE /api/v1/subCategories
// access  Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const subCategories = await SubCategory.findByIdAndDelete(subCategoryId);
  if (!subCategories) {
    return next(new AppErorr("Sub Category not found", 404));
  }
  res.status(204).json({ status: "success", message: "sccessfully delete" });
});
