var express = require('express');
var router = express.Router();
var util = require('./util');
var pool = require('../db/pool');
var sql = require('../db/sql');


// var carModel = require('../models/car_model');
// var carBrand = require('../models/car_brand');
// var carSeries = require('../models/car_series');
// var car = require('../models/car');


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('-----------------');
    res.render('website/index', {
        'active': 'index',
        'breadcrumb': false,
        'title': '首页'
    });
});

//整车配件
router.get('/vehicle', function (req, res, next) {
    async function initFilter() {
        var carModel = await pool.ROW(sql.carModel.query, null);
        var carBrand = await pool.ROW(sql.carBrand.query, null);
        var carHotSeries = await pool.ROW(sql.carSeries.queryHot, null);
        var brandGroup = util.groupBy(carBrand, 'pre');
        var keys = Object.keys(brandGroup);
        var brandList = [];
        keys.forEach(function (key) {
            brandList.push({
                'key': key,
                'children': brandGroup[key]
            });
        });

        res.render('website/vehicle', {
            'active': 'vehicle',
            'models': carModel,
            'keys': keys,
            'brands': brandList,
            'series': carHotSeries,
            'breadcrumb': true,
            'title': '整车配件'
        });
    }

    initFilter();
});

//根据品牌查询系列
router.get('/getSeries/:brand', function (req, res, next) {
    var brand = req.params.brand;
    if (brand) {
        console.log(brand);

        async function getSeries() {
            var carSeries = await pool.ROW(sql.carSeries.queryByBrand, [brand]);
            res.end(JSON.stringify(carSeries));
        }

        getSeries();
    }
});


//零拆配件
router.get('/parts', function (req, res, next) {
    async function initFilter() {
        var carModel = await pool.ROW(sql.carModel.query, null);
        var carBrand = await pool.ROW(sql.carBrand.query, null);
        var carHotSeries = await pool.ROW(sql.carSeries.queryHot, null);
        var brandGroup = util.groupBy(carBrand, 'pre');
        var keys = Object.keys(brandGroup);
        var brandList = [];
        keys.forEach(function (key) {
            brandList.push({
                'key': key,
                'children': brandGroup[key]
            });
        });

        res.render('website/parts', {
            'active': 'parts',
            'models': carModel,
            'keys': keys,
            'brands': brandList,
            'series': carHotSeries,
            'breadcrumb': true,
            'title': '整车配件'
        });
    }

    initFilter();
});


router.get('/countCar', function (req, res, next) {
    var model = req.query.model ? req.query.model : '';
    var brand = req.query.brand ? req.query.brand : '';
    var series = req.query.series ? req.query.series : '';
    var split = req.query.split ? req.query.split : '0';
    var obj = util.buildCount(split, model, brand, series);

    async function getTotal() {
        var result = await pool.FIRST(obj.sql, obj.params);
        console.log(result);
        res.end(JSON.stringify(result));
    }

    getTotal();
});

router.get('/showCar/:page', function (req, res, next) {
    var model = req.query.model ? req.query.model : '';
    var brand = req.query.brand ? req.query.brand : '';
    var series = req.query.series ? req.query.series : '';
    var split = req.query.split ? req.query.split : '0';
    var page = req.params.page ? req.params.page : 1;
    var obj = util.buildPage(split, model, brand, series, page, util.pageSize);

    async function getPage() {
        var result = await pool.ROW(obj.sql, obj.params);
        res.end(JSON.stringify(result));
    }

    getPage();
});

//显示竞价大厅
router.get('/hall', function (req, res, next) {
    res.render('website/hall', {
        'active': 'hall',
        'breadcrumb': true,
        'title': '竞价大厅'
    });
});

router.get('/countAuction', function (req, res, next) {
    async function getTotal() {
        var result = await pool.FIRST(sql.auctionCar.count, null);
        console.log(result);
        res.end(JSON.stringify(result));
    }

    getTotal();
});

router.get('/showAuction/:page', function (req, res, next) {
    var page = req.params.page ? req.params.page : 1;
    var start = (page - 1) * util.pageSize;

    async function getPage() {
        var result = await pool.ROW(sql.auctionCar.page, [start, util.pageSize]);
        res.end(JSON.stringify(result));
    }

    getPage();
});


//显示旧件预约
router.get('/order', function (req, res, next) {
    res.render('website/order', {
        'active': 'order',
        'breadcrumb': true,
        'title': '旧件预约'
    });
});

// router.get('/queryWithCriteria', function (req, res, next) {
//     var model = req.query.model ? req.query.model : '';
//     var brand = req.query.brand ? req.query.brand : '';
//     var series = req.query.series ? req.query.series : '';
//     var obj = util.buildPage(model, brand, series, 1);
//
//     async function getCriteria() {
//         var result = await pool.ROW(obj.sql, obj.params);
//         console.log(result);
//         res.end(JSON.stringify(result));
//     }
//
//     getCriteria();
// });


module.exports = router;
