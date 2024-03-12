import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { deleteComment } from "../utils/api-calls";

function DeleteButton({ commentId, setComments, setCommentCount, comments }) {
  const [clicked, setClicked] = useState(false);
  const [err, setErr] = useState(null);
  const [originalComments, setOriginalComments] = useState(comments);

  // make the API call
  //and then update commentCount AND comments FROM VIEWARTICLE oh no i have to pass them all the way down fml
  // if there's an error setClicked back to true and put a lil msg and undo all the other stuff

  const handleDeleteClick = () => {
    setOriginalComments(comments);
    setCommentCount((currentCount) => currentCount - 1);
    setClicked((current) => !current);

    setErr(null);

    deleteComment(commentId)
      .then((response) => {
        setComments((currentComments) => {
          const newComments = currentComments.filter((comment) => {
            return comment.comment_id !== commentId;
          });
          return newComments;
        });
      })
      .catch((error) => {
        setErr("Delete failed, try again");
        setComments(originalComments);
        setCommentCount((currentCount) => currentCount + 1);

        setTimeout(() => {
          setClicked((current) => !current);
        }, 1500);
      });
  };

  return (
    <>
      {clicked ? (
        <div>
          <Button startIcon={<DeleteIcon />} variant="outlined" disabled>
            Deleting...
          </Button>
          {err ? <Typography px={1}>{err}</Typography> : null}
        </div>
      ) : (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      )}
    </>
  );
}

export default DeleteButton;
