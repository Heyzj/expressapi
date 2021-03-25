// 定义文章分类信息视图函数
const db = require('../db/connect')

// 获取文章分类信息
exports.getCategory = (req, res) => {
    let artSql = `select * from article where is_delete=0 order by id asc`
    db.query(artSql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length < 0) {
            return res.cc('暂无文章分类')
        }
        res.send({
            status: 0,
            msg: '获取文章分类列表成功！',
            data: result
        })
    })
}
// 增加文章分类
exports.addCategory = (req, res) => {

    let selectSql = `select * from article where name=? or alias=?`
    db.query(selectSql, [req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
            return res.cc('分类名称与别名已存在')
        }
        if (result.length === 2) {
            return res.cc('分类名称与别名已存在')
        }
        if (result.length === 1 && result[0].name === req.body.name) {
            return res.cc('分类名称已存在')
        }
        if (result.length === 1 && result[0].alias === req.body.alias) {
            return res.cc('分类别名已存在')
        }
        let addSql = `insert into article set ? `
        db.query(addSql, req.body, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('新增文章分类失败')
            }
            res.cc('新增文章分类成功！', 0)
        })
    })

}
// 根据id删除文章分类
exports.delCategoryById = (req, res) => {
    let delSql = `update article set is_delete=1 where id=?`
    db.query(delSql, req.params.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('删除文章分类失败')
        }
        res.cc('删除文章分类成功！', 0)
    })
}
// 根据id获取文章分类
exports.getCategoryById = (req, res) => {
    let getSql = `select * from article where is_delete=0 and id=?`
    db.query(getSql, req.params.id, (err, result) => {
        if (err) {
            return ress.cc(err)
        }
        if (result.length === 0) {
            return res.cc('暂无该id的文章分类')
        }
        res.send({
            status: 0,
            msg: '获取文章分类数据成功！',
            data: result[0]
        })
    })
}
// 根据id更新文章分类
exports.updateCategoryById = (req, res) => {
    let selectSql = `select * from article where id!=? and (name=? or alias=?)`
    db.query(selectSql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if (err) {
            return res.cc(err)
        } else if (result.length === 2) {
            return res.cc('分类名称和别名已被占用')
        } else if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
            return res.cc('分类名称和别名已被占用')
        } else if (result.length === 1 && result[0].name === req.body.name) {
            return res.cc('分类名称已被占用')
        } else if (result.length === 1 && result[0].alias === req.body.alias) {
            return res.cc('别名称已被占用')
        }

        let updateSql = `update article set ? where id=?`
        db.query(updateSql, [req.body, req.body.id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('更新分类信息失败')
            }
            res.cc('更新分类信息成功！', 0)
        })
    })

}
