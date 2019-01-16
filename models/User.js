const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcryptjs');

const userSchema = new Schema({
	method: {
		type: String,
		enum: ['local', 'google', 'facebook'],
		required: true
	},
	local: {
		email: { type: String, lowercase: true },
		password: { type: String },
		dateCreated: { type: Date }
	},
	google: {
		id: { type: String },
		email: { type: String, lowercase: true },
		dateCreated: { type: Date }
	},
	facebook: {
		id: { type: String },
		email: { type: String, lowercase: true },
		dateCreated: { type: Date }
	}
});

//use pre hook for hash the password
userSchema.pre('save', async function(next) {
	try {
		if (this.method !== 'local') {
			next();
		}

		//else, generate salt, and hash the pwd with salt
		const salt = await bcrypt.genSalt(10);
		const pwdHash = await bcrypt.hash(this.local.password, salt);
		this.local.password = pwdHash;

		next();
	} catch (error) {
		next(error);
	}
});

//use post hook to compare the password
userSchema.methods.isValidPassword = async function(userPassword) {
	try {
		return await bcrypt.compare(userPassword, this.local.password);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = mongoose.model('user', userSchema);
