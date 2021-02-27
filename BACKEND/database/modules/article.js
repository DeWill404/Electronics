const mongoose = require('mongoose');

// Defining type & structure of Article
const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	chat: {
		type: Array,
		required: true
	}
});

// Create & export model object in ArticleSchema
const article = mongoose.model('article', ArticleSchema);
module.exports = article;