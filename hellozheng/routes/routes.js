var express = require('express')
var mongoose = require('mongoose')
var model = require('../model/blog')
var deal = require('./zsgc')

var route = express.Router()

route.get('/',function(req,res){
	res.render('index/show.html')
})

route.get('/article',function(req,res){ //首页
	var pages = 0
	var page = Number(req.query.page|| 0 )
	var limit = 5

	deal.count(model.article,function(c){
		console.log(c)
		pages = Math.ceil(c/limit)
		page = Math.min(page,pages)
		page = Math.max(page,1)
	    var skip = (page-1)*limit

		deal.findAll(model.article,skip,limit,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
			}
			res.render('index/index.html',{data:data,page:page})
		})	
	})	
})

route.get('/content/:id',function(req,res){ //文章内容

	deal.findId(model.article,req.params.id,function(err,data){
		if(err){
			return res.render('tip.html',{tip:'查找失败'})
		}
		console.log(data)
		res.render('index/content.html',{data:data})
	})
})

// route.get('/sentence',function(req,res){ //经典句子
// 	res.render('index/sentence.html')
// })
route.get('/books',function(req,res){ //图书
	res.render('index/books.html')
})
route.get('/note',function(req,res){ //笔记
	var pages = 0 //总页数
	var page = Number(req.query.page || 0 )
	var limit = 1
	deal.count(model.note,function(c){

		console.log('数据量',c)
		pages = Math.ceil(c/limit)
		page = Math.min(page,pages)
		page = Math.max(page,1)
		var skip = (page-1)*limit

		deal.findAll(model.note,skip,limit,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
			}
			res.render('index/note.html',{data:data,page:page})
		})
	})	
})
route.get('/message',function(req,res){ //留言
	res.render('index/message.html')
})

route.get('/login',function(req,res){
	res.render('index/login.html')
})

route.post('/login',function(req,res){
	console.log(req.body)
	res.render('admin/index.html')
})

route.get('/about',function(req,res){//关于

	var pages = 0 //总页数
	var page = Number(req.query.page || 0 )
	var limit = 1
	deal.count(model.note,function(c){

		console.log('数据量',c)
		pages = Math.ceil(c/limit)
		page = Math.min(page,pages)
		page = Math.max(page,1)
		var skip = (page-1)*limit

		deal.findAll(model.read,skip,limit,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
			}
			console.log(data)
			res.render('index/about.html',{data:data})
		})
	})
})
// route.get('/content',function(req,res){ //笔记内容
// 	res.render('index/details.html')
// })
module.exports = route