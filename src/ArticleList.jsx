import React from "react";
import { getArticles } from "./utils/api-calls";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ArticleList() {
  const [displayedArticles, setDisplayedArticles] = useState([]);
  useEffect(() => {
    getArticles().then((data) => {
      setDisplayedArticles(data.articles);
    });
  }, []);

  const cardStyle = {
    display: "block",
    width: "auto",
    height: "100%",
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
        <Pagination count={10} color="primary" />
      </Stack>
    </div>
  );
}

export default ArticleList;
