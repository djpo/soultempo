var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
	console.log('_____coming to you from process.js_____');

	req.session.myIds = req.body.idsToPass;

	//var procIdArray = req.body.idsToPass;
	//console.log(procIdArray);
	//console.log(res.redirect);


	// adds these to db


	// res.render('summary', {message: 'some string from process.js', ids: procIdArray});
	res.status(200).send('Stuff');
	//res.send('Here is my message');
});



module.exports = router;