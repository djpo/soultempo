var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var db = require('./../models');

router.get('/', function(req, res) {

	// console.log('____________________');
	// console.log('whole request:');
	// console.log(req.query);
	// console.log('_______(end)________');

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

	async.concat(links, getData, function(err, foundSongs) {
		console.log('____________________');
		console.log('---async... API request... foundSongs:');
		console.log(foundSongs);
		console.log('_______(end)________');

		// add song ids to favorites table
		db.favorite.findOrCreate({
			where: {
				song_id: foundSongs[0].id,
				u_id: Math.ceil(Math.random() * 100),
				tempo: 888
			}
			// working, but static values
			// where: {
			// 	song_id: 8,
			// 	u_id: 40,
			// 	tempo: 104.99
			// }
		}).spread(function() {
			// render results view
			res.render('results', {foundSongs: foundSongs});
		});
	});
//////////////////// API REQUEST OVER
});


module.exports = router;