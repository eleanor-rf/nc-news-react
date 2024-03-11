import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link } from "react-router-dom";
import { formatDateString } from "./utils/utils";

function ArticleCard({ article }) {

  return (
    <>
      <CardMedia component="img" height="140" image={article.article_img_url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to={`/article/${article.article_id}`}>{article.title}</Link>
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
