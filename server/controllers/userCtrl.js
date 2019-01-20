const User = require('../models/User'),
	{ signToken } = require('../auth/JWT_Token');

module.exports = {
	signUp: async (req, res, next) => {
		//email, password
		const { email, password } = req.value.body;

		//check if such user exist
		const userExist = await User.findOne({ 'local.email': email });
		if (userExist) {
			return res.status(403).json({ err: 'Email already in use' });
		}

		//Else - create new user
		const newUser = new User({
			method: 'local',
			local: { email: email, password: password }
		});

		//save to db
		await newUser.save();

		//sign, assign and send JWToken to user
		res.status(200).json({ token: 'JWT ' + signToken(newUser) });
	},
	logIn: async (req, res, next) => {
		//sign, assign and send JWToken to user

		res.status(200).json({ token: 'JWT ' + signToken(req.user) });
	},
	googleOAuth: async (req, res, next) => {
		//sign, assign and send JWToken to user
		res.status(200).json({ token: 'JWT ' + signToken(req.user) });
	},
	facebookOAuth: async (req, res, next) => {
		//sign, assign and send JWToken to user
		res.status(200).json({ token: 'JWT ' + signToken(req.user) });
	},
	hiddenResource: async (req, res, next) => {
		res.status(200).json({ secret: 'This is a hidden resource' });
	}
};
