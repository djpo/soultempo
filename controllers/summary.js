var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res) {
	console.log(req.query);
	console.log('-----');

	var foundSongs = [];

	for (var i = 0; i < 3; i++) {
	// or need to do some .spread thing

		var artist = req.query.artist_0;
		var title = req.query.title_0;
		/* not working
		var artist = req.query.artist_ + i;
		var title = req.query.title_ + i;
		*/

		console.log("Searching for '" + title  + "' by " + artist + " . . .");

		/*
		//TODO replace 'CR1MTO8OI8JMEZIYJ' with 'process.enc.API_KEY 'or something
		request('http://developer.echonest.com/api/v4/song/search?api_key=' + 'CR1MTO8OI8JMEZIYJ' + '&artist=' + artist + "&title=" + title, function(err, response, body) {
			var data = JSON.parse(body);

			if (!err && response.statusCode === 200 && data.response.songs.length > 1) {
				var id = data.response.songs[0].id;
				console.log('(song id: ' + id + ') added to list...');	
			}
		});
		*/

	}
	// res.render('summary', {justOneId: array});
});


module.exports = router;