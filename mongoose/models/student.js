//
//var mongoose = require('mongoose');
//
//var db = require('./db-mongoose.js'); 
//
//var studentSchema = new mongoose.Schema({
//	name : {type : String},
//	age : {type : Number},
//	sex : {type : String}
//});
//
////创建静态方法
//studentSchema.statics.zhao = function(name,callback){
//	this.model('student').find({name:name},callback)
//}
////改
//studentSchema.statics.gai = function(condition,update,option,callback){
//	this.model('student').update(condition,update,option,callback);
//}
//
//
//
//var studentModel = db.model('student',studentSchema);
//
//module.exports = studentModel;



//var kittySchema =new mongoose.Schema({
//'name': String
//});
//
//var Kitten = mongoose.model('Kitten', kittySchema);
//
////var silence = new Kitten({ 'name': 'Silence' });
////silence.save(function(err){
////	console.log('ok');
////})
//Kitten.create({'name': 'Silence'},function(err,result){
//	if(err){
//		console.log(err);
//	}
//	console.log(result)
//})


//var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/aa', function(err) {
//  if(!err){
//      var schema = new mongoose.Schema({ num:Number, name: String, size: String });
//      var MyModel = mongoose.model('MyModel', schema);
////      var doc1 = new MyModel({ name: 'lla' });
//      MyModel.create({ name: 'lla' });
////      MyModel.index({'name':1},{unique:true})
////      doc1.save(function (err,doc) {
//      //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
//        console.log(doc);
//      })
//  }
//});
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/b', function(err) {
//  if(!err){
//      var schema = new mongoose.Schema({ age:Number, name: String});        
//      var temp = mongoose.model('temp', schema);   
//      temp.create({name:"xiaowang"},function(err,doc){
//          //{ __v: 0, name: 'xiaowang', _id: 59720d83ad8a953f5cd04664 }
//          console.log(doc); 
//          //{ __v: 0, name: 'xiaoli', _id: 59720d83ad8a953f5cd04665 }
//         
//      });       
//  }           
//});