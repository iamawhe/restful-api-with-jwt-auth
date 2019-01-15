const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcryptjs');

const userSchema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now }
});

//use pre hook for hash the password
userSchema.pre('save', async function(next) {
	try {
		//gen salt, and hash the pwd with salt
		const salt = await bcrypt.genSalt(10);
		const pwdHash = await bcrypt.hash(this.password, salt);
		this.password = pwdHash;

		next();
	} catch (error) {
		next(error);
	}
});

//use post hook to compare the password
userSchema.methods.isValidPassword = async function(userPassword) {
	try {
		return await bcrypt.compare(userPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = mongoose.model('user', userSchema);
