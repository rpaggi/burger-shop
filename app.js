require('getmodule');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//  |==-- -------- ------- --- ------------ --== |
//  |==-- DATABASE MODULES AND INFORMATIONS --== |
//  |==-- -------- ------- --- ------------ --== |

var mariadb = require('mariasql');
var mysqlDump = require('mysqldump');
var connection = require('express-mariaconnection');
var connDump = getmodule('api_modules/conn-dump');
var dbinfo = {
  host: 'localhost',
  user: 'root',
  password : 'senha',
  charset: 'utf8',
  port : 3306,
  db:'burgershop',
  ifNotExist:true,
  backfile:'./backups/database.sql',
  tables:['clients', 'profiles', 'logins', 'order_sources', 'tables', 'orders', 'products', 'order_itens'],
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('host', 'localhost');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
   connection(mariadb,dbinfo)
);
app.use(
  connDump(mysqlDump,dbinfo)
);

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
