var express = require('express');
var app = express();

var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http); 
//session公式：
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(express.static('./public'));

app.get('/',function(req,res,next){
	res.render('login.ejs');
});
var user = [];
//登录核查
app.get('/check',function(req,res,next){
	var username = req.query.username;
	if(user.indexOf(username) != -1){  //indexof()-1表示该数组中没有该数
		res.send('该用户名已被占用');
		return;
	}else if(!username){
		res.send('请登录');
		return;
	} else{
		user.push(username);
		
		req.session.login = 1;
		req.session.username = username;
		console.log(req.session.username)
		res.redirect('/chat');
	}
		
})

app.get('/chat',function(req,res,next){
	if(!req.session.username){
		res.redirect('/');
		return;
	}
	res.render('chat.ejs',{
		'login': req.session.login = 1? true: false,
		'username': req.session.username
	})
})




io.on('connection',function(socket){
	//监听join事件
	socket.on('join',function(name){
		console.log(name)
//		user[name] = socket; //user.push(name);
		io.emit('join',name); //广播新用户给全体成员
	})
	
	//监听message事件
	socket.on('message',function(msg){
		io.emit('message',msg);//广播新消息给全体成员
	})
})



http.listen(3000);
