var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
	// need extended: true in order to parse objects into AJAX call



var currentUser = 22;
	// placeholder, until I allow multiple users



app.get('/', function(req, res) {
	res.render('index');
});
app.get('/add', function(req, res) {
	res.render('add');
});
app.get('/summary', function(req, res) {
	res.render('summary');
});
app.use('/results', require('./controllers/results'));
app.use('/process', require('./controllers/process'));



app.listen(3000, function() {
	console.log("Smooth sailing...");
});