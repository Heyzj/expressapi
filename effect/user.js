const joi = require('@hapi/joi')

// 定义登录注册信息字段的验证
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
exports.regFrom = {
    body: {
        username: joi.string().alphanum().min(5).max(8).required(),
        password: password
    },
    // query:{},
    // params:{}
}
// 定义更新用户信息时的效验规则
exports.updateFrom = {
    body: {
        id: joi.number().integer().min(1).required(),
        nickname: joi.string().required(),
        email: joi.string().email().required()
    }
}
// 定义修改密码时，密码的规则
exports.updatePwd = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
// 定义用户修改头像规则
exports.updateAvatar = {
    body: {
        avatar: joi.string().dataUri().required()
    }
}