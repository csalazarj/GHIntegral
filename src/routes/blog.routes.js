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

// get all articles
router.get("/blog", renderBlog);

// new article
router.get("/blog/add", renderArticleForm);
router.post("/blog/new-article", createNewArticle);

// edit articles
router.get("/blog/edit/:id", renderEditForm);
router.put("/blog/edit/:id", updateArticle);

// delete article
router.delete("/blog/delete/:id", deleteArticle);

module.exports = router;
