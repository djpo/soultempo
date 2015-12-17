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


router.post('/', function (req, res) {
	console.log('_____coming to you from process.js_____');
	console.log(req.body.mySongs);
	var newSongsArray = req.body.mySongs;

	res.render('summary', {message: 'with some data!'});
});



module.exports = router;