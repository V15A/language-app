import WordList from "../word";
import React, { useState } from "react";

export default function User() {
  const [tag, setTag] = useState("");

  const tagChange = (event) => {
    setTag(event.target.value);
  };
  return (
    <div className="App">
      <h1>User view</h1>
      <input onChange={tagChange}></input>
      <WordList user="user" tag={tag} />
    </div>
  );
}
