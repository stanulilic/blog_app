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

router.get("/articles/:id", async (request, response) => {
  try {
    const article = await ArticleModel.findOne({ _id: request.params.id });
    response.send(article);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.patch("/articles/:id", async (request, response) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    await article.save();
    response.send(article);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.delete("/articles/:id", async (request, response) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(request.params.id);
    if (!article) {
      return response.status(404).send("Item wasn't found");
    }
    response.status(204).send();
  } catch (error) {
    response.status(500).send({ error });
  }
});

export default router;
