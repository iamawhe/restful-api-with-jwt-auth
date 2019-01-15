const passport = require('passport'),
	router = require('express-promise-router')(),
	userCtrl = require('../controllers/userCtrl'),
	validate = require('../helpers');

require('../auth/passportStrategy');

/*  */
router.route('/signup').post(validate.userSignUp, userCtrl.signUp);

router.route('/login').post(
	validate.userLogin,
	passport.authenticate('local', {
		session: false
	}),
	userCtrl.login
);

router
	.route('/secret')
	.get(passport.authenticate('jwt', { session: false }), userCtrl.secret);

/*  */
module.exports = router;
