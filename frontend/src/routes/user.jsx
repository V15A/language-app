import WordList from "../word";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function User() {
  const [tag, setTag] = useState("");

  const tagChange = (event) => {
    setTag(event.target.value);
  };
  return (
    <div className="App">
      <h1>User view</h1>
      <Autocomplete
        onChange={(event, newValue) => {
          setTag(newValue);
        }}
        id="combo-box-demo"
        options={["tag", "animal", "vehicle"]}
        sx={{ margin: "auto", width: 250 }}
        renderInput={(params) => (
          <TextField className="App" {...params} label="tag" />
        )}
      />
      <WordList user="user" tag={tag} />
    </div>
  );
}
