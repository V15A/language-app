import React, { useState, useEffect } from "react";

function WordElement(props) {
  const [correct, setCorrect] = useState(0);
  const [quess, setQuess] = useState("");
  const user = props.user;

  const handleSubmit = () => {
    if (quess === props.finnish) {
      setCorrect(1);
      console.log(correct);
    } else {
      setCorrect(-1);
      console.log(correct);
    }
  };

  const renderFeedback = () => {
    if (correct === 1) {
      return <span>Correct</span>;
    } else if (correct === -1) {
      return <span>Wrong</span>;
    }
  };

  const handleChange = (event) => {
    setQuess(event.target.value);
  };

  if (user === "user") {
    return (
      <div key={props.id}>
        {" "}
        <span>{props.english} </span>
        <input
          placeholder="in finnish"
          value={quess}
          onChange={handleChange}
        ></input>{" "}
        <button onClick={handleSubmit}>Submit</button> {renderFeedback()}
      </div>
    );
  } else if (user === "admin") {
    return (
      <div key={props.id}>
        {" "}
        <span>{props.english} </span>
        <span>{props.finnish} </span>
        <button /*onClick={handleDelete}*/>Delete</button> {renderFeedback()}
      </div>
    );
  }
}

async function getWords(tag) {
  let words = [];
  try {
    let data = await fetch("http://localhost:3050/words/" + tag);
    let json = data.json();
    words = json;
  } catch (err) {
    console.log(err.message);
  }

  return words;
}

function WordList(props) {
  let list = [];
  let words = getWords(props.tag);
  for (const key in words) {
    list.push(WordElement(words[key], props.user));
  }
  return list;
}

export default WordList;
