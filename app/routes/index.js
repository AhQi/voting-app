'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		console.log('isLogged');
		if (req.isAuthenticated()) {
			return next();
		} else {
			console.log('not authed');
			res.redirect('/home');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();

		
	app.route('/logout')
		.get(function (req, res) {
			console.log('log out');
			req.logout();
			res.sendStatus(200);
		});
		
	app.route('/login').post(function (req, res, next) {
	  passport.authenticate('login', function (err, user, info) {
	    if (err) {
	      // handle youself
	      return res.send({error:'unknown error'});
	    }
	    if (!user) {
	      // handle youself
	      return res.send({error :'not registered user or invalid password'});
	    }
	    req.login(user, function (err) {
	      if (err) {
	        return next(err)
	      }
	      req.flash('info', 'Sign in successfully')
	      return res.send({user: req.user.profile.email});
	    })
	  })(req, res, next)
	});

	
	app.route('/signup').post(function (req, res, next) {
	  passport.authenticate('signup', function (err, user, info) {
	    if (err) {
	      // handle youself
	      return res.send({error:'unknown error'});
	    }
	    if (!user) {
	      // handle youself
	      
	      return res.send({error :'username already existed'});
	    }
	    req.login(user, function (err) {
	      if (err) {
	        return next(err)
	      }
	      req.flash('info', 'Sign in successfully')
	      return res.send({user: req.user.profile.email});
	    })
	  })(req, res, next)
	});
	
	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/GET/user')
		.get(isLoggedIn, function (req, res) {
			
			res.json(req.user);
		});

	app.route('/GET/polls')
		.get( pollHandler.getAllPolls);
		
	app.route('/GET/polls/:id')
		.get( pollHandler.accessSpecificPoll);
	
	app.route('/PUT/polls/newOption/:id')
		.put( pollHandler.addOptionAndVote);
		
	app.route('/PUT/polls/:id')
		.put( pollHandler.voteForOption);
		
	app.route('/DELETE/polls/:id')
		.delete(isLoggedIn, pollHandler.removePoll);
		
	app.route('/POST/polls')
		.post(isLoggedIn, pollHandler.addPoll)

		
	
};
