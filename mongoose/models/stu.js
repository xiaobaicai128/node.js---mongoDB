var mongoose = require('mongoose');

var db = require('../models/db-mongoose.js');

var stuSchema = new mongoose.Schema({
	'sid' :  Number ,
	'name' : String,
	'age' : Number
})

stuSchema.index({'sid':1},{unique:true})


var studentModel = db.model('student',stuSchema);

module.exports = studentModel



