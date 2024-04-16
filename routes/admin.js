var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/', authController.verifyLoginUser  ,function(req, res, next) {
  user.list(req,res);
});
router.get('/login', authController.createLogin);

// TODO NEED TO REMOVE SINCE WE ARE NOT VALIDATING THE USER
router.get('/show', authController.showAdmin);

router.get('/show/:id', authController.verifyLoginUser  ,function(req,res){
  user.show(req,res);
});

router.post('/delete/:id', authController.verifyAdmin, function(req,res){
  user.delete(req,res);
});

router.get('/edit/:id', authController.verifyLoginUser  ,function(req,res){
  user.edit(req,res);
});

router.post('/update/:id', authController.verifyLoginUser ,function(req,res){
  user.update(req,res);
});

router.post('/save', authController.register);


module.exports = router;
