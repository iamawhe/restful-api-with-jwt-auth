const { validateBody, schema } = require('./routerValidator');

module.exports = {
	userSignUp: validateBody(schema.authSchema),
	userLogin: validateBody(schema.authSchema)
};
