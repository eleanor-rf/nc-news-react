import React from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsById } from "./utils/api-calls";
import { useState, useEffect } from "react";
import { formatDateString } from "./utils/utils";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CommentCard from "./CommentCard";
import VoteButtons from "./VoteButtons";

function ViewArticle() {
  const [displayedArticle, setDisplayedArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    getArticleById(id).then((data) => {
      setDisplayedArticle(data.article);
      setIsLoading(false);
    });
    getCommentsById(id).then((data) => {
      setComments(data.comments);
    });
  }, []);

  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  return (
    <Box display="block" alignItems="center" p={2}>
      <Paper elevation={3} style={{ padding: "1rem" }}>
        <Typography variant="h4">{displayedArticle.title}</Typography>

        <Typography variant="h6">
          By {displayedArticle.author} on{" "}
          {formatDateString(displayedArticle.created_at)}
        </Typography>

        <Typography variant="body1" mt={2} mb={2}>
          {displayedArticle.body}
        </Typography>
        <VoteButtons data={displayedArticle} />
      </Paper>
      <Typography variant="h4" mt={2}>
        {displayedArticle.comment_count} Comments
      </Typography>
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id}/>;
      })}
    </Box>
  );
}

export default ViewArticle;
