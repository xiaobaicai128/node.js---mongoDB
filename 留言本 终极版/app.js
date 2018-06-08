var express = require('express');
var app = express();
var db = require('./model/db.js');
var formidable = require('formidable');
var ObjectId = require('mongodb').ObjectID;
//配置ejs
app.set('view engine','ejs');

//加载静态资源
app.use(express.static('./public'));

//主页
app.get('/',function(req,res){
	db.getAllCount('liuyanben',function(err,count){
		res.render('index.ejs',{'pageamount':Math.ceil(count/6)});
	})
	
})

//提交表单
app.post('/submit',function(req,res,next){
	var form = new formidable.IncomingForm();
	
	form.parse(req,function(err,fields,files){
		if(err){
			next();
			return;
		}
		
		db.insertOne('liuyanben',{
			'name':fields.name,
			'words':fields.words,
			'time':new Date(),
			
		},function(err,reault){
			if(err){
				res.json(-1)
				
			}
			res.json(1);  //返回给ajax
		})
	})
	
})

//达到数据
app.get('/get',function(req,res,next){
	var page = parseInt(req.query.page);
	db.find('liuyanben',{},{'sort':{'time':-1},'page':page,'pageamount':6},function(err,result){
		if(err){
			next();
			return;
		}
		res.json({'result':result});
	})
})

app.get('/remove',function(req,res,next){
	var id = req.query.id;
	console.log(id)
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
	res.render('./404.ejs');
});


app.listen(3000);
