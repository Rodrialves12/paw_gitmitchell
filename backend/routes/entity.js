var express = require('express');
var router = express.Router();

var entity = require("../controllers/EntityController.js");
const authController = require('../controllers/auth');

var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //  + "-" + Date.now() + ".pdf"
  },
});

var upload = multer({ storage: storage });

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(upload.single("file")); // upload.single("image")

/* GET users listing. */
router.get('/', authController.verifyLoginUser  ,function(req, res, next) {
  entity.list(req,res);
});

router.get('/register',  function(req,res){
  entity.register(req,res);
});

router.get('/show/:id', authController.verifyLoginUser  ,function(req,res){
  entity.show(req,res);
});

router.post('/delete/:id', authController.verifyAdmin, function(req,res){
  entity.delete(req,res);
});

router.get('/edit/:id', authController.verifyLoginUser  ,function(req,res){
  entity.edit(req,res);
});

router.post('/update/:id', authController.verifyLoginUser ,function(req,res){
  entity.update(req,res);
});

router.post('/save', authController.verifyLoginUser , function(req,res){
    entity.save(req,res);
  });

module.exports = router;