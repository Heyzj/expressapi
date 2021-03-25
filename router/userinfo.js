const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const userinfo = require('../router_handler/userinfo')
const {updateFrom, updatePwd, updateAvatar} = require('../effect/user')
// 获取用户信息
router.get('/userinfo', userinfo.getUserInfo)
// 更新用户信息
router.post('/userinfo', expressJoi(updateFrom), userinfo.updateInfo)
// 修改用户密码
router.post('/updatepwd', expressJoi(updatePwd), userinfo.updatePwd)
// 修改用户头像
router.post('/update/avatar', expressJoi(updateAvatar), userinfo.updateAvatar)

module.exports = router