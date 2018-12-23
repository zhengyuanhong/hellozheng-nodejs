
//添加数据
exports.save = function(model,body,callback){
	model.create(body,function(err){
		callback(err)
	})
}
//删除数据
exports.delete = function(model,id,callback){
	model.findByIdAndRemove(id,function(err){
		callback(err)
	})
}



//更改数据
exports.update = function(model,id,newData,callback){
	model.findByIdAndUpdate(id,newData,function(err,doc){
		callback(err,doc)
	})
}

//查询数据条数
exports.count = function(model,callback){
	model.count().then(function(count){
		callback(count)		
	})
}


/*************查询数据*******************/
//根据id查询一条数据
exports.findId = function(model,id,callback){
	model.findById(id,function(err,doc){
		callback(err,doc)
	})
}

exports.findAll = function(model,skip,limit,callback){
	model.find({})//2
		.skip(skip)
		.limit(limit)
        .exec(function(err,data){
        	callback(err,data)
        })
}
