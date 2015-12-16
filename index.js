var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
// var db = require('./models');
var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res) {
	res.render('index');
});
app.get('/add', function(req, res) {
	res.render('add');
});

app.use('/results', require('./controllers/results'));


app.listen(3000, function() {
	console.log("Smooth sailing...");
});