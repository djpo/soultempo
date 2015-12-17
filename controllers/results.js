var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var db = require('./../models');

var currentUser = 22;
	// another placeholder


router.get('/', function(req, res) {
	var links = [
		'http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + req.query.artist_0 + '&title=' + req.query.title_0,
		'http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + req.query.artist_1 + '&title=' + req.query.title_1,
		'http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + req.query.artist_2 + '&title=' + req.query.title_2
	];


// attempt at creating links with loop
	// for (var i = 0; i < 3; i++) {
	// 	console.log('title_'.concat(i));
	// 	artist_str = 
	// 	title_str = 'title_'.concat(i);
	// 	console.log(title_str);
	// 	links.push('http://developer.echonest.com/api/v4/song/search?api_key=' + process.env.EN_API_KEY + '&artist=' + artist + i + '&title=' + title + i);
	// }



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

	async.concat(links, getData, function(err, foundSongs) {
		console.log('____________________');
		console.log('returned songs from EN:');
		console.log(foundSongs);
		console.log('_______(end)________');


		// not working...

		// Unhandled rejection TypeError: Cannot read property 'end' of undefined
		//     at /Users/djp/GA/project2/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:163:15
		//     at Promise._execute (/Users/djp/GA/project2/node_modules/bluebird/js/release/debuggability.js:159:9)
		//     at Promise._resolveFromExecutor (/Users/djp/GA/project2/node_modules/bluebird/js/release/promise.js:460:18)
		//     at new Promise (/Users/djp/GA/project2/node_modules/bluebird/js/release/promise.js:76:14)
		//     at ConnectionManager.disconnect (/Users/djp/GA/project2/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:162:10)
		//     at ConnectionManager.$disconnect (/Users/djp/GA/project2/node_modules/sequelize/lib/dialects/abstract/connection-manager.js:261:41)
		//     at Object.pool.Pooling.Pool.destroy (/Users/djp/GA/project2/node_modules/sequelize/lib/dialects/abstract/connection-manager.js:99:14)
		//     at Object.me.destroy (/Users/djp/GA/project2/node_modules/sequelize/node_modules/generic-pool/lib/generic-pool.js:153:13)
		//     at removeIdle (/Users/djp/GA/project2/node_modules/sequelize/node_modules/generic-pool/lib/generic-pool.js:182:10)
		//     at Timer.listOnTimeout (timers.js:92:15)

		// foundSongs.forEach(function(song) {
		// 	db.favorite.findOrCreate({
		// 		where: {
		// 			song_id: song.id,
		// 			u_id: currentUser,
		// 			tempo: 888
		// 		}
		// 	}).spread(function() {
		// 		console.log("added '" + song.title + "' to favorites table");
		// 	});
		// });

		// working, but only one favorite added
		// db.favorite.findOrCreate({
		// 	where: {
		// 		song_id: foundSongs[0].id,
		// 		u_id: currentUser,
		// 		tempo: 888
		// 	}
		// }).spread(function() {
		// 	res.render('results', {foundSongs: foundSongs});
		// });

		res.render('results', {foundSongs: foundSongs});
	});
//////////////////// API REQUEST DONE
});


module.exports = router;