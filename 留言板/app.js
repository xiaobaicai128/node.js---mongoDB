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
app.post('/submit',function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields){
		console.log('reseve words' +fields.name +fields.words);
	})
})

//设置404
app.use(function(req,res){
	res.render('404.ejs');
})
app.listen(3000);
