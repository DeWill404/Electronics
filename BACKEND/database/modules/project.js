const mongoose = require('mongoose');

// Defining type & structure of Project
const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

// Create & export model object in LoginSchema
const project = mongoose.model('project', ProjectSchema);
module.exports = project;