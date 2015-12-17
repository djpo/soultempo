var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('./models');
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
app.get('/summary', function(req, res) {
	res.render('summary');
});

app.use('/results', require('./controllers/results'));
app.use('/process', require('./controllers/process'));

/*
app.post('/', function(req, res) {
	db.favorite.findOrCreate({
		where: {
			song_id: 'ABCEDF',
			u_id: 55,
			tempo: 120.00
		}
	}).spread(function() {
		console.log('-----in da spread');
	});

	console.log('-----post-findOrCreate');
	res.redirect('/');
});
*/


app.listen(3000, function() {
	console.log("Smooth sailing...");
});