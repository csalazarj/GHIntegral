const blogCtrl = {};
const Article = require("../models/Article");
const Service = require("../models/Service");

// Render Blog
blogCtrl.renderBlog = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const articles = await Article.find().lean().sort({ createdAt: "desc" });
    res.render("blog/articles", { articles, services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};


// Render Article by Id
blogCtrl.renderArticleById = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const article = await Article.findById(req.params.id).lean();
    res.render("blog/one-article", { article, services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Create Article
blogCtrl.renderArticleForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    res.render("blog/new-article", { services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

blogCtrl.createNewArticle = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (req.file != undefined) {
      const name = req.file.originalname;
      var images = "/images/articles/" + name;
      const newArticle = new Article({ title, description, images });
      await newArticle.save();
    } else {
      const newArticle = new Article({ title, description });
      await newArticle.save();
    }

    req.flash("success_msg", "Articulo agregado exitosamente!!");
    res.redirect("/blog/articles");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Update Articles
blogCtrl.renderEditForm = async (req, res) => {
  try {
    const services = await Service.find().lean();
    const article = await Article.findById(req.params.id).lean();
    res.render("blog/edit-article", { article, services });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

blogCtrl.updateArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (req.file != undefined) {
      const name = req.file.originalname;
      var images = "/images/articles/" + name;
      await Article.findByIdAndUpdate(req.params.id, {
        title,
        description,
        images,
      });
    } else {
      await Article.findByIdAndUpdate(req.params.id, {
        title,
        description,
      });
    }

    req.flash("success_msg", "Articulo editado exitosamente!!");
    res.redirect("/blog/articles");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

// Delete Article
blogCtrl.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Articulo eliminado exitosamente!!");
    res.redirect("/blog/articles");
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

module.exports = blogCtrl;
