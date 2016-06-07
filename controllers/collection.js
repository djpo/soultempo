var express = require('express');
var router = express.Router();
var db = require('./../models');
var session = require('express-session');

function calcSoulTempo(songs) {
  var tempoNumerator = 0;
  songs.forEach(function(song) {
    tempoNumerator += song.dataValues.tempo;
  });
  return Math.round(tempoNumerator / songs.length);
};


router.all('/', function(req, res, next) {

  // if (req.currentUser) {
  if (req.session.user) {
    db.user.findById(req.session.user)
    .then(function(user) {
      if (user.soul_tempo == -1) {
        req.flash('info', 'Your collection is empty! Find some songs, add them, then check out your collection.');
        res.redirect('/add');
      } else { next(); }
    });
  } else {
    req.flash('danger','You must log in before viewing your collection.');
    res.redirect('/');
  }
});

router.get('/', function(req, res) {
  db.favorite.findAll({
    where: {u_id: req.session.user}
    // order: 'updatedAt DESC'
  }).then(function(favorites) {
      var st = calcSoulTempo(favorites) || -1;
      db.user.update({
        soul_tempo: st
      }, {
        where: {
          id: req.session.user
        }
      }).then(function() {
        // console.log('_____updated user');
      });

    res.render('collection', {collection: favorites, st: st});
  });
});


module.exports = router;
