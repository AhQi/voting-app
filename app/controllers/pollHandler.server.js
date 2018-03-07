'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');


function pollHandler () {

	this.getAllPolls = function (req, res) {
		
		Polls
			.find({}, { 'owner': false })
			.exec(function (err, result) {
					if (err) { throw err; }
	
					if (result) {
						res.json(result);
						//console.log("!@#"+result);
					} 
				});
	};
	
	this.addOptionAndVote = function (req, res) {
		console.log('addOptionAndVote');
		const newAddedOption = {option: req.body.option, count: 1};
		
		Polls
			.findOneAndUpdate({ '_id': req.params.id }, {$push: { 'poll.options': newAddedOption }}, {new: true})
				.exec(function (err, result) {
					if (err) { throw err; }
	
					if (result) {
						console.log(result.poll.options);
						res.json(result);
					} 
				}
			);
	};
	
	this.voteForOption = function (req, res) {
		console.log(req.body.option);
		const voteOption = {};
		voteOption['poll.options.'+req.body.option+'.count'] = 1
			
		console.log(voteOption);
			
		Polls
		.findOneAndUpdate({ '_id': req.params.id }, { $inc: voteOption}, {new: true})
			.exec(function (err, result) {
				if (err) { throw err; }
	
				if (result) {
					console.log(result.poll.options);
					res.json(result);
				} 
			}
		);
	};
	
	this.accessSpecificPoll = function (req, res) {
		
		Polls
		.findOne({ '_id': req.params.id })
		.exec(function (err, result) {
			if (err) { throw err; }
	
				if (result) {
						res.json(result);
				} 
			}
		);
		
	};
	
	this.addPoll = function (req, res) {
	    console.log(req.user.profile.email);
	    var pollOption = [];
	    req.body.options.forEach((val)=>{
	    	pollOption.push({option: val, count: 0});	
	    });
	    console.log(pollOption);
		Polls
			.create({ 'owner.email': req.user.profile.email, 'poll.title': req.body.title, 'poll.options': pollOption},
			    function (err, pollCreatedRes) {
					if (err) { throw err; }
	                Users
						.findOneAndUpdate({ 'profile.email': req.user.profile.email }, {$push: {'ownedPolls': {title: pollCreatedRes.poll.title, id: pollCreatedRes._id}}})
						.exec(function (err, result) {
								if (err) { throw err; }
								console.log(result);
								res.json(pollCreatedRes);
							}
						);
					 
					
				}
			);
		
	};
	
	this.removePoll = function (req, res) {
	Users
		.findOneAndUpdate({ 'profile.email': req.user.profile.email }, { $pull: { ownedPolls : { id : req.params.id } } })
		.exec(function (err, result) {
				if (err) { throw err; }
				
				if(result){
					Polls
					.remove({ '_id': req.params.id })
						.exec(function (err, result) {
							if (err) { throw err; }
			
							if (result) {
								console.log(result);
								res.status(200).json(result);
							} 
						}
					);
				}
				
			}
		);
	};
}

module.exports = pollHandler;