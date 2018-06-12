var crypto = require('crypto');

module.exports = function(mingma){
			var md5 = crypto.createHash('md5');
			var jiamipassword = md5.update(mingma).digest('base64');
			return jiamipassword;
		}