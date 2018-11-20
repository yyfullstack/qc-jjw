var pool = require('../db/pool');

module.exports = {
    queryAsPage: function (page, pageSize, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('数据库连接, ' + err.stack);
                return;
            }

            page = page ? page : 1;
            pageSize = pageSize ? pageSize : 20;
            var start = (page - 1) * pageSize;
            var criteria = " WHERE STATUS IN('1', '9') ";
            var sql1 = 'SELECT COUNT(*) as total FROM auction ' + criteria;
            var sql2 = 'SELECT AUCTION_ID AS id, AUCTION_NAME AS subject,ORGA_CODE AS company, AUCTION_STARTDATE AS start,AUCTION_ENDDATE as end, AUCTION_TYPE as type ' +
                'FROM auction ' + criteria + ' ORDER BY AUCTION_ID DESC ' + ' limit ' + start + ',' + pageSize;

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
    }
};