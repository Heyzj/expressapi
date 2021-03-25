const db = require('../db/connect')
const bcrypt = require('bcryptjs')

// 获取用户信息
const getUserInfo = (req, res) => {
    let selectinfo = `select id,username,nickname,user_pic from users where id = ?`
    db.query(selectinfo, req.user.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('获取用户信息失败')
        }
        res.send({
            status: 0,
            msg: '获取用户信息成功',
            data: result[0]
        })
    })
}
// 更新用户信息
const updateInfo = (req, res) => {
    const data = req.body
    let updatesql = `update users set ? where id=?`
    db.query(updatesql, [data, data.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('用户信息更新失败')
        }
        res.cc('用户信息更新成功', 0)
    })
}
// 修改用户密码
const updatePwd = (req, res) => {
    // 根据id查询用户是否存在
    let userSql = `select * from users where id=?`
    db.query(userSql, req.user.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('该用户不存在')
        }
        let comparePwd = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!comparePwd) {
            return res.cc('旧密码错误')
        }
        let updatePwd = `update users set password=? where id=?`

        db.query(updatePwd, [bcrypt.hashSync(req.body.newPwd, 10), result[0].id], (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('密码修改失败')
            }
            res.cc('密码修改成功', 0)
        })
    })
}
// 修改用户头像
const updateAvatar = (req, res) => {
    let avatarSql = `update users set user_pic=? where id=?`
    db.query(avatarSql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.affectedRows !== 1) {
            return res.cc('更新用户头像失败')
        }
        res.cc('更新用户头像成功', 0)
    })
}

module.exports = {
    getUserInfo,
    updateInfo,
    updatePwd,
    updateAvatar
}