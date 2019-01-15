const JWT = require('jsonwebtoken'),
	fs = require('fs'),
	User = require('../models/User');

//JWT fn()
const signToken = user => {
	const cert = fs.readFileSync('./config/private.key');
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
		res.status(200).json({ token: signToken(newUser) });
	},
	signIn: async (req, res, next) => {
		console.log(' signIn');
	},
	secret: async (req, res, next) => {
		console.log(' secret');
	}
};
