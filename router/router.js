// 定义路由
const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const {regFrom} = require('../effect/user')
const handle = require('../router_handler/user')

router.post('/reguser', expressJoi(regFrom), handle.regUser)
router.post('/login', expressJoi(regFrom), handle.login)

module.exports = router