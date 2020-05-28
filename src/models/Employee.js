const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  facebook: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
});

module.exports = model("Employee", EmployeeSchema);
