// Include Express to communicate to & fro Database/Server
const express = require('express');
const app = express();

// Get Moongoose
const mongoose = require('./database/mongoose');

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
// Get Login model
const Login = require('./database/modules/login');

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
// Get Design model
const Design = require('./database/modules/design');

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
// Get Video model
const Video = require('./database/modules/video');

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


/************ DATASHEET APIS STARTS **************/
// Get Datasheet model
const Datasheet = require('./database/modules/datasheet');

// Request to upload Video link in DB
app.post('/datasheets', (req, res) => {
	(new Datasheet( req.body ))
		.save()
		.then(datasheet => res.send(datasheet))
		.catch(error => res.send(''));
});

// Request for all videos from DB
app.get('/datasheets', (req, res)=>{
	Datasheet.find({})
		.then(datasheets => res.send(datasheets))
		.catch(error => res.send(''));
});
/************ DATASHEET APIS ENDS ****************/


/************ PROJECT APIS STARTS **************/
// Get Project model
const Project = require('./database/modules/project');

// Request to add new project in DB
app.post('/projects', (req, res) => {
	(new Project( req.body ))
		.save()
		.then(project => res.send(project))
		.catch(error => res.send(''));
});

// Request for all porject from DB
app.get('/projects', (req, res)=>{
	Project.find({})
		.then(projects => res.send(projects))
		.catch(error => res.send(''));
});
/************ PROJECT APIS ENDS ****************/


// Start BACKEND server
app.listen(3000, ()=>console.log("Server created at 3000."));
