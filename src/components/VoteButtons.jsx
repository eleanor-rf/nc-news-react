import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";
import { vote } from "../utils/api-calls";

function VoteButtons({ data }) {
  const [voteCount, setVoteCount] = useState(data.votes);
  const [err, setErr] = useState(null);
  const endpoint = data.comment_id ? "comments" : "articles";
  const id = data.comment_id ? data.comment_id : data.article_id;

  const handleVoteClick = (integer) => {
    setVoteCount((currentCount) => currentCount + integer);
    setErr(null);
    vote(id, integer, endpoint).catch((err) => {
      setVoteCount((currentCount) => currentCount - integer);
      setErr("Something went wrong, please try again.");
    });
  };

  return (
    <>
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
          onClick={() => handleVoteClick(1)}
        >
          <ThumbUpIcon />
        </Button>
        <Typography px={1}>{voteCount}</Typography>
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
          onClick={() => handleVoteClick(-1)}
        >
          <ThumbDownIcon />
        </Button>
      </div>
      {err ? <Typography px={1}>{err}</Typography> : null}
    </>
  );
}

export default VoteButtons;
