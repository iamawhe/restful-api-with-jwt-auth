const passport = require('passport'),
	JwtStrategy = require('passport-jwt').Strategy,
	{ ExtractJwt } = require('passport-jwt'),
	LocalStrategy = require('passport-local'),
	GooglePlusTokenStrategy = require('passport-google-plus-token'),
	FacebookStrategy = require('passport-facebook'),
	FacebookTokenStrategy = require('passport-facebook-token'),
	{
		JWT_secret,
		GOOGLE_PLUS_CLIENT_ID,
		GOOGLE_PLUS_CLIENT_SECRET,
		FacebookClientID,
		FacebookClientSecret
	} = require('../config/keys'),
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
				const user = await User.findOne({ 'local.email': email });
				if (!user) {
					return done(null, false);
				}

				//verify password with model (isValidPwd) method
				const verifyPwd = await user.isValidPassword(password);

				if (!verifyPwd) {
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

/*  Google OAuth strategy*/
passport.use(
	'google',
	new GooglePlusTokenStrategy(
		{
			clientID: GOOGLE_PLUS_CLIENT_ID,
			clientSecret: GOOGLE_PLUS_CLIENT_SECRET
		},
		async (tokens, refreshToken, profile, done) => {
			try {
				//find or create user, call done() when completed
				const userExist = await User.findOne({ 'google.id': profile.id });

				//return existing user
				if (userExist) {
					return done(null, userExist);
				}

				//else create new user
				const newUser = new User({
					method: 'google',
					google: { id: profile.id, email: profile.emails[0].value }
				});

				//save and return user to client
				await newUser.save();
				done(null, newUser);
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);

/*  Facebook OAuth strategy*/
passport.use(
	'facebook',
	new FacebookTokenStrategy(
		{
			clientID: FacebookClientID,
			clientSecret: FacebookClientSecret
		},
		async (accessToken, refreshToken, profile, cb) => {
			try {
				//find user
				const userExist = await User.findOne({ 'facebook.id': profile.id });
				
				//exist
				if (userExist) {
					return cb(null, userExist);
				}

				//else
				const newUser = new User({
					method: 'facebook',
					facebook: {
						id: profile.id,
						email: profile.emails[0].value
					}
				});

				await newUser.save();
				cb(null, newUser);
			} catch (error) {
				cb(error, false, error.message);
			}
		}
	)
);
