const express = require('express');
const router = express.Router();

const { addUser, login, logout, getCurrentUser, updateUser } = require('../../controllers/users');
const { auth } = require('../../middlewares/auth');
const {
  emailAndPasswordValidation,
  updateSubscriptionValidation,
  userIdParamValidation,
} = require('../../middlewares/validation/users');

router.post('/', emailAndPasswordValidation, addUser);
router.patch('/:userId', [userIdParamValidation, auth, updateSubscriptionValidation], updateUser);
router.post('/login', emailAndPasswordValidation, login);
router.get('/logout', auth, logout);
router.get('/current', auth, getCurrentUser);

module.exports = router;
