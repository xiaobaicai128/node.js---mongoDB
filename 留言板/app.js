var express = require('express');
var app = express();
var db = require('./model/db.js'); //自己封装的关于数据库增删改查的函数
var formidable = require('formidable');


//设置模板引擎
app.set('view engine','ejs');
//静态服务
app.use(express.static('./public'));

app.get('/',function(req,res,next){
	res.render('index.ejs')
})
 
//提交表单
app.post('/submit',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields){
		db.insertOne('liuyanben',{   //将数据提交给数据库
			"name":fields.name,
			'words':fields.words
		},function(err,result){ //之后提交给ajax
			if(err){
				res.json(-1); //发给ajax的  res.json() 对ajax产生回馈
				return;
			}
			res.json(1);
			
		})
		
	})
})


//设置404
app.use(function(req,res){
	res.render('404.ejs');
})
app.listen(3000);
