var express = require('express');
var router = express.Router();
var Entity = require("../models/Entity");
var User = require("../models/User");
const cookieParser = require('cookie-parser');

var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save

var user = require("../controllers/UserController.js");
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  const role = req.cookies['role']
  const user = req.cookies['auth-token']
  Entity.find().then(function(entitys){
    Entity.find().then(function(entitys){
      console.log("Sucessfully loaded everything!");
      res.render('index', {role: req.cookies.role, user: req.cookies.user});
    }).catch(function(err){
      console.log(err);
    });
  }).catch(function(err){
    console.log(err);
  });
});



//LOGIN

router.post('/signin', authController.submittedLogin);

router.get('/logout', authController.verifyLoginUser , authController.logout );

//ADMIN







router.get('/admin', authController.verifyLoginUser , function(req, res, next) {
  const role = req.cookies['role']
  res.render('admin', {role: req.cookies.role, name: req.name, image: req.image});
});


module.exports = router;
