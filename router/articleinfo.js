const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const expressJoi = require('@escook/express-joi')

// 导入视图函数
const {
    addArtInfo,
    getArtInfo,
    delArtInfo,
    getArtInfoById,
    updateArtInfo
} = require('../router_handler/articleinfo')

// 导出效验规则
const {
    addArtInfo_joi,
    getArtInfo_joi,
    delArtInfo_joi,
    getArtInfoById_joi,
    uploadArtInfo_joi
} = require('../effect/artinfo')

// 配置multer解析FormData的数据
const uploads = multer({dest: path.resolve(__dirname, '../uploads')})
// 增加文章信息
router.post('/add', uploads.single('cover_img'), expressJoi(addArtInfo_joi), addArtInfo)
// 获取文章信息
router.get('/list', expressJoi(getArtInfo_joi), getArtInfo)
// 根据id删除文章
router.get('/delete/:id', expressJoi(delArtInfo_joi), delArtInfo)
// 根据id获取文章详情
router.get('/:id', expressJoi(getArtInfoById_joi), getArtInfoById)
// 根据id更新文章信息
router.post('/edit', uploads.single('cover_img'), expressJoi(uploadArtInfo_joi), updateArtInfo)

module.exports = router