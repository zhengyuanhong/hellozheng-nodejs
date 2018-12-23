var mongoose = require('mongoose')
var model = require('../model/blog')
var deal = require('./zsgc')
var express = require('express')

var routes = express.Router()

routes.use(function(req,res,next){

 next()
})


/*
用户管理
*/
routes.get('/user',function(req,res){

	res.render('admin/user.html')
})
routes.post('/user',function(req,res){
	console.log('发布：',req.body)
	deal.save(model.user,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
		}
		res.redirect('/admin/user/control')
	})
})


routes.get('/user/control',function(req,res){
	var skip = 0
	var limit = 15


	deal.count(model.user,function(c){
	

		deal.findAll(model.user,skip,limit,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
			}
			res.render('admin/user_edit.html',{data:data})
		})
	})
})
//用户编辑
var BOOKS_IID = ''
routes.get('/user/edit/:id',function(req,res){
	deal.findId(model.user,req.params.id,function(err,data){
		if(err){
			return res.render('tip.html',{tip:'查找失败'})
		}
		BOOKS_IID = data._id.toString()
		res.render('admin/user_edit_content.html',{data:data})
	})

})
routes.post('/user/edit',function(req,res){
	deal.update(model.user,BOOKS_IID,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'更新失败'})
		}
		res.redirect('/admin/user')
	})
})

//用户删除
routes.get('/user/delete/:id',function(req,res){
	deal.delete(model.user,req.params.id,function(err){
		if(err){
			return res.render('tip.html',{tip:'删除失败'})
		}
		res.redirect('/admin/user/control')
	})
})

/*
文章发布：标题，时间，分类，内容1，内容2 ，内容3，图片连接，购买连接
笔记发布：内容，时间，分类
图书发布：图片连接，购买链接，分类，讲述
*/
/*
后台首页
*/
routes.get('/index',function(req,res){
	res.render('admin/index.html')
})
/*
 文章发布，文章编辑
*/
routes.get('/article',function(req,res){
	res.render('admin/article.html')
})
routes.post('/article',function(req,res){
	deal.save(model.article,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
		}
		res.redirect('/admin/article/control')
	})
})

//文章管理
routes.get('/article/control',function(req,res){
	var pages = 0
	var page = Number(req.query.page || 0 )
	var limit = 1

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

				res.render('admin/article_edit.html',{data:data,page:page})
		})	
	})
})
//文章编辑
var ARTICLE_IID = ''
routes.get('/article/edit/:id',function(req,res){
	deal.findId(model.article,req.params.id,function(err,data){
		if(err){
			return res.render('tip.html',{tip:'查找失败'})
		}
		ARTICLE_IID = data._id.toString()
		res.render('admin/article_edit_content.html',{data:data})
	})
})
routes.post('/article/edit',function(req,res){
	deal.update(model.article,ARTICLE_IID,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'更新失败'})
		}
		res.redirect('/admin/article')
	})
})

//文章删除
routes.get('/article/delete/:id',function(req,res){
	deal.delete(model.article,req.params.id,function(err){
		if(err){
		  return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
		}
		res.redirect('/admin/article/control')
	})

})

/*
 笔记发布，笔记编辑
*/ 
routes.get('/note',function(req,res){

	res.render('admin/note.html')
})
routes.post('/note',function(req,res){
	deal.save(model.note,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
		}
		res.redirect('/admin/note/control')
	})
})

//笔记管理
routes.get('/note/control',function(req,res){
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
			res.render('admin/note_edit.html',{data:data,page:page})
		})

	})
})

var NOTE_IDD = ''
//笔记编辑
routes.get('/note/edit/:id',function(req,res){
	deal.findId(model.note,req.params.id,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'查询失败'})
			}
			NOTE_IDD = data._id.toString()
			res.render('admin/note_edit_content.html',{data:data})
	})
})
//笔记更新
routes.post('/note/edit',function(req,res){
	console.log(req.body)
	deal.update(model.note,NOTE_IDD,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'更新失败'})
		}
		res.redirect('/admin/note')
	})
})

