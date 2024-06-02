const mongoose = require("mongoose");
const User = require("../models/User");
const Donor = require("../models/Donor");
const Entity = require("../models/Entity");
const jwt = require("jsonwebtoken");
const config = require("../jwt_secret/config");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const { raw } = require("body-parser");

let authController = {};
/**
 *
 * @param {*} req recebe o email e a password no body
 * @param {*} res
 * @param {*} next
 */
authController.submittedLogin = function (req, res, next) {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  User.findOne({ email: emailInput })
    .then(function (user) {
      bcrypt.compare(passwordInput, user.password).then(function (result) {
        if (result === true) {
          if (user.role === "admin" || user.role === "employee") {
            const authToken = jwt.sign(
              { email: user.email, role: user.role },
              config.secret,
              { expiresIn: 3600000 }
            );
            res.cookie("auth-token", authToken, { maxAge: 3600000 });
            res.cookie("role", user.role, { maxAge: 3600000 });
            res.redirect("/admin");
          } else {
            res.redirect(
              "/user/signup?mensagem= YOU DONT´T HAVE ENOUGH CREDENTIALS!"
            );
          }
        } else {
          res.redirect(
            "/user/signup?mensagem= There was an error when you were logging your account!"
          );
        }
      });
    })
    .catch(function (err) {
      res.redirect("/user/signup?mensagem= That account doesn´t exist!");
      next(err);
    });
};

/**
 *
 * Esta função serve para o utilizador dar logout
 */
authController.logout = function (req, res, next) {
  res.clearCookie("auth-token");
  res.clearCookie("role");
  res.redirect("/user/signup");
};

/**
 *
 * Esta função cria a página do login
 */
authController.createLogin = function (req, res, next) {
  const role = req.cookies["role"];
  res.render("User/login", { role: req.cookies, role });
};

/**
 *
 * Esta função regista o utilizador na base de dados
 *
 */
authController.register = async function (req, res, next) {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    const existingNif = await User.findOne({ nif: req.body.nif });

    if (existingEmail) {
      console.log("Email already exists!");
      res.redirect("/?mensagem=Email already exists!");
    } else if (existingNif) {
      console.log("Nif already exists!");
      res.redirect("/?mensagem=Nif already exists!");
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      req.body.password = hashedPassword;

      const user = new User(req.body);
      await user.save();
      console.log("Created a new user!");

      res.redirect("/?mensagem=Successfully created an account!");
    }
  } catch (error) {
    console.log(error);
    res.redirect(
      "/user/register?mensagem=An error occurred while creating your account!"
    );
  }
};

/**
 *
 * Esta função verifica se o utlizador está logado
 * So assim é que acesso ao backend
 *
 */
authController.verifyLoginUser = function (req, res, next) {
  const authToken = req.cookies["auth-token"];
  const role = req.cookies["role"];
  if (authToken) {
    jwt.verify(authToken, config.secret, async function (err, decoded) {
      const user = await User.findOne({ email: decoded.email });
      req.userEmail = decoded.email;
      req.name = user.name;
      req.image = user.image;
      next();
    });
  } else {
    //res.render('error', {message:"not authenticated!", error: {status:"",stack:""}})
    res.redirect("/user/signup?mensagem= Need to login first!");
  }
};

/**
 *
 * Esta função verifica se o utilizador logado é administrador
 *
 */
authController.verifyAdmin = function (req, res, next) {
  const authToken = req.cookies["auth-token"];
  const role = req.cookies["role"];
  if (authToken) {
    jwt.verify(authToken, config.secret, async function (err, decoded) {
      const user = await User.findOne({ email: decoded.email });
      if (user.role === "admin") {
        req.userEmail = decoded.email;
        res.cookie("role", user.role, { maxAge: 3600000 });
        next();
      } else {
        res.redirect("/?mensagem= You don´t have enough credentials!");
        next();
      }
    });
  } else {
    res.redirect("/user/signup?mensagem= Need to login first!");
  }
};

/**
 *
 * Esta função regista o doador na base de dados
 *
 */
authController.registerD = async function (req, res, next) {
  try {
    const existingEmail = await Donor.findOne({ email: req.body.email });

    const existingNif = await Donor.findOne({ nif: req.body.nif });

    if (existingEmail) {
      console.log("Email already exists!");
      res.redirect("/?mensagem=Email already exists!");
    } else if (existingNif) {
      console.log("Nif already exists!");
      res.redirect("/?mensagem=Nif already exists!");
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      req.body.password = hashedPassword;

      const donor = new Donor(req.body);
      await donor.save();
      console.log("Created a new donor!");

      res.redirect("/?mensagem=Successfully created an account!");
    }
  } catch (error) {
    console.log(error);
    res.redirect(
      "/donor/register?mensagem=An error occurred while creating your account!"
    );
  }
};
/**
 *
 * Esta função regista o entidade na base de dados
 *
 */
authController.registerE = async function (req, res, next) {
  try {
    const existingEmail = await Entity.findOne({ email: req.body.email });

    const existingNif = await Entity.findOne({ nif: req.body.nif });

    if (existingEmail) {
      console.log("Email already exists!");
      res.redirect("/?mensagem=Email already exists!");
    } else if (existingNif) {
      console.log("Nif already exists!");
      res.redirect("/?mensagem=Nif already exists!");
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      req.body.password = hashedPassword;

      const entity = new Entity(req.body);
      await entity.save();
      console.log("Created a new entity!");

      res.redirect("/?mensagem=Successfully created an account!");
    }
  } catch (error) {
    console.log(error);
    res.redirect(
      "/entity/register?mensagem=An error occurred while creating your account!"
    );
  }
};

module.exports = authController;
