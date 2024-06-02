var mongoose = require("mongoose");
var Entity = require("../models/Entity");
const cookieParser = require("cookie-parser");
var fs = require("fs");
var path = require ("path");

var entityController = {};

//Função para renderizar a página de registo
entityController.register = function (req, res) {
  const role = req.cookies["role"];
  res.render("Entity/register", { role: req.cookies.role, name: req.name, image: req.image});
};

entityController.save = async function (req, res) {
  try {
    const { name, email, description, contact, address, location, nif } = req.body;
    const image = req.file.filename;

    const entity = new Entity({
      name,
      email,
      description,
      image,
      contact,
      address,
      location,
      nif,
    });

    await entity.save();

    console.log("Successfully registered an entity.");
    res.redirect('/entity?mensagem=Successfully register an entity!!');
  } catch (error) {
    console.error("Error registering the entity:", error);
    res.redirect('/?mensagem=There was an error when registering the entity!');
  }
};

//Função para mostrar as entidades em especifico
entityController.show = function (req, res) {
  const role = req.cookies["role"];
  Entity.findOne({ _id: req.params.id })
    .then(function (entity) {
      console.log(entity);
      console.log("Found the Entity!");
      res.render("Entity/show", { entity: entity, role: req.cookies.role, name: req.name, image: req.image});
    })
    .catch(function (err) {
      console.log(err);
    });
};

//Função para editar as entidades
entityController.edit = function (req, res) {
  const role = req.cookies["role"];
  Entity.findOne({ _id: req.params.id }).then(function (entity) {
      console.log(entity);
      console.log("Found the entity!");
      res.render("Entity/edit", { entity : entity, role: req.cookies.role, name: req.name, image: req.image});
    })
    .catch(function (err) {
      console.log(err);
    });
};

//Função para atualizar a informação das entidades
entityController.update = function (req, res) {
  Entity.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        description: req.body.description,
        contact: req.body.contact,
        address: req.body.address,
        location: req.body.location,
        nif: req.body.nif,
      },
    },
    { new: true }
  )
    .then(function (entity) {
      if (entity) {
        res.redirect("/entity/show/" + entity.id);
      } else {
        res.redirect("/entity/list");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.redirect("/entity?mensagem=Error updating entity!");
    });
};

entityController.list = function (req, res) {
  const role = req.cookies["role"];
  Entity.find()
    .then(function (entity) {
      console.log("Sucessfully loaded all entitys benefitings!");
      res.render("Entity/list", { entity : entity, role: req.cookies.role, name: req.name, image: req.image});
    })
    .catch(function (err) {
      console.error("Error loading entities:", err);
      // Aqui você pode redirecionar para uma página de erro ou manipular de outra forma
      res.status(500).send("Error loading entities");
    });
};

//Função para apagar as entidades
entityController.delete = function(req,res){
    Entity.deleteOne({_id: req.params.id}).then(function(){
      console.log("Entity Deleted!");
      res.redirect('/entity');
    }).catch(function(err){
      console.log(err);
    });
  };

  module.exports = entityController;
