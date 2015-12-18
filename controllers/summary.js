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

router.get('/', function(req, res) {
	console.log('_____summary.js GET route_____');

	db.favorite.findAll({
		where: {
			u_id: req.session.user
		}
		// order: 'updatedAt DESC'
	}).then(function(favorites) {
		var st = calcSoulTempo(favorites);
		console.log(st);

		db.user.update({
			soul_tempo: st
		}, {
			where: {
				id: req.session.user
			}
		}).then(function() {
			console.log('hmmmmmmmmmmm');
		});

		res.render('summary', {collection: favorites, st: st});
	});
});



module.exports = router;