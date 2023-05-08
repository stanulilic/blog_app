import express from "express";
import connectDB from "./config/db.js";
import ArticleRouter from "./routes/ArticleRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ArticleRouter);

connectDB();

app.get("/", (request, response) => {
  response.send({ message: "Hello from an Express API!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
