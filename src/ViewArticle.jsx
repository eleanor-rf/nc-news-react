import React from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "./utils/api-calls";
import { useState, useEffect } from "react";
import { formatDateString } from "./utils/utils";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function ViewArticle() {
  const [displayedArticle, setDisplayedArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    getArticleById(id).then((data) => {
      setDisplayedArticle(data.article);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  return (
    <Box my={4} display="flex" alignItems="center" p={2}>
      <Paper elevation={3}>
        <Typography variant="h4">{displayedArticle.title}</Typography>

        <Typography variant="h6">
          By {displayedArticle.author} on{" "}
          {formatDateString(displayedArticle.created_at)}
        </Typography>

        <Typography variant="body1" mt={2} mb={2}>
          {displayedArticle.body}
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            variant="contained"
            color="success"
            name="upvote"
          >
            <ThumbUpIcon />
          </Button>
          <Typography>{displayedArticle.votes}</Typography>
          <Button
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            variant="contained"
            color="error"
            name="downvote"
          >
            <ThumbDownIcon />
          </Button>
          <Button size="small">
            {displayedArticle.comment_count} comments
          </Button>
        </div>
      </Paper>
    </Box>
  );
}

export default ViewArticle;
