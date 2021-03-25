// 文章分类模块
const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const artcate = require('../router_handler/artcate')
const {addcate, delcatebyid, getcatebyid, updatecatebyid} = require('../effect/artcate')

// 获取文章分类信息
router.get('/cates', artcate.getCategory)
// 增加文章分类
router.post('/addcates', expressJoi(addcate), artcate.addCategory)
// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(delcatebyid), artcate.delCategoryById)
// 根据id获取文章分类
router.get('/cates/:id', expressJoi(getcatebyid), artcate.getCategoryById)
// 根据id更新文章分类
router.post('/updatecate', expressJoi(updatecatebyid), artcate.updateCategoryById)

module.exports = router