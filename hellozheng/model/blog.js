var mongoose = require('mongoose')
//用户账号
var user_schema = new mongoose.Schema({
	username:String,
	passwd:String
})

exports.user = mongoose.model('user',user_schema)

//文章集合
var article_schema = new mongoose.Schema({
	title: String,
	category: String,
	content1:String,
	img1:String,
	content2:String,
	img2:String,
	content3:String,
	img3:String,
	buy_link:String,
	photo_link:String,
	date:{type:Date,default:Date.now}
})

exports.article = mongoose.model('Article',article_schema)


//图书集合
var db_books = new mongoose.Schema({
	photo_link:String,
	books_des:String,
	buy_link:String
})

exports.book = mongoose.model('Book',db_books)


//笔记集合
var db_note = new mongoose.Schema({
	content:String,
	img:String,
	date:{type:Date,default:Date.now}
})

exports.note = mongoose.model('Note',db_note)

//阅读集合
var db_read = new mongoose.Schema({
	readName:String,
	readDes:String,
	Date:String
})

exports.read = mongoose.model('read',db_read)