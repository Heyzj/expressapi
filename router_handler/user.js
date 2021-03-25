// 定义路由视图函数
const db = require('../db/connect')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')

// 注册用户信息
const regUser = (req, res) => {
    const userinfo = req.body
    // 校验用户信息是否合法，后面使用joi第三方代替验证
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不合法')
    // }
    // 效验用户名是否存在
    let selectUser = 'SELECT username FROM users WHERE username=?'
    db.query(selectUser, userinfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length > 0) {
            return res.cc('用户名被占用')
        }
        // 对用户密码进行加密处理
        userinfo.password = bcrpyt.hashSync(userinfo.password, 10)
        // 插入新用户
        const insertsql = 'insert into users set ?'
        db.query(insertsql, {username: userinfo.username, password: userinfo.password}, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.affectedRows !== 1) {
                return res.cc('注册失败')
            }
            res.cc('注册成功', 0)
        })

    })
}
// 登录认证
const login = (req, res) => {
    const userinfo = req.body
    let selectUser = `select * from users where username=?`
    db.query(selectUser, userinfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('该用户名还未注册，请先注册')
        }
        // 判断密码是否正确,通过compareSync进行密码对比
        let samePwd = bcrpyt.compareSync(userinfo.password, result[0].password)
        if (!samePwd) {
            return res.cc('密码错误！')
        }
        // 生成一个token字符串,并且剔除密码和用户头像
        let users = {...result[0], password: null, user_pic: null}
        let token = jwt.sign(users, config.secretKey, {expiresIn: config.expiresIn})
        res.send({
            status: 0,
            msg: '登录成功',
            token: 'Bearer ' + token
        })
    })
}


module.exports = {
    regUser,
    login
}