let express = require('express');
const UserController = require("../controllers/UserController");

let router = express.Router();

/**
 * Endpoint: /api/v1/users
 * GET      fetch all users
 * POST     Create new user
 */
router.route('/')
    .get(UserController.GetAll)
    .post(UserController.NewUser);

/**
 * Endpoint: /api/v1/users/{userId}
 * GET      Fetch user details
 * PUT      Edit a user
 * DELETE   Delete a user
 */
router.route('/:userId')
    .get(UserController.GetUser)
    .put(UserController.Edit)
    .delete(UserController.Delete);

module.exports = router;
