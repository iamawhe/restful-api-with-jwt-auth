const { validateBody, schema } = require('./routerValidator');

module.exports = {
	userSignUp: validateBody(schema.authSchema),
	userLogIn: validateBody(schema.authSchema)
};
