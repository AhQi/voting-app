'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	profile: {
		email: String,
		password: String,
	},
    ownedPolls: [{
				    title : String,
				    id : String
    			}]
    
});

module.exports = mongoose.model('User', User);
