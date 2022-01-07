import React, { useState, useEffect } from "react";

function WordElement(props) {
  const [correct, setCorrect] = useState(0);
  const [quess, setQuess] = useState("");

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
}

function WordList(props) {
  let list = [];
  for (const key in props) {
    list.push(WordElement(props[key]));
  }
  return list;
}

export default WordList;
