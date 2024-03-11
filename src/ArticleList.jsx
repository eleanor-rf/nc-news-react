import React from "react";
import { getArticles } from "./utils/api-calls";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ArticleList() {
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    getArticles(1, 1000000).then((data) => {
      const totalArticles = data.articles.length;
      const maxPages = Math.ceil(totalArticles / articlesPerPage);
      setTotalPages(maxPages);
    });
    getArticles(currentPage, articlesPerPage).then((data) => {
      setDisplayedArticles(data.articles);
    });
  }, [currentPage]);

  const cardStyle = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Grid
        sx={{ p: 2 }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        direction="row"
        alignItems="stretch"
      >
        {displayedArticles.map((article) => {
          return (
            <Grid item xs={12} sm={4} md={4} key={article.article_id}>
              <Card key={article.article_id} style={cardStyle}>
                <ArticleCard article={article} key={article.article_id} />
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}

export default ArticleList;
