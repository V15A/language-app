import WordTable from "../word";
import AddWord from "../addWord";
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

/**
 * This component forms the admin page.
 *
 * @returns the view of admin page.
 */
export default function Admin() {
  const [tag, setTag] = useState("");

  let tags = ["all"];

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
      <h1>Admin view</h1>
      <AddWord />
      <Autocomplete
        onChange={(event, newValue) => {
          if (newValue === "all") {
            setTag("");
          } else {
            setTag(newValue);
          }
        }}
        id="choose-tag"
        options={tags}
        defaultValue="all"
        sx={{ margin: "auto", marginTop: "10px", width: 250 }}
        renderInput={(params) => (
          <TextField className="App" {...params} label="tag" />
        )}
      />
      <WordTable user="admin" tag={tag} />
    </div>
  );
}
