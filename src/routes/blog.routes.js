const { Router } = require("express");
const router = Router();

const {
  renderArticleForm,
  renderBlog,
  createNewArticle,
  renderEditForm,
  updateArticle,
  deleteArticle
} = require("../controllers/blog.controller");

const {isAutenticated} = require('../helpers/auth');

// get all articles
router.get("/blog", renderBlog);

// new article
router.get("/blog/add",isAutenticated, renderArticleForm);
router.post("/blog/new-article", isAutenticated , createNewArticle);

// edit articles
router.get("/blog/edit/:id", isAutenticated , renderEditForm);
router.put("/blog/edit/:id", isAutenticated , updateArticle);

// delete article
router.delete("/blog/delete/:id", isAutenticated , deleteArticle);

module.exports = router;
