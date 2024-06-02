var express = require('express');
var router = express.Router();
var path = require('path');

var authController = require('../controllers/auth.js');
var authAPI = require("../controllers/AuthAPI.js");
var entityAPI = require("../controllers/EntityAPI.js");
var user = require("../controllers/UserController.js");

/**
 * Retorna a lista das entidades em json
 */
router.get('/entity', entityAPI.listEntity );
/**
 * Recebe o id de uma entidade
 * Retorna a entidade escolhida em json
 */
router.get('/entity/show/:id', entityAPI.showEntity);

router.post('/entity/create', entityAPI.createEntity);

router.put('/entity/update/:id', entityAPI.updateEntity);


router.post('/auth/login', authAPI.login);
/**
 * Realiza o logout
 */
router.get('/logout',  authController.logout ); 
/**
 * Cria uma conta para o utilizador
 */
router.post('/register', authAPI.register);

router.get('/perfil/:id', authAPI.Userperfil);


/**
 * Recebe o nome da imagem que pretende
 * Retorna a imagem
 */
router.get('/images/:name', (req,res)=>{
    const imageName = req.params.name;
    console.log(imageName )
    if (!imageName) {
        return res.status(400).send('Nome da imagem não fornecido');
      }
    
    const imagePath = path.join(__dirname, '../public/images', imageName);
    
    

  // Verifica se o arquivo existe
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Imagem não encontrada');
    }
  });

});




module.exports = router;