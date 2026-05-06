const userProfileDetails = require('./users.service')
const asyncHandler = require('../../utils/asyncHandler');

const fetchUserDetails = asyncHandler(async(req, res) => {
  const { username } = req.params;

  const userData = await userProfileDetails.fetchUserDetails(username);

  res.status(200).json({
    status: 'success',
    data: {
      userData
    }
  })
})

const fetchUserById = asyncHandler(async(req, res) => {
  const userId = req.user.id;

  const userData = await userProfileDetails.fetchUserById(userId);

  res.status(200).json({
    status: 'success',
    data: {
      userData,
    }
  })
})

const fetchAllUsers = asyncHandler(async(req, res) => {
  const users = await userProfileDetails.fetchAllUsers();

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  })
})

module.exports = {
  fetchUserDetails,
  fetchUserById,
  fetchAllUsers,
}