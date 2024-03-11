import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-tu4n.onrender.com/api",
});

function getArticles() {
  return ncNewsApi
    .get("/articles")
    .then((response) => {
      const articles = response.data.articles;
      return { articles };
    })
    .catch((error) => {
      console.log(error);
    });
}

export { getArticles };
