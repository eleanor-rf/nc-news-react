import React from "react";
import { useState, useEffect } from "react";
import { getTopics } from "../utils/api-calls";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [topicAlphabet, setTopicAlphabet] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response.topics);
      const usedLetters = getUsedLetters(response.topics);
      setTopicAlphabet(usedLetters);
    });
  }, []);

  const fullAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const getUsedLetters = (topics) => {
    const uniqueLetters = new Set();
    topics.forEach((topic) => {
      const firstLetter = topic.slug.charAt(0).toUpperCase();
      uniqueLetters.add(firstLetter);
    });
    return Array.from(uniqueLetters);
  };

  const scrollToLetter = (letter) => {
    const element = document.getElementById(letter);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box>
      <Typography variant="h5" py={2}>
        {fullAlphabet.split("").map((letter) =>
          topicAlphabet.includes(letter) ? (
            <Button
              variant="contained"
              size="medium"
              key={letter}
              onClick={() => scrollToLetter(letter)}
              style={{ minWidth: "30px", padding: "5px", borderRadius: "15px" }}
              color="primary"
            >
              {letter}
            </Button>
          ) : (
            <Button
              variant="text"
              size="medium"
              key={letter}
              style={{ minWidth: "30px", padding: "5px" }}
              disabled
            >
              {letter}
            </Button>
          )
        )}
      </Typography>

      {topicAlphabet.map((letter) => (
        <div key={letter} id={letter}>
          <Typography variant="h5" style={{ borderBottom: "2px solid black" }}>
            {letter}
          </Typography>
          <ul>
            {topics
              .filter((topic) => topic.slug.toUpperCase().startsWith(letter))
              .map((topic) => (
                <li key={topic.slug}>
                  <Typography variant="body1">
                    <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link> -{" "}
                    {topic.description}
                  </Typography>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </Box>
  );
}

export default TopicList;
