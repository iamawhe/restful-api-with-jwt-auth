const passport = require('passport'),
	router = require('express-promise-router')(),
	userCtrl = require('../controllers/userCtrl'),
	validate = require('../helpers');

require('../auth/passportStrategy');

/*  */
router.route('/signup').post(validate.userSignUp, userCtrl.signUp);

router.route('/login').post(
	validate.userLogIn,
	passport.authenticate('local', {
		session: false
	}),
	userCtrl.logIn
);

router
	.route('/oauth/google')
	.post(
		passport.authenticate('google', { session: false }),
		userCtrl.googleOAuth
	);

router
	.route('/oauth/facebook')
	.post(
		passport.authenticate('facebook', { session: false }),
		userCtrl.facebookOAuth
	);

router
	.route('/secret')
	.get(passport.authenticate('jwt', { session: false }), userCtrl.secret);

/*  */
module.exports = router;
