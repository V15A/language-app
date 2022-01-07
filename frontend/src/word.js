import React from "react";

function WordElement(props) {
  return (
    <div>
      {" "}
      <span>{props.english} </span>
      <input placeholder="in finnish"></input>{" "}
      <button onClick={() => {}}>Submit</button>
    </div>
  );
}

function WordList(props) {
  let list = [];
  for (const key in props) {
    list.push(WordElement(props[key]));
  }
  return list;
}

export default WordList;
