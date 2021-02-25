const mongoose = require('mongoose');

// Defining type & structure of Feedback
const FeedbackSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	msg: {
		type: String,
		required: true
	}
});

// Create & export model object in LoginSchema
const feedback = mongoose.model('feedback', FeedbackSchema);
module.exports = feedback;