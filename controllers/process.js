var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
	console.log('_____coming to you from process.js POST route_____');

	req.session.myIds = req.body.idsToPass;

	//var procIdArray = req.body.idsToPass;
	//console.log(procIdArray);
	//console.log(res.redirect);


	// adds these to db


	res.status(200).send('Stuff');

});



module.exports = router;