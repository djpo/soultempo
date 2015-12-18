var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');


router.post('/', function(req, res) {
	var links = [];
	if (!req.body.artist_0 && !req.body.title_0) {
		console.log('1st search has no artist nor title');
	} else {
		links.push('http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + req.body.artist_0 + '&title=' + req.body.title_0);
	}
	if (!req.body.artist_1 && !req.body.title_1) {
		console.log('2nd search field has no artist nor title');
	} else {
		links.push('http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + req.body.artist_1 + '&title=' + req.body.title_1);
	}
	if (!req.body.artist_2 && !req.body.title_2) {
		console.log('2nd search field has no artist nor title');
	} else {
		links.push('http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + req.body.artist_2 + '&title=' + req.body.title_2);
	}

//////////////////// API REQUEST
	var getData = function(url, cb){
		request(url, function(err, response, body) {
			var fullResponseBody = JSON.parse(body);
			// if response contains ≥ 1 song, add to foundSongs
			if (!err && response.statusCode === 200 && fullResponseBody.response.songs.length > 0) {
				var returnedSong = fullResponseBody.response.songs[0];
				var foundSong = {
					artist: returnedSong.artist_name,
					title: returnedSong.title,
					id: returnedSong.id
				};
			} else if (err) {
				console.log(err);
			} else if (response.statusCode !== 200) {
				console.log('statusCode: ' + response.statusCode);
			} else if (fullResponseBody.response.songs.length <= 0) {
				console.log('no songs found by those search terms');
			}
			// return foundSong, for use in async.concat cb below
			cb(null, foundSong);
		});
	};

	console.log('____________________');
	console.log('EN API search initiated...');
	async.concat(links, getData, function(err, foundSongs) {
		console.log('EN API search complete. Songs found:');
		console.log('____________________');
		console.log(foundSongs);
		console.log('_______(end)________');

		res.render('results', {foundSongs: foundSongs});
	});
//////////////////// API REQUEST DONE
});


module.exports = router;