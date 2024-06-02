var mongoose = require("mongoose");
var Donor = require("../models/Donor");
const cookieParser = require('cookie-parser');

var donorcontroller = {};

//Função para mostrar os utilizadores em especifico
donorcontroller.show = function(req,res){
  const role = req.cookies['role']
  Donor.findOne({ _id: req.params.id}).then(function(donor){
    console.log(donor);
    console.log("Found the donor!");
    res.render("Donor/show", {donor: donor, role: req.cookies.role, name: req.name, image: req.image});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para editar os utilizadores
donorcontroller.edit = function(req,res){
  const role = req.cookies['role']
  Donor.findOne({_id: req.params.id}).then(function(donor){
    console.log(donor);
    console.log("Found the donor!");
    res.render("Donor/edit", {donor: donor, role: req.cookies.role, name: req.name, image: req.image});
  }).catch(function(err){
    console.log(err);
  });
};

// Função para atualizar as informações de um doador
donorcontroller.update = function(req, res) {
  Donor.findByIdAndUpdate(req.params.id, {
      $set: {
          name: req.body.name,
          email: req.body.email,
          birthdate: req.body.birthdate,
          address: req.body.address,
          location: req.body.location,
          nif: req.body.nif,
          cell: req.body.cell,
          points: req.body.points
      }
  }, { new: true }).then(function(donor) {
      if (donor) {
          res.redirect('/donor/show/' + donor.id);
      } else {
          res.redirect('/donor/list');
      }
  }).catch(function(err) {
      console.log(err);
  });
};

//Função para renderizar a página de registo de um novo donor
donorcontroller.register = function(req,res){
    const role = req.cookies['role']
    res.render("Donor/register", {role: req.cookies.role, name: req.name, image: req.image});
  };

  //Função para listar todos os doadores
  donorcontroller.list = function(req,res){
  const role = req.cookies['role']
  Donor.find().then(function(donor){
    console.log("Sucessfully loaded all donors!");
    res.render("Donor/list", {donor: donor, role: req.cookies.role, name: req.name, image: req.image});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para apagar um doador
donorcontroller.delete = function(req,res){
  Donor.deleteOne({_id: req.params.id}).then(function(){
    console.log("Donor Deleted!");
    res.redirect('/donor');
  }).catch(function(err){
    console.log(err);
  });
};

  module.exports = donorcontroller;