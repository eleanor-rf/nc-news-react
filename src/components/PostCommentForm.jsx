import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function PostCommentForm({ addNewComment, commentBody, setCommentBody }) {
    const { user, setUser } = useContext(UserContext);

  const handleBodyChange = (event) => {
    setCommentBody(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" mt={2}>
        Post a comment as {user.username}
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "95%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Comment text"
            multiline
            value={commentBody}
            onChange={handleBodyChange}
          />
        </div>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => addNewComment(commentBody)}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default PostCommentForm;
