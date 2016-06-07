var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /auth
//display login/signup form
router.get('/',function(req,res){
    // replaced res.render('auth/login');
    res.render('login_signup');
});

//POST /auth/login
//process login data and login user
router.post('/login',function(req,res){
  db.user.authenticate(req.body.username,req.body.password,function(err,user){
    if(err){
      res.send(err);
    }else if(user){
      req.session.user = user.id;
      req.flash('success','You are logged in.');
      res.redirect('/summary');
    }else{
      req.flash('danger','Invalid username or password.');
      res.redirect('/auth');
    }
  });
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
  if(req.body.password != req.body.password2){
    req.flash('danger','Passwords must match.')
    res.redirect('/auth');
  }else{
    db.user.findOrCreate({
      where:{
        username: req.body.username
      },
      defaults:{
        username: req.body.username,
        password: req.body.password,
        // name: req.body.name,
          // this was here... don't need, I don't think
        soul_tempo: -1
      }
    }).spread(function(user,created){
      if(created){
        req.session.user = user.id;
        req.flash('success','New account created! You are logged in as: ' + req.body.username);
        res.redirect('/');
      }else{
        throw new Error('A user with that username already exists.');
        res.send('A user with that username already exists.');
        req.flash('danger','A user with that username already exists.');
        res.redirect('/auth');
      }
    }).catch(function(err){
      if(err.message){
        req.flash('danger',err.message);
      }else{
        req.flash('danger','unknown error');
        console.log(err);
      }
      res.redirect('/auth');
    });
  }
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
  req.flash('info','You have been logged out.');
  req.session.user = false;
  res.redirect('/');
});


module.exports = router;