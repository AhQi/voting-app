'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/users');
var configAuth = require('./auth');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	
	passport.use('login', new LocalStrategy({
    		usernameField : 'email',
    		passwordField : 'password',
    		passReqToCallback : true
		},
	  function (req, email, password, done) {
	  	//process.nextTick(function() {
		  	console.log('in pasport');
		  	console.log('email:'+email);
		    User.findOne({ 'profile.email': email }, function (err, user) {
		      if (err) {
		        return done(err)
		      }
		      if (!user) {
		      	console.log('not found');
		        return done(null, false, req.flash('info', 'User not found.'))
		      }
		      
		      var isValidPassword = function (user, password) {
		        return bcrypt.compareSync(password, user.profile.password)
		      }
		      
		      if (!isValidPassword(user, password)) {
		      	console.log('pw not vaild');
		        return done(null, false, req.flash('info', 'Invalid password'))
		      }
		      return done(null, user)
		    });
		//})
	  }
	));
	
	passport.use('signup', new LocalStrategy({
    		usernameField : 'email',
    		passwordField : 'password',
    		passReqToCallback : true
	}, function (req, email, password, done) {
	  var findOrCreateUser = function () {
	  	console.log('des email:'+email);
	    User.findOne({ 'profile.email': email }, function (err, user) {
	      if (err) {
	      	console.log('err');
	        return done(err);
	      }
	      if (user) {
	      	console.log('email:'+email);
	        return done(null, false, req.flash('info', 'User already exists'));
	      } else {
	        var newUser = new User();

	        newUser.profile.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	        newUser.profile.email = req.body.email;
			newUser.ownedPolls = [];
			
	        newUser.save(function (err) {
	          if (err) {
	            throw err;
	          }
	          console.log(newUser);
	          return done(null, newUser);
	        });
	      }
	    });
	  };
	  process.nextTick(findOrCreateUser)
	}));

	
};
