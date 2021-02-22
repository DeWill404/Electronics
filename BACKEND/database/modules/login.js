const mongoose = require('mongoose');

// Defining type & structure of Login
const LoginSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		unique:true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// Create & export model object in LoginSchema
const login = mongoose.model('login', LoginSchema);
module.exports = login;