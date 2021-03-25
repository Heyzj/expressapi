const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'express'
})
db.getConnection(err => {
    if (err) throw new Error(err)
})

module.exports = db