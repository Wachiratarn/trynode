const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

// get all user
router.get("/", userController.getAllUser);

// create new user
router.post("/", userController.createUser);

// get user info from username
router.get("/:username", userController.getFromUsername);

// delete user
router.delete("/:id", userController.deleteUserFromID);

// update user by ID
router.patch("/:id", userController.updateUser);

module.exports = router;