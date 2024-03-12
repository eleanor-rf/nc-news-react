import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import VoteButtons from "./VoteButtons";
import { formatDateString } from "./utils/utils";

function CommentCard({ comment }) {
  return (
    <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem" }}>
      <Typography variant="body1">
        {comment.author} on {formatDateString(comment.created_at)}
      </Typography>

      <Typography variant="body2" mt={2} mb={2}>
        {comment.body}
      </Typography>
      <div style={{ display: "flex" }}>
        <VoteButtons data={comment}/>
      </div>
    </Paper>
  );
}

export default CommentCard;
