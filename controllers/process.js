var express = require('express');
var db = require('./../models');
var async = require('async');
var request = require('request');
var router = express.Router();


router.post('/', function(req, res) {
  console.log('_____process.js POST route_____');
  var procIdArray = req.body.idsToPass;

//////////
  var links = [];
  procIdArray.forEach(function(songId) {
    links.push('http://developer.echonest.com/api/v4/song/profile?api_key=' + process.env.EN_API_KEY + '&id=' + songId + '&bucket=audio_summary');
  });
  console.log(links);

  var getData = function(url, cb){
    request(url, function(err, response, body) {
      var fullResponseBody = JSON.parse(body);
      // if response contains ≥ 1 song, add to foundSongs
      if (!err && response.statusCode === 200 && fullResponseBody.response.songs.length > 0) {
        var returnedSong = fullResponseBody.response.songs[0];
        var addedSong = {
          id: returnedSong.id,
          artist: returnedSong.artist_name,
          title: returnedSong.title,
          tempo: returnedSong.audio_summary.tempo
        };
      } else if (err) {
        console.log(err);
      } else if (response.statusCode !== 200) {
        console.log('statusCode: ' + response.statusCode);
      } else if (fullResponseBody.response.songs.length <= 0) {
        console.log('no song returned');
      }
      // return foundSong, for use in async.concat cb below
      cb(null, addedSong);
    });
  };

  console.log('____________________');
  console.log('EN API calls initiated...');
  async.concat(links, getData, function(err, gatheredSongs) {
    console.log('____________________');
    console.log('EN API calls returned:');

    gatheredSongs.forEach(function(song) {
      db.favorite.findOrCreate({
        where: {
          u_id: req.session.user,
          song_id: song.id,
          artist: song.artist,
          title: song.title,
          tempo: song.tempo
        }
      }).spread(function() {
        console.log('____________________');
        console.log("added '" + song.title + "' to favorites table");
      });
    });
    console.log('_______(async end)________');
  });
//////////
  console.log('_______right before res.status(200)________');
  res.status(200).send('TestStuff');
});


module.exports = router;