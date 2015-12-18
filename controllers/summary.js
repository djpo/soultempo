var express = require('express');
var router = express.Router();
var db = require('./../models');
var session = require('express-session');

var calcSoulTempo = function(tempos) {
	var tempoNumerator = 0;
	tempos.forEach(function(tempo) {
		tempoNumerator += tempo;
	});
	return tempoNumerator / tempos.length;
};





router.get('/', function(req, res) {
	console.log('_____coming to you from summary.js GET route_____');



	console.log('summary.js sayssss::: hi');
console.log(session.currentUser);
console.log('summary.js sayssss::: now the route...');

	db.favorite.findAll({
		where: {
			u_id: 40
		}
		// order: 'updatedAt DESC'
	}).then(function(favorites) {
		res.render('summary', {collection: favorites});
	});

	// calculate soul tempo
	// insert soul tempo into db?
	// send to summary below


	// res.render('summary', {ids: req.session.myIds});
});



module.exports = router;