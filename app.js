const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')

const bodyParser = require('body-parser')
const router = require('./router/router')
const routerUserInfo = require('./router/userinfo')
const routerArtCate = require('./router/artcate')
const routerArtInfo = require('./router/articleinfo')
const config = require('./config')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 托管静态资源文件
app.use('/uploads', express.static('uploads'))
// 定义提示错误消息的中间件
app.use(function (req, res, next) {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 定义请求接口的token
app.use(expressJWT({secret: config.secretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}))
// 登录注册模块路由
app.use('/api', router)
// 用户信息路由
app.use('/my', routerUserInfo)
// 文章分类路由
app.use('/my/article', routerArtCate)
// 文章信息路由
app.use('/my/article', routerArtInfo)

// 定义全局捕获错误的中间件
app.use((err, req, res, next) => {
    // 捕获joi验证失败的错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 捕获token认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败', status = err.status)
    }
    res.cc(err)
})

app.listen(80, () => {
    console.log("running at http://127.0.0.1")
})