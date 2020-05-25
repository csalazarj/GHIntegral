const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  introduction: { type: String, required: true },
  description: { type: String, required: true },
  // description: { type: [{ type: String, required: true }], default: [] },
  image: { type: String, required: false },
  route: { type: String, required: true },
});

module.exports = model("Service", ServiceSchema);
