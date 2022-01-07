import React, { useState, useEffect } from "react";

function AddWord() {
  const [finnish, setFinnish] = useState("");
  const [english, setEnglish] = useState("");
  const [tag, setTag] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleFinChange = (event) => {
    setFinnish(event.target.value);
  };

  const handleEngChange = (event) => {
    setEnglish(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const add = async () => {
    const conf = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ english, finnish, tag }),
    };
    console.log(conf);
    try {
      setIsSending(true);
      let res = await fetch("http://localhost:3050/add", conf);
      const json = await res.json();
      console.log(json);
      setIsSending(false);
    } catch (err) {
      setIsSending(false);
      console.log(err);
    }
  };
  if (isSending) {
    return (
      <div>
        <h2>Sending...</h2>
      </div>
    );
  } else {
    return (
      <div>
        <input
          placeholder="Finnish"
          value={finnish}
          onChange={handleFinChange}
        ></input>
        <br />
        <input
          placeholder="English"
          value={english}
          onChange={handleEngChange}
        ></input>
        <br />
        <input placeholder="Tag" value={tag} onChange={handleTagChange}></input>
        <br />
        <button onClick={add}>Add Word</button>
      </div>
    );
  }
}

export default AddWord;
