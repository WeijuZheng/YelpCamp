const express = require('express');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { notLoggedIn } = require('../middleware');
const User = require('../models/user');
const userControl = require('../controllers/userControl');
const router = express.Router();

router.route('/register')
    .get(userControl.renderRegisterForm)
    .post(catchAsync(userControl.register));

router.route('/login')
    .get(notLoggedIn, userControl.renderLoginForm)
    .post(notLoggedIn, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userControl.login);

router.get('/logout', userControl.logout);

module.exports = router;