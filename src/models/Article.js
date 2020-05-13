const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [{ type: String, required: true }], default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Article', ArticleSchema);