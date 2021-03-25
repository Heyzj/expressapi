// 文章分类字段验证
const joi = require('@hapi/joi')

// 增加文章分类的效验
exports.addcate = {
    body: {
        name: joi.string().min(1).required(),
        alias: joi.string().min(1).required()
    }
}
// 删除文章的参数id的效验
exports.delcatebyid = {
    params: {
        id: joi.number().integer().min(1).required()
    }
}
// 获取文章分类的canshuid的效验
exports.getcatebyid = {
    params: {
        id: joi.number().integer().min(1).required()
    }
}
// 根据id更新文章分类的效验
exports.updatecatebyid = {
    body: {
        id: joi.number().integer().required(),
        name: joi.string().min(1).required(),
        alias: joi.string().min(1).required()
    }
}