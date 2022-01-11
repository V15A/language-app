import WordList from "../word";
import AddWord from "../addWord";
import React, { useState } from "react";

export default function Admin() {
  const [tag, setTag] = useState("");

  const tagChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <div className="App">
      <h1>Admin view</h1>
      <input onChange={tagChange}></input>
      <AddWord />
      <WordList user="admin" tag={tag} />
    </div>
  );
}
