// take array and send to database
	// right now, it's going from results.js

// redirect to summary.ejs

var express = require('express');
var db = require('./../models');
var router = express.Router();

// function calcSoulTempo(tempos) {
// 	var tempoNumerator = 0;
// 	tempos.forEach(function(tempo) {
// 		tempoNumerator += tempo;
// 	});
// 	return tempoNumerator / tempos.length;
// }



router.post('/', function(req, res) {
	console.log('_____coming to you from process.js_____');

	console.log(req.query);

	console.log(req.query.oneId);
	console.log(req.query.song_0);

	var findme1 = req.query.oneId;
	var findme2 = req.query.song_0;

	console.log(findme1);
	console.log(findme2);

});

/* from omdb
router.post('/', function(req, res) {
	db.favorite.findOrCreate({
		where: {
			imdbID: req.body.imdbID
		},
		defaults: {
			year: req.body.year,
			title: req.body.title
		}
	}).spread(function(favorite, created) {
		console.log(favorite.get());
		res.redirect('/summary');
	});
});
*/

/* from omdb
router.get('/', function(req, res) {
	db.favorite.findAll({
		// order: 'title ASC'
	}).then(function(favorites) {
		res.render('summary', {favorites: favorites}, {soulTempo: });
	});
});
*/


// res.render('summary');


module.exports = router;