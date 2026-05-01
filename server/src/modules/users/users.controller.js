const userProfileDetails = require('./users.service')
const asyncHandler = require('../../utils/asyncHandler');

const fetchUserDetails = asyncHandler(async(req, res) => {
  const {userId} = req.params;

  const userData = await userProfileDetails.fetchUserDetails(userId);

  res.status(201).json({
    status: 'success',
    data: {
      userData
    }
  })
})

module.exports = {
  fetchUserDetails
}