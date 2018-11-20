var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'yc_qcjjw',
    user: 'root',
    password: 'root',
    timezone: '+08:00'
});
module.exports = pool;
