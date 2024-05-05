const express = require("express");

const {
  getCompanyValidator,
  createCompanyValidator,
  updateCompanyValidator,
  deleteCompanyValidator,
} = require("../utils/validator/companyValidator");

const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../servers/companyServes");

const router = express.Router();

router.route("/").get(getCompanies).post(createCompanyValidator, createCompany);

router
  .route("/:companyId")
  .get(getCompanyValidator, getCompany)
  .patch(updateCompanyValidator, updateCompany)
  .delete(deleteCompanyValidator, deleteCompany);

module.exports = router;
