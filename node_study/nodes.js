var http = require('http')
var fs = require('fs')
var path = require('path')

 var server =  http.createServer()
server.on('request',function(request,response){

	if(request.url==='/a'){
			fs.readFile("./nihao.txt",function(err,data){
				if (err) {
					console.log("读文件失败")
				}else{
					response.setHeader('Content-Type','text/html; Charset:utf-8');
					response.end(data)
				}
			})		
	}else if(request.url==='/b'){
		response.end('b')
	}

}).listen(3000);

	console.log('Server running at http://127.0.0.1:3000/');