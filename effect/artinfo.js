// 文章管理效验
const joi = require('@hapi/joi')

const page = joi.number().integer().min(1).required()
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
// 增加文章信息效验
exports.addArtInfo_joi = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}
// 获取文章信息效验
exports.getArtInfo_joi = {
    body: {
        pagenum: page,
        pagesize: page,
        cate_id: joi.number().integer().min(1),
        state: joi.string().valid('已发布', '草稿')
    }
}
// 根据id删除文章效验
exports.delArtInfo_joi = {
    params: {
        id: joi.number().integer().min(1).required()
    }
}
// 根据id获取文章详情效验
exports.getArtInfoById_joi = {
    params: {
        id: joi.number().integer().min(1).required()
    }
}
// 根据id更新文章信息
exports.uploadArtInfo_joi = {
    body: {
        id: joi.number().integer().min(1).required(),
        title,
        cate_id,
        content,
        state
    }
}