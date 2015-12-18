var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var db = require('./models');

var app = express();
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
	// need extended: true in order to parse objects into AJAX call
app.use(session({
  secret:'whraioadfgnioadlkjajkl',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());


app.use(function (req, res, next) {
	if (req.session.user){
		db.user.findById(req.session.user).then(function(user){
			req.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		next();
	}
});
app.use(function (req, res, next) {
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});


///// routes
app.get('/', function(req, res) {
	res.render('index');
});
app.get('/add',function(req, res) {
  if(req.currentUser){
    res.render('add');
  }else{
    req.flash('danger','you must log in before adding songs to your collection');
    res.redirect('/');
  }
});
app.use('/auth', require('./controllers/auth.js'));
app.use('/results', require('./controllers/results'));
app.use('/process', require('./controllers/process'));
app.use('/summary', require('./controllers/summary'));


// new routes



///// listen for connections
app.listen(process.env.PORT || 3000);