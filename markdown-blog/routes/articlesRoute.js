const express = require("express");  
const articlesController = require('../controllers/articlesController');
const {createIDandDate, fetchArticle} = require('../middlewares/articlesMiddleware');
const router = express.Router();

router.get('/', articlesController.getArticles);

router.get("/new", articlesController.newArticleForm);

router.get("/edit/:id", articlesController.editArticleForm );

router.get("/:slug", articlesController.getArticle);

router.post( "/", createIDandDate ,articlesController.saveArticleAndRedirect("new") );

router.put( "/:id", fetchArticle , articlesController.saveArticleAndRedirect("edit") );

router.delete("/:id", articlesController.deleteArticle);

module.exports = router;
