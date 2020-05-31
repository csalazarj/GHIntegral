const { Schema, model } = require("mongoose");

const AboutUsSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    description1: { type: String, required: true },
    mision: { type: String },
    vision: { type: String },
    subtitle: { type: String },
    title2: { type: String },
    description2: { type: String },

  }
);

module.exports = model('AboutUs', AboutUsSchema);