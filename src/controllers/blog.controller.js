const blogCtrl = {};

const Article = require("../models/Article");

blogCtrl.renderBlog = async (req, res) => {
  const articles = await Article.find().lean().sort({ createdAt: "desc" });
  res.render("blog/articles", { articles });
};

blogCtrl.renderArticleForm = (req, res) => {
  res.render("blog/new-article");
};

blogCtrl.createNewArticle = async (req, res) => {
  const { title, description, images } = req.body;
  const newArticle = new Article({ title, description, images });
  await newArticle.save();
  req.flash("success_msg", "Articulo agregado exitosamente!!");
  res.redirect("/blog");
};

blogCtrl.renderEditForm = async (req, res) => {
  const article = await Article.findById(req.params.id).lean();
  res.render("blog/edit-article", { article });
};

blogCtrl.updateArticle = async (req, res) => {
  const { title, description, images } = req.body;
  await Article.findByIdAndUpdate(req.params.id, {
    title,
    description,
    images,
  });
  req.flash("success_msg", "Articulo editado exitosamente!!");
  res.redirect("/blog");
};

blogCtrl.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Articulo eliminado exitosamente!!");
  res.redirect("/blog");
};

module.exports = blogCtrl;
