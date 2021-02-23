const mongoose = require('mongoose');

// Defining type & structure of Video
const VideoSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	}
});

// Create & export model object in LoginSchema
const video = mongoose.model('video', VideoSchema);
module.exports = video;