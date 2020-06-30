var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use('/', indexRouter);

app.get('/:room', (req, res) => {
    res.render('room.pug', {roomName: roomId: req.params.room});
});

module.exports = app;
