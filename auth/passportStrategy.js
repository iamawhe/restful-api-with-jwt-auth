const passport = require('passport'),
	JwtStrategy = require('passport-jwt').Strategy,
	{ ExtractJwt } = require('passport-jwt'),
	LocalStrategy = require('passport-local'),
	{ JWT_secret } = require('../config/keys'),
	User = require('../models/User');

/*  JWT strategy*/
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
			secretOrKey: JWT_secret
		},
		async (payload, done) => {
			try {
				//find user with userId as stated in token
				const user = await User.findById(payload.sub);

				//user doesn't exist
				if (!user) {
					return done(null, false);
				}
				//else, return user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

/*  Local strategy*/
passport.use(
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			try {
				//check for user by email
				const user = await User.findOne({ email });
				if (!user) {
					return done(null, false);
				}

				//verify password with model (isValidPwd) method
				const verifyPwd = await user.isValidPassword(password);

				if (!verifyPwd) return done(null, false);

				//else, return user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
