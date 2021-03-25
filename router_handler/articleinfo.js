// 文章管理视图函数
const db = require('../db/connect')
const path = require('path')

// 增加文章信息
exports.addArtInfo = (req, res) => {
    // 处理blob二进制图片数据
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('文章封面为必填参数')
    }
    let addSql = `insert into articleinfo set ?`
    const data = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    db.query(addSql, data, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('发布文章失败！')
        }
        res.cc('发布文章成功！', 0)
    })
}
// 获取文章信息
exports.getArtInfo = (req, res) => {
    let getSql = `select * from articleinfo where is_delete=0`
    db.query(getSql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.send({
            status: 0,
            msg: '获取文章信息成功',
            data: result
        })
    })
}
// 根据id删除文章信息
exports.delArtInfo = (req, res) => {
    let delSql = `update articleinfo set is_delete=1 where id=?`
    db.query(delSql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('删除文章失败')
        }
        res.cc('删除文章成功！', 0)
    })
}
// 根据id获取文章详细
exports.getArtInfoById = (req, res) => {
    let getSql = `select * from articleinfo where id=?`
    db.query(getSql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('获取文章详情失败')
        }
        res.send({
            status: 0,
            msg: '获取文章详情成功',
            data: result[0]
        })
    })
}
// 根据id更新文章信息
exports.updateArtInfo = (req, res) => {
    // 处理blob二进制图片数据
    if (!req.file || req.file.fieldname !== 'cover_img') {
        return res.cc('文章封面为必填参数')
    }
    const data = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    let getSql = `select * from articleinfo where is_delete=0 and id=?`
    db.query(getSql, req.body.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('更新文章参数错误')
        }
        let updateSql = `update articleinfo set ? where id=?`
        db.query(updateSql, [data, req.body.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('更新文章失败！')
            }
            res.cc('更新文章成功！', 0)
        })
    })
}