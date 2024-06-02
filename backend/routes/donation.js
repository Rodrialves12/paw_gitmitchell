var express = require('express');
var router = express.Router();

var donation = require("../controllers/DonationController.js");
const authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', authController.verifyLoginUser  ,function(req, res, next) {
  donation.list(req,res);
});

router.get('/create',  function(req,res){
  donation.create(req,res);
});

router.get('/show/:id', authController.verifyLoginUser  ,function(req,res){
  donation.show(req,res);
});

router.post('/delete/:id', authController.verifyAdmin, function(req,res){
  donation.delete(req,res);
});

router.get('/edit/:id', authController.verifyLoginUser  ,function(req,res){
  donation.edit(req,res);
});

router.post('/update/:id', authController.verifyLoginUser ,function(req,res){
  donation.update(req,res);
});

router.post('/save', authController.verifyLoginUser , function(req,res){
    donation.save(req,res);
  });

module.exports = router;
