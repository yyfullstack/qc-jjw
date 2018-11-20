var pool = require('../db/pool');

module.exports = {
    queryAsPage: function (page, pageSize, split, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('数据库连接, ' + err.stack);
                return;
            }

            page = page ? page : 1;
            pageSize = pageSize ? pageSize : 20;
            var start = (page - 1) * pageSize;
            var split = split ? split : '0';
            var criteria = " WHERE ENSPLIT = '" + split + "' and ISSUE_FLAG IN('9', 'a') ";

            var sql1 = 'SELECT COUNT(*) as total FROM car ' + criteria;
            var sql2 = 'SELECT CARID AS id, CAR_BRAND_NAME AS brand,CAR_SERIAL_NAME AS series, CAR_KIND AS model,MADE_YEAR,FUEL_NAME,COLOR,CAR_OWNER_TYPE AS resource ' +
                'FROM car ' + criteria + ' order by carid desc' + ' limit ' + start + ',' + pageSize;

            connection.query(sql1, function (err, result1) {
                if (err) {
                    console.log('sql语句， ' + err.stack);
                    return;
                } else {
                    if (result1) {
                        result1 = JSON.stringify(result1);
                        result1 = JSON.parse(result1);
                        var total = result1[0]['total'];
                        connection.query(sql2, function (err, result2) {
                            if (err) {
                                console.log('sql语句， ' + err.stack);
                                return;
                            } else {
                                if (result2) {
                                    var totalPage = Math.ceil(parseInt(total) / pageSize);
                                    result2 = JSON.stringify(result2);
                                    result2 = JSON.parse(result2);
                                    var result = {
                                        pages: totalPage,
                                        pageSize: pageSize,
                                        currentPage: page,
                                        list: result2
                                    };
                                    console.log(result);
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
                        });
                    } else {
                        console.log('查询异常， ');
                        // res.send({
                        //     code: 500,
                        //     msg: '未查询出结果'
                        // });
                    }
                }
                // connection.release();
            })
        })
    },

    getTotals: function (split, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('数据库连接, ' + err.stack);
                return;
            }
            var split = split ? split : '0';
            var criteria = " WHERE ENSPLIT = '" + split + "' and ISSUE_FLAG IN('9', 'a') ";

            var sql1 = 'SELECT COUNT(*) as total FROM car ' + criteria;
            connection.query(sql1, function (err, result) {
                if (err) {
                    console.log('sql语句， ' + err.stack);
                    return;
                } else {
                    if (result) {
                        result = JSON.stringify(result);
                        result = JSON.parse(result);
                        //var total = result[0]['total'];
                        callback(result[0]);
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
    },


    getById: function (id, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('数据库连接, ' + err.stack);
                return;
            }

            var sql = 'SELECT CAR_BRAND_NAME AS NAME, PRE_CHAR AS PRE FROM car_brands WHERE ISSUE_FLAG = "1" order by PRE_CHAR';

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
};