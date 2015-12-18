var express = require('express');
var router = express.Router();

// function calcSoulTempo(tempos) {
// 	var tempoNumerator = 0;
// 	tempos.forEach(function(tempo) {
// 		tempoNumerator += tempo;
// 	});
// 	return tempoNumerator / tempos.length;
// }



// read all from db

router.all('/', function(req, res) {
	console.log('_____coming to you from summary.js_____');

	res.render('summary', {ids: req.session.myIds});
});



module.exports = router;