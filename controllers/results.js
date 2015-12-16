var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');


router.get('/', function(req, res) {

	console.log('____________________');
	console.log('whole request:');
	console.log(req.query);
	console.log('_______(end)________');

	var artist0 = req.query.artist_0;
	var title0 = req.query.title_0;
	var artist1 = req.query.artist_1;
	var title1 = req.query.title_1;

//////////////////// API REQUEST
	var links = [
		'http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + artist0 + '&title=' + title0,
		'http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + artist1 + '&title=' + title1
	];

	var getData = function(url, cb){
		request(url, function(err, response, body) {
			var fullResponseBody = JSON.parse(body);
			
			// if response contains ≥ 1 song, add to 
			if (!err && response.statusCode === 200 && fullResponseBody.response.songs.length > 0) {
				var returnedSong = fullResponseBody.response.songs[0];
				var returnedArtist = returnedSong.artist_name;
				var returnedTitle = returnedSong.title;
				var returnedId = returnedSong.id;
				var foundSong = {
					artist: returnedArtist,
					title: returnedTitle,
					id: returnedId
				};
			}
			// return foundSong, for use in async.concat cb below
			cb(null, foundSong);
		});
	};

	async.concat(links, getData, function(err, resultingArray) {
		console.log('____________________');
		console.log('async.concat resultingArray:');
		console.log(resultingArray);
		console.log('_______(end)________');

		// send to results view
		res.render('results', {foundSongs: resultingArray});
	});
//////////////////// API REQUEST OVER

});


module.exports = router;