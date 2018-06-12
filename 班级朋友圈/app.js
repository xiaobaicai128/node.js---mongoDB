var express = require('express');
var app = express();
var ejs = require('ejs');
var router = require('./controller/router.js');
var session = require('express-session');
var fs = require('fs');

//配置ejs
app.set('view engine','ejs');
//加载静态资源
app.use(express.static('./public'));
//静态头像资源
app.use('/avatar',express.static('./avatar'));
//配置session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  
}));
//设置主页
app.get('/',router.showIndex);
//注册页面
app.get('/regist',router.showRegist);
//执行注册
app.post('/doregist',router.doRegist);
//登录界面
app.get('/login',router.showLogin);
//执行登录
app.post('/dologin',router.doLogin);
//设置头像页面
app.get('/setavatar',router.showSetAvatar);
//上传头像
app.post('/dosetavatar',router.dosetavatar);
//处理头像
app.get('/cut',router.showCut);
//执行切图
app.get('docut',router.doCut);













//设置404
app.use(function(req,res){
	res.render('404.ejs');
})

app.listen(3000);
