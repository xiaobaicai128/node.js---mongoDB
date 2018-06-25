var Student = require('../models/stu.js');


exports.showindex = function(req,res,next){
	Student.find({},function(err,result){
		
		res.render('index.ejs',{
			'student' : result
		});
	})
	
}

exports.showadd = function(req,res,next){
	res.render('add.ejs');
}

exports.doadd = function(req,res,next){
	Student.create(req.query,function(err,result){
		res.send('添加成功！');
	});
//	
//		insert(req.query,function(err,result){
//			res.send('成功')
//		})
	
}

exports.doupdate = function(req,res,next){
	Student.find()
}



 
/**
 * 插入
 */
function insert(json,callback) {
 
    var student = new Student(json);
 
    student.save(callback);
}
 
insert();
















