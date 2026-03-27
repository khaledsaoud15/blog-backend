const {
  createArticle,
  getArticle,
  getUserArticle,
  getSingleArticle,
} = require("../controllers/article.controller");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/create", auth, createArticle);
router.get("/all", getArticle);
router.get("/single-article", auth, getUserArticle);
router.get("/single-article/:id", getSingleArticle);

module.exports = router;
