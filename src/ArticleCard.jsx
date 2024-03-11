import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function ArticleCard({ article }) {
  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDateTime = date.toLocaleDateString("en-GB", options);
    return formattedDateTime;
  }

  return (
    <>
      <CardMedia component="img" height="140" image={article.article_img_url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {article.author} on {formatDateString(article.created_at)}
        </Typography>
      </CardContent>
      <CardActions>
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
        <Typography>{article.votes}</Typography>
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
        <Button size="small">{article.comment_count} comments</Button>
      </CardActions>
    </>
  );
}

export default ArticleCard;

// <>
//   <img src={article.article_img_url} />
//   <p>{article.title}</p>
//   <p>{article.author}</p>
//   <p>{article.created_at}</p>
//   <p>{article.votes} votes</p>
//   <p>{article.comment_count} comments</p>
// </>
