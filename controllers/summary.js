var express = require('express');
var router = express.Router();
var db = require('./../models');
var session = require('express-session');

function calcSoulTempo(songs) {
	var tempoNumerator = 0;
	songs.forEach(function (song) {
		tempoNumerator += song.dataValues.tempo;
	});
	return Math.round(tempoNumerator / songs.length);
};


router.all('/', function (req, res, next) {
	if (req.currentUser) {
		next();
	} else {
		req.flash('danger','You must log in before viewing your collection.');
		res.redirect('/');
	}
});

router.get('/', function(req, res) {
	console.log('_____summary.js GET route_____');

	db.favorite.findAll({
		where: {u_id: req.session.user}
		// order: 'updatedAt DESC'
	}).then(function(favorites) {

		console.log('---favorites.length: ' + favorites.length);


			var st = calcSoulTempo(favorites) || -1;

			db.user.update({
				soul_tempo: st
			}, {
				where: {
					id: req.session.user
				}
			}).then(function() {
				console.log('updated user...');
			});
			
		// }

		console.log('st: ' + st);
		console.log('typeof st: ' + typeof st);
		res.render('summary', {collection: favorites, st: st});
	});
});


module.exports = router;