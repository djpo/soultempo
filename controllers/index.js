var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/show', function(req, res) {
  var artist = req.query.artist;
  var title = req.query.title;
  console.log("Searching for '" + title + "' by " + artist + " . . .");
  /*
// Spacer Woman id:
// SOCNKKI12AB018B16C

  */
  request('http://developer.echonest.com/api/v4/song/search?api_key=CR1MTO8OI8JMEZIYJ&artist=' + artist + "&title=" + title, function(err, response, body) {
    var data = JSON.parse(body);
    var id = data.response.songs[0].id;
    console.log(id);
    /*if (!err && response.statusCode === 200 && data.Search) {
      //res.render('show', {movies: data.Search,
        //                    q: query});
    } else {
      //res.render('error');
    }
    */
  });
});

/*
app.get('/movies/:imdbID', function(req, res) {
  // res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movieShow', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});
*/

module.exports = router;