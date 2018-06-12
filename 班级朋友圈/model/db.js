var MongoClient = require('mongodb').MongoClient;
//
////链接数据库  封装成内部函数
function _connectDB(callback){
	var url = 'mongodb://127.0.0.1:27017/pengyouquan';
	MongoClient.connect(url,function(err,db){
		if(err){
			callback(err,null);
			return;
		}
		callback(err,db);
	});
}

//封装插入函数
exports.insertOne = function(collectionName,json,callback){
	//调用内部链接数据库函数
	_connectDB(function(err,db){
		
		db.collection(collectionName).insertOne(json,function(err,result){
			callback(err,result);
			//关闭数据库
			db.close();
		});
	})
}

//exports.find = function(collectionName,json,args,callback){
exports.find = function(collectionName,json,C,D){
	
//	//因为参数中的args是可以省略的，所以要判断三个参数和四个参数的情况
if (arguments.length == 3) {
        //那么参数C就是callback，参数D没有传。
        var callback = C;
        var skipnumber = 0;
        //数目限制
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        //应该省略的条数
        var skipnumber = args.pageamount * args.page || 0;
        //数目限制
        var limit = args.pageamount || 0;
        //排序方式
        var sort = args.sort || {};
    } else {
        throw new Error("find函数的参数个数，必须是3个，或者4个。");
        return;
    }
	
	var result = []; //设置接受结果的数组
	_connectDB(function(err,db){
		
		var cursor = db.collection(collectionName).find(json).limit(limit).skip(skipnumber).sort(sort);
		cursor.each(function(err,doc){
			if(err){
				callback(err,null);
				db.close();
				return;
			}
			if(doc!=null){
				result.push(doc); //循环遍历文档doc 知道全部遍历完毕
			}else{
				callback(null,result);
				db.close();
			}
		})
	})
}

exports.deleteMany = function(collectionNaame,json,callback){
	_connectDB(function(err,db){
		db.collection(collectionNaame).deleteMany(json,function(err,result){
			if(err){
				callback(err,null);
				db.close();
				return;
			}
			callback(null,result);
			db.close();
		})
	})
}

exports.updateMany = function(collectionName,json1,json2,callback){
	_connectDB(function(err,db){
		db.collection(collectionName).updateMany(json1,json2,function(err,result){
			if(err){
				callback(err,null);
				db.close();
				return;
			}
			callback(null,result);
			db.close();
		})
	})
}

//得到数据总数
exports.getAllCount = function(collectionName,callback){
	_connectDB(function(err,db){
//		db.collection(collectionName).count(json,function(err,count){
		db.collection(collectionName).count({}).then(function(count){	
			if(err){
				callback(err,null);
				db.close();
				return;
			}
			callback(null,count);
			db.close();
		})
	})
}
