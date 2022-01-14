import WordTable from "../word";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

/**
 * This component forms the user/student page.
 *
 * @returns the view of user page.
 */
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
        options={["animal", "vehicle"]}
        sx={{ margin: "auto", marginTop: "10px", width: 250 }}
        renderInput={(params) => (
          <TextField className="App" {...params} label="tag" />
        )}
      />
      <WordTable user="user" tag={tag} />
    </div>
  );
}
