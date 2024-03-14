import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function SortArticleSelect({ handleSubmit }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [sortBy, setSortBy] = useState(queryParams.get("sort_by") || "");
  const [direction, setDirection] = useState(
    queryParams.get("direction") || ""
  );

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    setSortBy(queryParams.get("sort_by") || "");
    setDirection(queryParams.get("direction") || "");
  }, [location.search]);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, sortBy, direction);
        }}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-sort-by">Sort by...</InputLabel>
          <Select
            labelId="select-sort-by"
            id="select-sort-by"
            value={sortBy}
            label="Sort by"
            onChange={handleSortByChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"created_at"}>Date posted</MenuItem>
            <MenuItem value={"comment_count"}>Comments</MenuItem>
            <MenuItem value={"votes"}>Votes</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-direction">Direction</InputLabel>
          <Select
            labelId="select-direction"
            id="select-direction"
            value={direction}
            label="Direction"
            onChange={handleDirectionChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"asc"}>Ascending</MenuItem>
            <MenuItem value={"desc"}>Descending</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SortArticleSelect;
