var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// var db = require('./models');

app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

var homepage = require('./controllers/index.js');
app.use('/', homepage);


app.listen(3000);