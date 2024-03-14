import React from "react";
import { getArticles } from "../utils/api-calls";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import SortArticleSelect from "./SortArticleSelect";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams, useSearchParams } from "react-router-dom";

function ArticleList() {
  let { slug } = useParams();
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const [sortParams, setSortParams] = useState({
    sortBy: searchParams.get("sort_by"),
    direction: searchParams.get("direction"),
  });
  const articlesPerPage = 6;

  useEffect(() => {
    setSortParams({
      sortBy: searchParams.get("sort_by"),
      direction: searchParams.get("direction"),
    });
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortParams, slug]);

  useEffect(() => {
    setIsLoading(true);
    setSortParams({ sortBy: "", direction: "" });
    const { sortBy, direction } = sortParams;
    getArticles(1, 1000000, slug, sortBy, direction).then((data) => {
      const totalArticles = data.articles.length;
      const maxPages = Math.ceil(totalArticles / articlesPerPage);
      setTotalPages(maxPages);
    });
  }, [slug]);

  useEffect(() => {
    setIsLoading(true);
    const { sortBy, direction } = sortParams;
    getArticles(currentPage, articlesPerPage, slug, sortBy, direction).then(
      (data) => {
        setDisplayedArticles(data.articles);
        setIsLoading(false);
      }
    );
  }, [currentPage, slug, searchParams]);

  const cardStyle = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (event, sortBy, direction) => {
    event.preventDefault();
    const params = { sortBy: sortBy, direction: direction };
    setSortParams(params);
    setSearchParams({ sort_by: sortBy, direction: direction });
  };

  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  return (
    <Box>
      <Typography variant="h4">
        {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "All Articles"}
      </Typography>
      <SortArticleSelect handleSubmit={handleSubmit} />
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
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
}

export default ArticleList;
