var m = require('./auction_car');
m.queryAsPage(1, 10, function (result) {

    // var arr = JSON.parse(result);

    console.log(result);
});