const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userSchema);
