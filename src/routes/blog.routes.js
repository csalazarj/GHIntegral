const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/articles/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = Router();

const {
  renderArticleForm,
  renderBlog,
  renderBlogAdmin,
  createNewArticle,
  renderEditForm,
  updateArticle,
  deleteArticle,
  renderArticleById
} = require("../controllers/blog.controller");

const { isAutenticated } = require("../helpers/auth");

// get all articles
router.get("/blog", renderBlog);
router.get("/blog/admin-articles", isAutenticated, renderBlogAdmin);

// get article by id
router.get("/blog/article/:id", renderArticleById);


// new article
router.get("/blog/add", isAutenticated, renderArticleForm);
router.post(
  "/blog/new-article",
  isAutenticated,
  upload.single("img_file"),
  createNewArticle
);

// edit/update articles
router.get("/blog/edit/:id", isAutenticated, renderEditForm);
router.put(
  "/blog/edit/:id",
  upload.single("img_file"),
  isAutenticated,
  updateArticle
);

// delete article
router.delete("/blog/delete/:id", isAutenticated, deleteArticle);

module.exports = router;
