var mongoose = require("mongoose");
var User = require("../models/User");
var usercontroller = {};

//Função para mostrar os utilizadores em especifico
usercontroller.show = function(req,res){
  const role = req.cookies['role']
  User.findOne({ _id: req.params.id}).then(function(user){
    console.log(user);
    console.log("Found the user!");
    res.render("User/show", {user: user, role: req.cookies.role, name: req.name, image: req.image});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para editar os utilizadores
usercontroller.edit = function(req,res){
  const role = req.cookies['role']
  User.findOne({_id: req.params.id}).then(function(user){
    console.log(user);
    console.log("Found the user!");
    res.render("User/edit", {user: user, role: req.cookies.role, name: req.name, image: req.image});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para atualizar a informação dos utilizadores
usercontroller.update = function(req,res){
  User.findByIdAndUpdate(req.params.id, {$set: { email: req.body.email, birthdate: req.body.birthdate, 
  address: req.body.address, location: req.body.location, nif: req.body.nif, cell: req.body.cell}}, {new: true}).then(function(user){
    if(user){
      res.redirect('/user/show/'+ user.id);
    }else {
      res.redirect('/user/list');
    }
  }).catch(function(err){
    console.log(err);
  });
};


//Função para renderizar a página de registo
usercontroller.register = function(req,res){
  const role = req.cookies['role']
  res.render("User/register", {role: req.cookies.role});
};

//Função para renderizar a página de registo
usercontroller.register1 = function(req, res, next){
  res.redirect(
    "/user/signup?mensagem= There was an error when you were logging your account!"
  );
};

//Função para listar os utilizadores
usercontroller.list = function(req,res){
  const role = req.cookies['role']
  User.find().then(function(user){
    console.log("Sucessfully loaded all employees!");
    res.render("User/list", {user: user, role: req.cookies.role, name: req.name, image: req.image});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para apagar os utilizadores
usercontroller.delete = function(req,res){
  User.deleteOne({_id: req.params.id}).then(function(){
    console.log("Employee Deleted!");
    res.redirect('/user');
  }).catch(function(err){
    console.log(err);
  });
};

module.exports = usercontroller;
