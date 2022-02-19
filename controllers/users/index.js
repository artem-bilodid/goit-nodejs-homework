const addUser = require('./addUser');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateUser = require('./updateUser');
const updateUserAvatar = require('./updateUserAvatar');
const verifyUser = require('./verifyUser');
const generateUserVerificationToken = require('./generateUserVerificationToken');

module.exports = {
  addUser,
  login,
  logout,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
  verifyUser,
  generateUserVerificationToken,
};
