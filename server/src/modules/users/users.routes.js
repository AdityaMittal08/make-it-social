const express = require('express')
const usersController = require('./users.controller')
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/all/explore')
  .get(usersController.fetchAllUsers)

router.route('/:username')
  .get(usersController.fetchUserDetails)

router.route('/')
  .get(usersController.fetchUserById)

module.exports = router;

module.exports = router;