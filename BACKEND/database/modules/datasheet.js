const mongoose = require('mongoose');

// Defining type & structure of Video
const DatasheetSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

// Create & export model object in LoginSchema
const datasheet = mongoose.model('datasheet', DatasheetSchema);
module.exports = datasheet;