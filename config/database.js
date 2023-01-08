const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit : 1000,
    host:'localhost',
    user:'root',
    password:'',
    database:'coi'
});

pool.query = util.promisify(pool.query)
module.exports = pool;