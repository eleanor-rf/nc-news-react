import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Paper from "@mui/material/Paper";
import { formatDateString } from "./utils/utils";

function CommentCard({ comment }) {
  console.log(comment);
  return (
    <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem" }}>
      <Typography variant="body1">
        {comment.author} on {formatDateString(comment.created_at)}
      </Typography>

      <Typography variant="body2" mt={2} mb={2}>
        {comment.body}
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
        <Typography px={1}>{comment.votes}</Typography>
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
      </div>
    </Paper>
  );
}

export default CommentCard;
