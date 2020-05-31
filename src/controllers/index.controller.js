const indexCtrl = {};
const Service = require("../models/Service");
const Article = require("../models/Article");
const Employee = require("../models/Employee");
const About = require("../models/About-us");

indexCtrl.renderIndex = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const articles = await Article.find().lean();
    res.render("index", { services, articles });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.renderAbout = async (req, res) => {
  try {
    const aboutContent = await About.findById(
      "5ed32e209d71ae447832f876"
    ).lean();
    const services = await Service.find().lean();
    const employees = await Employee.find().lean();
    res.render("about-us", { employees, services, aboutContent });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.renderService = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const service = await Service.findById(req.params.id).lean();
    res.render("services/service", { service, services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// indexCtrl.navigation = async (req,res)=>{
//   const services = await Service.find().lean();
//   res.render("partials/navigation", { services });
// }

// indexCtrl.renderContact = (req, res) => {
//   res.render("contact-us");
// };

// indexCtrl.renderS1 = (req, res) => {
//   res.render("services/asistencia-contable");
// };

// indexCtrl.renderS2 = (req, res) => {
//   res.render("services/asistencia-juridica");
// };

// indexCtrl.renderS3 = (req, res) => {
//   res.render("services/auditorias-sg-sst");
// };

// indexCtrl.renderS4 = (req, res) => {
//   res.render("services/gestion-humana");
// };

// indexCtrl.renderS5 = (req, res) => {
//   res.render("services/riesgo-psicosocial");
// };

// indexCtrl.renderS6 = (req, res) => {
//   res.render("services/seguridad-vial");
// };

// indexCtrl.renderS7 = (req, res) => {
//   res.render("services/seguridad-y-salud");
// };

// indexCtrl.renderS8 = (req, res) => {
//   res.render("services/seleccion-personal");
// };

module.exports = indexCtrl;
