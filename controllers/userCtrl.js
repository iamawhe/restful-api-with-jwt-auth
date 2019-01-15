module.exports = {
	signUp: async (req, res, next) => {
		//email, password
		console.log(' signup with validate value:', req.value.body);
	},
	signIn: async (req, res, next) => {
		console.log(' signIn');
	},
	secret: async (req, res, next) => {
		console.log(' secret');
	}
};
