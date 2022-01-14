import WordTable from "../word";
import AddWord from "../addWord";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function Admin() {
  const [tag, setTag] = useState("");

  const tagChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <div className="App">
      <h1>Admin view</h1>
      <AddWord />
      <Autocomplete
        onChange={(event, newValue) => {
          setTag(newValue);
        }}
        id="combo-box-demo"
        options={["animal", "vehicle"]}
        sx={{ margin: "auto", marginTop: "10px", width: 250 }}
        renderInput={(params) => (
          <TextField className="App" {...params} label="tag" />
        )}
      />
      <WordTable user="admin" tag={tag} />
    </div>
  );
}
