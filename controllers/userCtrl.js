const JWT = require('jsonwebtoken'),
	User = require('../models/User'),
	{ JWT_secret } = require('../config/keys');

//JWT fn()
const signToken = user => {
	const cert = JWT_secret;
	return JWT.sign(
		{
			iss: 'rookieBlue090',
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1)
		},
		cert
	);
};

module.exports = {
	signUp: async (req, res, next) => {
		//email, password
		const { email, password } = req.value.body;

		//check if such user exist
		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(403).json({ err: 'Email already in use' });
		}

		//Else - create new user
		const newUser = new User({
			email,
			password
		});

		//save to db
		await newUser.save();

		//assign and send JWToken to user
		res.status(200).json({ token: 'JWT ' + signToken(newUser) });
	},
	login: async (req, res, next) => {
		//generate, assign and send JWToken to user
		res.status(200).json({ token: 'JWT ' + signToken(req.user) });
	},
	secret: async (req, res, next) => {
		res.status(200).json({ secret: 'am here' });
	}
};
