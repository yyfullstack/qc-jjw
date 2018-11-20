var util = {};
util.groupBy = function (arr, prop) {
    return arr.reduce(function (groups, item) {
        var val = item[prop].toUpperCase();
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
};

util.pageSize = 10;

util.buildPage = function (split, model, brand, series, pageNo, pageSize) {
    let sql = 'SELECT CARID AS id, CAR_BRAND_NAME AS brand, CAR_SERIAL_NAME AS series, CAR_KIND AS model, MADE_YEAR as modeyear, FUEL_NAME as fuel, COLOR as color, CAR_OWNER_TYPE AS resource FROM car WHERE 1 = 1';
    let arr = [];
    if (split != "") {
        sql += " and ENSPLIT = ?";
        arr.push(split);
    }
    if (model != "") {
        model = "%" + model + "%";
        sql += " and CAR_KIND like ?";
        arr.push(model);
    }
    if (brand != "") {
        brand = "%" + brand + "%";
        sql += " and CAR_BRAND_NAME like ?";
        arr.push(brand);
    }
    if (series != "") {
        series = "%" + series + "%";
        sql += " and CAR_SERIAL_NAME like ?";
        arr.push(series);
    }

    sql += " limit ?,?";
    arr.push((pageNo - 1) * pageSize, pageSize);

    return {
        sql: sql,
        params: arr
    }
};
util.buildCount = function (split, model, brand, series) {
    let sql = 'select count(*) as total  FROM car WHERE 1 = 1';
    let arr = [];
    if (split != "") {
        sql += " and ENSPLIT = ?";
        arr.push(split);
    }
    if (model != "") {
        model = "%" + model + "%";
        sql += " and CAR_KIND like ?";
        arr.push(model);
    }
    if (brand != "") {
        brand = "%" + brand + "%";
        sql += " and CAR_BRAND_NAME like ?";
        arr.push(brand);
    }
    if (series != "") {
        series = "%" + series + "%";
        sql += " and CAR_SERIAL_NAME like ?";
        arr.push(series);
    }
    return {
        sql: sql,
        params: arr
    }
}

module.exports = util;