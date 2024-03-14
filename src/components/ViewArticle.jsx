import React from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsById } from "../utils/api-calls";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../utils/utils";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CommentCard from "./CommentCard";
import VoteButtons from "./VoteButtons";
import PostCommentForm from "./PostCommentForm";
import { postComment } from "../utils/api-calls";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Alert from "@mui/material/Alert";

function ViewArticle() {
  const { user, setUser } = useContext(UserContext);
  const [displayedArticle, setDisplayedArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [err, setErr] = useState(null);
  const username = user.username;
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    getArticleById(id)
      .then((data) => {
        setDisplayedArticle(data.article);
        setCommentCount(data.article.comment_count);
        setIsLoading(false);
      })
      .then((articleExists) => {
        getCommentsById(id).then((data) => {
          const sortedComments = data.comments.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setComments(sortedComments);
        });
      })
      .catch((error) => {
        navigate("/error", {
          state: { message: "Article not found" },
        });
      });
  }, []);

  const addNewComment = (commentBody) => {
    setCommentCount((currentCount) => currentCount + 1);
    setErr(null);
    postComment(id, username, commentBody)
      .then((newCommentFromApi) => {
        setComments((currentComments) => [
          newCommentFromApi,
          ...currentComments,
        ]);
        setCommentBody("");
      })
      .catch((err) => {
        setCommentCount((currentCount) => currentCount - 1);
        setErr(
          err.message ? err.message : "Something went wrong, please try again."
        );
      });
  };

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
      <PostCommentForm
        addNewComment={addNewComment}
        commentBody={commentBody}
        setCommentBody={setCommentBody}
      />
      {err ? (
        <Box m={2}>
          <Alert variant="outlined" severity="error">
            {err}
          </Alert>
        </Box>
      ) : null}
      <Typography variant="h4" mt={2}>
        {commentCount} Comments
      </Typography>
      {comments.map((comment) => {
        return (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            setComments={setComments}
            setCommentCount={setCommentCount}
            comments={comments}
          />
        );
      })}
    </Box>
  );
}

export default ViewArticle;
