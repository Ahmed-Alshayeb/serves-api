const slugify = require("slugify");
const multer = require("multer");

const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const AppError = require("../utils/AppErorr");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "uploads/category");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).limit(limit).skip(skip);
  res.status(200).json({ Count: categories.length, Data: categories });
});

// @desc    Get spacific category
// @route   GET /api/v1/categories
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({ status: "success", Data: category });
});

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(
  upload.single("image"),
  async (req, res, next) => {
    const { name } = req.body;
    const fileName = req.file.filename;
    const besaPath = `${req.protocol}://${req.get("host")}/uploads/category/`;

    const category = await Category.create({
      name: req.body.name,
      slug: slugify(name),
      image: `${besaPath}${fileName}`,
    });
    res.status(201).json({ Data: category });
  }
);

// @desc    Update category
// @route   PATCH /api/v1/categories
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      name: req.body.name,
      image: req.body.image,
    },
    { new: true }
  );
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({ status: "success", Data: category });
});

// @desc    Delete category
// @route   DELETE /api/v1/categories
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.categoryId);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({ status: "success" });
});
