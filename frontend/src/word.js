import React, { useState, useEffect } from "react";

function WordElement(props) {
  const [correct, setCorrect] = useState(0);
  const [quess, setQuess] = useState("");
  const user = props.user;

  useEffect(() => {
    return handleQuess();
  }, [quess]);

  const handleQuess = () => {
    if (quess === props.finnish) {
      props.addCorrect();
    } else {
      console.log(correct);
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
        ></input>
      </div>
    );
  } else if (user === "admin") {
    return (
      <div>
        {" "}
        <span>{props.english} </span>
        <span>{props.finnish} </span>
        <button /*onClick={handleDelete}*/>Delete</button>
      </div>
    );
  }
}

function WordList(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [correct, setCorrect] = useState(0);

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
  }, [props.tag]);

  let list = [];

  const addCorect = () => {
    setCorrect(correct + 1);
  };

  if (isLoading) {
    return <h1>LOADING...</h1>;
  } else {
    list = data.map((data) => (
      <WordElement
        key={data.id}
        {...data}
        user={props.user}
        addCorrect={addCorect}
      />
    ));
    if (props.user === "admin") {
      return list;
    } else {
      let partialList = list.splice(0, 5);
      return (
        <div>
          {partialList}{" "}
          <button onClick={() => alert(`${correct}/5 correct!`)}>Submit</button>
        </div>
      );
    }
  }
}

export default WordList;
