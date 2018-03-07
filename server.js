'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');
	
	
var bodyParser = require('body-parser')
var flash = require('connect-flash');
var app = express();




require('./app/config/passport')(passport);



mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: false
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app, passport);

var port = (process.env.PORT || 5000);
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});