const passport = require('passport'),
	JwtStrategy = require('passport-jwt').Strategy,
	{ ExtractJwt } = require('passport-jwt'),
	{ JWT_secret } = require('../config/keys'),
	User = require('../models/User');

/* set passport to use JWT strategy*/
const cert1 = JWT_secret;
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
			secretOrKey: cert1
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
