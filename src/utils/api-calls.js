import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-tu4n.onrender.com/api",
});

function getArticles(page = 1, limit) {
  return ncNewsApi
    .get("/articles", {
      params: {
        p: page,
        limit: limit,
      },
    })
    .then((response) => {
      const articles = response.data.articles;
      return { articles };
    })
    .catch((error) => {
      console.log(error);
    });
}

function getArticleById(id){
    return ncNewsApi
      .get(`/articles/${id}`)
      .then((response) => {
        const article = response.data.article;
        return { article };
      })
      .catch((error) => {
        console.log(error);
      });
}

export { getArticles, getArticleById };