const userCtrl = {};
const User = require("../models/User");
const Service = require("../models/Service");
const Employee = require("../models/Employee");
const Article = require("../models/Article");
const About = require("../models/About-us");
const passport = require("passport");

userCtrl.renderSignUpForm = async (req, res) => {
  const services = await Service.find().lean();
  res.render("users/signup", { services });
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

userCtrl.renderSignInForm = async (req, res) => {
  const services = await Service.find().lean();
  res.render("users/signin", { services });
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

// userCtrl.renderIndexAdmin = async (req, res) => {
//   try {
//     const services = await Service.find().lean();
//     const articles = await Article.find().lean();
//     res.render("users/index-admin", { services, articles });
//   } catch (error) {
//     res.status(500).send({ status: "ERROR", message: error.message });
//   }
// };

// -------------------------- SERVICES SECTION -----------------------------

// Create new services
userCtrl.renderServiceForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    res.render("users/add-service", { services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.createNewService = async (req, res) => {
  try {
    const { title, introduction, description } = req.body;
    if (req.file != undefined) {
      const name = req.file.originalname;
      var image = "/images/services_img/" + name;
      const newService = new Service({
        title,
        introduction,
        description,
        image,
      });
      await newService.save();
    } else {
      const newService = new Service({
        title,
        introduction,
        description,
      });
      await newService.save();
    }
    req.flash("success_msg", "Servicio agregado exitosamente!!");
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Edit services
userCtrl.renderEditServiceForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const service = await Service.findById(req.params.id).lean();
    res.render("users/edit-service", { service, services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.updateService = async (req, res) => {
  try {
    const { title, introduction, description } = req.body;
    if (req.file != undefined) {
      const name = req.file.originalname;
      var image = "/images/services_img/" + name;
      await Service.findByIdAndUpdate(req.params.id, {
        title,
        introduction,
        description,
        image,
      });
    } else {
      await Service.findByIdAndUpdate(req.params.id, {
        title,
        introduction,
        description,
      });
    }
    req.flash("success_msg", "Servicio editado exitosamente!!");
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Delete service
userCtrl.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Servicio eliminado exitosamente!!");
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// -------------------------- ABOUT US / EMPLOYEES SECTION -----------------------------

userCtrl.renderAboutUsAdmin = async (req, res) => {
  try {
    const aboutContent = await About.findById(
      "5ed32e209d71ae447832f876"
    ).lean();
    const services = await Service.find().lean();
    const employees = await Employee.find().lean();
    res.render("users/about-us", { employees, services, aboutContent });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.renderAboutForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const aboutContent = await About.findById(
      "5ed32e209d71ae447832f876"
    ).lean();
    res.render("about-us-form", { services, aboutContent });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.editAbout = async (req, res) => {
  try {
    const {
      title,
      description1,
      mision,
      vision,
      subtitle,
      title2,
      description2,
    } = req.body;
    if (req.file != undefined) {
      const name_img = req.file.originalname;
      var image = "/images/" + name_img;
      await About.findByIdAndUpdate("5ed32e209d71ae447832f876", {
        title,
        description1,
        mision,
        vision,
        subtitle,
        title2,
        description2,
        image,
      });
    } else {
      await About.findByIdAndUpdate("5ed32e209d71ae447832f876", {
        title,
        description1,
        mision,
        vision,
        subtitle,
        title2,
        description2,
      });
    }
    req.flash("success_msg", "Sección Nosotros actualizada exitosamente!!");
    res.redirect("/about-us");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Add new employee
userCtrl.renderEmployeeForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    res.render("users/add-employee", { services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.createNewEmployee = async (req, res) => {
  try {
    const {
      name,
      position,
      id_card,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    if (req.file != undefined) {
      const name_img = req.file.originalname;
      var image = "/images/employees/" + name_img;
      const newEmployee = new Employee({
        name,
        id_card,
        image,
        position,
        facebook,
        twitter,
        instagram,
        linkedin,
      });
      await newEmployee.save();
    } else {
      const newEmployee = new Employee({
        name,
        position,
        id_card,
        facebook,
        twitter,
        instagram,
        linkedin,
      });
      await newEmployee.save();
    }
    req.flash("success_msg", "Empleado agregado exitosamente!!");
    res.redirect("/about-us");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Edit employees
userCtrl.renderEditEmployeeForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const employee = await Employee.findById(req.params.id).lean();
    res.render("users/edit-employee", { employee, services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

userCtrl.updateEmployee = async (req, res) => {
  try {
    const { name, position, facebook, twitter, instagram, linkedin } = req.body;
    if (req.file != undefined) {
      const name_img = req.file.originalname;
      var image = "/images/employees/" + name_img;
      await Employee.findByIdAndUpdate(req.params.id, {
        name,
        image,
        position,
        facebook,
        twitter,
        instagram,
        linkedin,
      });
    } else {
      await Employee.findByIdAndUpdate(req.params.id, {
        name,
        position,
        facebook,
        twitter,
        instagram,
        linkedin,
      });
    }
    req.flash("success_msg", "Empleado editado exitosamente!!");
    res.redirect("/about-us");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Delete employee
userCtrl.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Empleado eliminado exitosamente!!");
    res.redirect("/about-us");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

module.exports = userCtrl;
