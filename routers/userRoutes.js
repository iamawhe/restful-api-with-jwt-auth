const express = require('express'),
	passport = require('passport'),
	router = require('express-promise-router')(),
	userCtrl = require('../controllers/userCtrl'),
	validate = require('../helpers');

require('../auth/passportStrategy');

/*  */
router.route('/signup').post(validate.userSignUp, userCtrl.signUp);

router.route('/signin').post(userCtrl.signIn);

router
	.route('/secret')
	.get(passport.authenticate('jwt', { session: false }), userCtrl.secret);

/*  */
module.exports = router;
