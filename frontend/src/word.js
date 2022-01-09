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
      <div>
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
      <div>
        {" "}
        <span>{props.english} </span>
        <span>{props.finnish} </span>
        <button /*onClick={handleDelete}*/>Delete</button> {renderFeedback()}
      </div>
    );
  }
}

function WordList(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function FetchData() {
      try {
        let res = await fetch("http://localhost:3050/words/" + props.tag);
        const json = await res.json();
        //console.log(json);
        setData(json);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    FetchData();
  }, []);

  let list = [];

  /*for (const key in words) {
    console.log("put");
    list.push(<WordElement {...words[key]} user={props.user} />);
  }*/
  if (isLoading) {
    return <h1>LOADING...</h1>;
  } else {
    list = data.map((data) => (
      <WordElement key={data.id} {...data} user={props.user} />
    ));
    return list;
  }
}

export default WordList;
