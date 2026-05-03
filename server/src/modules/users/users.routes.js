const express = require('express')
const usersController = require('./users.controller')
const verifyJWT = require('../../middlewares/verifyJWT');

const router = express.Router();

router.use(verifyJWT);

router.route('/:username')
  .get(usersController.fetchUserDetails)

module.exports = router;