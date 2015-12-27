var express = require('express');
var router = express.Router();
var db = require('./../models');
var session = require('express-session');

var calcSoulTempo = function (songs) {
	var tempoNumerator = 0;
	songs.forEach(function (song) {
		tempoNumerator += song.dataValues.tempo;
	});
	return Math.round(tempoNumerator / songs.length);
};

router.all('/', function (req, res, next) {
	if(req.currentUser){
		next();
	}else{
		req.flash('danger','You must log in before viewing your collection.');
		res.redirect('/');
	}
});

router.get('/', function(req, res) {
	console.log('_____summary.js GET route_____');

	db.favorite.findAll({
		where: {
			u_id: req.session.user
		},
		// order: 'updatedAt DESC'
	}).then(function(favorites) {

		console.log('---favorites---');
		console.log(favorites);
		console.log('---------------');

		// if (favorites === []) {
		// 	console.log("favorites is empty array");
		// 	var st = -5;
		// } else {

			//console.log("favorites is not empty array");


			var st = calcSoulTempo(favorites);
			db.user.update({
				soul_tempo: st
			}, {
				where: {
					id: req.session.user
				}
			}).then(function() {
				console.log('hmmmmmmmmmmm');
			});
			
		// }

		res.render('summary', {collection: favorites, st: st});
	});
});


module.exports = router;