var mongoose = require("mongoose");
var Donation = require("../models/Donation");
var Entity = require("../models/Entity");
var Donor = require("../models/Donor");

var donationController = {};

donationController.create = async function (req, res) {
  try {
    const entities = await Entity.find({});
    const donors = await Donor.find({});

    res.render("Donation/create", {
      donors: donors,
      entities: entities,
      name: req.name, 
      image: req.image,
      role: req.role});
  } catch (err) {
    console.log("Error: ", err);
  }
};

donationController.save = async function (req, res) {
  try {
    const { donor, entity, ...parts } = req.body;

    const formattedParts = [];

    if (Array.isArray(parts["parts[type][]"])) {
      for (let i = 0; i < parts["parts[type][]"].length; i++) {
        formattedParts.push({
          type: parts["parts[type][]"][i],
          state: parts["parts[state][]"][i],
        });
      }
    } else {
      formattedParts.push({
        type: parts["parts[type][]"],
        state: parts["parts[state][]"],
      });
    }

    let totalPoints = 0;
    for (const parts of formattedParts) {
      switch (parts.state) {
        case "novo":
          totalPoints += 3;
          break;
        case "pouco-usado":
          totalPoints += 2;
          break;
        case "gasto":
          totalPoints += 1;
          break;
        default:
          break;
      }
    }

    const donation = new Donation({
      donor: donor,
      entity: entity,
      parts: formattedParts,
    });

    await donation.save();

    const donorObject = await Donor.findById(donor);
    if (!donorObject) {
      console.error("Donor not found");
      return res.status(404).send("Donor not found");
    }

    donorObject.numDonations += 1;
    donorObject.points += totalPoints;

    await donorObject.save();

    console.log("Pedido de Doacao criado com sucesso.");
    res.redirect("/donation/show/" + donation._id);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

donationController.show = async function (req, res) {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor').populate('entity');
    res.render("Donation/show", { donation: donation, name: req.name, image: req.image, role: req.role});
  } catch (err) {
    console.log("Error: ", err);
  }
};


donationController.delete = function(req,res){
  Donation.deleteOne({_id: req.params.id}).then(function(){
    console.log("Donation Deleted!");
    res.redirect('/donation');
  }).catch(function(err){
    console.log(err);
  });
};

  donationController.list = function(req,res){
    const role = req.cookies['role']
    Donation.find().populate('donor').populate('entity').then(function(donation){
      console.log("Sucessfully loaded all donations!");
      console.log(donation);
      res.render("Donation/list", {donation: donation, role: req.cookies.role, name: req.name, image: req.image, role: req.role});
    }).catch(function(err){
      console.log(err);
    });
  };

module.exports = donationController;