const express = require("express");

const {
  getProfileValidator,
  createProfileValidator,
  updateProfileValidator,
  deleteProfileValidator,
} = require("../utils/validator/profileValidator");

const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../servers/profileServes");

const router = express.Router();


router.route("/").get(getProfiles).post(createProfileValidator, createProfile);

router
  .route("/:profileId")
  .get(getProfileValidator, getProfile)
  .patch(updateProfileValidator, updateProfile)
  .delete(deleteProfileValidator, deleteProfile);

module.exports = router;

