var express = require('express');
var router = express.Router();

var donor = require("../controllers/DonorController.js");
const authController = require('../controllers/auth');

/* GET donors listing. */
router.get('/', authController.verifyLoginUser  ,function(req, res, next) {
  donor.list(req,res);
});

router.get('/register',  function(req,res){
  donor.register(req,res);
});

router.get('/show/:id', authController.verifyLoginUser  ,function(req,res){
  donor.show(req,res);
});

router.post('/delete/:id', authController.verifyAdmin, function(req,res){
  donor.delete(req,res);
});

router.get('/edit/:id', authController.verifyLoginUser  ,function(req,res){
  donor.edit(req,res);
});

router.post('/update/:id', authController.verifyLoginUser ,function(req,res){
  donor.update(req,res);
});

router.post('/save', authController.registerD);

module.exports = router;
