var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res){

	var pathName = url.parse(req.url).pathname

	if(pathName === '/'){
		res.end('首页')
	}else if(pathName === '/a'){
		res.end('404 not found')
	}else if(pathName === '/baidu'){
		fs.readFile(__dirname+'/index.html',function(err,data){
			if(err){
				return console.log('文件读取失败')
			}
			res.end(data.toString())
		})		
	}else{
		res.end('请输入正确的网址')
	}

}).listen(3000)

console.log('web运行成功...')
