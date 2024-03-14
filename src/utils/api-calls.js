import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-tu4n.onrender.com/api",
});

function getArticles(page = 1, limit, slug, sortBy, direction) {
  if (sortBy === "") sortBy = undefined;
  if (direction === "") direction = undefined;
  return ncNewsApi
    .get("/articles", {
      params: {
        p: page,
        limit: limit,
        topic: slug,
        sort_by: sortBy,
        order: direction,
      },
    })
    .then((response) => {
      const articles = response.data.articles;
      return { articles };
    })
    .catch((error) => {
      return error;
    });
}

function getArticleById(id) {
  return ncNewsApi
    .get(`/articles/${id}`)
    .then((response) => {
      const article = response.data.article;
      return { article };
    })
    .catch((error) => {
      return error;
    });
}

function getCommentsById(id) {
  return ncNewsApi
    .get(`/articles/${id}/comments?limit=100000`)
    .then((response) => {
      const comments = response.data.comments;
      return { comments };
    })
    .catch((error) => {
      return error;
    });
}

function vote(id, integer, endpoint) {
  const votes = { inc_votes: integer };
  return ncNewsApi.patch(`/${endpoint}/${id}`, votes);
}

function postComment(articleId, username, body) {
  const data = { username: username, body: body };
  return ncNewsApi
    .post(`/articles/${articleId}/comments`, data)
    .then((response) => {
      return response.data.comment;
    });
}

function deleteComment(commentId) {
  return ncNewsApi.delete(`comments/${commentId}`);
}

function getTopics() {
  return ncNewsApi
    .get("/topics")
    .then((response) => {
      const topics = response.data.topics;
      return { topics };
    })
    .catch((error) => {
      return error;
    });
}

export {
  getArticles,
  getArticleById,
  getCommentsById,
  vote,
  postComment,
  deleteComment,
  getTopics,
};
