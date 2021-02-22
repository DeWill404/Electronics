// Include Express to communicate to & fro Database/Server
const express = require('express');
const app = express();

// Get Moongoose
const mongoose = require('./database/mongoose')

// Get login model
const Login = require('./database/modules/login')

// Save data in DB as JSON
app.use(express.json());

// Get Header from cours library
app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
} );

/**
 * READALL
 * app.get('/lists', (req, res)=>{
 * 		List.find({})
 * 			.then(lists => res.send(lists))
 * 			.catch(error => console.log(error));
 * READONE
 * app.get('/lists/:listId', (req, res)=>{
 * 		List.find({ _id:req.params.listId })
 * 			.then(list => res.send(list))
 * 			.catch(error => console.log(error));
 * SAVE
 * app.post('/lists', (req, res)=>{
 * 		(new List({'title':req.body.title}))
 * 			.save()
 * 			.then(list => res.send(list))
 * 			.catch(error => console.log(error));
 * });
 * UPDATE
 * app.patch('/lists:listId', (req, res)=>{
 * 		List.findOneAndUpdate({_id:req.params.listId}, {$set:req.body})
 * 			.then(list => res.send(list))
 * 			.catch(error => console.log(error));
 * });
 * DELETE
 * app.patch('/lists:listId', (req, res)=>{
 * 		List.findByIdAndDelete(req.params.listId)
 * 			.then(list => res.send(list))
 * 			.catch(error => console.log(error));
 * });
 */

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

// Start BACKEND server
app.listen(3000, ()=>console.log("Server created at 3000."));
