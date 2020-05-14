const userCtrl = {};
const User = require("../models/User");
const passport = require("passport");

userCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

userCtrl.signUp = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 5) {
    errors.push({ text: "La contraseña debe ser de minimo 5 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({ email: email });

    if (emailUser) {
      req.flash("error_msg", "Correo ya registrado previamente");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro de Admin exitoso, Bienvenido!!");
      res.redirect("/users/signin");
    }
  }
};

userCtrl.renderSignInForm = (req, res) => {
  res.render("users/signin");
};

userCtrl.signIn = (req, res) => {
  res.send("Sign In");
};

userCtrl.logout = (req, res) => {
  res.send("Log Out");
};

module.exports = userCtrl;
