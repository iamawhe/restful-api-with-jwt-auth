const passport = require('passport'),
	router = require('express-promise-router')(),
	userCtrl = require('../controllers/userCtrl'),
	validate = require('../helpers');

//passport with JWToken
require('../auth/passportStrategy');

/*  */
router.route('/auth/signup').post(validate.userSignUp, userCtrl.signUp);

router.route('/auth/login').post(
	validate.userLogIn,
	passport.authenticate('local', {
		session: false
	}),
	userCtrl.logIn
);

router
	.route('/auth/oauth/google')
	.post(
		passport.authenticate('google', { session: false }),
		userCtrl.googleOAuth
	);

router
	.route('/auth/oauth/facebook')
	.post(
		passport.authenticate('facebook', { session: false }),
		userCtrl.facebookOAuth
	);

router
	.route('/hiddenResource')
	.get(
		passport.authenticate('jwt', { session: false }),
		userCtrl.hiddenResource
	);

/*  */
module.exports = router;
