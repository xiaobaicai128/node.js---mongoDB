var MongoClient = require('mongodb').MongoClient;

//链接数据库内部函数
function _connect(callback){
	var url = 'mongodb://127.0.0.1:27017/my';
	
	MongoClient.connect(url,function(err,db){
		if(err){
			callback(err,null);
			return;
		}
		callback(err,db);
	})
}

exports.insertOne = function(collectionName,json,callback){
	_connect(function(err,db){
		db.collection(collectionName).insertOne(json,function(err,result){
			if(err){
				callback(err,null);
				db.close();
				return;
			}
			callback(null,result);
			db.close();
		})
	})
};

exports.find = function(collectionName,json,C,D){
	//判断参数个数 因为args可以省略
		if(arguments.length == 3){
			var callback = D;
			var limit = 0;
			var skip = 0;
		} else if(arguments.length == 4){
			var callback = D;
			var args = C;
			var limit = args.pagemount || 0;
			var skip = args.pagemount*args.page || 0;
		} else{
//			callback(err,null);
			throw new Error("find函数的参数个数，必须是3个，或者4个。");
			return;
		}
		var result = [];
	_connect(function(err,db){
		
		
		var cursor = db.collection(collectionName).find(json).limit(limit).skip(skip);
		//遍历所有文档doc寻找符合条件的文档doc
		cursor.each(function(err,doc){
			if(err){
				callback(err,null);
				db.close();
				return;
			} else if(doc != null){
				result.push(doc);
				
			} else{
				callback(null,result);
				db.close();
				
			}
			
		})
	})
}
