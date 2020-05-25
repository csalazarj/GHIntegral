const indexCtrl = {};
const Service = require("../models/Service");

indexCtrl.renderIndex = async (req, res) => {
  try {
    const services = await Service.find().lean();
    res.render("index", { services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

indexCtrl.renderAbout = (req, res) => {
  res.render("about-us");
};

indexCtrl.renderContact = (req, res) => {
  res.render("contact-us");
};

indexCtrl.renderS1 = (req, res) => {
  res.render("asistencia-contable");
};

indexCtrl.renderS2 = (req, res) => {
  res.render("asistencia-juridica");
};

indexCtrl.renderS3 = (req, res) => {
  res.render("auditorias-sg-sst");
};

indexCtrl.renderS4 = (req, res) => {
  res.render("gestion-humana");
};

indexCtrl.renderS5 = (req, res) => {
  res.render("riesgo-psicosocial");
};

indexCtrl.renderS6 = (req, res) => {
  res.render("seguridad-vial");
};

indexCtrl.renderS7 = (req, res) => {
  res.render("seguridad-y-salud");
};

indexCtrl.renderS8 = (req, res) => {
  res.render("seleccion-personal");
};

module.exports = indexCtrl;
