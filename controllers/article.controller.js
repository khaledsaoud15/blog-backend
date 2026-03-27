const responseHandler = require("../helpers/responseHandler");
const Article = require("../models/article.model");

const createArticle = async (req, res) => {
  try {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
      category: req.body.category,
      tags: req.body.tags,
      description: req.body.description,
      image: req.body.image,
    });
    await newArticle.save();
    responseHandler(res, 201, newArticle);
  } catch (err) {
    responseHandler(res, 500, err.message);
  }
};

const getArticle = async (req, res) => {
  try {
    const allArticles = await Article.find().populate("user", "username image");
    responseHandler(res, 200, allArticles);
  } catch (err) {
    responseHandler(res, 500, err.message);
  }
};

const getUserArticle = async (req, res) => {
  try {
    const article = await Article.find({ user: req.user.id });
    responseHandler(res, 200, article);
  } catch (err) {
    responseHandler(res, 500, err.message);
  }
};

const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "user",
      "username image",
    );
    if (!article) {
      return responseHandler(res, 404, "Article not found");
    }
    responseHandler(res, 200, article);
  } catch (err) {
    responseHandler(res, 500, err.message);
  }
};

module.exports = {
  createArticle,
  getArticle,
  getUserArticle,
  getSingleArticle,
};
