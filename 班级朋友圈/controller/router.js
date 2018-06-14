var formidable = require('formidable');
var db = require('../model/db.js');
var jiami = require('../model/jiami.js');
var session = require('express-session');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
//首页
exports.showIndex = function(req,res,next){
	//查询数据库 如果登录就用存储的头像，否则用默认头像
	if(req.session.login == 3){
		db.find('pengyouquan',{'username':req.session.username},function(err,result){
			var avatar = result[0].avatar || 'moren.jpg';
			db.find('shuoshuo',{},{'sort':{'date':-1}},function(err,result2){
				res.render('index.ejs',{
					"login":req.session.login == 3 ? true: false,
					"username":req.session.login == 3? ' '+req.session.username : '',
					"say":req.session.login == 3?  result[0].mySay:'***',
					'sex': req.session.login == 3? result[0].sex : '*',
					"avatar":avatar,
					'shuoshuo': result2
				});
			})
			
			
		})
	} else{
		res.render('index.ejs',{
				"login":req.session.login == 3 ? true: false,
				"username":req.session.login == 3? ' '+req.session.username : '',
				'avatar':'moren.jpg'
			});
	}
	
}
//注册
exports.showRegist = function(req,res,next){
	
	res.render('regist.ejs');
}

//执行注册
exports.doRegist = function(req,res,next){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		//查重
		db.find('pengyouquan',{'username':fields.username},function(err,result){
			if(err){
				next();
				return;
			} else if(result.length == 0){
				//md5加密
				var password = jiami(jiami(fields.password).substr(4,7)+jiami(fields.password))
				db.insertOne('pengyouquan',{'username':fields.username,'password':password,'avatar':'moren.jpg'},function(err,result){
					if(err){
						res.send('-2');
						return;
					}
					
					//写入session  一定要写在send之前
					req.session.login = 3;
					req.session.username = fields.username;
					
					res.send('2');//注册成功  
					
				})
			} else{
				res.send('-1');
				return;
			}
			
		})
	
	});
}
//登录
exports.showLogin = function(req,res,next){
	
	res.render('login.ejs',{
		'login' : req.session.login == 3? true : false,
		'username' : req.session.login == 3? req.session.usernumber : ''
	});
}
//执行登录
exports.doLogin = function(req,res,next){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		if(err){
			next();
			return;
		}
		db.find('pengyouquan',{'username':fields.username},function(err,result){
			
			
			if(err){
				next();
				return;
			}
			//md5加密
			var jiamiPassword = jiami(jiami(fields.password).substr(4,7)+jiami(fields.password)) 
			if(result.length == 0){
				res.send('-1'); //该用户未注册
				return;
			} else if(jiamiPassword == result[0].password){
				
				req.session.login = 3;
				req.session.username = fields.username;
				res.send('2');//登录成功
				
			} else{
				res.send('-2');  //密码错误
			}
		})
	})
}
//设置头像页面
exports.showSetAvatar = function(req,res,next){
	if(req.session.login == 3){
		res.render('setAvatar.ejs');
	} else{
		res.send('请先登录！')
	}
	
}
//上传头像
exports.dosetavatar = function(req,res,next){
	
	var form = new formidable.IncomingForm();
	//设置上传文件夹
	form.uploadDir = './avatar';
	form.parse(req,function(err,fields,files){
		
		var extname = path.extname(files.avatar.name);
		var oldPath = files.avatar.path;
		var newPath = './avatar'+'/'+req.session.username+extname;
		fs.rename(oldPath,newPath,function(err){
			if(err){
				next();
				return;
			}
		 	req.session.avatar = req.session.username+extname; //文件名
//			res.render('ok.ejs');
			res.redirect('/cut');
		});
	})
}
//处理图片
exports.showCut = function(req,res,next){
	res.render('cut.ejs',{
				'avatar': req.session.avatar
				
			});
}
//执行切图
exports.doCut = function(req,res,next){
	var filename = req.session.avatar;
	var w = req.query.w;
    var h = req.query.h;
    var x = req.query.x;
    var y = req.query.y;
    gm('./avatar/'+filename)
     .crop(w, h, x, y)
     .resize(100,100,'!') 
     .write('./avatar/'+filename,function(err,result){
     	
     	if(err){
     		res.send('-4')
     		return;
     	}
     	//更改数据库中的avatar
     	db.updateMany('pengyouquan',{'username':req.session.username},
     	{$set:{'avatar':req.session.avatar}},function(err,result){
     		if(err){
     			next();
     			return;
     		}
     		res.send('4');
     		
     	});
     		
     })
}
//个人管理
exports.showMy = function(req,res,next){
	if(req.session.login == 3){
		res.render('my.ejs');
	} else{
		res.send('请先登录！')
		return;
	}	
}
//处理个人管理
exports.doChange = function(req,res,next){
	var newUsername = req.query.username == ''? req.session.username : req.query.username ;
	var sex = req.query.sex;
	var mySay = req.query.mysay;
	var Location = req.query.location;
	console.log(mySay)
//	
	db.updateMany('pengyouquan',{'username':req.session.username},
     	{$set:{'username':newUsername,'sex':sex,'location':Location,'mySay':mySay}},function(err,result){
     		if(err){
     			next();
     			return;
     		}
     		req.session.mySay = mySay;
     		res.send('6');
     		
     	});
}
//发表说说
exports.doReport = function(req,res,next){
	if(req.session.login != 3){
		res.send('请先登录！')
		return;
	} 
	var username = req.session.username;
	
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		var text = fields.text;
		db.insertOne('shuoshuo',{'username':req.session.username,'date':new Date(),'text':text},function(err,result){
			if(err){
				res.send('-7');
				return;
			}
			res.send('7');
		})
	})
}















//退出
//exports.showQuit = function(req,res,next){
//	res.end(function(err,result){
//		res.send('6')
//		
//	});
//}










