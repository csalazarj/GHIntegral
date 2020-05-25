const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Article', ArticleSchema);