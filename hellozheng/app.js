var express = require('express')
var mongoose = require('./routes/db')
var bodyParser = require('body-parser')
var session = require('express-session')
var route = require('./routes/routes')
var admin = require('./routes/admin')
var path = require('path')


var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))//配置post请求插件

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use('/public/',express.static(path.join(__dirname,'public')))//开放public文件夹下的资源
app.use('/node_modules/',express.static(path.join(__dirname,'node_modules')))//开放node_modules文件夹下的资源

app.engine('html',require('express-art-template'))//使用art-template模板

app.set('views engine','html')//识别html文件

app.set('views',path.join(__dirname,'views'))

app.use('/admin',admin)
app.use(route)

app.listen(3000)
console.log('http://127.0.0.1:3000')