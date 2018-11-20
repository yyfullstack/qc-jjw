var sql = {
    carModel: {
        query: 'SELECT CAR_KIND AS name FROM car_kind_issue',
    },
    carBrand: {
        query: 'SELECT CAR_BRAND_NAME AS name, PRE_CHAR AS pre FROM car_brands WHERE ISSUE_FLAG = "1" order by PRE_CHAR',
    },
    carSeries: {
        queryByBrand: 'SELECT CAR_SERIAL_NAME AS name FROM car_brands_serial WHERE CAR_BRAND_NAME = ? and ISENABLE = "1"  order by ORDERN',
        queryHot: 'SELECT CAR_SERIAL_NAME AS name FROM car_brands_serial WHERE ISHOT = "1" and ISENABLE = "1"  order by ORDERN'
    },

    car: {
        count: 'SELECT COUNT(*) as total FROM car WHERE ENSPLIT = ? and ISSUE_FLAG IN("9", "a")',

        page: 'SELECT CARID AS id, CAR_BRAND_NAME AS brand, CAR_SERIAL_NAME AS series, CAR_KIND AS model, MADE_YEAR as modeyear, FUEL_NAME as fuel, COLOR as color, CAR_OWNER_TYPE AS resource FROM car WHERE ENSPLIT = ? and ISSUE_FLAG IN("9", "a") order by CARID desc limit ?,?',

        // 'SELECT CARID AS id, CAR_BRAND_NAME AS brand,CAR_SERIAL_NAME AS series, CAR_KIND AS model,MADE_YEAR,FUEL_NAME,COLOR,CAR_OWNER_TYPE AS resource ' +
        //     'FROM car ' + criteria + ' order by carid desc' + ' limit ' + start + ',' + pageSize;


        pageWithCriteria: 'SELECT CARID AS id, CAR_BRAND_NAME AS brand, CAR_SERIAL_NAME AS series, CAR_KIND AS model, MADE_YEAR AS madeyear, ' +
        'FUEL_NAME AS fuel, COLOR AS color, CAR_OWNER_TYPE  AS resource FROM car WHERE ENSPLIT = ? and CAR_KIND = ? and CAR_BRAND_NAME = ?  and CAR_SERIAL_NAME = ? and `MADE_YEAR` = ? and ISSUE_FLAG IN("9", "a") order by CARID desc limit ?, ?',
    },
    auction: {
        count: 'SELECT COUNT(*) as total FROM auction WHERE STATUS IN("1", "9")',

    },

    auctionCar: {
        count: 'SELECT COUNT(*) as total FROM auction_d where AUCTION_ID in (SELECT AUCTION_ID FROM auction WHERE STATUS IN("1", "9"))',
        page: ' select AUCTION_D_ID AS id, AUCTION_D_NAME as name, AUCTION_STARTDATE AS start, AUCTION_ENDDATE as end, AMOUNT_START as start_price FROM auction_d where AUCTION_ID in (SELECT AUCTION_ID FROM auction WHERE STATUS IN("1", "9")) ORDER BY AUCTION_D_ID DESC  limit ?,?'
    }
};


module.exports = sql;