'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	owner: {
		email: String
	},
   poll: {
      title: String,
      options: [{
                option : String,
                count : Number
             }]
      
   }
});

module.exports = mongoose.model('Poll', Poll);