//笔记删除
routes.get('/note/delete/:id',function(req,res){
	deal.delete(model.note,req.params.id,function(err){
		if(err){
			return res.render('tip.html',{tip:'删除失败'})
		}
		res.redirect('/admin/note/control')
	})
})

/*
 图书发布，图书编辑
*/ 
routes.get('/books',function(req,res){

	res.render('admin/books.html')
})
routes.post('/books',function(req,res){
	deal.save(model.book,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
		}
		res.redirect('/admin/books/control')
	})
})
//图书管理
routes.get('/books/control',function(req,res){
	var pages = 0
	var page = Number(req.query.page | 0)
	var limit = 1


	deal.count(model.book,function(c){
		pages = Math.ceil(c/limit)
		page = Math.min(page,pages)
		page = Math.max(page,1)
	    var skip = (page-1)*limit	

		deal.findAll(model.book,skip,limit,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
			}
			res.render('admin/books_edit.html',{data:data,page:page})
		})
	})
})
//图书编辑
var BOOKS_IID = ''
routes.get('/books/edit/:id',function(req,res){
	deal.findId(model.book,req.params.id,function(err,data){
		if(err){
			return res.render('tip.html',{tip:'查找失败'})
		}
		BOOKS_IID = data._id.toString()
		res.render('admin/books_edit_content.html',{data:data})
	})

})
routes.post('/books/edit',function(req,res){
	deal.update(model.book,BOOKS_IID,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'更新失败'})
		}
		res.redirect('/admin/books')
	})
})

//图书删除
routes.get('/books/delete/:id',function(req,res){
	deal.delete(model.book,req.params.id,function(err){
		if(err){
			return res.render('tip.html',{tip:'删除失败'})
		}
		res.redirect('/admin/books/control')
	})
})

/**
阅读管理
**/
routes.get('/read',function(req,res){

	res.render('admin/read.html')
})
routes.post('/read',function(req,res){
	console.log('发布：',req.body)
	deal.save(model.read,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
		}
		res.redirect('/admin/read/control')
	})
})
//阅读管理
routes.get('/read/control',function(req,res){
	var pages = 0
	var page = Number(req.query.page | 0)
	var limit = 1


	deal.count(model.read,function(c){
		pages = Math.ceil(c/limit)
		page = Math.min(page,pages)
		page = Math.max(page,1)
	    var skip = (page-1)*limit	

		deal.findAll(model.read,skip,limit,function(err,data){
			if(err){
				return res.render('tip.html',{tip:'发布失败，请检查重新发布'})
			}
			res.render('admin/read_edit.html',{data:data,page:page})
		})
	})
})
//阅读编辑
var BOOKS_IID = ''
routes.get('/read/edit/:id',function(req,res){
	deal.findId(model.read,req.params.id,function(err,data){
		if(err){
			return res.render('tip.html',{tip:'查找失败'})
		}
		BOOKS_IID = data._id.toString()
		res.render('admin/read_edit_content.html',{data:data})
	})

})
routes.post('/read/edit',function(req,res){
	deal.update(model.read,BOOKS_IID,req.body,function(err){
		if(err){
			return res.render('tip.html',{tip:'更新失败'})
		}
		res.redirect('/admin/read')
	})
})

//阅读删除
routes.get('/read/delete/:id',function(req,res){
	deal.delete(model.read,req.params.id,function(err){
		if(err){
			return res.render('tip.html',{tip:'删除失败'})
		}
		res.redirect('/admin/read/control')
	})
})

/*
返回首页
*/
routes.get('/',function(req,res){
	res.render('index/article.html')
})

//登陆
routes.post('/login',function(req,res){

	req.session.Islogin = req.body
	if (req.session.Islogin) {

		console.log('密码:',req.session.Islogin)

		res.render('admin/index.html')

	}
})


module.exports = routes

