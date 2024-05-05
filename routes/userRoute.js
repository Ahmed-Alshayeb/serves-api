const express = require("express");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validator/userValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../servers/userServes");

const router = express.Router();

router.patch(
  "/changePassword/:userid",
  changeUserPasswordValidator,
  changeUserPassword
);
router.route("/").get(getUsers).post(createUserValidator, createUser);

router
  .route("/:userId")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;

