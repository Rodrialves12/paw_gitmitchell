var mongoose = require("mongoose");
var Entity = require("../models/Entity");
const cookieParser = require("cookie-parser");

var apiEcontroller = {};

/**
 *
 * Esta função devolve as entidades através da api
 */
apiEcontroller.listEntity = async function (req, res, next) {
  try {
    const dblocals = await Entity.find({}).exec();
    res.json(dblocals);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

/**
 *
 * Esta função devolve uma entidade especifica através da api
 * recebe o id para verificar qual é a entidade escolhida
 */
apiEcontroller.showEntity = async function (req, res, next) {
  try {
    const dblocal = await Entity.findOne({ _id: req.params.id }).exec();
    dblocal.totalviews++;

    await dblocal.updateOne({ totalviews: dblocal.totalviews });
    res.json(dblocal);
  } catch (err) {
    console.log("Erro a ler");
    next(err);
  }
};

/**
 *
 * Esta função cria uma entidade através da api
 */
apiEcontroller.createEntity = async function (req, res, next) {
  var entity = new Entity(req.body);

  entity.save(function (err) {
    if (err) {
      console.log("Erro a gravar");
      next(err);
    } else {
      res.json(entity);
    }
  });
};

/**
 *
 * Esta função cria uma entidade através da api
 */
apiEcontroller.updateEntity = async function (req, res, next) {
  Entity.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, entity) {
      if (err) {
        console.log("Erro a gravar");
        next(err);
      } else {
        res.json(entity);
      }
    });
};

module.exports = apiEcontroller;
