var http = require('http');
var fs = require('fs')

http.createServer(function (request, response) {
	var url = request.url
	var dirname = '/index.html'
			response.setHeader('Content-Type','text/html')
	fs.readFile(__dirname+'/resurce/index.html',function(err,data){
		if(err){
			 return console.log('文件读取失败')
		}
		console.log('读取文件成功')
		response.end(data)
	})
	if(url !== '/'){
			dirname = url
		}
		console.log(dirname)
		
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');