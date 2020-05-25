const userCtrl = {};
const User = require("../models/User");
const Service = require("../models/Service");
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

userCtrl.signIn = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sesión Cerrada Exitosamente");
  res.redirect("/");
};


userCtrl.renderIndexAdmin = async (req, res) => {
  try {
    const services = await Service.find().lean()
    res.render("users/index-admin", { services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};



// Create new services
userCtrl.renderServiceForm = (req, res) => {
  try {
    res.render("users/add-service");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.createNewService = async (req, res) => {
  try {
    const { title, introduction, description, route } = req.body;
    if (req.file != undefined) {
      const name = req.file.originalname;
      var image = "/images/services_img/" + name;
      const newService = new Service({
        title,
        introduction,
        description,
        image,
        route,
      });
      await newService.save();
    } else {
      const newService = new Service({
        title,
        introduction,
        description,
        route,
      });
      await newService.save();
    }
    req.flash("success_msg", "Servicio agregado exitosamente!!");
    res.redirect("/users/index-admin");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Edit services
userCtrl.renderEditServiceForm = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).lean();
    res.render("users/edit-service", { service });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.updateService = async (req, res) => {
  try {
    const { title, introduction, description, route } = req.body;
    if (req.file != undefined) {
      const name = req.file.originalname;
      var image = "/images/services_img/" + name;
      await Service.findByIdAndUpdate(req.params.id, {
        title,
        introduction,
        description,
        image,
        route,
      });
    } else {
      await Service.findByIdAndUpdate(req.params.id, {
        title,
        introduction,
        description,
        route,
      });
      req.flash("success_msg", "Servicio editado exitosamente!!");
      res.redirect("/users/index-admin");
    }
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Delete service
userCtrl.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Servicio eliminado exitosamente!!");
    res.redirect("/users/index-admin");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

module.exports = userCtrl;
