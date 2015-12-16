// take array and
// 	send to database
// redirect to summary.ejs

var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
