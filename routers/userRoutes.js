const express = require('express'),
	router = require('express-promise-router')(),
	userCtrl = require('../controllers/userCtrl'),
	validate = require('../helpers');

/*  */
router.route('/signup').post(validate.userSignUp, userCtrl.signUp);

router.route('/signin').post(userCtrl.signIn);

router.route('/secret').get(userCtrl.secret);

/*  */
module.exports = router;
