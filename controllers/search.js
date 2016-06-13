var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');


router.post('/', function(req, res) {
  var links = [];

  // var echoNestUrlBeg = 'http://developer.echonest.com/api/v4/song/search?api_key=';
  // if (!req.body.artist_0 && !req.body.title_0) {
  //   console.log('1st search has no artist nor title');
  // } else {
  //   links.push(echoNestUrlBeg + process.env.EN_API_KEY + '&artist=' + req.body.artist_0 + '&title=' + req.body.title_0);
  // }

  var spotifyApiUrlBeg = 'https://api.spotify.com/v1/search?q=';
  if (!req.body.artist_0 && !req.body.title_0) {
    console.log('1st track search field has no artist nor title');
  } else {
    links.push(spotifyApiUrlBeg + req.body.title_0 + '&limit=1&type=track');
  }
  if (!req.body.artist_1 && !req.body.title_1) {
    console.log('2nd track search has no artist nor title');
  } else {
    links.push(spotifyApiUrlBeg + req.body.title_1 + '&limit=1&type=track');
  }
  if (!req.body.artist_2 && !req.body.title_2) {
    console.log('3rd track search field empty');
  } else {
    links.push(spotifyApiUrlBeg + req.body.title_2 + '&limit=1&type=track');
  }

  console.log('***************1');
  console.log(links);

//////////////////// API REQUEST
  var getData = function(url, cb) {
    console.log('Spotify Web API search initiated...');
    request(url, function(err, response, body) {
      var fullResponseBody = JSON.parse(body);
      console.log('***************2');
      console.log(fullResponseBody);

      // // if response contains ≥ 1 song, add to foundSongs
      if (!err && response.statusCode == 200 && fullResponseBody.tracks.total > 0) {
        var returnedSong = fullResponseBody.tracks.items[0];
        var foundSong = {
          artist: returnedSong.artists[0].name,
          title: returnedSong.name,
          id: returnedSong.id
        };

        console.log('***************3');
        console.log(foundSong);

      } else if (err) { console.log(err);
      } else if (response.statusCode !== 200) { console.log('statusCode: ' + response.statusCode);
      } else if (fullResponseBody.tracks.total <= 0) { console.log('no songs found by those search terms');
      }
      // return foundSong, for use in async.concat cb below
      cb(null, foundSong);
    });
  };

  async.concat(links, getData, function(err, foundSongs) {
    res.render('results', {foundSongs: foundSongs});
  });
//////////////////// API REQUEST DONE
});


module.exports = router;
