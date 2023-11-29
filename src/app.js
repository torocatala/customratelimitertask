var express = require('express');
var path = require('path');
var logger = require('morgan');

var publicRouter = require('./routes/public');
var privateRouter = require('./routes/private');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/public', publicRouter);
app.use('/private', privateRouter);

module.exports = app;
