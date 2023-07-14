require('dotenv').config();


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/connection');
const cors = require('cors');



//var usersRouter = require('./routes/users');
var tweetsRouter = require ("./routes/tweets")
var trendsRouter = require ("./routes/trends")
var usersRouter = require ("./routes/users")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter)
app.use('/trends', trendsRouter)
app.use('/users', usersRouter)



module.exports = app;
