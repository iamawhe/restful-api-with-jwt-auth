const JWT = require('jsonwebtoken'),
	{ JWT_secret } = require('../config/keys');

//JWT fn()
module.exports = {
	signToken: user => {
		const cert = JWT_secret;
		return JWT.sign(
			{
				iss: 'pathFinder101',
				sub: user.id,
				iat: new Date().getTime(),
				exp: new Date().setDate(new Date().getDate() + 1)
			},
			cert
		);
	}
};
