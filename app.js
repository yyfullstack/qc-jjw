var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//启用session
// app.use(session({
//     secret: 'qcjjw',
//     key: 'qcjjw',
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 30
//     },//超时时间
//     resave: false,
//     saveUninitialized: true
// }));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// require('./routes/index')(app);
//
// /*官网后台做操作是需要，登录验证*/
// app.use(function(req,res,next){
//     if (!req.session.user) {
//         if(req.url=="/login"||req.url=="/register"){
//             next();//如果请求的地址是登录则通过，进行下一个请求
//         }
//         else
//         {
//             res.redirect('/login');
//         }
//     } else if (req.session.user) {
//         next();
//     }
// });
//
//
// /*后台登录验证*/
// require('./routes/admin')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
