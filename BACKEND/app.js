// Include Express to communicate to & fro Database/Server
const express = require('express');
const app = express();

// Get Moongoose
const mongoose = require('./database/mongoose');

// Get All models
const Login = require('./database/modules/login');
const Design = require('./database/modules/design');
const Video = require('./database/modules/video');

// Save data in DB as JSON
app.use(express.json());

// Get Header from cours library
app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
} );

/************** Login APIS STARTS ***************/
// Request for saving Login data to DB
app.post('/logins', (req, res) => {
	(new Login( req.body ))
		.save()
		.then(login => res.send(login))
		.catch(error => res.send(''));
});

// Request for getting a login password from DB
app.get('/logins/:email', (req, res)=>{
	Login.find({ 'email':req.params.email })
		.then(login => res.send(login))
		.catch(error => res.send(''));
});
/************** Login APIS ENDS *****************/


/************ DESIGN APIS STARTS **************/
// Request to Save new design Data in DB
app.post('/designs', (req, res) => {
	(new Design( req.body ))
		.save()
		.then(design => res.send(design))
		.catch(error => res.send(''));
});

// Request for all designs from DB
app.get('/designs', (req, res)=>{
	Design.find({})
		.then(designs => res.send(designs))
		.catch(error => res.send(''));
});
/************ DESIGN APIS ENDS ****************/


/************ VIDEO APIS STARTS **************/
// Request to upload Video link in DB
app.post('/videos', (req, res) => {
	(new Video( req.body ))
		.save()
		.then(video => res.send(video))
		.catch(error => res.send(''));
});

// Request for all videos from DB
app.get('/videos', (req, res)=>{
	Video.find({})
		.then(videos => res.send(videos))
		.catch(error => res.send(''));
});
/************ VIDEO APIS ENDS ****************/


// Start BACKEND server
app.listen(3000, ()=>console.log("Server created at 3000."));
