var mongoose = require('mongoose');
//链接 创建 数据库
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/b');

db.once('open',function(){
	console.log('lianjie成功')
})

module.exports = db;