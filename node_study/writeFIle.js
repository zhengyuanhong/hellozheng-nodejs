var fs = require('fs');
fs.writeFile('./node_study/新文件.txt','你好。我是xxx，很高心认识你',function(error){
	if(error){
		console.log("文件写入失败")
	}else{
		console.log("文件写入成功")
	}
})