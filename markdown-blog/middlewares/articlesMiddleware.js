const Articles = require("../models/articles");

const fetchArticle = async (req, res, next) => {
  req.article = await Articles.findById(req.params.id);
  next();
};

const createIDandDate = async (req, res, next) => {
  req.article = new Articles(); 
  next()
}

module.exports = { fetchArticle, createIDandDate }