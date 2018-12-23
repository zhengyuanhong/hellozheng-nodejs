var mongoose = require('mongoose')
var db_url = require('./mongodb_config')

mongoose.connect(db_url,function(err){
	if(err){
		console.log('数据库连接失败',err)
	}else{
		console.log('数据库连接成功',db_url)
	}
})
