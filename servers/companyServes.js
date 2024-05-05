const slugify = require("slugify");

const asyncHandler = require("express-async-handler");
const Company = require("../models/companyModel");

const AppError = require("../utils/AppErorr");

// @desc    Get all Company
// @route   GET /api/v1/companies
// @access  Public
exports.getCompanies = asyncHandler(async (req, res) => {
  const Companies = await Company.find({});
  res.status(200).json({ Count: Companies.length, Data: Companies });
});

// @desc    Get spacific Company
// @route   GET /api/v1/companyies/companyId
// @access  Public
exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.companyId);
  if (!company) {
    return next(new AppError("Company not found", 404));
  }
  res.status(200).json({ status: "success", Data: company });
});

// @desc    Create Company
// @route   POST /api/v1/Companies
// @access  Private
exports.createCompany = asyncHandler(async (req, res, next) => {
  const { title, description, ratingAverage, ratingQuantity } = req.body;
  const company = await Company.create({
    title,
    slug: slugify(title),
    description,
    ratingAverage,
    ratingQuantity,
  });
  res.status(201).json({ Data: company });
});

// @desc    Update Company
// @route   PATCH /api/v1/Companies/CompanyId
// @access  Private
exports.updateCompany = asyncHandler(async (req, res, next) => {
  const { title, description, ratingAverage, ratingQuantity } = req.body;
  const company = await Company.findByIdAndUpdate(
    req.params.companyId,
    {
      title,
      slug: slugify(title),
      description,
      ratingAverage,
      ratingQuantity,
    },
    { new: true }
  );
  if (!company) {
    return next(new AppError("Company not found", 404));
  }
  res.status(200).json({ status: "success", Data: company });
});

// @desc    Delete Company
// @route   DELETE /api/v1/Companies
// @access  Private
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await Company.findByIdAndDelete(companyId);
  if (!company) {
    return next(new AppError("Company not found", 404));
  }
  res.status(200).json({ status: "success" });
});
