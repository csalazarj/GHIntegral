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

// indexCtrl.renderError = async (req, res) => {
//   res.status(404).render("Error404");
// };

module.exports = indexCtrl;
