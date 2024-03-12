import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import VoteButtons from "./VoteButtons";
import { formatDateString } from "../utils/utils";
import DeleteButton from "./DeleteButton";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function CommentCard({ comment, setComments, setCommentCount, comments }) {
  const { user, setUser } = useContext(UserContext);
  const commentOwner = user.username === comment.author ? true : false;

  return (
    <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body1">
          {comment.author} on {formatDateString(comment.created_at)}
        </Typography>
        {commentOwner && (
          <DeleteButton
            commentId={comment.comment_id}
            setCommentCount={setCommentCount}
            setComments={setComments}
            comments={comments}
          />
        )}
      </div>

      <Typography variant="body2" mt={2} mb={2}>
        {comment.body}
      </Typography>
      <div style={{ display: "flex" }}>
        <VoteButtons data={comment} />
      </div>
    </Paper>
  );
}

export default CommentCard;
