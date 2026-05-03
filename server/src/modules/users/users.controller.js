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

module.exports = {
  fetchUserDetails,
}