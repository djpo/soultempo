var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');


router.post('/', function(req, res) {
  console.log('******************************');
  console.log('******************************');

  var searchUrls = [];
  var urlBeg = 'https://api.spotify.com/v1/search?q=';
  var urlEnd = '&type=track&limit=5';

  console.log('*************** input logic');
  if (!req.body.artist_0 && !req.body.title_0) {
    console.log('1st track: empty - not searching');
  } else if (!req.body.artist_0) {
    console.log('1st track: searching by track title only');
    searchUrls.push(urlBeg + 'track:' + req.body.title_0 + urlEnd);
  } else if (!req.body.title_0) {
    console.log('1st track: searching by track artist only');
    searchUrls.push(urlBeg + 'artist:' + req.body.artist_0 + urlEnd);
  } else {
    console.log('1st track: searching by track title and artist');
    searchUrls.push(urlBeg + 'artist:' + req.body.artist_0 + '&20track:' + req.body.title_0 + urlEnd);
  }

  console.log('*************** searchUrls');
  console.log(searchUrls);

//////////////////// API REQUEST
  // call getData once for each track search
  var getData = function(url, cb) {
    // console.log('Spotify Web API search initiated...');
    request(url, function(err, res, body) {
      var resBody = JSON.parse(body);
      // console.log('*************** # of results: ' + resBody.tracks.total);
      console.log('*************** returned tracks');

      if (!err && res.statusCode == 200 && resBody.tracks.total > 0) {
        var foundSongOptions = [];

        // for each of Spotify's results (for this 1 track search)
        for (i=0; i<resBody.tracks.items.length; i++) {
          var returnedSong = resBody.tracks.items[i];
          var trackArtists = returnedSong.artists.map(function(value){ return value.name; });
          var foundSong = {
            artists: trackArtists,
            title: returnedSong.name
            // , id: returnedSong.id
          };
          console.log('***** [' + i + ']');
          console.log(foundSong);
          foundSongOptions.push(foundSong);
        }

      } else if (err) { console.log(err);
      } else if (res.statusCode !== 200) { console.log('statusCode: ' + res.statusCode);
      } else if (resBody.tracks.total <= 0) { console.log('no songs found by those search terms');
      }
      // return foundSong, for use in async.concat cb below
      cb(null, foundSongOptions);
    });
  };

  async.concat(searchUrls, getData, function(err, foundSongs) {
    console.log('*************** async.concat...');
    console.log(foundSongs.length);
    console.log(foundSongs);

    res.render('results', {foundSongs: foundSongs});
  });
//////////////////// API REQUEST DONE
});


module.exports = router;
