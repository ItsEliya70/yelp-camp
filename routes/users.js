const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middlewares/middlewares');
const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/users');

router.route('/register')
  .get(renderRegisterForm)
  .post(catchAsync(registerUser));
router.route('/login')
  .get(renderLoginForm)
  .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUser);
router.post('/logout', logoutUser);

module.exports = router;