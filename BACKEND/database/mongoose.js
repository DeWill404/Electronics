require('dotenv').config();		// Add dotenv, to get secret from environment

// Include Mongoose to work with MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// MongoDB Altas Cluster link
const url = "mongodb+srv://"+process.env.USER_ID+":"+process.env.USER_PASS+"@cluster0.e3hua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// Call Mongo Database
mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false })
	.then(() => console.log('Database connected.'))
	.catch((error) => console.error(error));

// Export Database
module.exports = mongoose; 