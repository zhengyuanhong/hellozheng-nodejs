var fs = require('fs');
fs.readFile(__dirname+'/index.html',function(dataa,mss){
	if(dataa){
		console.log('读取文件失败')
	}else{
		console.log(mss.toString());
	}
})