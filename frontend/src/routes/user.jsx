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
  let tags = [];

  /**
   * Function for getting all currently existing tags without duplicates.
   */
  async function GetTags() {
    try {
      let res = await fetch("/words/");
      const json = await res.json();
      for (const key in json) {
        let exists = false;
        for (let i = 0; i < tags.length; i++) {
          if (tags[i] === json[key].tag) {
            exists = true;
          }
        }
        if (!exists) {
          tags.push(json[key].tag);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  GetTags();

  return (
    <div className="App">
      <h1>User view</h1>
      <Autocomplete
        onChange={(event, newValue) => {
          setTag(newValue);
        }}
        id="combo-box-demo"
        options={tags}
        sx={{ margin: "auto", marginTop: "10px", width: 250 }}
        renderInput={(params) => (
          <TextField className="App" {...params} label="tag" />
        )}
      />
      <WordTable user="user" tag={tag} />
    </div>
  );
}
