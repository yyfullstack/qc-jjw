var pool = require('../db/pool');

module.exports = {
    queryAll: function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('数据库连接, ' + err.stack);
                return;
            }
            var sql = 'SELECT CAR_KIND AS name FROM car_kind_issue';

            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('sql语句， ' + err.stack);
                    return;
                } else {
                    if (result) {
                        var result = JSON.stringify(result);
                        callback(result);
                    } else {
                        console.log('查询异常， ');
                        // res.send({
                        //     code: 500,
                        //     msg: '未查询出结果'
                        // });
                    }
                }
                connection.release();
            })
        })
    }
}