const mongoose = require('mongoose');

// Defining type & structure of Design
const DesignSchema = new mongoose.Schema({
	name: {
		type: String,
		unique:true,
		required: true
	},
	html: {
		type: String,
		required: true
	}
});

// Create & export model object in LoginSchema
const design = mongoose.model('design', DesignSchema);
module.exports = design;