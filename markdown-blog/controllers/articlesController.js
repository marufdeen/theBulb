const Articles = require("../models/articles");

// Initilaize the articlesController object
const articlesController = {};

articlesController.getArticles = async (req, res) => {
  const articles = await Articles.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
};

articlesController.newArticleForm = (req, res) => {
  res.render("articles/new", { article: new Articles() });
};

articlesController.editArticleForm = async (req, res) => {
  const article = await Articles.findById(req.params.id);
  res.render("articles/edit", { article });
};

articlesController.getArticle = async (req, res) => {
  const article = await Articles.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article });
};
articlesController.deleteArticle = async (req, res) => {
  await Articles.findByIdAndDelete(req.params.id);
  res.redirect("/articles/");
};

articlesController.saveArticleAndRedirect = (path) => {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save(); 
        res.redirect(`/articles/${article.slug}`);
      } catch (e) {
        console.log(e.message);
        res.render(`articles/${path}`, { article });
      }
    };
  };
  
module.exports = articlesController;
