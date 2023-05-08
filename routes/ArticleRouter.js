import express from "express";
import ArticleModel from "../models/article.js";
const router = express.Router();

router.post("/articles", async (request, response) => {
  const article = new ArticleModel(request.body);

  try {
    await article.save();
    response.send(article);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/articles", async (request, response) => {
  try {
    const articles = await ArticleModel.find({});
    response.send(articles);
  } catch (error) {
    response.status(500).send({ error });
  }
});

export default router;
