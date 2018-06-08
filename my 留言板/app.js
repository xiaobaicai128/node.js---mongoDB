var express = require('express');
var app = express();
var db = require('./model/db.js'); //自己封装的关于数据库增删改查的函数
var formidable = require('formidable');
var ObjectId = require('mongodb').ObjectID;

//设置模板引擎
app.set('view engine','ejs');
//静态服务
app.use(express.static('./public'));

app.get('/',function(req,res,next){
	db.getAllCount('liuyanben',function(err,count){
		res.render('index.ejs',{
		'pageamount': Math.ceil(count/6)
		})
	})
	
})
 
 //得到数据
app.get('/du',function(req,res,next){
	var page = parseInt(req.query.page);
	db.find('liuyanben',{},{'sort':{'time':-1},'pageamount':6,'page':page},function(err,result){  //返回的result 是数组（ 自己封装的）
		if(err){
			next();
			return;
		}
		res.json({'result':result});  //将数组转换成json传给ajax
	})
})
//提交表单
app.post('/submit',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields){
		db.insertOne('liuyanben',{   //将数据提交给数据库
			"name":fields.name,
			'words':fields.words,
			"time": new Date()
		},function(err,result){ //之后提交给ajax
			if(err){
				res.json(-1); //发给ajax的  res.json() 对ajax产生回馈
				return;
			}
			res.json(1);
			
		})
		
	})
})

//得到数据总数量
app.get('/count',function(req,res){
	db.getAllCount('liuyanben',function(err,count){
		if(err){
			next();
			return;
		}
		res.send(count.toString());
	})
})

app.get('/remove',function(req,res,next){
	var id = req.query.id;
	db.deleteMany('liuyanben',{'_id':ObjectId(id)},function(err,result){
		if(err){
			next();
			return;
		}
		res.redirect('/');
	})
})

//设置404
app.use(function(req,res){
	res.render('404.ejs');
})
app.listen(3000);
